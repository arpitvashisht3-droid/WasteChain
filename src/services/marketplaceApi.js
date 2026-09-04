import apiClient from './api';
import { mockMarketplaceItems } from './mockData';

export const marketplaceApi = {
  async getListings() {
    try {
      const res = await apiClient.get('/marketplace');
      return res;
    } catch (err) {
      return [...mockMarketplaceItems];
    }
  },

  async getListingById(id) {
    try {
      const res = await apiClient.get(`/marketplace/${id}`);
      return res;
    } catch (err) {
      const found = mockMarketplaceItems.find((m) => m.id === id);
      return (
        found || {
          id: id || 'MKT-901',
          title: 'Ergonomic Wooden Study Table',
          category: 'Furniture',
          type: 'List',
          price: 900,
          originalValue: 2500,
          condition: 'Like New',
          seller: 'Vikram Sharma',
          college: 'IIT Delhi Campus',
          location: 'North Campus Hostels',
          images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80'],
          description: 'Solid teak wood finish study desk with drawer.'
        }
      );
    }
  },

  async createListing(itemData) {
    try {
      const res = await apiClient.post('/marketplace', itemData);
      return res;
    } catch (err) {
      const newItem = {
        id: `MKT-${Math.floor(300 + Math.random() * 700)}`,
        ...itemData,
        postedAt: 'Just now'
      };
      mockMarketplaceItems.unshift(newItem);
      return newItem;
    }
  },

  async createOrder(orderData) {
    try {
      const res = await apiClient.post('/marketplace/orders', orderData);
      return res;
    } catch (err) {
      return {
        success: true,
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        item: orderData.item,
        buyer: orderData.buyer,
        createdAt: new Date().toISOString()
      };
    }
  }
};

export default marketplaceApi;
