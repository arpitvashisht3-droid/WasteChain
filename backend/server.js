import fs from 'fs';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { readJSON, writeJSON } from './storage.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper to extract image base64 & mimeType from multer file or body
async function extractImagePayload(req) {
  if (req.file) {
    const buffer = fs.readFileSync(req.file.path);
    const mimeType = req.file.mimetype || 'image/jpeg';
    fs.unlink(req.file.path, () => {});
    return { base64Data: buffer.toString('base64'), mimeType };
  }

  const imgStr = req.body.imageUrl || req.body.image;
  if (imgStr && typeof imgStr === 'string') {
    if (imgStr.startsWith('data:')) {
      const matches = imgStr.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        return { mimeType: matches[1], base64Data: matches[2] };
      }
    } else if (imgStr.startsWith('http://') || imgStr.startsWith('https://')) {
      const response = await fetch(imgStr);
      if (!response.ok) {
        throw new Error('Failed to download image from provided URL.');
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      const mimeType = contentType.split(';')[0];
      return { base64Data: buffer.toString('base64'), mimeType };
    }
  }

  return null;
}

// --------------------------------------------------
// 2. REAL GEMINI AI VISION SERVICES
// --------------------------------------------------

app.post(['/api/waste/analyze', '/api/ai/analyze'], upload.single('image'), async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the backend. Please add GEMINI_API_KEY to backend/.env'
    });
  }

  let imageData;
  try {
    imageData = await extractImagePayload(req);
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Failed to read image payload.' });
  }

  if (!imageData || !imageData.base64Data) {
    return res.status(400).json({ error: 'No image file or valid image URL/data provided.' });
  }

  const promptText = `Analyze ONLY what is visibly supported by the image.

Return JSON with exactly these fields:
{
  "category": "Plastic | Paper | Glass | Metal | Organic | Electronic | Textile | Other",
  "material": "specific material if visually identifiable",
  "estimatedWeight": 0.5,
  "unit": "kg",
  "confidence": 0.95,
  "recyclable": true,
  "reason": "short explanation"
}

Rules for the AI:
- Do not randomly guess a category.
- Do not claim an exact material when it cannot reasonably be identified.
- If the image clearly contains plastic bottles, classify it as Plastic and identify PET/plastic bottle material when appropriate.
- Weight must be a reasonable visual estimate in kg as a number >= 0.
- confidence must be between 0 and 1.
- If the image is unclear or not waste, return category "Other" and explain why.
- Return ONLY valid JSON, with no Markdown fences or extra text.`;

  const models = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-flash-latest'];
  let geminiData = null;
  let apiError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: promptText },
                {
                  inlineData: {
                    mimeType: imageData.mimeType,
                    data: imageData.base64Data
                  }
                }
              ]
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2
          }
        })
      });

      if (response.ok) {
        geminiData = await response.json();
        break;
      } else {
        const errorText = await response.text();
        apiError = `HTTP ${response.status}: ${errorText}`;
      }
    } catch (err) {
      apiError = err.message;
    }
  }

  if (!geminiData) {
    return res.status(502).json({
      error: `Gemini AI service request failed. ${apiError || ''}`.trim()
    });
  }

  let candidateText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!candidateText) {
    return res.status(502).json({ error: 'Gemini AI returned empty analysis candidates.' });
  }

  candidateText = candidateText.replace(/```json/gi, '').replace(/```/g, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(candidateText);
  } catch (e) {
    return res.status(502).json({ error: 'Failed to parse Gemini AI response as JSON.' });
  }

  // Validate response structure
  const allowedCategories = ['Plastic', 'Paper', 'Glass', 'Metal', 'Organic', 'Electronic', 'Textile', 'Other'];
  let category = allowedCategories.find((c) => c.toLowerCase() === (parsed.category || '').toLowerCase()) || 'Other';

  let weight = Number(parsed.estimatedWeight);
  if (isNaN(weight) || weight < 0) {
    weight = 0.5;
  }

  let confidence = Number(parsed.confidence);
  if (isNaN(confidence)) {
    confidence = 0.9;
  } else if (confidence > 1) {
    confidence = confidence / 100;
  }
  confidence = Math.min(1, Math.max(0, confidence));

  const recyclable = typeof parsed.recyclable === 'boolean' ? parsed.recyclable : category !== 'Other';
  const reason = parsed.reason || 'Material visually identified by Gemini AI.';

  const weightKg = Math.round(weight * 10) / 10;
  const confPercent = Math.round(confidence * 100);

  const responsePayload = {
    success: true,
    timestamp: new Date().toISOString(),
    analysis: {
      category,
      material: parsed.material || category,
      recyclability: recyclable ? 90 : 10,
      estimatedWeightKg: weightKg,
      estimatedValueINR: Math.round(weightKg * 20),
      greenPoints: Math.round(weightKg * 100),
      confidence: confPercent,
      co2SavedKg: Math.round(weightKg * 1.5 * 10) / 10,
      recommendation: reason,
      reuseAnalysis: reason,
      suggestedPrice: Math.round(weightKg * 20)
    }
  };

  return res.json(responsePayload);
});


