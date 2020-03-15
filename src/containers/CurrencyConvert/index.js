import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { Input, InputNumber, Select } from 'antd';
import { currencyLoad } from './actions';
import './style.sass';

const CurrencyConvert = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [convertId, setConvertId] = useState(1);
  const [convertSymbol, setConvertSymbol] = useState('USD');
  const selectCurrency = state => state.currency;
  const currency = useSelector(selectCurrency);
  const selectCryptocurrencyList = createSelector(
    state => state.cryptocurrencyList,
    cryptocurrencyList => cryptocurrencyList
  );
  const cryptocurrencyList = useSelector(selectCryptocurrencyList);

  useEffect(() => {
    dispatch(currencyLoad('USD', convertId, value));
  }, [dispatch, value, convertId, convertSymbol]);

  // console.log(currency);

  const handleChange = value => {
    setValue(value);
  };

  return (
    <div className='converter'>
      <div className='converter__item'>
        <Select
          showSearch
          optionFilterProp='children'
          defaultValue={'Bitcoin'}
          loading={currency.loading}
          filterOption={(input, option) =>
            option.children
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          onChange={(value, { id, symbol }) => {
            setConvertSymbol(symbol);
            setConvertId(id);
          }}
          size='large'>
          {cryptocurrencyList.cryptocurrency.map(
            ({ id, name, quote, symbol }) => (
              <Option
                key={id}
                id={id}
                value={name}
                symbol={symbol}
                price={quote.USD.price}
                className='converter_option'>
                <img
                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
                  alt={name}
                  width='20px'
                />
                {name}
              </Option>
            )
          )}
        </Select>
        <InputNumber
          size='large'
          min={0}
          defaultValue={value}
          onChange={handleChange}
        />
      </div>
      <div className='converter__item'>
        <InputNumber
          size='large'
          min={0}
          formatter={value =>
            parseFloat(value)
              .toFixed(2)
              .replace(/(?=\B(?:\d{3})+(?!\d))/g, ' ')
          }
          value={currency.data.price ? currency.data.price : 0}
        />
      </div>

      {/* <div className='converter__item'>
        <Select
          showSearch
          optionFilterProp='children'
          defaultValue={'USD'}
          filterOption={(input, option) =>
            option.children
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          onChange={(value, option) => {
            setValue(option.price);
          }}
          size='large'>
          {cryptocurrency.map(({ id, name, quote }) => (
            <Option
              key={id}
              value={name}
              price={quote.USD.price}
              className='converter_option'>
              <img
                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
                alt={name}
                width='20px'
              />
              {name}
            </Option>
          ))}
        </Select>
        <Input size='large' value={value}></Input>
      </div> */}
    </div>
  );
};

export default CurrencyConvert;
