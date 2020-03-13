import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Select } from 'antd';
import { fetchCryptocurrency } from '../../actions';
import './style.sass';

const CurrencyConvert = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const cryptocurrency = useSelector(state => state.cryptocurrency);
  const cryptocurrencyList = useSelector(state => state.cryptocurrencyList);
  const [value, setValue] = useState(1);
  const [convertId, setConvertId] = useState(1);

  useEffect(() => {
    dispatch(fetchCryptocurrency(convertId, value, 'RUB'));
  }, [value, convertId]);
  console.log(cryptocurrency);

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <div className='converter'>
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
          onChange={(value, { id }) => setConvertId(id)}
          size='large'>
          {cryptocurrencyList.cryptocurrency.map(({ id, name, quote }) => (
            <Option
              key={id}
              id={id}
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
        <Input size='large' value={value} onChange={handleChange} />
      </div>
      <Input size='large' value={cryptocurrency.cryptocurrency.price} />

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
