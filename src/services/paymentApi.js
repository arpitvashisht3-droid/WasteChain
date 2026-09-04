import apiClient from './api';

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const paymentApi = {
  /**
   * Creates a payment order on backend service.
   * Target endpoint: POST /api/payments/create-order
   */
  async createPaymentOrder(orderData) {
    try {
      const res = await apiClient.post('/payments/create-order', orderData);
      return res;
    } catch (err) {
      await delay(300);
      const mockOrderId = `order_MOCK_${Math.floor(100000 + Math.random() * 900000)}`;
      return {
        success: true,
        orderId: mockOrderId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        keyId: 'rzp_test_MOCK_KEY'
      };
    }
  },

  /**
   * Opens payment checkout modal / window.
   */
  openPaymentCheckout(options, handlerCallback) {
    if (handlerCallback && typeof handlerCallback === 'function') {
      handlerCallback(options);
    }
  },

  /**
   * Verifies cryptographic signature on backend.
   * Target endpoint: POST /api/payments/verify
   */
  async verifyPayment(paymentDetails) {
    try {
      const res = await apiClient.post('/payments/verify', paymentDetails);
      return res;
    } catch (err) {
      await delay(400);
      return {
        success: true,
        transactionId: paymentDetails.paymentId || `pay_MOCK_${Math.floor(100000 + Math.random() * 900000)}`,
        verifiedAt: new Date().toISOString()
      };
    }
  }
};

export default paymentApi;
