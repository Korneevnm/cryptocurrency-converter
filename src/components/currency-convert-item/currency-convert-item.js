import React, { useState } from 'react';
import { Input, Select } from 'antd';
import './style.sass';

const CurrencyConvertItem = ({ options }) => {
  const { Option } = Select;
  const [value, setValue] = useState(1);

  return (
    <div className='converter__item'>
      <Select
        showSearch
        optionFilterProp='children'
        defaultValue={'Btc'}
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
        {options.map(({ id, name, quote }) => (
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
    </div>
  );
};

export default CurrencyConvertItem;
