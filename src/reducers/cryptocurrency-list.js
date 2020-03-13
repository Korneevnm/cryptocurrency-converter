const cryptocurrencyList = (state, action) => {
  if (state === undefined) {
    return {
      cryptocurrency: [],
      loading: true,
      error: null
    };
  }

  switch (action.type) {
    case 'FETCH_CRYPTOCURRENCYLIST_SUCCESS':
      return {
        cryptocurrency: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_CRYPTOCURRENCYLIST_FAILURE':
      return {
        cryptocurrency: [],
        loading: false,
        error: action.payload
      };
    default:
      return state.cryptocurrencyList;
  }
};

export default cryptocurrencyList;
