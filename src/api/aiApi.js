import apiClient, { USE_MOCK_API } from './apiClient';
import mockAdapter from '../mocks/mockAdapter';
import { createWasteAnalysisModel } from '../models';

export const aiApi = {
  async analyzeWasteImage(imageFileOrUrl) {
    try {
      const formData = new FormData();
      if (imageFileOrUrl instanceof File) {
        formData.append('image', imageFileOrUrl);
      } else {
        formData.append('imageUrl', imageFileOrUrl);
      }

      const res = await apiClient.post('/ai/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return {
        ...res,
        analysis: createWasteAnalysisModel(res.analysis || res)
      };
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'AI Vision analysis service request failed.';
      throw new Error(message);
    }
  },

  async getReuseSuggestion(itemData = {}) {
    if (USE_MOCK_API) {
      return {
        category: itemData.category || 'Furniture',
        condition: itemData.condition || 'Like New',
        suggestedPrice: itemData.price || 900,
        reusePotential: 'High (96% Market Demand Index)',
        co2SavedKg: '15.2 kg'
      };
    }
    try {
      return await apiClient.post('/ai/reuse-suggestion', itemData);
    } catch (err) {
      return {
        category: itemData.category || 'Furniture',
        condition: itemData.condition || 'Like New',
        suggestedPrice: itemData.price || 900,
        reusePotential: 'High (96% Market Demand Index)',
        co2SavedKg: '15.2 kg'
      };
    }
  },

  async getPriceSuggestion(itemData = {}) {
    if (USE_MOCK_API) {
      return {
        suggestedPrice: 900,
        range: [750, 1100],
        confidenceScore: 0.94
      };
    }
    try {
      return await apiClient.post('/ai/price-suggestion', itemData);
    } catch (err) {
      return {
        suggestedPrice: 900,
        range: [750, 1100],
        confidenceScore: 0.94
      };
    }
  },

  async predictHotspots() {
    if (USE_MOCK_API) {
      return await mockAdapter.getHotspots();
    }
    try {
      return await apiClient.post('/ai/hotspots/predict');
    } catch (err) {
      return await mockAdapter.getHotspots();
    }
  }
};

export default aiApi;
