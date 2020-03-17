import axios from 'axios';

const instanse = axios.create({
  baseURL:
    'https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1'
});

export const apiKey = '0dfc3175-2e72-4d3c-81bc-bb72416933e6';
export default instanse;
