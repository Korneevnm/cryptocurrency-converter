import {
  FETCH_CRYPTOCURRENCYLIST_START,
  FETCH_CRYPTOCURRENCYLIST_SUCCESS,
  FETCH_CRYPTOCURRENCYLIST_FAILURE
} from './constants';

const cryptocurrencyListLoad = () => ({
  type: FETCH_CRYPTOCURRENCYLIST_START
});

const cryptocurrencyListLoaded = cryptocurrency => ({
  type: FETCH_CRYPTOCURRENCYLIST_SUCCESS,
  cryptocurrency
});

const cryptocurrencyListError = error => ({
  type: FETCH_CRYPTOCURRENCYLIST_FAILURE,
  error
});

export {
  cryptocurrencyListLoad,
  cryptocurrencyListLoaded,
  cryptocurrencyListError
};
