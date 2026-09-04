import apiClient, { USE_MOCK_API } from './apiClient';
import mockAdapter from '../mocks/mockAdapter';
import { createHotspotModel } from '../models';

export const hotspotApi = {
  async getHotspots() {
    if (USE_MOCK_API) {
      const list = await mockAdapter.getHotspots();
      return list.map(createHotspotModel);
    }
    try {
      const res = await apiClient.get('/hotspots');
      return Array.isArray(res) ? res.map(createHotspotModel) : [];
    } catch (err) {
      const list = await mockAdapter.getHotspots();
      return list.map(createHotspotModel);
    }
  },

  async getHotspotById(id) {
    if (USE_MOCK_API) {
      const list = await mockAdapter.getHotspots();
      const spot = list.find((h) => h.id === id) || list[0];
      return createHotspotModel(spot);
    }
    try {
      const res = await apiClient.get(`/hotspots/${id}`);
      return createHotspotModel(res);
    } catch (err) {
      const list = await mockAdapter.getHotspots();
      const spot = list.find((h) => h.id === id) || list[0];
      return createHotspotModel(spot);
    }
  },

  async predictHotspotTrends(id) {
    if (USE_MOCK_API) {
      const list = await mockAdapter.getHotspots();
      const spot = list.find((h) => h.id === id) || list[0];
      return spot.ai;
    }
    try {
      return await apiClient.get(`/hotspots/${id}/prediction`);
    } catch (err) {
      const list = await mockAdapter.getHotspots();
      const spot = list.find((h) => h.id === id) || list[0];
      return spot.ai;
    }
  }
};

export default hotspotApi;
