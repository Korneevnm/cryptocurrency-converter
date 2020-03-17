import React from 'react';
import Header from '../../components/Header';
import CurrencyConverter from '../CurrencyConverter';
import CurrencyList from '../CurrencyList';
import './style.sass';

function App() {
  return (
    <div className='container'>
      <Header />
      <CurrencyConverter />
      <CurrencyList />
    </div>
  );
}

export default App;