app.post('/api/ai/reuse-suggestion', (req, res) => {
  res.status(501).json({ error: 'External AI reuse suggestion service not implemented.' });
});

app.post('/api/ai/price-suggestion', (req, res) => {
  res.status(501).json({ error: 'External AI price suggestion service not implemented.' });
});

app.post('/api/ai/hotspots/predict', (req, res) => {
  res.status(501).json({ error: 'External AI hotspot prediction service not implemented.' });
});

// --------------------------------------------------
// 3. WASTE PASSPORTS
// --------------------------------------------------

// Get all passports
app.get('/api/passports', (req, res) => {
  const passports = readJSON('passports');
  res.json(passports);
});

// Get passport by ID
app.get('/api/passports/:id', (req, res) => {
  const passports = readJSON('passports');
  const found = passports.find((p) => p.id.toLowerCase() === req.params.id.toLowerCase());
  if (!found) {
    return res.status(404).json({ error: 'Waste Passport not found.' });
  }
  res.json(found);
});

// Create passport
app.post('/api/passports', (req, res) => {
  const passports = readJSON('passports');
  const passportData = req.body;

  const newPassport = {
    id: `WC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
    itemTitle: passportData.itemTitle || passportData.title || passportData.category || 'Waste Item',
    category: passportData.category || 'General',
    material: passportData.material || passportData.category || 'Mixed',
    recyclability: Number(passportData.recyclability) || 90,
    estimatedWeight: Number(passportData.estimatedWeight) || 1.0,
    estimatedValue: Number(passportData.estimatedValue) || 10,
    co2Avoided: passportData.co2Avoided || `${((Number(passportData.estimatedWeight) || 1) * 1.5).toFixed(1)} kg`,
    greenPointsEarned: Number(passportData.greenPointsEarned || passportData.estimatedValue) || 50,
    status: passportData.status || 'AI Identified',
    currentStage: Number(passportData.currentStage) || 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    owner: passportData.owner || 'Registered User',
    qrCodeData: passportData.qrCodeData || `https://wastechain.app/passport/WC-${Date.now()}`,
    timeline: Array.isArray(passportData.timeline) ? passportData.timeline : [
      {
        stage: 'Generated',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        description: 'User registered item passport'
      }
    ]
  };

  passports.unshift(newPassport);
  writeJSON('passports', passports);
  res.status(201).json(newPassport);
});


// Verify passport QR code
app.post('/api/passports/verify-qr', (req, res) => {
  const { qrData } = req.body;
  if (!qrData) {
    return res.status(400).json({ error: 'qrData is required.' });
  }

  const passports = readJSON('passports');
  const passportId = qrData.includes('/') ? qrData.split('/').pop() : qrData;
  const exists = passports.some((p) => p.id === passportId);

  res.json({
    valid: exists,
    passportId,
    verifiedAt: new Date().toISOString()
  });
});

// --------------------------------------------------
// 4. WASTE COLLECTION REQUESTS
// --------------------------------------------------

// Get all collection requests
app.get(['/api/collections', '/api/collections/nearby', '/api/collector/nearby', '/api/waste'], (req, res) => {
  const collections = readJSON('collections');
  res.json(collections);
});

// Get completed history
app.get('/api/collections/history', (req, res) => {
  const collections = readJSON('collections');
  const history = collections.filter((c) => c.status === 'Completed' || c.status === 'Verified');
  res.json(history);
});

