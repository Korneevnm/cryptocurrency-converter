import React from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import {
  makeSelectCurrenciesList,
  makeSelectCryptoCurrenciesList,
  makeSelectCurrencyLoading,
  makeSelectCurrencyFromData,
  makeSelectCurrencyToData
} from '../../containers/CurrencyConverter/selectors';

const CurrencyConverterSelect = ({
  defaultValue,
  type,
  handleChange,
  inputValue
}) => {
  const { Option, OptGroup } = Select;
  const currenciesList = useSelector(makeSelectCurrenciesList);
  const cryptoCurrenciesList = useSelector(makeSelectCryptoCurrenciesList);
  const currenciesLoading = useSelector(makeSelectCurrencyLoading);
  const currencyFromData = useSelector(makeSelectCurrencyFromData);
  const currencyToData = useSelector(makeSelectCurrencyToData);

  return (
    <>
      <Select
        showSearch
        optionFilterProp='children'
        defaultValue={defaultValue}
        loading={currenciesLoading}
        filterOption={(input, option) => {
          if (option.children) {
            return option.children
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase());
          }
        }}
        onChange={(value, { id, symbol }) => {
          if (type === 'fromSelect') {
            handleChange(id, currencyToData.symbol, inputValue);
          } else {
            handleChange(currencyFromData.id, symbol, inputValue);
          }
        }}
        size='large'>
        <OptGroup label='Fiat Currencies'>
          {currenciesList.map(({ id, name, sign, symbol }) => (
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
          {cryptoCurrenciesList.map(({ id, name, symbol }) => (
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
