import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export const axiosInstance = axios.create({
  baseURL: 'https://financialmodelingprep.com/api',
});

export const STOCK_API_KEY = process.env.STOCK_API_KEY;
