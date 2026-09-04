import apiClient from './api';

const DEFAULT_MOCK_USER = {
  id: 'usr_89201',
  name: 'Atharv Kapoor',
  email: 'atharv@wastechain.org',
  role: 'User',
  greenPoints: 840,
  tier: 'Gold Recycler',
  recycledKg: 42.8,
  co2AvoidedKg: 18.2,
  collectionsCount: 12,
  avatar: 'AK',
  joinedDate: 'August 2026'
};

export const authApi = {
  async login(email, password) {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      return res;
    } catch (err) {
      // Fallback mock user response for development
      return {
        ...DEFAULT_MOCK_USER,
        email: email || DEFAULT_MOCK_USER.email,
        name: email ? email.split('@')[0].replace('.', ' ') : DEFAULT_MOCK_USER.name,
        token: 'mock_jwt_token_98201'
      };
    }
  },

  async register(userData) {
    try {
      const res = await apiClient.post('/auth/register', userData);
      return res;
    } catch (err) {
      return {
        id: `usr_${Math.floor(10000 + Math.random() * 90000)}`,
        name: userData.name || 'New Recycler',
        email: userData.email,
        role: userData.role || 'User',
        greenPoints: 100,
        tier: 'Bronze Recycler',
        recycledKg: 0,
        co2AvoidedKg: 0,
        collectionsCount: 0,
        avatar: userData.name ? userData.name.substring(0, 2).toUpperCase() : 'NR',
        joinedDate: 'Just now',
        token: 'mock_jwt_token_new'
      };
    }
  },

  async getProfile() {
    try {
      const res = await apiClient.get('/auth/profile');
      return res;
    } catch (err) {
      return DEFAULT_MOCK_USER;
    }
  },

  async updateProfile(updatedFields) {
    try {
      const res = await apiClient.put('/auth/profile', updatedFields);
      return res;
    } catch (err) {
      return { ...DEFAULT_MOCK_USER, ...updatedFields };
    }
  },

  async logout() {
    try {
      await apiClient.post('/auth/logout');
    } catch (err) {
      // Ignore
    }
  }
};

export default authApi;
