import axios from "axios";

const network = axios.create({
  baseURL: '',
});

network.defaults.headers.common['Content-Type'] = 'application/json';

network.interceptors.request.use(function (config) {
  config?.headers?.Authorization = `Bearer 12`;
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default network;
