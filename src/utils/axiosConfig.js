import axios from 'axios';

const cors = 'https://cors-anywhere.herokuapp.com/';
const url = 'https://pro-api.coinmarketcap.com/v1';

const axiosConfig = axios.create({
  baseURL: `${cors}${url}`
});

export const apiKey = '3db9eb8c-c320-4966-8516-1e84cd34b48e';
export const apiKey2 = '61e96c3a-4935-48aa-81ac-a23e665fc5a2';
export const apiKey3 = '482d902c-cc4c-4e2a-9f32-a4d2fa80e25a';
export default axiosConfig;
