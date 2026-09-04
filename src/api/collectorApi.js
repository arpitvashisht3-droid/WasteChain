import apiClient, { USE_MOCK_API } from './apiClient';
import mockAdapter from '../mocks/mockAdapter';
import { createCollectionRequestModel } from '../models';

export const collectorApi = {
  async getCollectorStats() {
    if (USE_MOCK_API) {
      return await mockAdapter.getCollectorStats();
    }
    try {
      return await apiClient.get('/collector/stats');
    } catch (err) {
      return await mockAdapter.getCollectorStats();
    }
  },

  async getNearbyRequests(params = {}) {
    if (USE_MOCK_API) {
      const list = await mockAdapter.getCollectionRequests();
      return list.map(createCollectionRequestModel);
    }
    try {
      const res = await apiClient.get('/collector/nearby', { params });
      return Array.isArray(res) ? res.map(createCollectionRequestModel) : [];
    } catch (err) {
      const list = await mockAdapter.getCollectionRequests();
      return list.map(createCollectionRequestModel);
    }
  },

  async updateStatus(id, status) {
    if (USE_MOCK_API) {
      const updated = await mockAdapter.updateCollectionStatus(id, status);
      return createCollectionRequestModel(updated);
    }
    try {
      const res = await apiClient.patch(`/collector/requests/${id}/status`, { status });
      return createCollectionRequestModel(res);
    } catch (err) {
      const updated = await mockAdapter.updateCollectionStatus(id, status);
      return createCollectionRequestModel(updated);
    }
  },

  async getRouteMap() {
    if (USE_MOCK_API) {
      return await mockAdapter.getCollectorRoute();
    }
    try {
      return await apiClient.get('/collector/route');
    } catch (err) {
      return await mockAdapter.getCollectorRoute();
    }
  }
};

export default collectorApi;
