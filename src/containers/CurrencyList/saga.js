import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_CRYPTOCURRENCYLIST_LOAD,
  FETCH_CRYPTOCURRENCYLIST_SUCCESS,
  FETCH_CRYPTOCURRENCYLIST_FAILURE
} from './constants';
import axios from 'axios';

const getCryptocurrencyList = () =>
  axios
    .get(
      // `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=684c8a70-c11a-4fa6-b159-ad8e159ff06a&limit=2500`
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=684c8a70-c11a-4fa6-b159-ad8e159ff06a&limit=100`
    )
    .then(({ data: { data } }) => data);

function* fetchData() {
  try {
    const response = yield call(getCryptocurrencyList);
    const cryptocurrencies = response.map(item => {
      item.key = item.id;
      return item;
    });
    yield put({ type: FETCH_CRYPTOCURRENCYLIST_SUCCESS, cryptocurrencies });
  } catch (error) {
    yield put({ type: FETCH_CRYPTOCURRENCYLIST_FAILURE, error });
  }
}

export default function* watcherCryptocurrencyList() {
  yield takeLatest(FETCH_CRYPTOCURRENCYLIST_LOAD, fetchData);
}
