import React from 'react';
import Header from '../../components/Header';
import CurrencyConvert from '../CurrencyConvert';
import CurrencyList from '../CurrencyList';
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
