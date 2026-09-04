/**
 * Centralized Mock Datasets for WasteChain (Development / Fallback Mode)
 * Located strictly in src/mocks/ for easy removal or disconnection.
 */

export const mockWasteCategories = [
  { id: 'plastic', label: 'Plastic (PET / HDPE)', avgValuePerKg: 28, recyclabilityScore: 92, color: '#16A34A' },
  { id: 'e-waste', label: 'Electronics / E-Waste', avgValuePerKg: 140, recyclabilityScore: 85, color: '#2563EB' },
  { id: 'paper', label: 'Paper & Cardboard', avgValuePerKg: 14, recyclabilityScore: 95, color: '#D97706' },
  { id: 'metal', label: 'Metal & Aluminum', avgValuePerKg: 110, recyclabilityScore: 98, color: '#475569' },
  { id: 'glass', label: 'Glass Containers', avgValuePerKg: 18, recyclabilityScore: 90, color: '#0D9488' },
  { id: 'textile', label: 'Textile & Apparel', avgValuePerKg: 35, recyclabilityScore: 70, color: '#9333EA' }
];

export const mockPassports = [
  {
    id: 'WC-2026-00124',
    itemTitle: 'PET Plastic Water Bottles',
    category: 'Plastic',
    material: 'PET #1 (Polyethylene Terephthalate)',
    recyclability: 96,
    estimatedWeight: 4.7,
    estimatedValue: 140,
    co2Avoided: '1.8 kg',
    greenPointsEarned: 160,
    status: 'Collected',
    currentStage: 3, // 0: Generated, 1: AI Identified, 2: Collection Requested, 3: Collected, 4: Sorted, 5: Recycled
    createdAt: '2026-08-26',
    updatedAt: '2026-08-26T10:30:00Z',
    owner: 'Atharv Kapoor',
    collector: 'EcoCollector #12',
    recycler: 'City EcoHub Plant #04',
    qrCodeData: 'https://wastechain.app/passport/WC-2026-00124',
    timeline: [
      { stage: 'Generated', timestamp: '2026-08-26 09:15', description: 'User uploaded photo of PET bottles' },
      { stage: 'AI Identified', timestamp: '2026-08-26 09:16', description: 'Vision AI Confidence 98.4% PET Plastic (4.7kg)' },
      { stage: 'Collection Requested', timestamp: '2026-08-26 10:00', description: 'Assigned to EcoCollector #12' },
      { stage: 'Collected', timestamp: '2026-08-26 10:30', description: 'QR Code verified at pickup location' }
    ]
  },
  {
    id: 'WP-892401',
    itemTitle: 'PET Water Bottles (Bulk 20L)',
    category: 'Plastic',
    material: 'Polyethylene Terephthalate (PET)',
    recyclability: 95,
    estimatedWeight: 4.5,
    estimatedValue: 126,
    co2Avoided: '1.7 kg',
    greenPointsEarned: 140,
    status: 'Recycled',
    currentStage: 5,
    createdAt: '2026-08-20T10:30:00Z',
    updatedAt: '2026-08-22T14:15:00Z',
    owner: 'Atharv Kapoor',
    collector: 'GreenCollector #42',
    recycler: 'City Eco Hub Facility',
    qrCodeData: 'https://wastechain.app/passport/WP-892401',
    timeline: [
      { stage: 'Generated', timestamp: '2026-08-20 10:30', description: 'User uploaded photo of PET bottles' },
      { stage: 'AI Identified', timestamp: '2026-08-20 10:31', description: 'AI Confidence 98.4% PET Plastic (4.5kg)' },
      { stage: 'Collection Requested', timestamp: '2026-08-20 11:00', description: 'Assigned to GreenCollector #42' },
      { stage: 'Collected', timestamp: '2026-08-21 09:45', description: 'QR Code verified at pickup location' },
      { stage: 'Sorted', timestamp: '2026-08-21 16:20', description: 'Received at City Eco Hub facility' },
      { stage: 'Recycled', timestamp: '2026-08-22 14:15', description: 'Processed into rPET textile pellets' }
    ]
  },
  {
    id: 'WP-892402',
    itemTitle: 'Circuit Board & Power Cables',
    category: 'E-Waste',
    material: 'Copper / Silicon / PCB',
    recyclability: 88,
    estimatedWeight: 2.1,
    estimatedValue: 294,
    co2Avoided: '3.4 kg',
    greenPointsEarned: 220,
    status: 'Sorted',
    currentStage: 4,
    createdAt: '2026-08-24T08:15:00Z',
    updatedAt: '2026-08-25T11:00:00Z',
    owner: 'Atharv Kapoor',
    collector: 'EcoDrive Logistics #09',
    recycler: 'Regional Tech Recovery Plant',
    qrCodeData: 'https://wastechain.app/passport/WP-892402',
    timeline: [
      { stage: 'Generated', timestamp: '2026-08-24 08:15', description: 'User uploaded e-waste photo' },
      { stage: 'AI Identified', timestamp: '2026-08-24 08:16', description: 'AI identified PCB & Cables (2.1kg)' },
      { stage: 'Collection Requested', timestamp: '2026-08-24 09:30', description: 'Pickup scheduled' },
      { stage: 'Collected', timestamp: '2026-08-24 14:00', description: 'Scanned & picked up' },
      { stage: 'Sorted', timestamp: '2026-08-25 11:00', description: 'Pre-sorted for precious metal recovery' }
    ]
  },
  {
    id: 'WP-892403',
    itemTitle: 'Corrugated Shipping Boxes',
    category: 'Paper',
    material: 'Kraft Paperboard',
    recyclability: 98,
    estimatedWeight: 8.0,
    estimatedValue: 112,
    co2Avoided: '2.9 kg',
    greenPointsEarned: 160,
    status: 'Collection Requested',
    currentStage: 2,
    createdAt: '2026-08-25T16:45:00Z',
    updatedAt: '2026-08-25T16:45:00Z',
    owner: 'Atharv Kapoor',
    collector: null,
    recycler: null,
    qrCodeData: 'https://wastechain.app/passport/WP-892403',
    timeline: [
      { stage: 'Generated', timestamp: '2026-08-25 16:45', description: 'Cardboard boxes logged' },
      { stage: 'AI Identified', timestamp: '2026-08-25 16:46', description: 'Grade A Cardboard detected' },
      { stage: 'Collection Requested', timestamp: '2026-08-25 16:47', description: 'Awaiting collector acceptance' }
    ]
  }
];

