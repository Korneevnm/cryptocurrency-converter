import { combineReducers } from 'redux';

import cryptocurrencyList from './containers/CurrencyList/reducers';
import currency from './containers/CurrencyConvert/reducers';

const rootReducer = combineReducers({
  cryptocurrencyList: cryptocurrencyList,
  currency: currency
});

export default rootReducer;
