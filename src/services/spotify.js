import axios from 'axios';
import config from '../config';

export default axios.create({
  baseURL: config.API_URL,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