// Get categories
app.get('/api/waste/categories', (req, res) => {
  res.json([
    { id: 'plastic', label: 'Plastic (PET / HDPE)' },
    { id: 'e-waste', label: 'Electronics / E-Waste' },
    { id: 'paper', label: 'Paper & Cardboard' },
    { id: 'metal', label: 'Metal & Aluminum' },
    { id: 'glass', label: 'Glass Containers' }
  ]);
});

// Get request by ID
app.get('/api/waste/:id', (req, res) => {
  const collections = readJSON('collections');
  const found = collections.find((c) => c.id === req.params.id);
  if (!found) {
    return res.status(404).json({ error: 'Collection request not found.' });
  }
  res.json(found);
});

// Create collection request
app.post(['/api/collections', '/api/waste'], (req, res) => {
  const collections = readJSON('collections');
  const reqData = req.body;

  const newRequest = {
    id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
    passportId: reqData.passportId || null,
    title: reqData.title || `${reqData.category || 'Waste'} Collection`,
    category: reqData.category || 'General',
    weight: reqData.weight || reqData.estimatedWeight || '1.0 kg',
    location: reqData.location || 'Campus Pickup',
    user: reqData.user || 'User',
    contact: reqData.contact || '',
    status: 'Pending',
    rewardPts: Number(reqData.rewardPts) || 100,
    preferredTime: reqData.preferredTime || 'Asap',
    notes: reqData.notes || '',
    createdAt: new Date().toISOString(),
    timeAgo: 'Just now'
  };

  collections.unshift(newRequest);
  writeJSON('collections', collections);
  res.status(201).json(newRequest);
});

// Accept collection request
app.post('/api/collections/:id/accept', (req, res) => {
  const collections = readJSON('collections');
  const reqItem = collections.find((c) => c.id === req.params.id);
  if (!reqItem) {
    return res.status(404).json({ error: 'Collection request not found.' });
  }
  reqItem.status = 'Accepted';
  reqItem.collector = 'Collector';
  writeJSON('collections', collections);
  res.json(reqItem);
});

// Update collection status
app.patch(['/api/collections/:id/status', '/api/collector/requests/:id/status', '/api/waste/:id'], (req, res) => {
  const collections = readJSON('collections');
  const reqItem = collections.find((c) => c.id === req.params.id);
  if (!reqItem) {
    return res.status(404).json({ error: 'Collection request not found.' });
  }
  Object.assign(reqItem, req.body);
  writeJSON('collections', collections);
  res.json(reqItem);
});


// Complete & verify collection
app.post(['/api/collections/:id/complete', '/api/collections/:id/verify'], (req, res) => {
  const collections = readJSON('collections');
  const reqItem = collections.find((c) => c.id === req.params.id);
  if (!reqItem) {
    return res.status(404).json({ error: 'Collection request not found.' });
  }

  reqItem.status = 'Completed';
  if (req.body.actualWeight) {
    reqItem.actualWeight = req.body.actualWeight;
  }
  writeJSON('collections', collections);

  // Update user green points and recycled weight dynamically
  const users = readJSON('users');
  if (users.length > 0) {
    const pts = reqItem.rewardPts || 100;
    const addedKg = parseFloat(reqItem.actualWeight || reqItem.weight) || 1.0;
    users[0].greenPoints = (users[0].greenPoints || 0) + pts;
    users[0].recycledKg = (users[0].recycledKg || 0) + addedKg;
    users[0].co2AvoidedKg = (users[0].co2AvoidedKg || 0) + (addedKg * 1.5);
    users[0].collectionsCount = (users[0].collectionsCount || 0) + 1;
    writeJSON('users', users);
  }

  res.json({
    success: true,
    id: reqItem.id,
    status: 'Completed',
    collection: reqItem,
    verifiedAt: new Date().toISOString()
  });
});

// Delete collection request
app.delete('/api/waste/:id', (req, res) => {
  let collections = readJSON('collections');
  collections = collections.filter((c) => c.id !== req.params.id);
  writeJSON('collections', collections);
  res.json({ success: true, id: req.params.id });
});

