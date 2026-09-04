import axios from 'axios';

/**
 * WasteChain Centralized Axios Client
 * Configured via Vite environment variables.
 * Automatically attaches authentication tokens and standardizes response payloads.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false'; // Default to true if not explicitly 'false'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 12000
});

// Request Interceptor: Attach JWT Bearer Token if available in localStorage
apiClient.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem('wastechain_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (e) {
        // Silently ignore corrupted storage item
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Standardize payloads & handle 401 unauthorized
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.error || error.response?.data?.message || error.message;

    if (status === 401) {
      console.warn('[WasteChain API] Unauthorized request - session may have expired.');
    }

    return Promise.reject({
      status: status || 500,
      message: message || 'An unexpected network error occurred.',
      raw: error
    });
  }
);

export default apiClient;
