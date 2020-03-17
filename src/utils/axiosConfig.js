import axios from 'axios';

const cors = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://pro-api.coinmarketcap.com/v1';

const instanse = axios.create({
  baseURL: `${cors}${url}`
});

export const apiKey = '0dfc3175-2e72-4d3c-81bc-bb72416933e6';
export default instanse;
