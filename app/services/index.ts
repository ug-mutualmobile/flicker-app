import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import handleError from './utils/handle-error';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 4000,
});

instance.interceptors.response.use(
  response => response,
  ({ message, response }) => {
    return handleError({ response, message });
  },
);

export default instance;
