import produce from 'immer';
import {
  FETCH_CURRENCIES_LOAD,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILURE
} from './constants';

const initialState = {
  currencies: [],
  cryptoCurrencies: [],
  loading: true,
  error: false
};

const currenciesList = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_CURRENCIES_LOAD:
        draft.currencies = state.currencies;
        draft.cryptoCurrencies = state.cryptoCurrencies;
        draft.loading = true;
        draft.error = false;
        break;

      case FETCH_CURRENCIES_SUCCESS:
        draft.currencies = action.data[0];
        draft.cryptoCurrencies = action.data[1];
        draft.loading = false;
        draft.error = false;
        break;

      case FETCH_CURRENCIES_FAILURE:
        draft.currencies = [];
        draft.cryptoCurrencies = [];
        draft.loading = false;
        draft.error = true;
        break;

      default:
        return state;
    }
  });

export default currenciesList;
