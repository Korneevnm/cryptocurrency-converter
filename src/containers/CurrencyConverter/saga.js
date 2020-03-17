import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_CURRENCIES_START,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILURE,
  CURRENCY_CONVERT_START,
  CURRENCY_CONVERT_SUCCESS,
  CURRENCY_CONVERT_FAILURE
} from './constants';

import axios from 'axios';
import axiosConfig, { apiKey } from '../../utils/axiosConfig';

function* getCurrencies() {
  try {
    const data = yield call(() =>
      axios
        .all([
          axiosConfig.get(`/fiat/map?CMC_PRO_API_KEY=${apiKey}`),
          axiosConfig.get(`/cryptocurrency/map?CMC_PRO_API_KEY=${apiKey}`)
        ])
        .then(data => data.map(({ data: { data } }) => data))
    );
    yield put({ type: FETCH_CURRENCIES_SUCCESS, data });
  } catch (error) {
    yield put({ type: FETCH_CURRENCIES_FAILURE, error });
  }
}

function* getCurrencyConvert({ id, symbol, amount }) {
  try {
    const data = yield call(() =>
      axiosConfig
        .get(
          // `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?CMC_PRO_API_KEY=711e907c-a7d7-46a5-917c-5dc0f72fce75&id=${id}&amount=${amount}&convert=${symbol}`
          `/tools/price-conversion?CMC_PRO_API_KEY=${apiKey}&id=${id}&amount=${amount}&convert=${symbol}`
        )
        .then(({ data: { data } }) => {
          return {
            fromData: {
              id: id,
              amount: amount
            },
            toData: {
              symbol: symbol,
              price: data.quote[symbol].price
            }
          };
        })
    );
    yield put({ type: CURRENCY_CONVERT_SUCCESS, data });
  } catch (error) {
    yield put({ type: CURRENCY_CONVERT_FAILURE, error });
  }
}

export default function* watcherCurrency() {
  yield takeLatest(FETCH_CURRENCIES_START, getCurrencies);
  yield takeLatest(CURRENCY_CONVERT_START, getCurrencyConvert);
}