export const mockCollectionRequests = [
  {
    id: 'REQ-101',
    passportId: 'WP-892403',
    title: '8.0 kg Corrugated Cardboard Boxes',
    category: 'Paper',
    weight: '8.0 kg',
    location: 'Campus Hostel Block B, Green City',
    lat: 28.7070,
    lng: 77.1055,
    user: 'Ananya Sharma',
    contact: '+91 98765 43210',
    status: 'Pending',
    rewardPts: 160,
    timeAgo: '15 mins ago',
    distance: '0.8 km away',
    priority: 'Normal',
    estimatedValue: 112,
    preferredTime: 'Today 4:00 PM',
    notes: 'Boxes are flattened and tied with biodegradable twine.'
  },
  {
    id: 'REQ-102',
    passportId: 'WP-892404',
    title: '12.5 kg Mixed Glass Bottles & Jars',
    category: 'Glass',
    weight: '12.5 kg',
    location: 'Tech Park Cafe Square, Zone 4',
    lat: 28.7010,
    lng: 77.1060,
    user: 'Rohan Mehta',
    contact: '+91 98123 45678',
    status: 'Accepted',
    collector: 'EcoDrive Logistics #09',
    rewardPts: 250,
    timeAgo: '1 hour ago',
    distance: '1.4 km away',
    priority: 'High',
    estimatedValue: 225,
    preferredTime: 'Today 5:30 PM',
    notes: 'Rinsed clear and amber glass containers.'
  },
  {
    id: 'REQ-103',
    passportId: 'WP-892405',
    title: '3.2 kg Aluminum Beverage Cans',
    category: 'Metal',
    weight: '3.2 kg',
    location: 'Central Library Recycling Station',
    lat: 28.7050,
    lng: 77.0990,
    user: 'Kavita Roy',
    contact: '+91 97654 32109',
    status: 'Completed',
    collector: 'GreenCollector #42',
    rewardPts: 320,
    timeAgo: '3 hours ago',
    distance: '2.1 km away',
    priority: 'Urgent',
    estimatedValue: 352,
    preferredTime: 'Completed',
    notes: 'Compacted aluminum cans.'
  },
  {
    id: 'REQ-104',
    passportId: 'WC-2026-00124',
    title: '4.7 kg PET Plastic Bottles',
    category: 'Plastic',
    weight: '4.7 kg',
    location: 'Hostel Gate 2, Campus',
    lat: 28.7041,
    lng: 77.1025,
    user: 'Atharv Kapoor',
    contact: '+91 99999 88888',
    status: 'Accepted',
    collector: 'EcoCollector #12',
    rewardPts: 160,
    timeAgo: '30 mins ago',
    distance: '0.4 km away',
    priority: 'High',
    estimatedValue: 140,
    preferredTime: 'Today 3:00 PM',
    notes: 'Clean transparent bottles ready in designated blue bin.'
  }
];

