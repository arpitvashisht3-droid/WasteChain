import apiClient, { USE_MOCK_API } from './apiClient';
import mockAdapter from '../mocks/mockAdapter';

export const paymentApi = {
  async createPaymentOrder(orderData) {
    if (USE_MOCK_API) {
      return await mockAdapter.createPaymentOrder(orderData);
    }
    try {
      return await apiClient.post('/payments/create-order', orderData);
    } catch (err) {
      return await mockAdapter.createPaymentOrder(orderData);
    }
  },

  openPaymentCheckout(options, handlerCallback) {
    if (handlerCallback && typeof handlerCallback === 'function') {
      handlerCallback(options);
    }
  },

  async verifyPayment(paymentDetails) {
    if (USE_MOCK_API) {
      return await mockAdapter.verifyPayment(paymentDetails);
    }
    try {
      return await apiClient.post('/payments/verify', paymentDetails);
    } catch (err) {
      return await mockAdapter.verifyPayment(paymentDetails);
    }
  }
};

export default paymentApi;
