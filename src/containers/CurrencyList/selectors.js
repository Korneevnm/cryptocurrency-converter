import { createSelector } from 'reselect';

const selectCryptocurrencyList = state => state.cryptocurrencyList;

export const makeSelectCryptocurrencyList = createSelector(
  selectCryptocurrencyList,
  cryptocurrencyList => cryptocurrencyList.cryptocurrency
);

export const makeSelectLoading = createSelector(
  selectCryptocurrencyList,
  cryptocurrencyList => cryptocurrencyList.loading
);