export const mockMarketplaceItems = [
  {
    id: 'MKT-901',
    title: 'Ergonomic Wooden Study Table',
    category: 'Furniture',
    type: 'List',
    price: 900,
    originalValue: 2500,
    condition: 'Like New',
    distance: '1.2 km away',
    seller: 'Vikram Sharma',
    sellerRating: 4.9,
    completedDeals: 14,
    college: 'IIT Delhi Campus',
    location: 'North Campus Hostels',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Solid teak wood finish study desk with drawer. Barely used during one semester, in pristine condition. Perfect for college students.',
    co2SavedKg: '15.2 kg',
    aiReusePotential: 'High (98% Market Demand Index)',
    postedAt: '2 days ago',
    createdAt: '2026-08-24T10:00:00Z'
  },
  {
    id: 'MKT-902',
    title: 'Engineering Mathematics & CS Books Bundle',
    category: 'Books',
    type: 'List',
    price: 350,
    originalValue: 1200,
    condition: 'Good',
    distance: '0.5 km away',
    seller: 'Priya Kapoor',
    sellerRating: 5.0,
    completedDeals: 8,
    college: 'BITS Pilani Hostels',
    location: 'Hostel 3, Room 114',
    images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80'],
    description: 'Complete 3rd year B.Tech textbooks bundle. High relevance and clean pages with handwritten cheat sheets included.',
    co2SavedKg: '4.5 kg',
    aiReusePotential: 'High (95% Demand Index)',
    postedAt: '4 hours ago',
    createdAt: '2026-08-26T06:00:00Z'
  },
  {
    id: 'MKT-903',
    title: 'Adjustable Mesh Office Chair',
    category: 'Furniture',
    type: 'List',
    price: 1200,
    originalValue: 3500,
    condition: 'Excellent',
    distance: '1.8 km away',
    seller: 'Rohan Verma',
    sellerRating: 4.8,
    completedDeals: 19,
    college: 'DTU Block B',
    location: 'North Campus',
    images: ['https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=800&auto=format&fit=crop&q=80'],
    description: 'Ergonomic lumbar support mesh chair with adjustable armrests and gas lift cylinder. Wheels glide smoothly.',
    co2SavedKg: '18.0 kg',
    aiReusePotential: 'High (96% Demand Index)',
    postedAt: '1 day ago',
    createdAt: '2026-08-25T11:30:00Z'
  },
  {
    id: 'MKT-904',
    title: 'Old LG 22" Full HD LED Monitor',
    category: 'Electronics',
    type: 'List',
    price: 2500,
    originalValue: 7500,
    condition: 'Good',
    distance: '2.4 km away',
    seller: 'Aditya Patel',
    sellerRating: 4.9,
    completedDeals: 11,
    college: 'IIT Bombay Campus',
    location: 'Hostel Block A',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80'],
    description: '1080p 75Hz monitor with HDMI & VGA cables included. Fully functional with crisp color reproduction.',
    co2SavedKg: '28.5 kg',
    aiReusePotential: 'Medium (89% Demand Index)',
    postedAt: '3 days ago',
    createdAt: '2026-08-23T14:20:00Z'
  }
];

