import apiClient, { USE_MOCK_API } from './apiClient';
import mockAdapter from '../mocks/mockAdapter';
import { createWastePassportModel } from '../models';

export const passportApi = {
  async getPassports(filter = {}) {
    if (USE_MOCK_API) {
      const list = await mockAdapter.getPassports();
      return list.map(createWastePassportModel);
    }
    try {
      const res = await apiClient.get('/passports', { params: filter });
      return Array.isArray(res) ? res.map(createWastePassportModel) : [];
    } catch (err) {
      const list = await mockAdapter.getPassports();
      return list.map(createWastePassportModel);
    }
  },

  async getPassportById(id) {
    if (USE_MOCK_API) {
      const p = await mockAdapter.getPassportById(id);
      return createWastePassportModel(p);
    }
    try {
      const res = await apiClient.get(`/passports/${id}`);
      return createWastePassportModel(res);
    } catch (err) {
      const p = await mockAdapter.getPassportById(id);
      return createWastePassportModel(p);
    }
  },

  async createPassport(passportData) {
    if (USE_MOCK_API) {
      const created = await mockAdapter.createPassport(passportData);
      return createWastePassportModel(created);
    }
    try {
      const res = await apiClient.post('/passports', passportData);
      return createWastePassportModel(res);
    } catch (err) {
      const created = await mockAdapter.createPassport(passportData);
      return createWastePassportModel(created);
    }
  },

  async verifyPassportQR(qrData) {
    if (USE_MOCK_API) {
      return await mockAdapter.verifyPassportQR(qrData);
    }
    try {
      return await apiClient.post('/passports/verify-qr', { qrData });
    } catch (err) {
      return await mockAdapter.verifyPassportQR(qrData);
    }
  }
};

export default passportApi;
