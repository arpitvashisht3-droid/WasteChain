// Mock Waste Vision AI Analysis Service

const mockDataset = [
  {
    category: 'Plastic',
    material: 'PET #1 (Polyethylene Terephthalate)',
    recyclable: 'Yes',
    estimatedWeight: '0.5 kg',
    estimatedValue: '₹15–₹20',
    confidence: '96%',
    recommendation: 'Recycle',
    greenPoints: 140,
    co2Saved: '0.85 kg',
    tips: 'Rinse bottles and crush before handing over to collector.'
  },
  {
    category: 'Paper',
    material: 'Cardboard Kraft #2',
    recyclable: 'Yes',
    estimatedWeight: '1.2 kg',
    estimatedValue: '₹18–₹25',
    confidence: '98%',
    recommendation: 'Recycle',
    greenPoints: 120,
    co2Saved: '1.40 kg',
    tips: 'Remove any non-paper adhesive tape or plastic wrapping.'
  },
  {
    category: 'E-Waste',
    material: 'PCB Circuit Board & Wiring',
    recyclable: 'Yes',
    estimatedWeight: '0.8 kg',
    estimatedValue: '₹120–₹160',
    confidence: '94%',
    recommendation: 'Recycle',
    greenPoints: 210,
    co2Saved: '3.20 kg',
    tips: 'Contains recoverable Copper and Silicon components.'
  },
  {
    category: 'Metal',
    material: 'Aluminum Can #41',
    recyclable: 'Yes',
    estimatedWeight: '0.3 kg',
    estimatedValue: '₹30–₹40',
    confidence: '99%',
    recommendation: 'Recycle',
    greenPoints: 180,
    co2Saved: '2.10 kg',
    tips: 'Infinitely recyclable with 95% energy savings.'
  },
  {
    category: 'Furniture',
    material: 'Laminated Teak Wood',
    recyclable: 'Yes',
    estimatedWeight: '12.0 kg',
    estimatedValue: '₹1,500–₹2,000',
    confidence: '92%',
    recommendation: 'Reuse / Sell',
    greenPoints: 350,
    co2Saved: '15.0 kg',
    tips: 'Great candidate for marketplace listing or community giveaway.'
  }
];

export const mockWasteAI = {
  analyzeImage: async (imageFileOrUrl) => {
    // Simulate exact 2-second AI vision model processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Choose random result or match by type hint if available
    const randomIndex = Math.floor(Math.random() * mockDataset.length);
    const result = mockDataset[randomIndex];

    return {
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        category: result.category,
        material: result.material,
        recyclable: result.recyclable,
        estimatedWeight: result.estimatedWeight,
        estimatedValue: result.estimatedValue,
        confidence: result.confidence,
        recommendation: result.recommendation,
        greenPoints: result.greenPoints,
        co2Saved: result.co2Saved,
        tips: result.tips
      }
    };
  }
};

export default mockWasteAI;
