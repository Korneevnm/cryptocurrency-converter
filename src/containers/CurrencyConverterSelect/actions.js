import {
  FETCH_CURRENCIES_LOAD,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILURE
} from './constants';

const currenciesLoad = () => {
  return {
    type: FETCH_CURRENCIES_LOAD
  };
};

const currenciesLoaded = (currencies, cryptoCurrencies) => {
  return {
    type: FETCH_CURRENCIES_SUCCESS,
    currencies,
    cryptoCurrencies
  };
};

const currenciesError = error => {
  return {
    type: FETCH_CURRENCIES_FAILURE,
    error
  };
};

export { currenciesLoad, currenciesLoaded, currenciesError };
