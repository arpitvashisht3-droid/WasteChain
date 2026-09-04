import apiClient, { USE_MOCK_API } from './apiClient';
import mockAdapter from '../mocks/mockAdapter';
import { createUserModel } from '../models';

export const authApi = {
  async login(email, password) {
    if (USE_MOCK_API) {
      const data = await mockAdapter.login(email, password);
      return createUserModel(data);
    }
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      return createUserModel(res);
    } catch (err) {
      console.warn('[authApi.login] API failed, falling back to mock provider:', err.message);
      const data = await mockAdapter.login(email, password);
      return createUserModel(data);
    }
  },

  async register(userData) {
    if (USE_MOCK_API) {
      const data = await mockAdapter.register(userData);
      return createUserModel(data);
    }
    try {
      const res = await apiClient.post('/auth/register', userData);
      return createUserModel(res);
    } catch (err) {
      console.warn('[authApi.register] API failed, falling back to mock provider:', err.message);
      const data = await mockAdapter.register(userData);
      return createUserModel(data);
    }
  },

  async getCurrentUser() {
    if (USE_MOCK_API) {
      const data = await mockAdapter.getCurrentUser();
      return createUserModel(data);
    }
    try {
      const res = await apiClient.get('/auth/me');
      return createUserModel(res);
    } catch (err) {
      const data = await mockAdapter.getCurrentUser();
      return createUserModel(data);
    }
  },

  async updateProfile(updatedFields) {
    if (USE_MOCK_API) {
      const data = await mockAdapter.updateProfile(updatedFields);
      return createUserModel(data);
    }
    try {
      const res = await apiClient.put('/auth/profile', updatedFields);
      return createUserModel(res);
    } catch (err) {
      console.warn('[authApi.updateProfile] API failed, using fallback:', err.message);
      const data = await mockAdapter.updateProfile(updatedFields);
      return createUserModel(data);
    }
  },

  async logout() {
    if (USE_MOCK_API) {
      localStorage.removeItem('wastechain_user');
      return { success: true };
    }
    try {
      await apiClient.post('/auth/logout');
    } catch (err) {
      // Silently ignore
    } finally {
      localStorage.removeItem('wastechain_user');
    }
    return { success: true };
  }
};

export default authApi;
