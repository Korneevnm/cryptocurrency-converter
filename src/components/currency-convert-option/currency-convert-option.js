import React from 'react';
import { Select } from 'antd';
import './style.sass';

const CurrencyConvertOption = ({ option: { id, name, quote } }) => {
  const { Option } = Select;

  return (
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
  );
};

export default CurrencyConvertOption;
