/**
 * WasteChain Frontend Data Models & Constants
 * Defines standardized schema contracts matching the Supabase & Express backend.
 */

// Lifecycle Status Enums for Waste Passports
export const WastePassportStatus = {
  GENERATED: 'Generated',
  AI_IDENTIFIED: 'AI Identified',
  COLLECTION_REQUESTED: 'Collection Requested',
  COLLECTED: 'Collected',
  SORTED: 'Sorted',
  RECYCLED: 'Recycled'
};

// Collection Request Status
export const CollectionStatus = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  ON_THE_WAY: 'On the way',
  COLLECTED: 'Collected',
  VERIFIED: 'Verified',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
};

// Marketplace Deal Types
export const MarketplaceType = {
  SELL: 'List',
  GIVEAWAY: 'Giveaway',
  EXCHANGE: 'Exchange'
};

// Item Condition Enums
export const ItemCondition = {
  LIKE_NEW: 'Like New',
  EXCELLENT: 'Excellent',
  GOOD: 'Good',
  FAIR: 'Fair'
};

// Waste Hotspot Severity
export const HotspotSeverity = {
  NORMAL: 'Normal',
  HIGH: 'High',
  CRITICAL: 'Critical'
};

// Waste Categories
export const WasteCategory = {
  PLASTIC: 'Plastic',
  PAPER: 'Paper',
  E_WASTE: 'E-Waste',
  METAL: 'Metal',
  GLASS: 'Glass',
  TEXTILE: 'Textile',
  ORGANIC: 'Organic'
};

// User Roles
export const UserRole = {
  USER: 'User',
  COLLECTOR: 'Collector',
  RECYCLER: 'Recycler',
  ADMIN: 'Admin'
};

/**
 * Model Factories (for default values and sanitization)
 */

export const createUserModel = (data = {}) => ({
  id: data.id || '',
  name: data.name || 'Anonymous Recycler',
  email: data.email || '',
  role: data.role || UserRole.USER,
  greenPoints: Number(data.greenPoints ?? 0),
  tier: data.tier || 'Bronze Recycler',
  recycledKg: Number(data.recycledKg ?? 0),
  co2AvoidedKg: Number(data.co2AvoidedKg ?? 0),
  collectionsCount: Number(data.collectionsCount ?? 0),
  avatar: data.avatar || (data.name ? data.name.substring(0, 2).toUpperCase() : 'WC'),
  college: data.college || '',
  location: data.location || '',
  joinedDate: data.joinedDate || new Date().toISOString()
});

export const createWasteAnalysisModel = (data = {}) => ({
  category: data.category || WasteCategory.PLASTIC,
  material: data.material || 'Generic Recyclable',
  recyclability: Number(data.recyclability ?? 90),
  estimatedWeightKg: Number(data.estimatedWeightKg ?? data.estimatedWeight ?? 0.5),
  estimatedValueINR: Number(data.estimatedValueINR ?? data.estimatedValue ?? 15),
  greenPoints: Number(data.greenPoints ?? 50),
  confidence: Number(data.confidence ?? 95),
  co2SavedKg: Number(data.co2SavedKg ?? 1.2),
  recommendation: data.recommendation || 'Recycle via verified collector',
  reuseAnalysis: data.reuseAnalysis || 'High reuse potential',
  suggestedPrice: Number(data.suggestedPrice ?? 0)
});

export const createWastePassportModel = (data = {}) => ({
  id: data.id || '',
  itemTitle: data.itemTitle || 'Recyclable Waste Batch',
  category: data.category || WasteCategory.PLASTIC,
  material: data.material || 'Mixed Material',
  recyclability: Number(data.recyclability ?? 90),
  estimatedWeight: Number(data.estimatedWeight ?? 1.0),
  estimatedValue: Number(data.estimatedValue ?? 20),
  co2Avoided: data.co2Avoided || '1.5 kg',
  greenPointsEarned: Number(data.greenPointsEarned ?? 100),
  status: data.status || WastePassportStatus.GENERATED,
  currentStage: Number(data.currentStage ?? 0),
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
  owner: data.owner || 'User',
  collector: data.collector || null,
  recycler: data.recycler || null,
  qrCodeData: data.qrCodeData || `https://wastechain.app/passport/${data.id || ''}`,
  timeline: Array.isArray(data.timeline) ? data.timeline : []
});

export const createCollectionRequestModel = (data = {}) => ({
  id: data.id || '',
  passportId: data.passportId || '',
  title: data.title || 'Collection Request',
  category: data.category || WasteCategory.PLASTIC,
  weight: data.weight || '1.0 kg',
  weightKg: Number((data.weightKg ?? parseFloat(data.weight)) || 1.0),
  location: data.location || 'Pickup Point',
  lat: Number(data.lat ?? data.latitude ?? 28.7041),
  lng: Number(data.lng ?? data.longitude ?? 77.1025),
  user: data.user || 'User',
  contact: data.contact || '',
  status: data.status || CollectionStatus.PENDING,
  collector: data.collector || null,
  rewardPts: Number(data.rewardPts ?? 100),
  distance: data.distance || '1.0 km',
  priority: data.priority || 'Normal',
  estimatedValue: Number(data.estimatedValue ?? 50),
  preferredTime: data.preferredTime || 'ASAP',
  notes: data.notes || '',
  createdAt: data.createdAt || new Date().toISOString()
});

export const createMarketplaceItemModel = (data = {}) => ({
  id: data.id || '',
  title: data.title || 'Reusable Item',
  category: data.category || 'Other',
  type: data.type || MarketplaceType.SELL,
  price: Number(data.price ?? 0),
  originalValue: Number(data.originalValue ?? data.price ?? 0),
  condition: data.condition || ItemCondition.GOOD,
  seller: data.seller || 'Community Member',
  sellerRating: Number(data.sellerRating ?? 4.8),
  completedDeals: Number(data.completedDeals ?? 5),
  college: data.college || '',
  location: data.location || '',
  distance: data.distance || '1.0 km away',
  images: Array.isArray(data.images) && data.images.length > 0
    ? data.images
    : ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80'],
  description: data.description || '',
  co2SavedKg: data.co2SavedKg || '5.0 kg',
  aiReusePotential: data.aiReusePotential || 'High (95% Market Demand)',
  postedAt: data.postedAt || 'Recently',
  createdAt: data.createdAt || new Date().toISOString()
});

export const createHotspotModel = (data = {}) => ({
  id: data.id || '',
  name: data.name || 'Campus Hotspot',
  severity: data.severity || HotspotSeverity.NORMAL,
  lat: Number(data.lat ?? 28.7041),
  lng: Number(data.lng ?? 77.1025),
  reportedKg: Number(data.reportedKg ?? 0),
  mostCommon: data.mostCommon || 'Plastic',
  lastReported: data.lastReported || 'Just now',
  collectors: Number(data.collectors ?? 0),
  ai: {
    event: data.ai?.event || 'Normal Activity',
    predictedKg: Array.isArray(data.ai?.predictedKg) ? data.ai.predictedKg : [50, 100],
    breakdown: Array.isArray(data.ai?.breakdown) ? data.ai.breakdown : [],
    recommendedCollectionPoints: Number(data.ai?.recommendedCollectionPoints ?? 2),
    insight: data.ai?.insight || 'Regular waste generation expected.'
  }
});
