import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_CRYPTOCURRENCYLIST_START,
  FETCH_CRYPTOCURRENCYLIST_SUCCESS,
  FETCH_CRYPTOCURRENCYLIST_FAILURE
} from './constants';
import axios from 'axios';

function* getCryptocurrencyList() {
  try {
    const data = yield call(() =>
      axios
        .get(
          // `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=711e907c-a7d7-46a5-917c-5dc0f72fce75&limit=2500`
          `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=711e907c-a7d7-46a5-917c-5dc0f72fce75&limit=100`
        )
        .then(({ data: { data } }) => data)
    );
    yield put({ type: FETCH_CRYPTOCURRENCYLIST_SUCCESS, data });
  } catch (error) {
    yield put({ type: FETCH_CRYPTOCURRENCYLIST_FAILURE, error });
  }
}

export default function* watcherCryptocurrencyList() {
  yield takeLatest(FETCH_CRYPTOCURRENCYLIST_START, getCryptocurrencyList);
}
