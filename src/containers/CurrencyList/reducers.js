import produce from 'immer';
import {
  FETCH_CRYPTOCURRENCYLIST_START,
  FETCH_CRYPTOCURRENCYLIST_SUCCESS,
  FETCH_CRYPTOCURRENCYLIST_FAILURE
} from './constants';

const initialState = {
  cryptocurrency: [],
  loading: true,
  error: null
};

const cryptocurrencyList = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_CRYPTOCURRENCYLIST_START:
        draft.cryptocurrency = [];
        draft.loading = true;
        draft.error = false;
        break;

      case FETCH_CRYPTOCURRENCYLIST_SUCCESS:
        draft.cryptocurrency = action.data;
        draft.loading = false;
        break;

      case FETCH_CRYPTOCURRENCYLIST_FAILURE:
        draft.cryptocurrency = [];
        draft.loading = false;
        draft.error = action.error;
        break;

      default:
        return draft.state;
    }
  });

export default cryptocurrencyList;
