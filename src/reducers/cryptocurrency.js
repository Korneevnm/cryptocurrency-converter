const cryptocurrency = (state, action) => {
  if (state === undefined) {
    return {
      cryptocurrency: { id: 1, amount: 1, price: 1 },
      loading: true,
      error: null
    };
  }

  switch (action.type) {
    case 'FETCH_CRYPTOCURRENCY_SUCCESS':
      return {
        cryptocurrency: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_CRYPTOCURRENCY_FAILURE':
      return {
        cryptocurrency: {},
        loading: false,
        error: action.payload
      };
    default:
      return state.cryptocurrency;
  }
};

export default cryptocurrency;
