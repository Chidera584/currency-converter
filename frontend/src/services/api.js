import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Currency conversion API
export const convertCurrency = async (from, to, amount) => {
  try {
    const response = await api.get('/convert', {
      params: { from, to, amount },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to convert currency');
  }
};

// Get available currencies
export const getCurrencies = async () => {
  try {
    const response = await api.get('/currencies');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch currencies');
  }
};

// Get exchange rates for a base currency
export const getExchangeRates = async (baseCurrency) => {
  try {
    const response = await api.get(`/rates/${baseCurrency}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch exchange rates');
  }
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend server is not responding');
  }
};

export default api;

