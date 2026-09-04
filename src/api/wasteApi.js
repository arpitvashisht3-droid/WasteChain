import apiClient, { USE_MOCK_API } from './apiClient';
import mockAdapter from '../mocks/mockAdapter';
import { createWasteAnalysisModel } from '../models';

export const wasteApi = {
  async analyzeWaste(imageFileOrUrl) {
    if (USE_MOCK_API) {
      const res = await mockAdapter.analyzeWaste(imageFileOrUrl);
      return {
        ...res,
        analysis: createWasteAnalysisModel(res.analysis)
      };
    }
    try {
      const formData = new FormData();
      if (imageFileOrUrl instanceof File) {
        formData.append('image', imageFileOrUrl);
      } else {
        formData.append('imageUrl', imageFileOrUrl);
      }

      const res = await apiClient.post('/waste/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return {
        ...res,
        analysis: createWasteAnalysisModel(res.analysis || res)
      };
    } catch (err) {
      console.warn('[wasteApi.analyzeWaste] API error, using mock vision analyzer:', err.message);
      const res = await mockAdapter.analyzeWaste(imageFileOrUrl);
      return {
        ...res,
        analysis: createWasteAnalysisModel(res.analysis)
      };
    }
  },

  async createWasteRequest(wasteData) {
    if (USE_MOCK_API) {
      return await mockAdapter.createCollectionRequest(wasteData);
    }
    try {
      return await apiClient.post('/waste', wasteData);
    } catch (err) {
      return await mockAdapter.createCollectionRequest(wasteData);
    }
  },

  async getWasteRequests() {
    if (USE_MOCK_API) {
      return await mockAdapter.getCollectionRequests();
    }
    try {
      return await apiClient.get('/waste');
    } catch (err) {
      return await mockAdapter.getCollectionRequests();
    }
  },

  async getWasteRequestById(id) {
    if (USE_MOCK_API) {
      const list = await mockAdapter.getCollectionRequests();
      return list.find((r) => r.id === id) || list[0];
    }
    try {
      return await apiClient.get(`/waste/${id}`);
    } catch (err) {
      const list = await mockAdapter.getCollectionRequests();
      return list.find((r) => r.id === id) || list[0];
    }
  },

  async updateWasteRequest(id, updateData) {
    if (USE_MOCK_API) {
      return await mockAdapter.updateCollectionStatus(id, updateData.status);
    }
    try {
      return await apiClient.patch(`/waste/${id}`, updateData);
    } catch (err) {
      return await mockAdapter.updateCollectionStatus(id, updateData.status);
    }
  },

  async deleteWasteRequest(id) {
    if (USE_MOCK_API) {
      return { success: true, id };
    }
    try {
      return await apiClient.delete(`/waste/${id}`);
    } catch (err) {
      return { success: true, id };
    }
  },

  async getCategories() {
    if (USE_MOCK_API) {
      return await mockAdapter.getCategories();
    }
    try {
      return await apiClient.get('/waste/categories');
    } catch (err) {
      return await mockAdapter.getCategories();
    }
  }
};

export default wasteApi;
