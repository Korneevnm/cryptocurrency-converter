import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_CURRENCIES_LOAD,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILURE
} from './constants';
import axios from 'axios';

const fetchData = () =>
  axios
    .all([
      axios.get(
        `https://pro-api.coinmarketcap.com/v1/fiat/map?CMC_PRO_API_KEY=711e907c-a7d7-46a5-917c-5dc0f72fce75`
      ),
      axios.get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=711e907c-a7d7-46a5-917c-5dc0f72fce75`
      )
    ])
    .then(data => data.map(({ data: { data } }) => data));

function* getCurrencies() {
  try {
    const data = yield call(fetchData);
    yield put({ type: FETCH_CURRENCIES_SUCCESS, data });
  } catch (error) {
    yield put({ type: FETCH_CURRENCIES_FAILURE, error });
  }
}

export default function* watcherCurrencies() {
  yield takeLatest(FETCH_CURRENCIES_LOAD, getCurrencies);
}
