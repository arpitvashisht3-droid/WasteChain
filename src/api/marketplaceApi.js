import apiClient, { USE_MOCK_API } from './apiClient';
import mockAdapter from '../mocks/mockAdapter';
import { createMarketplaceItemModel } from '../models';

export const marketplaceApi = {
  async getListings(filters = {}) {
    if (USE_MOCK_API) {
      let list = await mockAdapter.getMarketplaceListings();
      if (filters.category && filters.category !== 'All') {
        list = list.filter((item) => item.category.toLowerCase() === filters.category.toLowerCase());
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        list = list.filter((item) =>
          item.title.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
        );
      }
      return list.map(createMarketplaceItemModel);
    }
    try {
      const res = await apiClient.get('/marketplace', { params: filters });
      return Array.isArray(res) ? res.map(createMarketplaceItemModel) : [];
    } catch (err) {
      const list = await mockAdapter.getMarketplaceListings();
      return list.map(createMarketplaceItemModel);
    }
  },

  async getListingById(id) {
    if (USE_MOCK_API) {
      const item = await mockAdapter.getMarketplaceListingById(id);
      return createMarketplaceItemModel(item);
    }
    try {
      const res = await apiClient.get(`/marketplace/${id}`);
      return createMarketplaceItemModel(res);
    } catch (err) {
      const item = await mockAdapter.getMarketplaceListingById(id);
      return createMarketplaceItemModel(item);
    }
  },

  async createListing(itemData) {
    if (USE_MOCK_API) {
      const created = await mockAdapter.createMarketplaceListing(itemData);
      return createMarketplaceItemModel(created);
    }
    try {
      const res = await apiClient.post('/marketplace', itemData);
      return createMarketplaceItemModel(res);
    } catch (err) {
      const created = await mockAdapter.createMarketplaceListing(itemData);
      return createMarketplaceItemModel(created);
    }
  },

  async updateListing(id, updateData) {
    if (USE_MOCK_API) {
      return createMarketplaceItemModel({ id, ...updateData });
    }
    try {
      const res = await apiClient.put(`/marketplace/${id}`, updateData);
      return createMarketplaceItemModel(res);
    } catch (err) {
      return createMarketplaceItemModel({ id, ...updateData });
    }
  },

  async deleteListing(id) {
    if (USE_MOCK_API) {
      return { success: true, id };
    }
    try {
      return await apiClient.delete(`/marketplace/${id}`);
    } catch (err) {
      return { success: true, id };
    }
  },

  async purchaseItem(id, purchaseData = {}) {
    if (USE_MOCK_API) {
      return await mockAdapter.createMarketplaceOrder({
        item: { id },
        buyer: purchaseData.buyer,
        amount: purchaseData.amount
      });
    }
    try {
      return await apiClient.post(`/marketplace/${id}/purchase`, purchaseData);
    } catch (err) {
      return await mockAdapter.createMarketplaceOrder({
        item: { id },
        buyer: purchaseData.buyer,
        amount: purchaseData.amount
      });
    }
  },

  async exchangeItem(id, exchangeData = {}) {
    if (USE_MOCK_API) {
      return { success: true, id, status: 'Exchange Request Sent' };
    }
    try {
      return await apiClient.post(`/marketplace/${id}/exchange`, exchangeData);
    } catch (err) {
      return { success: true, id, status: 'Exchange Request Sent' };
    }
  },

  async donateItem(id, donationData = {}) {
    if (USE_MOCK_API) {
      return { success: true, id, status: 'Donation Scheduled' };
    }
    try {
      return await apiClient.post(`/marketplace/${id}/donate`, donationData);
    } catch (err) {
      return { success: true, id, status: 'Donation Scheduled' };
    }
  }
};

export default marketplaceApi;
