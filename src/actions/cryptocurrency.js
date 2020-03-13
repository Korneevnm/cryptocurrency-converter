import axios from 'axios';

const cryptocurrencyLoaded = cryptocurrency => {
  return {
    type: 'FETCH_CRYPTOCURRENCY_SUCCESS',
    payload: cryptocurrency
  };
};

const cryptocurrencyError = error => {
  return {
    type: 'FETCH_CRYPTOCURRENCY_FAILURE',
    payload: error
  };
};

const fetchCryptocurrency = (
  id = 1,
  amount = 1,
  currency = 'USD'
) => async dispatch => {
  await axios
    .get(
      // `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=684c8a70-c11a-4fa6-b159-ad8e159ff06a&limit=2500`
      `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?CMC_PRO_API_KEY=684c8a70-c11a-4fa6-b159-ad8e159ff06a&id=${id}&amount=${amount}&convert=${currency}`
    )
    .then(({ data: { data } }) => {
      dispatch(
        cryptocurrencyLoaded({
          id: data.id,
          amount: data.amount,
          price: data.quote[currency].price
        })
      );
    })
    .catch(err => dispatch(cryptocurrencyError(err)));
};

export default fetchCryptocurrency;
