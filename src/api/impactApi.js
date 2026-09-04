import apiClient, { USE_MOCK_API } from './apiClient';
import mockAdapter from '../mocks/mockAdapter';

export const impactApi = {
  async getImpactMetrics() {
    if (USE_MOCK_API) {
      return await mockAdapter.getImpactMetrics();
    }
    try {
      return await apiClient.get('/impact');
    } catch (err) {
      return await mockAdapter.getImpactMetrics();
    }
  },

  async getUserImpact(userId) {
    if (USE_MOCK_API) {
      const user = await mockAdapter.getCurrentUser();
      return {
        recycledKg: user.recycledKg,
        co2AvoidedKg: user.co2AvoidedKg,
        collectionsCount: user.collectionsCount,
        treesEquivalent: (user.co2AvoidedKg / 21.7).toFixed(1)
      };
    }
    try {
      return await apiClient.get(`/impact/user/${userId || 'me'}`);
    } catch (err) {
      const user = await mockAdapter.getCurrentUser();
      return {
        recycledKg: user.recycledKg,
        co2AvoidedKg: user.co2AvoidedKg,
        collectionsCount: user.collectionsCount,
        treesEquivalent: (user.co2AvoidedKg / 21.7).toFixed(1)
      };
    }
  },

  async getCommunityImpact() {
    if (USE_MOCK_API) {
      const data = await mockAdapter.getImpactMetrics();
      return data.sectorParticipation;
    }
    try {
      return await apiClient.get('/impact/community');
    } catch (err) {
      const data = await mockAdapter.getImpactMetrics();
      return data.sectorParticipation;
    }
  },

  async getCollegeImpact(collegeName) {
    if (USE_MOCK_API) {
      return {
        college: collegeName || 'DTU Sustainable Campus',
        rank: 4,
        points: 31200,
        recycledKg: 2190,
        co2SavedKg: 3723
      };
    }
    try {
      return await apiClient.get(`/impact/college/${encodeURIComponent(collegeName || 'DTU')}`);
    } catch (err) {
      return {
        college: collegeName || 'DTU Sustainable Campus',
        rank: 4,
        points: 31200,
        recycledKg: 2190,
        co2SavedKg: 3723
      };
    }
  }
};

export default impactApi;
