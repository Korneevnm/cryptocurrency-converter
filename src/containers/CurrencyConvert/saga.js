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
      // `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=684c8a70-c11a-4fa6-b159-ad8e159ff06a&limit=2500`
      `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?CMC_PRO_API_KEY=684c8a70-c11a-4fa6-b159-ad8e159ff06a&id=${id}&amount=${amount}&convert=${symbol}`
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
    const currency = yield call(fetchData, action.data);
    yield put({ type: FETCH_CURRENCY_SUCCESS, data: currency });
  } catch (error) {
    yield put({ type: FETCH_CURRENCY_FAILURE, error });
  }
}

export default function* watcherCurrency() {
  yield takeLatest(FETCH_CURRENCY_LOAD, getCurrency);
}
