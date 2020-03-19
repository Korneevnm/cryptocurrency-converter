import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, InputNumber, Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
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
  const fromData = {
    label: currencyFromData.label,
    symbol: currencyFromData.symbol,
    id: currencyFromData.id,
    amount: value
  };
  const toData = {
    label: currencyToData.label,
    symbol: currencyToData.symbol,
    id: currencyToData.id,
    amount: value
  };

  useEffect(() => {
    dispatch(currenciesLoad());
  }, [dispatch]);

  useEffect(() => {
    if (value > 0) {
      dispatch(currencyLoad(fromData, toData));
    }
  }, [dispatch, value]);

  const handleChange = (fromData, toData) => {
    dispatch(currencyLoad(fromData, toData));
  };

  const handleClick = () => {
    dispatch(currencyLoad(currencyToData, currencyFromData));
  };

  const price =
    currencyToData.price && currencyToData.price > 0.01
      ? parseFloat(currencyToData.price)
          .toFixed(2)
          .replace(/(?=\B(?:\d{3})+(?!\d))/g, ' ')
      : parseFloat(currencyToData.price)
          .toFixed(6)
          .replace(/(?=\B(?:\d{3})+(?!\d))/g, ' ');

  return (
    <div className='converter'>
      <div className='converter__item'>
        <CurrencyConverterSelect
          defaultValue={fromData.label}
          type='fromSelect'
          handleChange={handleChange}
          inputValue={value}
        />
        <InputNumber
          size='large'
          min={0}
          defaultValue={value}
          onChange={value => setValue(value)}
        />
      </div>

      <Button
        type='primary'
        icon={<SwapOutlined />}
        size='large'
        onClick={handleClick}
      />

      <div className='converter__item'>
        <CurrencyConverterSelect
          defaultValue={toData.label}
          type='toSelect'
          handleChange={handleChange}
          inputValue={value}
        />
        <Input size='large' value={value > 0 ? price : 0} disabled />
      </div>
    </div>
  );
};

export default CurrencyConverter;
