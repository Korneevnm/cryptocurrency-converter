import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { cryptocurrencyListLoad } from './actions';
import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './style.sass';

const CurrencyList = () => {
  const { Column } = Table;
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const selectCryptocurrencyList = createSelector(
    state => state.cryptocurrencyList,
    cryptocurrencyList => cryptocurrencyList
  );
  const cryptocurrencyList = useSelector(selectCryptocurrencyList);

  useEffect(
    cryptocurrencyList => {
      dispatch(cryptocurrencyListLoad());
      const interval = setInterval(() => {
        setCounter(counter => counter + 1);
      }, 150000);
      return () => {
        clearInterval(interval);
      };
    },
    [counter, dispatch]
  );

  const columnRank = (
    <Column
      title='Rank'
      dataIndex='cmc_rank'
      key='cmc_rank'
      align='center'
      width='90px'
      sorter={(a, b) => a.cmc_rank - b.cmc_rank}
    />
  );

  const columnName = (
    <Column
      title='Name'
      dataIndex='name'
      key='name'
      width='30%'
      render={(text, record) => (
        <div className='cell_name'>
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${record.id}.png`}
            alt={record.name}
            width='30px'
          />
          <span>
            {record.name} ({record.symbol})
          </span>
        </div>
      )}
      ellipsis={true}
      sorter={(a, b) => a.name.localeCompare(b.name)}
      filterDropdown={({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <div className='search'>
          <Input
            placeholder={`Search name`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
          />
          <Button
            type='primary'
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size='small'>
            Search
          </Button>
          <Button onClick={() => clearFilters()} size='small'>
            Reset
          </Button>
        </div>
      )}
      filterIcon={filtered => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      )}
      onFilter={(value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      }}
    />
  );

  const columnPrice = (
    <Column
      title='Price'
      dataIndex='price'
      key='price'
      sorter={(a, b) => a.quote.USD.price - b.quote.USD.price}
      render={(text, record) => {
        if (record.quote.USD.price === null) {
          return 'unknown';
        }
        if (record.quote.USD.price > 1) {
          return `$${record.quote.USD.price
            .toFixed(2)
            .replace(/(?=\B(?:\d{3})+(?!\d))/g, ' ')}`;
        }
        if (record.quote.USD.price < 0.00001) {
          return `$${record.quote.USD.price}`;
        } else {
          return `$${parseFloat(record.quote.USD.price).toFixed(6)}`;
        }
      }}
    />
  );

  const columnMarketCap = (
    <Column
      title='Market Cap'
      dataIndex='market_cap'
      key='market_cap'
      sorter={(a, b) => a.quote.USD.market_cap - b.quote.USD.market_cap}
      render={(text, record) => {
        if (record.quote.USD.market_cap === null) {
          return 'unknown';
        }
        if (record.quote.USD.market_cap > 1) {
          return `$${record.quote.USD.market_cap
            .toFixed(2)
            .replace(/(?=\B(?:\d{3})+(?!\d))/g, ' ')}`;
        }
        if (record.quote.USD.market_cap < 0.00001) {
          return `$${record.quote.USD.market_cap}`;
        } else {
          return `$${parseFloat(record.quote.USD.market_cap).toFixed(6)}`;
        }
      }}
    />
  );

  const columnVolume = (
    <Column
      title='Volume (24h)'
      dataIndex='volume_24h'
      key='volume_24h'
      sorter={(a, b) => a.quote.USD.volume_24h - b.quote.USD.volume_24h}
      render={(text, record) => {
        if (record.quote.USD.volume_24h === null) {
          return '$0';
        }
        if (record.quote.USD.volume_24h > 1) {
          return `$${record.quote.USD.volume_24h
            .toFixed(0)
            .replace(/(?=\B(?:\d{3})+(?!\d))/g, ' ')}`;
        } else {
          return `$${record.quote.USD.volume_24h}`;
        }
      }}
    />
  );

  const columnChange = (
    <Column
      title='Change (24h)'
      dataIndex='percent_change_24h'
      key='percent_change_24h'
      align='center'
      sorter={(a, b) =>
        a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h
      }
      render={(text, record) => {
        if (record.quote.USD.percent_change_24h > 0) {
          return (
            <span className='plus'>
              {record.quote.USD.percent_change_24h.toFixed(3)}%
            </span>
          );
        } else {
          return (
            <span className='minus'>
              {record.quote.USD.percent_change_24h.toFixed(3)}%
            </span>
          );
        }
      }}
    />
  );

  return (
    <>
      <Table
        dataSource={cryptocurrencyList.cryptocurrency}
        loading={cryptocurrencyList.loading}
        pagination={{
          total: cryptocurrencyList.length,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} coins`,
          showSizeChanger: true,
          showQuickJumper: true
        }}
        className='currency_table'>
        {columnRank}
        {columnName}
        {columnPrice}
        {columnMarketCap}
        {columnVolume}
        {columnChange}
      </Table>
    </>
  );
};

export default CurrencyList;
