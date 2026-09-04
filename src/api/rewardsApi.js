import apiClient, { USE_MOCK_API } from './apiClient';
import mockAdapter from '../mocks/mockAdapter';

export const rewardsApi = {
  async getGreenPoints(userId) {
    if (USE_MOCK_API) {
      const user = await mockAdapter.getCurrentUser();
      return { greenPoints: user.greenPoints, tier: user.tier };
    }
    try {
      return await apiClient.get(`/rewards/points/${userId || 'me'}`);
    } catch (err) {
      const user = await mockAdapter.getCurrentUser();
      return { greenPoints: user.greenPoints, tier: user.tier };
    }
  },

  async getLeaderboard() {
    if (USE_MOCK_API) {
      return await mockAdapter.getLeaderboard();
    }
    try {
      const res = await apiClient.get('/leaderboard');
      return Array.isArray(res) ? res : [];
    } catch (err) {
      return await mockAdapter.getLeaderboard();
    }
  },

  async getChallenges() {
    if (USE_MOCK_API) {
      return await mockAdapter.getChallenges();
    }
    try {
      const res = await apiClient.get('/challenges');
      return Array.isArray(res) ? res : [];
    } catch (err) {
      return await mockAdapter.getChallenges();
    }
  },

  async joinChallenge(id) {
    if (USE_MOCK_API) {
      return await mockAdapter.joinChallenge(id);
    }
    try {
      return await apiClient.post(`/challenges/${id}/join`);
    } catch (err) {
      return await mockAdapter.joinChallenge(id);
    }
  },

  async getUserRewards() {
    if (USE_MOCK_API) {
      return {
        pointsBalance: 840,
        tier: 'Gold Recycler',
        lifetimePoints: 1240,
        pointsRedeemed: 400,
        activeBadges: ['Plastic Champion', '100kg Milestone', 'Campus Hero']
      };
    }
    try {
      return await apiClient.get('/rewards/summary');
    } catch (err) {
      return {
        pointsBalance: 840,
        tier: 'Gold Recycler',
        lifetimePoints: 1240,
        pointsRedeemed: 400,
        activeBadges: ['Plastic Champion', '100kg Milestone', 'Campus Hero']
      };
    }
  }
};

export default rewardsApi;
