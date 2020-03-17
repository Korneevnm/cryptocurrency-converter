import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_CURRENCY_LOAD,
  FETCH_CURRENCY_SUCCESS,
  FETCH_CURRENCY_FAILURE
} from './constants';
import axios from 'axios';

const fetchData = ({ symbol, id, amount }) =>
  axios
    .get(
      `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?CMC_PRO_API_KEY=711e907c-a7d7-46a5-917c-5dc0f72fce75&id=${id}&amount=${amount}&convert=${symbol}`
    )
    .then(({ data: { data } }) => {
      return {
        symbol: symbol,
        id: data.id,
        amount: data.amount,
        price: data.quote[symbol].price
      };
    });

function* getCurrency(action) {
  try {
    const toData = yield call(fetchData, action.fromData);
    yield put({ type: FETCH_CURRENCY_SUCCESS, toData });
  } catch (error) {
    yield put({ type: FETCH_CURRENCY_FAILURE, error });
  }
}

export default function* watcherCurrency() {
  yield takeLatest(FETCH_CURRENCY_LOAD, getCurrency);
}
