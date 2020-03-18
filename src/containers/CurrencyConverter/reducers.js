import produce from 'immer';
import {
  FETCH_CURRENCIES_START,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILURE,
  CURRENCY_CONVERT_START,
  CURRENCY_CONVERT_SUCCESS,
  CURRENCY_CONVERT_FAILURE,
  CURRENCY_CONVERT_SWAP
} from './constants';

const initialState = {
  currencies: [],
  cryptoCurrencies: [],
  fromData: { symbol: 'BTC', id: 1, amount: 1 },
  toData: { symbol: 'USD', id: 2781, amount: 1, price: 0 },
  loading: true,
  error: false
};

const currency = (state = initialState, action) =>
  produce(state, draft => {
    console.log(action);
    switch (action.type) {
      case FETCH_CURRENCIES_START:
        draft.currencies = state.currencies;
        draft.cryptoCurrencies = state.cryptoCurrencies;
        draft.toData = state.toData;
        draft.loading = true;
        draft.error = false;
        break;

      case FETCH_CURRENCIES_SUCCESS:
        draft.currencies = action.data[0];
        draft.cryptoCurrencies = action.data[1];
        draft.loading = false;
        break;

      case FETCH_CURRENCIES_FAILURE:
        draft.currencies = [];
        draft.cryptoCurrencies = [];
        draft.loading = false;
        draft.error = action.error;
        break;

      case CURRENCY_CONVERT_START:
        draft.fromData = state.fromData;
        draft.toData = state.toData;
        draft.loading = true;
        draft.error = false;
        break;

      case CURRENCY_CONVERT_SUCCESS:
        draft.fromData = action.data.fromData;
        draft.toData = action.data.toData;
        draft.loading = false;
        break;

      case CURRENCY_CONVERT_FAILURE:
        draft.fromData = {};
        draft.toData = {};
        draft.loading = false;
        draft.error = action.error;
        break;

      case CURRENCY_CONVERT_SWAP:
        draft.fromData = action.currencyToData;
        draft.toData = action.currencyFromData;
        draft.loading = false;
        break;

      default:
        return state;
    }
  });

export default currency;
