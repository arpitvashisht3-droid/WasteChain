import apiClient from './api';
import { mockCollectionRequests } from './mockData';

export const collectionApi = {
  async getRequests() {
    try {
      const res = await apiClient.get('/collections');
      return res;
    } catch (err) {
      return [...mockCollectionRequests];
    }
  },

  async createRequest(requestData) {
    try {
      const res = await apiClient.post('/collections', requestData);
      return res;
    } catch (err) {
      const newId = `REQ-${Math.floor(200 + Math.random() * 800)}`;
      const newReq = {
        id: newId,
        passportId: requestData.passportId || `WP-${Math.floor(100000 + Math.random() * 900000)}`,
        title: requestData.title || `${requestData.category} Collection`,
        category: requestData.category,
        weight: requestData.weight || '5.0 kg',
        location: requestData.location,
        lat: 12.9716,
        lng: 77.5946,
        user: 'Atharv Kapoor',
        contact: requestData.contact || '+91 99999 88888',
        status: 'Pending',
        rewardPts: requestData.rewardPts || 150,
        timeAgo: 'Just now'
      };
      mockCollectionRequests.unshift(newReq);
      return newReq;
    }
  },

  async acceptRequest(id) {
    try {
      const res = await apiClient.post(`/collections/${id}/accept`);
      return res;
    } catch (err) {
      const req = mockCollectionRequests.find((r) => r.id === id);
      if (req) {
        req.status = 'Accepted';
        req.collector = 'EcoCollector #12 (You)';
      }
      return req;
    }
  },

  async completeCollection(id, actualWeight) {
    try {
      const res = await apiClient.post(`/collections/${id}/complete`, { actualWeight });
      return res;
    } catch (err) {
      const req = mockCollectionRequests.find((r) => r.id === id);
      if (req) {
        req.status = 'Completed';
        req.actualWeight = actualWeight;
      }
      return req;
    }
  }
};

export default collectionApi;
