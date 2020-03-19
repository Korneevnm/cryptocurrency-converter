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
    const [
      {
        data: { data: fiat }
      },
      {
        data: { data: crypto }
      }
    ] = yield call(() =>
      axios.all([
        axiosConfig.get(`/fiat/map?CMC_PRO_API_KEY=${apiKey2}`),
        axiosConfig.get(`/cryptocurrency/map?CMC_PRO_API_KEY=${apiKey2}`)
      ])
    );
    yield put({ type: FETCH_CURRENCIES_SUCCESS, fiat, crypto });
  } catch (error) {
    yield put({ type: FETCH_CURRENCIES_FAILURE, error });
  }
}

function* getCurrencyConvert({ fromData, toData }) {
  try {
    const {
      data: { data }
    } = yield call(() =>
      axiosConfig.get(
        `/tools/price-conversion?CMC_PRO_API_KEY=${apiKey3}&id=${fromData.id}&amount=${fromData.amount}&convert=${toData.symbol}`
      )
    );
    const currency = {
      fromData: {
        label: fromData.label,
        symbol: fromData.symbol,
        id: fromData.id,
        amount: fromData.amount
      },
      toData: {
        label: toData.label,
        symbol: toData.symbol,
        id: toData.id,
        amount: fromData.amount,
        price: data.quote[toData.symbol].price
      }
    };
    yield put({ type: CURRENCY_CONVERT_SUCCESS, data: currency });
  } catch (error) {
    yield put({ type: CURRENCY_CONVERT_FAILURE, error });
  }
}

export default function* watcherCurrency() {
  yield takeLatest(FETCH_CURRENCIES_START, getCurrencies);
  yield takeLatest(CURRENCY_CONVERT_START, getCurrencyConvert);
}
