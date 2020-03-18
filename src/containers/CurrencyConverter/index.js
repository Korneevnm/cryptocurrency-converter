import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, InputNumber, Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import { currenciesLoad, currencyLoad, currencySwap } from './actions';
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
    symbol: currencyFromData.symbol,
    id: currencyFromData.id,
    amount: value
  };
  const toData = {
    symbol: currencyToData.symbol,
    id: currencyToData.id,
    amount: value
  };

  useEffect(() => {
    dispatch(currenciesLoad());
  }, [dispatch]);

  useEffect(() => {
    dispatch(currencyLoad(fromData, toData));
    console.log(fromData, toData);
  }, [dispatch]);

  const handleChange = (currencyFromId, currencyToSymbol, value) => {
    dispatch(currencyLoad(currencyFromId, currencyToSymbol, value));
  };

  const handleClick = () => {
    dispatch(currencySwap(currencyFromData, currencyToData));
    dispatch(currencyLoad(currencyToData, currencyFromData));
  };
  console.log('from', currencyFromData);
  console.log('to', currencyToData);

  const price =
    currencyToData.price > 0.01
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
          defaultValue='Bitcoin'
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
          defaultValue='United States Dollar'
          type='toSelect'
          handleChange={handleChange}
          inputValue={value}
        />
        <Input size='large' value={price} disabled />
      </div>
    </div>
  );
};

export default CurrencyConverter;
