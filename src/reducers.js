import { combineReducers } from 'redux';

import currency from './containers/CurrencyConverter/reducers';
import cryptocurrencyList from './containers/CurrencyList/reducers';

const rootReducer = combineReducers({
  currency: currency,
  cryptocurrencyList: cryptocurrencyList
});

export default rootReducer;
