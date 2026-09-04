import apiClient from './api';
import { mockLeaderboard, mockImpactMetrics } from './mockData';

const mockChallenges = [
  {
    id: 'CH-201',
    title: 'Plastic-Free Week',
    category: 'Plastic',
    targetKg: 1000,
    currentProgressKg: 750,
    unit: 'kg Plastic',
    rewardPts: 1000,
    badge: 'Plastic Champion',
    daysLeft: '3 days left'
  },
  {
    id: 'CH-202',
    title: 'E-Waste Drive',
    category: 'E-Waste',
    targetKg: 100,
    currentProgressKg: 68,
    unit: 'kg E-Waste',
    rewardPts: 1500,
    badge: 'Tech Recycler',
    daysLeft: '8 days left'
  },
  {
    id: 'CH-203',
    title: 'Paper Recovery Challenge',
    category: 'Paper',
    targetKg: 500,
    currentProgressKg: 460,
    unit: 'kg Paper',
    rewardPts: 800,
    badge: 'Paper Saver',
    daysLeft: '1 day left'
  }
];

export const leaderboardApi = {
  async getLeaderboard() {
    try {
      const res = await apiClient.get('/leaderboard');
      return res;
    } catch (err) {
      return [...mockLeaderboard];
    }
  },

  async getImpactMetrics() {
    try {
      const res = await apiClient.get('/impact');
      return res;
    } catch (err) {
      return { ...mockImpactMetrics };
    }
  },

  async getChallenges() {
    try {
      const res = await apiClient.get('/challenges');
      return res;
    } catch (err) {
      return [...mockChallenges];
    }
  },

  async joinChallenge(id) {
    try {
      const res = await apiClient.post(`/challenges/${id}/join`);
      return res;
    } catch (err) {
      return { success: true, challengeId: id, joinedAt: new Date().toISOString() };
    }
  }
};

export default leaderboardApi;
