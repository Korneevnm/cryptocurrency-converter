import axios from 'axios';

const cryptocurrencyListLoaded = cryptocurrency => {
  return {
    type: 'FETCH_CRYPTOCURRENCYLIST_SUCCESS',
    payload: cryptocurrency
  };
};

const cryptocurrencyListError = error => {
  return {
    type: 'FETCH_CRYPTOCURRENCYLIST_FAILURE',
    payload: error
  };
};

const fetchCryptocurrencyList = () => async dispatch => {
  await axios
    .get(
      // `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=684c8a70-c11a-4fa6-b159-ad8e159ff06a&limit=2500`
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=684c8a70-c11a-4fa6-b159-ad8e159ff06a&limit=100`
    )
    .then(response => dispatch(cryptocurrencyListLoaded(response.data.data)))
    .catch(err => dispatch(cryptocurrencyListError(err)));
};

export default fetchCryptocurrencyList;
