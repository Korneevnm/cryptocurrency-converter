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
import axiosConfig, { apiKey2, apiKey3 } from '../../utils/axiosConfig';

function* getCurrencies() {
  try {
    const data = yield call(() =>
      axios
        .all([
          axiosConfig.get(`/fiat/map?CMC_PRO_API_KEY=${apiKey2}`),
          axiosConfig.get(`/cryptocurrency/map?CMC_PRO_API_KEY=${apiKey2}`)
        ])
        .then(data => data.map(({ data: { data } }) => data))
    );
    yield put({ type: FETCH_CURRENCIES_SUCCESS, data });
  } catch (error) {
    yield put({ type: FETCH_CURRENCIES_FAILURE, error });
  }
}

function* getCurrencyConvert({ fromData, toData }) {
  try {
    console.log(fromData);
    const data = yield call(() =>
      axiosConfig
        .get(
          `/tools/price-conversion?CMC_PRO_API_KEY=${apiKey3}&id=${fromData.id}&amount=${fromData.amount}&convert=${toData.symbol}`
        )
        .then(({ data: { data } }) => {
          return {
            fromData: {
              symbol: fromData.symbol,
              id: fromData.id,
              amount: fromData.amount
            },
            toData: {
              symbol: toData.symbol,
              id: toData.id,
              amount: fromData.amount,
              price: data.quote[toData.symbol].price
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
