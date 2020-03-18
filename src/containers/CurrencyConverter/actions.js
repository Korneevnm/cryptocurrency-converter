import {
  FETCH_CURRENCIES_START,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILURE,
  CURRENCY_CONVERT_START,
  CURRENCY_CONVERT_SUCCESS,
  CURRENCY_CONVERT_FAILURE,
  CURRENCY_CONVERT_SWAP
} from './constants';

const currenciesLoad = () => ({
  type: FETCH_CURRENCIES_START
});

const currenciesLoaded = (currencies, cryptoCurrencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  currencies,
  cryptoCurrencies
});

const currenciesError = error => ({
  type: FETCH_CURRENCIES_FAILURE,
  error
});

const currencyLoad = (fromData, toData) => ({
  type: CURRENCY_CONVERT_START,
  fromData: fromData,
  toData: toData
});

const currencyLoaded = toData => ({
  type: CURRENCY_CONVERT_SUCCESS,
  toData
});

const currencyError = error => ({
  type: CURRENCY_CONVERT_FAILURE,
  error
});

const currencySwap = (currencyFromData, currencyToData) => ({
  type: CURRENCY_CONVERT_SWAP,
  currencyFromData,
  currencyToData
});

export {
  currenciesLoad,
  currenciesLoaded,
  currenciesError,
  currencyLoad,
  currencyLoaded,
  currencyError,
  currencySwap
};
