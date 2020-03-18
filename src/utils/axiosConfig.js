import axios from 'axios';

const cors = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://pro-api.coinmarketcap.com/v1';

const axiosConfig = axios.create({
  baseURL: `${cors}${url}`
});

export const apiKey = '0dfc3175-2e72-4d3c-81bc-bb72416933e6';
export const apiKey2 = '61e96c3a-4935-48aa-81ac-a23e665fc5a2';
export const apiKey3 = '482d902c-cc4c-4e2a-9f32-a4d2fa80e25a';
export default axiosConfig;
