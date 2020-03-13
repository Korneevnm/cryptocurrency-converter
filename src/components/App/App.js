import React from 'react';
import Header from '../header';
import CurrencyList from '../currency-list';
import CurrencyConvert from '../currency-convert';
import './style.sass';

function App() {
  return (
    <div className='container'>
      <Header />
      <CurrencyConvert />
      <CurrencyList />
    </div>
  );
}

export default App;
