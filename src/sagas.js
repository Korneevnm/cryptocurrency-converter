import { all, call } from 'redux-saga/effects';
import watcherCryptocurrencyList from './containers/CurrencyList/saga';
import watcherCurrency from './containers/CurrencyConverter/saga';

function* rootSaga() {
  yield all([call(watcherCurrency), call(watcherCryptocurrencyList)]);
}

export default rootSaga;