export const mockLeaderboard = [
  { rank: 1, name: 'IIT Delhi Eco Warriors', type: 'College', points: 48900, recycledKg: 3450, co2SavedKg: 5860, avatar: '🎓' },
  { rank: 2, name: 'BITS Pilani Green Club', type: 'College', points: 42100, recycledKg: 2980, co2SavedKg: 5066, avatar: '🌱' },
  { rank: 3, name: 'Green Haven Community', type: 'Neighborhood', points: 38750, recycledKg: 2710, co2SavedKg: 4607, avatar: '🏡' },
  { rank: 4, name: 'DTU Sustainable Campus', type: 'College', points: 31200, recycledKg: 2190, co2SavedKg: 3723, avatar: '⚡' },
  { rank: 5, name: 'IIT Bombay Clean Tech', type: 'College', points: 29400, recycledKg: 2050, co2SavedKg: 3485, avatar: '🔬' }
];

export const mockChallenges = [
  {
    id: 'CH-201',
    title: 'Plastic-Free Week',
    category: 'Plastic',
    targetKg: 1000,
    currentProgressKg: 750,
    unit: 'kg Plastic',
    rewardPts: 1000,
    badge: 'Plastic Champion',
    daysLeft: '3 days left',
    description: 'Recycle 1,000 kg of PET plastic bottles and packaging across campus to earn 1,000 bonus Green Points.'
  },
  {
    id: 'CH-202',
    title: 'E-Waste Drive',
    category: 'E-Waste',
    targetKg: 100,
    currentProgressKg: 68,
    unit: 'kg E-Waste',
    rewardPts: 1500,
    badge: 'Tech Recycler',
    daysLeft: '8 days left',
    description: 'Collect 100 kg of outdated electronics, circuit boards, and cables for precious metal recovery.'
  },
  {
    id: 'CH-203',
    title: 'Paper Recovery Challenge',
    category: 'Paper',
    targetKg: 500,
    currentProgressKg: 460,
    unit: 'kg Paper',
    rewardPts: 800,
    badge: 'Paper Saver',
    daysLeft: '1 day left',
    description: 'Recycle 500 kg of corrugated boxes and paper scrap to achieve zero landfill packaging waste.'
  }
];

export const mockImpactMetrics = {
  totalRecycledKg: 14850,
  co2PreventedKg: 25245,
  waterSavedLiters: 118800,
  landfillDivertedKg: 14100,
  greenPointsAwarded: 185600,
  verifiedPassportsCount: 1420,
  materialRecoveredPct: 94.2,
  estimatedValueINR: 345000,
  activeParticipants: 4000,
  monthlyTrend: [
    { month: 'Mar', recycledKg: 1200, co2Saved: 2040 },
    { month: 'Apr', recycledKg: 1800, co2Saved: 3060 },
    { month: 'May', recycledKg: 2400, co2Saved: 4080 },
    { month: 'Jun', recycledKg: 2900, co2Saved: 4930 },
    { month: 'Jul', recycledKg: 3200, co2Saved: 5440 },
    { month: 'Aug', recycledKg: 3350, co2Saved: 5695 }
  ],
  categoryBreakdown: [
    { name: 'Plastic', value: 4850, color: '#16A34A' },
    { name: 'Paper', value: 3900, color: '#D97706' },
    { name: 'E-Waste', value: 2100, color: '#2563EB' },
    { name: 'Metal', value: 2400, color: '#475569' },
    { name: 'Glass', value: 1600, color: '#0D9488' }
  ],
  sectorParticipation: [
    { sector: 'Colleges', volume: 6450, participants: 1850 },
    { sector: 'Neighborhoods', volume: 4900, participants: 1200 },
    { sector: 'Tech Parks', volume: 3500, participants: 950 }
  ]
};

