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
    id: 'WP-892401',
    itemTitle: 'PET Water Bottles (Bulk 20L)',
    category: 'Plastic',
    material: 'Polyethylene Terephthalate (PET)',
    recyclability: 95,
    estimatedWeight: 4.5,
    estimatedValue: 126,
    greenPointsEarned: 140,
    status: 'Recycled',
    currentStage: 5, // 0: Generated, 1: AI Identified, 2: Collection Requested, 3: Collected, 4: Sorted, 5: Recycled
    createdAt: '2026-08-20T10:30:00Z',
    updatedAt: '2026-08-22T14:15:00Z',
    qrCodeData: 'https://wastechain.org/passport/WP-892401',
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
    greenPointsEarned: 220,
    status: 'Sorted',
    currentStage: 4,
    createdAt: '2026-08-24T08:15:00Z',
    updatedAt: '2026-08-25T11:00:00Z',
    qrCodeData: 'https://wastechain.org/passport/WP-892402',
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
    greenPointsEarned: 160,
    status: 'Collection Requested',
    currentStage: 2,
    createdAt: '2026-08-25T16:45:00Z',
    updatedAt: '2026-08-25T16:45:00Z',
    qrCodeData: 'https://wastechain.org/passport/WP-892403',
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
    lat: 12.9716,
    lng: 77.5946,
    user: 'Ananya Sharma',
    contact: '+91 98765 43210',
    status: 'Pending',
    rewardPts: 160,
    timeAgo: '15 mins ago'
  },
  {
    id: 'REQ-102',
    passportId: 'WP-892404',
    title: '12.5 kg Mixed Glass Bottles & Jars',
    category: 'Glass',
    weight: '12.5 kg',
    location: 'Tech Park Cafe Square, Zone 4',
    lat: 12.9816,
    lng: 77.6046,
    user: 'Rohan Mehta',
    contact: '+91 98123 45678',
    status: 'Accepted',
    collector: 'EcoDrive Logistics #09',
    rewardPts: 250,
    timeAgo: '1 hour ago'
  },
  {
    id: 'REQ-103',
    passportId: 'WP-892405',
    title: '3.2 kg Aluminum Beverage Cans',
    category: 'Metal',
    weight: '3.2 kg',
    location: 'Central Library Recycling Station',
    lat: 12.9616,
    lng: 77.5846,
    user: 'Kavita Roy',
    contact: '+91 97654 32109',
    status: 'Completed',
    collector: 'GreenCollector #42',
    rewardPts: 320,
    timeAgo: '3 hours ago'
  }
];

export const mockMarketplaceItems = [
  {
    id: 'MKT-201',
    title: 'Ergonomic Wooden Study Desk',
    category: 'Furniture',
    type: 'List', // List (Sell), Giveaway, Exchange
    price: 1800,
    originalValue: 4500,
    condition: 'Like New',
    seller: 'Vikram S.',
    college: 'IIT Delhi',
    location: 'North Campus',
    images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=80'],
    description: 'Solid teak finish desk, barely used. Perfect for students.',
    postedAt: '2 days ago'
  },
  {
    id: 'MKT-202',
    title: 'Scientific Calculator Casio fx-991EX',
    category: 'Electronics',
    type: 'Giveaway',
    price: 0,
    originalValue: 1200,
    condition: 'Good',
    seller: 'Priya K.',
    college: 'BITS Pilani',
    location: 'Hostel 3',
    images: ['https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80'],
    description: 'Finished my degree, giving this calculator away for free to any junior in need!',
    postedAt: '4 hours ago'
  },
  {
    id: 'MKT-203',
    title: 'LG 22-inch Full HD Monitor',
    category: 'Electronics',
    type: 'Exchange',
    price: 0,
    exchangeFor: 'Standing Desk Converter or Mechanical Keyboard',
    originalValue: 7500,
    condition: 'Excellent',
    seller: 'Aditya P.',
    college: 'DTU',
    location: 'Block A',
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80'],
    description: '1080p 75Hz display with HDMI cable included. Looking to swap for a mechanical keyboard.',
    postedAt: '1 day ago'
  }
];

export const mockLeaderboard = [
  { rank: 1, name: 'IIT Delhi Eco Warriors', type: 'College', points: 48900, recycledKg: 3450, co2SavedKg: 5860, avatar: '🎓' },
  { rank: 2, name: 'BITS Pilani Green Club', type: 'College', points: 42100, recycledKg: 2980, co2SavedKg: 5066, avatar: '🌱' },
  { rank: 3, name: 'Green Haven Community', type: 'Neighborhood', points: 38750, recycledKg: 2710, co2SavedKg: 4607, avatar: '🏡' },
  { rank: 4, name: 'DTU Sustainable Campus', type: 'College', points: 31200, recycledKg: 2190, co2SavedKg: 3723, avatar: '⚡' },
  { rank: 5, name: 'IIT Bombay Clean Tech', type: 'College', points: 29400, recycledKg: 2050, co2SavedKg: 3485, avatar: '🔬' }
];

export const mockImpactMetrics = {
  totalRecycledKg: 14850,
  co2PreventedKg: 25245,
  waterSavedLiters: 118800,
  landfillDivertedKg: 14100,
  greenPointsAwarded: 185600,
  verifiedPassportsCount: 1420,
  monthlyTrend: [
    { month: 'Mar', recycledKg: 1200, co2Saved: 2040 },
    { month: 'Apr', recycledKg: 1800, co2Saved: 3060 },
    { month: 'May', recycledKg: 2400, co2Saved: 4080 },
    { month: 'Jun', recycledKg: 2900, co2Saved: 4930 },
    { month: 'Jul', recycledKg: 3200, co2Saved: 5440 },
    { month: 'Aug', recycledKg: 3350, co2Saved: 5695 }
  ]
};
