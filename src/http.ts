import Vue from 'vue';
import axios from 'axios';
import Store from '@/store';

const baseURL = process.env.VUE_APP_API_URI;

const instance = axios.create({
  baseURL,
  // timeout: 90 * 1000,
  headers: {
    'Content-Type': 'application/json, multipart/form-data, application/x-www-form-urlencoded',
    // 'access-control-allow-headers': '*',
    // 'access-control-allow-methods': 'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS',
    // 'access-control-allow-origin': '*',
    // 'access-control-expose-headers': '*',
  },
});

const currentExecutingRequests: any = {};

// Add a request interceptor
instance.interceptors.request.use(
  (config: any) => {
    // Do something before request is sent
    const newConfig: any = config;

    const cancelUniqId = (newConfig.cancelToken as unknown) as string;

    if (Object.hasOwnProperty.call(currentExecutingRequests, cancelUniqId)) {
      const source = currentExecutingRequests[cancelUniqId];
      delete currentExecutingRequests[cancelUniqId];
      source.cancel('Aborted!');
    }

    if (cancelUniqId) {
      const { CancelToken } = axios;
      const source = CancelToken.source();
      newConfig.cancelToken = source.token;
      currentExecutingRequests[cancelUniqId] = source;
    }

    return newConfig;
  },
  (error) => Promise.reject(error),
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(currentExecutingRequests)) {
      if (currentExecutingRequests[key].token === response.config.cancelToken) {
        delete currentExecutingRequests[key];
        break;
      }
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // response.headers = {
    //   ...response.headers,
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS, PATCH',
    //   'Access-Control-Allow-Credentials': 'true',
    //   'Access-Control-Allow-Headers': '*',
    //   'Access-Control-Expose-Headers': '*',
    // }

    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (!error.response && currentExecutingRequests.length > 0) {
      Vue.swal({
        icon: 'error',
        title: 'Server Error',
        html: error,
      });
    }

    return Promise.reject(error);
  },
);

export default instance;