export const mockHotspots = [
  {
    id: 'HS-01',
    name: 'College Main Gate',
    severity: 'Critical',
    lat: 28.7041,
    lng: 77.1025,
    reportedKg: 127,
    mostCommon: 'Plastic',
    lastReported: '22 mins ago',
    collectors: 0,
    ai: {
      event: 'College fest tomorrow',
      predictedKg: [220, 270],
      breakdown: [
        { type: 'Plastic', kg: 120, icon: 'plastic' },
        { type: 'Paper', kg: 60, icon: 'paper' },
        { type: 'Food Waste', kg: 70, icon: 'food' }
      ],
      recommendedCollectionPoints: 3,
      insight: 'College fest tomorrow may generate 220–270 kg waste. Immediate collector deployment advised. 3 additional collection bins recommended at Gate A, Canteen, and Auditorium exit.'
    }
  },
  {
    id: 'HS-02',
    name: 'Hostel Block C & D',
    severity: 'High',
    lat: 28.7070,
    lng: 77.1055,
    reportedKg: 84,
    mostCommon: 'Mixed Waste',
    lastReported: '1 hour ago',
    collectors: 1,
    ai: {
      event: 'Weekend peak period',
      predictedKg: [90, 120],
      breakdown: [
        { type: 'Plastic', kg: 42, icon: 'plastic' },
        { type: 'Paper', kg: 25, icon: 'paper' },
        { type: 'Food Waste', kg: 35, icon: 'food' }
      ],
      recommendedCollectionPoints: 2,
      insight: 'Weekend activity surge expected. Pre-position 2 bins at Block C courtyard and Block D stairs to prevent overflow.'
    }
  },
  {
    id: 'HS-03',
    name: 'Campus Canteen Zone',
    severity: 'High',
    lat: 28.7010,
    lng: 77.1060,
    reportedKg: 65,
    mostCommon: 'Food Waste',
    lastReported: '2 hours ago',
    collectors: 1,
    ai: {
      event: 'Lunch rush',
      predictedKg: [80, 110],
      breakdown: [
        { type: 'Food Waste', kg: 60, icon: 'food' },
        { type: 'Plastic', kg: 28, icon: 'plastic' },
        { type: 'Paper', kg: 18, icon: 'paper' }
      ],
      recommendedCollectionPoints: 2,
      insight: 'High organic waste during lunch rush 12–2 PM. Recommend organic bin placement at each canteen counter and compost partnership setup.'
    }
  },
  {
    id: 'HS-04',
    name: 'Library & Study Block',
    severity: 'Normal',
    lat: 28.7050,
    lng: 77.0990,
    reportedKg: 22,
    mostCommon: 'Paper',
    lastReported: '3 hours ago',
    collectors: 1,
    ai: {
      event: 'Exam season',
      predictedKg: [28, 40],
      breakdown: [
        { type: 'Paper', kg: 22, icon: 'paper' },
        { type: 'Plastic', kg: 10, icon: 'plastic' },
        { type: 'Food Waste', kg: 6, icon: 'food' }
      ],
      recommendedCollectionPoints: 1,
      insight: 'Low intensity zone. Increase paper-only recycling bins during exam season to manage increased printout volume.'
    }
  },
  {
    id: 'HS-05',
    name: 'Sports Ground & Parking',
    severity: 'Normal',
    lat: 28.7025,
    lng: 77.1008,
    reportedKg: 18,
    mostCommon: 'Plastic',
    lastReported: '4 hours ago',
    collectors: 1,
    ai: {
      event: 'Inter-college sports meet',
      predictedKg: [55, 80],
      breakdown: [
        { type: 'Plastic', kg: 40, icon: 'plastic' },
        { type: 'Food Waste', kg: 28, icon: 'food' },
        { type: 'Paper', kg: 12, icon: 'paper' }
      ],
      recommendedCollectionPoints: 2,
      insight: 'Sports meet scheduled next week. Visitor footfall will spike. Deploy mobile waste collectors and plastic-only drop bins near parking entrance.'
    }
  }
];

export const mockCollectorStats = {
  todayPickups: 5,
  totalKgCollected: 184,
  earnings: 1450,
  completedRequests: 28
};

export const mockRouteStops = [
  { id: 'stop-1', name: 'Stop 1: Campus Hostel Block B', address: 'Gate 2, North Campus', lat: 28.7070, lng: 77.1055, weight: '8.0 kg Cardboard', priority: 'Urgent', status: 'Pending' },
  { id: 'stop-2', name: 'Stop 2: Tech Park Cafe Square', address: 'Zone 4 Courtyard', lat: 28.7010, lng: 77.1060, weight: '12.5 kg Glass', priority: 'High', status: 'Pending' },
  { id: 'stop-3', name: 'Stop 3: Innovation Lab Block', address: 'Room 102 Loading Bay', lat: 28.7041, lng: 77.1025, weight: '4.7 kg PET Plastic', priority: 'Normal', status: 'Pending' }
];
