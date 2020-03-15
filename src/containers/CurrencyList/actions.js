import {
  FETCH_CRYPTOCURRENCYLIST_LOAD,
  FETCH_CRYPTOCURRENCYLIST_SUCCESS,
  FETCH_CRYPTOCURRENCYLIST_FAILURE
} from './constants';

const cryptocurrencyListLoad = () => {
  return {
    type: FETCH_CRYPTOCURRENCYLIST_LOAD
  };
};

const cryptocurrencyListLoaded = cryptocurrency => {
  return {
    type: FETCH_CRYPTOCURRENCYLIST_SUCCESS,
    cryptocurrency
  };
};

const cryptocurrencyListError = error => {
  return {
    type: FETCH_CRYPTOCURRENCYLIST_FAILURE,
    error
  };
};

export {
  cryptocurrencyListLoad,
  cryptocurrencyListLoaded,
  cryptocurrencyListError
};