// Dynamic collector statistics computed strictly from collections.json
app.get('/api/collector/stats', (req, res) => {
  const collections = readJSON('collections');
  const completed = collections.filter((c) => c.status === 'Completed' || c.status === 'Verified');
  
  let totalKg = 0;
  completed.forEach((c) => {
    totalKg += parseFloat(c.actualWeight || c.weight) || 0;
  });

  res.json({
    todayPickups: completed.length,
    totalKgCollected: Math.round(totalKg * 10) / 10,
    earnings: completed.length * 50,
    completedRequests: completed.length
  });
});

// External map route (Not configured - Returning 501 or simple stops list)
app.get('/api/collector/route', (req, res) => {
  const collections = readJSON('collections');
  const active = collections.filter((c) => c.status === 'Accepted' || c.status === 'Pending');
  
  const stops = active.map((c, index) => ({
    id: `stop-${c.id}`,
    name: `Stop ${index + 1}: ${c.title || c.location}`,
    address: c.location,
    weight: c.weight,
    priority: 'Normal',
    status: c.status
  }));

  res.json({ stops });
});

// --------------------------------------------------
// 5. MARKETPLACE
// --------------------------------------------------

// Get marketplace listings (supports category & search filters)
app.get('/api/marketplace', (req, res) => {
  let items = readJSON('marketplace');
  const { category, search } = req.query;

  if (category && category !== 'All') {
    items = items.filter((item) => item.category?.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    items = items.filter((item) =>
      item.title?.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q)
    );
  }

  res.json(items);
});

// Get single listing by ID
app.get('/api/marketplace/:id', (req, res) => {
  const items = readJSON('marketplace');
  const found = items.find((m) => m.id === req.params.id);
  if (!found) {
    return res.status(404).json({ error: 'Marketplace item not found.' });
  }
  res.json(found);
});

// Create marketplace listing
app.post('/api/marketplace', (req, res) => {
  const items = readJSON('marketplace');
  const listingData = req.body;

  const newItem = {
    id: `MKT-${Math.floor(100 + Math.random() * 900)}`,
    title: listingData.title || 'Marketplace Item',
    category: listingData.category || 'General',
    type: listingData.type || 'List',
    price: Number(listingData.price) || 0,
    condition: listingData.condition || 'Good',
    seller: listingData.seller || 'User',
    location: listingData.location || 'Campus',
    description: listingData.description || '',
    images: listingData.images || [],
    postedAt: 'Just now',
    createdAt: new Date().toISOString()
  };

  items.unshift(newItem);
  writeJSON('marketplace', items);
  res.status(201).json(newItem);
});

// Update listing
app.put('/api/marketplace/:id', (req, res) => {
  const items = readJSON('marketplace');
  const index = items.findIndex((m) => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Listing not found.' });
  }
  items[index] = { ...items[index], ...req.body };
  writeJSON('marketplace', items);
  res.json(items[index]);
});

// Delete listing
app.delete('/api/marketplace/:id', (req, res) => {
  let items = readJSON('marketplace');
  items = items.filter((m) => m.id !== req.params.id);
  writeJSON('marketplace', items);
  res.json({ success: true, id: req.params.id });
});

