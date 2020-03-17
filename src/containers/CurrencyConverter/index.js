import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { InputNumber, Select } from 'antd';
import { currencyLoad } from './actions';
import CurrencyConverterSelect from '../CurrencyConverterSelect';
import './style.sass';

const CurrencyConverter = () => {
  const { Option, OptGroup } = Select;
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const [convertId, setConvertId] = useState(1);
  const [convertSymbol, setConvertSymbol] = useState('USD');
  const selectCurrency = createSelector(
    state => state.currency,
    currency => currency
  );
  const currency = useSelector(selectCurrency);

  useEffect(() => {
    dispatch(currencyLoad('USD', convertId, value));
  }, [dispatch, value, convertId, convertSymbol]);

  return (
    <div className='converter'>
      <div className='converter__item'>
        <CurrencyConverterSelect defaultValue='Bitcoin' />
        <InputNumber
          size='large'
          min={0}
          defaultValue={value}
          onChange={value => setValue(value)}
        />
      </div>
      <div className='converter__item'>
        <CurrencyConverterSelect defaultValue='United States Dollar' />
        <InputNumber
          size='large'
          min={0}
          formatter={value =>
            parseFloat(value)
              .toFixed(2)
              .replace(/(?=\B(?:\d{3})+(?!\d))/g, ' ')
          }
          value={currency.toData.price ? currency.toData.price : 0}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
