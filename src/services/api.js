import axios from 'axios';

// Configurable API Base URL via Vite environment variables
// Falls back to http://localhost:5000/api if VITE_API_BASE_URL is not set
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 10000
});

// Request Interceptor: Attach Auth Token if present
apiClient.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem('wastechain_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (e) {
        // Ignore parse error
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle HTTP Errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized session expiration if needed
      console.warn('Unauthorized request - session may have expired.');
    }
    return Promise.reject(error.response?.data || error.message || error);
  }
);

export default apiClient;
