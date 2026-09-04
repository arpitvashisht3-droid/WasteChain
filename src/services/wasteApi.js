import apiClient from './api';
import { mockWasteAI } from './mockWasteAI';

export const wasteApi = {
  async scanWasteImage(imageFileOrUrl) {
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
      return res;
    } catch (err) {
      const message = err.response?.data?.error || err.message || 'AI Vision analysis service is not integrated into this backend.';
      throw new Error(message);
    }
  },

  async getCategories() {
    try {
      const res = await apiClient.get('/waste/categories');
      return res;
    } catch (err) {
      return [
        { id: 'plastic', label: 'Plastic (PET / HDPE)', avgValuePerKg: 28, recyclabilityScore: 92 },
        { id: 'e-waste', label: 'Electronics / E-Waste', avgValuePerKg: 140, recyclabilityScore: 85 },
        { id: 'paper', label: 'Paper & Cardboard', avgValuePerKg: 14, recyclabilityScore: 95 },
        { id: 'metal', label: 'Metal & Aluminum', avgValuePerKg: 110, recyclabilityScore: 98 },
        { id: 'glass', label: 'Glass Containers', avgValuePerKg: 18, recyclabilityScore: 90 }
      ];
    }
  }
};

export default wasteApi;
