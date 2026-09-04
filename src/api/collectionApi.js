import apiClient, { USE_MOCK_API } from './apiClient';
import mockAdapter from '../mocks/mockAdapter';
import { createCollectionRequestModel } from '../models';

export const collectionApi = {
  async getNearbyRequests(params = {}) {
    if (USE_MOCK_API) {
      const list = await mockAdapter.getCollectionRequests();
      return list.map(createCollectionRequestModel);
    }
    try {
      const res = await apiClient.get('/collections/nearby', { params });
      return Array.isArray(res) ? res.map(createCollectionRequestModel) : [];
    } catch (err) {
      const list = await mockAdapter.getCollectionRequests();
      return list.map(createCollectionRequestModel);
    }
  },

  async getCollections(filter = {}) {
    if (USE_MOCK_API) {
      const list = await mockAdapter.getCollectionRequests();
      return list.map(createCollectionRequestModel);
    }
    try {
      const res = await apiClient.get('/collections', { params: filter });
      return Array.isArray(res) ? res.map(createCollectionRequestModel) : [];
    } catch (err) {
      const list = await mockAdapter.getCollectionRequests();
      return list.map(createCollectionRequestModel);
    }
  },

  async createCollectionRequest(requestData) {
    if (USE_MOCK_API) {
      const res = await mockAdapter.createCollectionRequest(requestData);
      return createCollectionRequestModel(res);
    }
    try {
      const res = await apiClient.post('/collections', requestData);
      return createCollectionRequestModel(res);
    } catch (err) {
      const res = await mockAdapter.createCollectionRequest(requestData);
      return createCollectionRequestModel(res);
    }
  },

  async acceptCollection(id) {
    if (USE_MOCK_API) {
      const res = await mockAdapter.acceptCollection(id);
      return createCollectionRequestModel(res);
    }
    try {
      const res = await apiClient.post(`/collections/${id}/accept`);
      return createCollectionRequestModel(res);
    } catch (err) {
      const res = await mockAdapter.acceptCollection(id);
      return createCollectionRequestModel(res);
    }
  },

  async updateCollectionStatus(id, status) {
    if (USE_MOCK_API) {
      const res = await mockAdapter.updateCollectionStatus(id, status);
      return createCollectionRequestModel(res);
    }
    try {
      const res = await apiClient.patch(`/collections/${id}/status`, { status });
      return createCollectionRequestModel(res);
    } catch (err) {
      const res = await mockAdapter.updateCollectionStatus(id, status);
      return createCollectionRequestModel(res);
    }
  },

  async verifyCollection(id, verificationData = {}) {
    if (USE_MOCK_API) {
      const res = await mockAdapter.completeCollection(id, verificationData.actualWeight);
      return {
        success: true,
        collection: createCollectionRequestModel(res),
        verifiedAt: new Date().toISOString()
      };
    }
    try {
      const res = await apiClient.post(`/collections/${id}/verify`, verificationData);
      return res;
    } catch (err) {
      const res = await mockAdapter.completeCollection(id, verificationData.actualWeight);
      return {
        success: true,
        collection: createCollectionRequestModel(res),
        verifiedAt: new Date().toISOString()
      };
    }
  },

  async getCollectionHistory() {
    if (USE_MOCK_API) {
      const list = await mockAdapter.getCollectionRequests();
      return list.filter((r) => r.status === 'Completed').map(createCollectionRequestModel);
    }
    try {
      const res = await apiClient.get('/collections/history');
      return Array.isArray(res) ? res.map(createCollectionRequestModel) : [];
    } catch (err) {
      const list = await mockAdapter.getCollectionRequests();
      return list.filter((r) => r.status === 'Completed').map(createCollectionRequestModel);
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

export default collectionApi;
