import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputNumber } from 'antd';
import { currenciesLoad, currencyLoad } from './actions';
import {
  makeSelectCurrencyFromData,
  makeSelectCurrencyToData
} from './selectors';
import CurrencyConverterSelect from '../../components/CurrencyConverterSelect';
import './style.sass';

const CurrencyConverter = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);

  const currencyFromData = useSelector(makeSelectCurrencyFromData);
  const currencyToData = useSelector(makeSelectCurrencyToData);
  console.log('currencyFromData', currencyFromData);
  console.log('currencyToData', currencyToData);
  const { id } = currencyFromData;
  const { symbol } = currencyToData;

  useEffect(() => {
    dispatch(currenciesLoad());
    dispatch(currencyLoad(id, symbol, value));
  }, [dispatch, value]);

  const handleChange = (currencyFromId, currencyToSymbol, value) => {
    dispatch(currencyLoad(currencyFromId, currencyToSymbol, value));
  };

  return (
    <div className='converter'>
      <div className='converter__item'>
        <CurrencyConverterSelect
          defaultValue='Bitcoin'
          type='fromSelect'
          handleChange={handleChange}
        />
        <InputNumber
          size='large'
          min={0}
          defaultValue={value}
          onChange={value => setValue(value)}
        />
      </div>
      <div className='converter__item'>
        <CurrencyConverterSelect
          defaultValue='United States Dollar'
          type='toSelect'
          handleChange={handleChange}
        />
        <InputNumber
          size='large'
          min={0}
          formatter={value =>
            parseFloat(value)
              .toFixed(2)
              .replace(/(?=\B(?:\d{3})+(?!\d))/g, ' ')
          }
          value={currencyToData.price}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
