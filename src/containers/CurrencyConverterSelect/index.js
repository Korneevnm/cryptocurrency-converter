import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { Select } from 'antd';
import { currenciesLoad } from './actions';

const CurrencyConverterSelect = ({ defaultValue }) => {
  const { Option, OptGroup } = Select;
  const dispatch = useDispatch();
  const [convertId, setConvertId] = useState(1);
  const [convertSymbol, setConvertSymbol] = useState('USD');
  const selectCurrenciesList = createSelector(
    state => state.currencies,
    currencies => currencies
  );
  const currenciesList = useSelector(selectCurrenciesList);

  useEffect(() => {
    dispatch(currenciesLoad());
  }, [dispatch]);

  return (
    <>
      <Select
        showSearch
        optionFilterProp='children'
        defaultValue={defaultValue}
        loading={currenciesList.currencies.loading}
        filterOption={(input, option) => {
          if (option.children) {
            return option.children
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase());
          }
        }}
        onChange={(value, { id, symbol }) => {
          setConvertSymbol(symbol);
          setConvertId(id);
        }}
        size='large'>
        <OptGroup label='Fiat Currencies'>
          {currenciesList.currencies.map(({ id, name, sign, symbol }) => (
            <Option
              key={id}
              id={id}
              value={name}
              symbol={symbol}
              className='converter_option'>
              {sign} {name} ({symbol})
            </Option>
          ))}
        </OptGroup>
        <OptGroup label='Cryptocurrencies'>
          {currenciesList.cryptoCurrencies.map(({ id, name, symbol }) => (
            <Option
              key={id}
              id={id}
              value={name}
              title={name}
              symbol={symbol}
              className='converter_option'>
              <img
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
                alt={name}
                width='20px'
              />
              {name} ({symbol})
            </Option>
          ))}
        </OptGroup>
      </Select>
    </>
  );
};

export default CurrencyConverterSelect;
