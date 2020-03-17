import { combineReducers } from 'redux';

import currencies from './containers/CurrencyConverterSelect/reducers';
import currency from './containers/CurrencyConverter/reducers';
import cryptocurrencyList from './containers/CurrencyList/reducers';

const rootReducer = combineReducers({
  currencies: currencies,
  currency: currency,
  cryptocurrencyList: cryptocurrencyList
});

export default rootReducer;
