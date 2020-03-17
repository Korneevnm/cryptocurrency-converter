import { createSelector } from 'reselect';

const selectCurrency = state => state.currency;

export const makeSelectCurrencyFromData = createSelector(
  selectCurrency,
  currency => currency.fromData
);

export const makeSelectCurrencyToData = createSelector(
  selectCurrency,
  currency => currency.toData
);

export const makeSelectCurrenciesList = createSelector(
  selectCurrency,
  currency => currency.currencies
);

export const makeSelectCryptoCurrenciesList = createSelector(
  selectCurrency,
  currency => currency.cryptoCurrencies
);

export const makeSelectCurrencyLoading = createSelector(
  selectCurrency,
  currency => currency.loading
);
