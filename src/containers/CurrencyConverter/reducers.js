import produce from 'immer';
import {
  FETCH_CURRENCIES_START,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILURE,
  CURRENCY_CONVERT_START,
  CURRENCY_CONVERT_SUCCESS,
  CURRENCY_CONVERT_FAILURE
} from './constants';

const initialState = {
  currencies: [],
  cryptoCurrencies: [],
  fromData: { id: 1, amount: 1 },
  toData: { symbol: 'USD', price: 0 },
  loading: true,
  error: false
};

const currency = (state = initialState, action) =>
  produce(state, draft => {
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
        draft.toData = action.toData;
        draft.loading = false;
        break;

      case CURRENCY_CONVERT_FAILURE:
        draft.fromData = {};
        draft.toData = {};
        draft.loading = false;
        draft.error = action.error;
        break;

      default:
        return state;
    }
  });

export default currency;
