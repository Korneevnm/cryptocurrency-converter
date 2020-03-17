import {
  FETCH_CURRENCY_LOAD,
  FETCH_CURRENCY_SUCCESS,
  FETCH_CURRENCY_FAILURE
} from './constants';

const currencyLoad = (symbol, id, amount) => {
  return {
    type: FETCH_CURRENCY_LOAD,
    fromData: { symbol, id, amount },
    toData: { symbol, id, amount }
  };
};

const currencyLoaded = () => {
  return {
    type: FETCH_CURRENCY_SUCCESS
  };
};

const currencyError = error => ({
  type: FETCH_CURRENCY_FAILURE,
  error
});

export { currencyLoad, currencyLoaded, currencyError };
