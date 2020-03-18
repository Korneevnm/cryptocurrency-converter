import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_CRYPTOCURRENCYLIST_START,
  FETCH_CRYPTOCURRENCYLIST_SUCCESS,
  FETCH_CRYPTOCURRENCYLIST_FAILURE
} from './constants';
import axiosConfig, { apiKey } from '../../utils/axiosConfig';

function* getCryptocurrencyList() {
  try {
    const data = yield call(() =>
      axiosConfig
        .get(
          `/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}&limit=2500`
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
