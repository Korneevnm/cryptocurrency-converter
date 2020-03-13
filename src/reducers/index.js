import cryptocurrencyList from './cryptocurrency-list';
import cryptocurrency from './cryptocurrency';

const reducer = (state, action) => {
  return {
    cryptocurrencyList: cryptocurrencyList(state, action),
    cryptocurrency: cryptocurrency(state, action)
  };
};

export default reducer;