// Purchase marketplace item
app.post(['/api/marketplace/:id/purchase', '/api/marketplace/orders'], (req, res) => {
  const orders = readJSON('orders');
  const order = {
    id: `ORD-${Date.now()}`,
    itemId: req.params.id || req.body.item?.id,
    buyer: req.body.buyer || 'Buyer',
    amount: req.body.amount || 0,
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  writeJSON('orders', orders);
  res.json({ success: true, orderId: order.id, ...order });
});

// Exchange item request
app.post('/api/marketplace/:id/exchange', (req, res) => {
  res.json({ success: true, id: req.params.id, status: 'Exchange Request Sent' });
});

// Donate item request
app.post('/api/marketplace/:id/donate', (req, res) => {
  res.json({ success: true, id: req.params.id, status: 'Donation Scheduled' });
});

// --------------------------------------------------
// 6. PAYMENT GATEWAYS (Not integrated - Returning 501)
// --------------------------------------------------

app.post('/api/payments/create-order', (req, res) => {
  res.status(501).json({ error: 'Payment gateway integration is not configured on this backend.' });
});

app.post('/api/payments/verify', (req, res) => {
  res.status(501).json({ error: 'Payment gateway integration is not configured on this backend.' });
});

// --------------------------------------------------
// 7. DYNAMIC IMPACT, REWARDS & LEADERBOARD
// --------------------------------------------------

// Dynamic Leaderboard generated strictly from real users in users.json
app.get('/api/leaderboard', (req, res) => {
  const users = readJSON('users');
  const sorted = [...users].sort((a, b) => (b.greenPoints || 0) - (a.greenPoints || 0));

  const leaderboard = sorted.map((u, index) => ({
    rank: index + 1,
    name: u.name || u.email,
    points: u.greenPoints || 0,
    recycledKg: u.recycledKg || 0
  }));

  res.json(leaderboard);
});

// Dynamic Impact Metrics calculated from real collections and passports in local JSON
app.get('/api/impact', (req, res) => {
  const collections = readJSON('collections');
  const passports = readJSON('passports');
  const completed = collections.filter((c) => c.status === 'Completed' || c.status === 'Verified');

  let totalRecycledKg = 0;
  completed.forEach((c) => {
    totalRecycledKg += parseFloat(c.actualWeight || c.weight) || 0;
  });

  const co2PreventedKg = Math.round(totalRecycledKg * 1.7 * 10) / 10;
  const landfillDivertedKg = Math.round(totalRecycledKg * 0.95 * 10) / 10;
  const greenPointsAwarded = completed.reduce((sum, c) => sum + (c.rewardPts || 0), 0);

  res.json({
    totalRecycledKg: Math.round(totalRecycledKg * 10) / 10,
    co2PreventedKg,
    landfillDivertedKg,
    greenPointsAwarded,
    verifiedPassportsCount: passports.length,
    monthlyTrend: [],
    categoryBreakdown: []
  });
});

app.get('/api/impact/user/:userId', (req, res) => {
  const users = readJSON('users');
  const user = users.find((u) => u.id === req.params.userId) || users[0] || {};
  res.json({
    recycledKg: user.recycledKg || 0,
    co2AvoidedKg: user.co2AvoidedKg || 0,
    collectionsCount: user.collectionsCount || 0,
    treesEquivalent: ((user.co2AvoidedKg || 0) / 21.7).toFixed(1)
  });
});

app.get('/api/impact/community', (req, res) => {
  res.json([]);
});

app.get('/api/impact/college/:collegeName', (req, res) => {
  res.json({
    college: req.params.collegeName,
    rank: 1,
    points: 0,
    recycledKg: 0,
    co2SavedKg: 0
  });
});

// Challenges list from challenges.json
app.get('/api/challenges', (req, res) => {
  const challenges = readJSON('challenges');
  res.json(challenges);
});

// Join challenge
app.post('/api/challenges/:id/join', (req, res) => {
  res.json({ success: true, challengeId: req.params.id, joinedAt: new Date().toISOString() });
});

// Rewards summary
app.get(['/api/rewards/points/:userId', '/api/rewards/summary'], (req, res) => {
  const users = readJSON('users');
  const user = users[0] || {};
  res.json({
    greenPoints: user.greenPoints || 0,
    tier: user.tier || 'Bronze Recycler',
    pointsBalance: user.greenPoints || 0,
    lifetimePoints: user.greenPoints || 0,
    pointsRedeemed: 0,
    activeBadges: []
  });
});

// Unintegrated Hotspots (501)
app.get(['/api/hotspots', '/api/hotspots/:id'], (req, res) => {
  res.status(501).json({ error: 'AI Waste Hotspot detection is not configured.' });
});

app.get('/api/hotspots/:id/prediction', (req, res) => {
  res.status(501).json({ error: 'AI Hotspot prediction service is not configured.' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// 404 Handler for unrecognized API routes
app.use((req, res) => {
  res.status(404).json({ error: `API route ${req.method} ${req.path} not found.` });
});

const server = app.listen(PORT, () => {
  console.log(`[WasteChain Backend] Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const ALT_PORT = Number(PORT) === 5000 ? 5001 : Number(PORT) + 1;
    console.warn(`[WasteChain Backend] Port ${PORT} is in use (e.g. macOS AirPlay). Falling back to port ${ALT_PORT}...`);
    app.listen(ALT_PORT, () => {
      console.log(`[WasteChain Backend] Server running on http://localhost:${ALT_PORT}`);
    });
  } else {
    console.error(err);
  }
});

