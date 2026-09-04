import apiClient from './api';
import { mockPassports } from './mockData';

export const passportApi = {
  async getPassports() {
    try {
      const res = await apiClient.get('/passports');
      return res;
    } catch (err) {
      return [...mockPassports];
    }
  },

  async getPassportById(id) {
    try {
      const res = await apiClient.get(`/passports/${id}`);
      return res;
    } catch (err) {
      const found = mockPassports.find((p) => p.id.toLowerCase() === id?.toLowerCase());
      return (
        found || {
          id: id || 'WC-2026-00124',
          itemTitle: 'PET Plastic Water Bottles',
          category: 'Plastic',
          material: 'PET #1 (Polyethylene Terephthalate)',
          estimatedWeight: 4.7,
          estimatedValue: 140,
          co2Avoided: '1.8 kg',
          greenPointsEarned: 160,
          status: 'Collected',
          currentStage: 3,
          createdAt: '2026-08-26',
          owner: 'Atharv Kapoor',
          collector: 'EcoCollector #12',
          recycler: 'City EcoHub Plant #04',
          timeline: [
            { stage: 'Generated', timestamp: '2026-08-26 09:15', description: 'User uploaded photo of PET bottles' },
            { stage: 'AI Identified', timestamp: '2026-08-26 09:16', description: 'Vision AI Confidence 98.4% PET Plastic (4.7kg)' },
            { stage: 'Collection Requested', timestamp: '2026-08-26 10:00', description: 'Assigned to EcoCollector #12' },
            { stage: 'Collected', timestamp: '2026-08-26 10:30', description: 'QR Code verified at pickup location' }
          ]
        }
      );
    }
  },

  async createPassport(passportData) {
    try {
      const res = await apiClient.post('/passports', passportData);
      return res;
    } catch (err) {
      const newId = `WC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const newP = {
        id: newId,
        ...passportData,
        createdAt: new Date().toISOString(),
        status: 'AI Identified',
        currentStage: 1
      };
      mockPassports.unshift(newP);
      return newP;
    }
  },

  async verifyPassportQR(qrData) {
    try {
      const res = await apiClient.post('/passports/verify-qr', { qrData });
      return res;
    } catch (err) {
      return {
        valid: true,
        passportId: qrData.includes('/') ? qrData.split('/').pop() : qrData,
        verifiedAt: new Date().toISOString()
      };
    }
  }
};

export default passportApi;
