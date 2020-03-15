import produce from 'immer';
import {
  FETCH_CURRENCY_LOAD,
  FETCH_CURRENCY_SUCCESS,
  FETCH_CURRENCY_FAILURE
} from './constants';

const initialState = {
  data: { symbol: 'USD', id: 1, amount: 1, price: 0 },
  loading: true,
  error: false
};

const currency = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_CURRENCY_LOAD:
        draft.data = state.data;
        draft.loading = true;
        draft.error = false;
        break;

      case FETCH_CURRENCY_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        draft.error = false;
        break;

      case FETCH_CURRENCY_FAILURE:
        draft.data = {};
        draft.loading = false;
        draft.error = true;
        break;

      default:
        return state;
    }
  });

export default currency;
