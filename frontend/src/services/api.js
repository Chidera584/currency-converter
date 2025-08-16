import axios from 'axios';

// Determine API base URL
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (process.env.NODE_ENV === 'production'
    ? '/api' // use relative path in production (works with your server)
    : 'http://localhost:5000/api'); // local development

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: { 'Content-Type': 'application/json' },
});

// -------------------- INTERCEPTORS --------------------

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error.message);
    return Promise.reject(error);
  }
);

// Response interceptor for logging & errors
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(
      '❌ API Response Error:',
      error.response?.status,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

// -------------------- API FUNCTIONS --------------------

// Convert currency
export const convertCurrency = async (from, to, amount) => {
  try {
    const response = await api.get('/convert', { params: { from, to, amount } });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Failed to convert currency');
  }
};

// Get available currencies
export const getCurrencies = async () => {
  try {
    const response = await api.get('/currencies');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Failed to fetch currencies');
  }
};

// Get exchange rates for a base currency
export const getExchangeRates = async (baseCurrency) => {
  try {
    const response = await api.get(`/rates/${baseCurrency}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Failed to fetch exchange rates');
  }
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message || 'Backend server is not responding');
  }
};

export default api;
