import axios from 'axios';
import SnackbarCell from '../components/snack-bar/snack-bar';
import { ApiUrls } from '../config/api-urls';
import checkNetwork from './utils/check-network';
import handleError from './utils/handle-error';

const instance = axios.create({
  baseURL: ApiUrls.dev.BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 4000,
});

instance.interceptors.request.use(async function (config) {
  if (!(await checkNetwork()).isConnected) {
    SnackbarCell('Check your internet!');
  }
  return config;
});

instance.interceptors.response.use(
  response => response,
  ({ message, response }) => {
    return handleError({ response, message });
  },
);

export default instance;
