import { all, call } from 'redux-saga/effects';
import watcherCryptocurrencyList from './containers/CurrencyList/saga';
import watcherCurrency from './containers/CurrencyConverter/saga';
import watcherCurrencies from './containers/CurrencyConverterSelect/saga';

function* rootSaga() {
  yield all([
    call(watcherCurrencies),
    call(watcherCurrency),
    call(watcherCryptocurrencyList)
  ]);
}

export default rootSaga;
