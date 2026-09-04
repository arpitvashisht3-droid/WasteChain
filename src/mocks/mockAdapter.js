import {
  mockPassports,
  mockCollectionRequests,
  mockMarketplaceItems,
  mockLeaderboard,
  mockChallenges,
  mockImpactMetrics,
  mockHotspots,
  mockCollectorStats,
  mockRouteStops,
  mockWasteCategories
} from './mockData';
import { mockWasteAI } from './mockWasteAI';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

const DEFAULT_MOCK_USER = {
  id: 'usr_89201',
  name: 'Atharv Kapoor',
  email: 'atharv@wastechain.org',
  role: 'User',
  greenPoints: 840,
  tier: 'Gold Recycler',
  recycledKg: 42.8,
  co2AvoidedKg: 18.2,
  collectionsCount: 12,
  avatar: 'AK',
  college: 'DTU Sustainable Campus',
  location: 'Hostel Block B, Campus',
  joinedDate: 'August 2026'
};

export const mockAdapter = {
  // Auth
  async login(email, password) {
    await delay();
    return {
      ...DEFAULT_MOCK_USER,
      email: email || DEFAULT_MOCK_USER.email,
      name: email ? email.split('@')[0].replace('.', ' ') : DEFAULT_MOCK_USER.name,
      token: 'mock_jwt_token_89201'
    };
  },

  async register(userData) {
    await delay();
    return {
      id: `usr_${Math.floor(10000 + Math.random() * 90000)}`,
      name: userData.name || 'New Recycler',
      email: userData.email,
      role: userData.role || 'User',
      greenPoints: 100,
      tier: 'Bronze Recycler',
      recycledKg: 0,
      co2AvoidedKg: 0,
      collectionsCount: 0,
      avatar: userData.name ? userData.name.substring(0, 2).toUpperCase() : 'NR',
      college: userData.college || 'Campus',
      location: userData.location || '',
      joinedDate: 'Just now',
      token: 'mock_jwt_token_new'
    };
  },

  async getCurrentUser() {
    await delay(100);
    const saved = localStorage.getItem('wastechain_user');
    return saved ? JSON.parse(saved) : DEFAULT_MOCK_USER;
  },

  async updateProfile(fields) {
    await delay();
    const current = await this.getCurrentUser();
    const updated = { ...current, ...fields };
    localStorage.setItem('wastechain_user', JSON.stringify(updated));
    return updated;
  },

  // Waste & AI
  async analyzeWaste(imageFileOrUrl) {
    return await mockWasteAI.analyzeImage(imageFileOrUrl);
  },

  async getCategories() {
    await delay(100);
    return [...mockWasteCategories];
  },

  // Passports
  async getPassports() {
    await delay();
    return [...mockPassports];
  },

  async getPassportById(id) {
    await delay();
    const found = mockPassports.find((p) => p.id.toLowerCase() === id?.toLowerCase());
    if (found) return found;
    return {
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
    };
  },

  async createPassport(passportData) {
    await delay();
    const newId = `WC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newP = {
      id: newId,
      ...passportData,
      status: 'AI Identified',
      currentStage: 1,
      createdAt: new Date().toISOString(),
      qrCodeData: `https://wastechain.app/passport/${newId}`,
      timeline: [
        { stage: 'Generated', timestamp: new Date().toLocaleTimeString(), description: 'User photo registered' },
        { stage: 'AI Identified', timestamp: new Date().toLocaleTimeString(), description: `AI Verified: ${passportData.material || 'Recyclable Material'}` }
      ]
    };
    mockPassports.unshift(newP);
    return newP;
  },

  async verifyPassportQR(qrData) {
    await delay();
    const passportId = qrData.includes('/') ? qrData.split('/').pop() : qrData;
    const found = mockPassports.find((p) => p.id.toLowerCase() === passportId?.toLowerCase());
    return {
      valid: true,
      passportId: passportId || 'WC-2026-00124',
      passport: found || mockPassports[0],
      verifiedAt: new Date().toISOString()
    };
  },

  // Collections
  async getCollectionRequests() {
    await delay();
    return [...mockCollectionRequests];
  },

  async createCollectionRequest(requestData) {
    await delay();
    const newId = `REQ-${Math.floor(200 + Math.random() * 800)}`;
    const newReq = {
      id: newId,
      passportId: requestData.passportId || `WC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      title: requestData.title || `${requestData.category} Collection`,
      category: requestData.category,
      weight: requestData.weight || '5.0 kg',
      location: requestData.location,
      lat: 28.7041 + (Math.random() - 0.5) * 0.01,
      lng: 77.1025 + (Math.random() - 0.5) * 0.01,
      user: 'Atharv Kapoor',
      contact: requestData.contact || '+91 99999 88888',
      status: 'Pending',
      rewardPts: requestData.rewardPts || 150,
      preferredTime: requestData.preferredTime || 'ASAP',
      notes: requestData.notes || '',
      timeAgo: 'Just now',
      distance: '0.9 km away',
      priority: 'Normal',
      estimatedValue: 120
    };
    mockCollectionRequests.unshift(newReq);
    return newReq;
  },

  async acceptCollection(id) {
    await delay();
    const req = mockCollectionRequests.find((r) => r.id === id);
    if (req) {
      req.status = 'Accepted';
      req.collector = 'EcoCollector #12 (You)';
    }
    return req;
  },

  async updateCollectionStatus(id, status) {
    await delay();
    const req = mockCollectionRequests.find((r) => r.id === id);
    if (req) {
      req.status = status;
    }
    return req;
  },

  async completeCollection(id, actualWeight) {
    await delay();
    const req = mockCollectionRequests.find((r) => r.id === id);
    if (req) {
      req.status = 'Completed';
      req.actualWeight = actualWeight;
    }
    return req;
  },

  async getCollectorStats() {
    await delay(150);
    return { ...mockCollectorStats };
  },

  async getCollectorRoute() {
    await delay(150);
    return {
      collectorVehicle: { lat: 28.7041, lng: 77.1025, name: 'Your Vehicle (EcoVan #04)' },
      facility: { lat: 28.7120, lng: 77.1110, name: 'EcoHub Regional Recycling Facility' },
      stops: [...mockRouteStops],
      metrics: { totalDistanceKm: 8.4, estimatedDurationMins: 22, totalWeightKg: 25.2 }
    };
  },

  // Marketplace
  async getMarketplaceListings() {
    await delay();
    return [...mockMarketplaceItems];
  },

  async getMarketplaceListingById(id) {
    await delay();
    const found = mockMarketplaceItems.find((m) => m.id === id);
    return found || mockMarketplaceItems[0];
  },

  async createMarketplaceListing(itemData) {
    await delay();
    const newItem = {
      id: `MKT-${Math.floor(300 + Math.random() * 700)}`,
      ...itemData,
      postedAt: 'Just now',
      createdAt: new Date().toISOString()
    };
    mockMarketplaceItems.unshift(newItem);
    return newItem;
  },

  async createMarketplaceOrder(orderData) {
    await delay();
    return {
      success: true,
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      item: orderData.item,
      buyer: orderData.buyer,
      amount: orderData.amount,
      createdAt: new Date().toISOString()
    };
  },

  // Payments
  async createPaymentOrder(orderData) {
    await delay();
    return {
      success: true,
      orderId: `order_MOCK_${Math.floor(100000 + Math.random() * 900000)}`,
      amount: orderData.amount,
      currency: orderData.currency || 'INR',
      keyId: 'rzp_test_MOCK_KEY'
    };
  },

  async verifyPayment(paymentDetails) {
    await delay();
    return {
      success: true,
      transactionId: paymentDetails.paymentId || `pay_MOCK_${Math.floor(100000 + Math.random() * 900000)}`,
      verifiedAt: new Date().toISOString()
    };
  },

  // Leaderboard & Gamification
  async getLeaderboard() {
    await delay();
    return [...mockLeaderboard];
  },

  async getChallenges() {
    await delay();
    return [...mockChallenges];
  },

  async joinChallenge(id) {
    await delay();
    return { success: true, challengeId: id, joinedAt: new Date().toISOString() };
  },

  async getImpactMetrics() {
    await delay();
    return { ...mockImpactMetrics };
  },

  // Hotspots
  async getHotspots() {
    await delay();
    return [...mockHotspots];
  }
};

export default mockAdapter;
