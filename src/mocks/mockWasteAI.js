/**
 * Mock Gemini Vision AI Classifier (Offline Development Sandbox)
 * Simulates AI image analysis with realistic delay and JSON output.
 */

const delay = (ms = 1200) => new Promise((resolve) => setTimeout(resolve, ms));

const possibleResults = [
  {
    category: 'Plastic',
    material: 'PET #1 (Polyethylene Terephthalate)',
    recyclability: 96,
    estimatedWeightKg: 0.5,
    estimatedValueINR: 18,
    confidence: 96,
    recommendation: 'Recycle via Collection Request',
    greenPoints: 140,
    co2SavedKg: 1.8,
    reuseAnalysis: 'High circular recycling value; can be re-spun into polyester fleece or new bottles.',
    suggestedPrice: 20
  },
  {
    category: 'Electronics',
    material: 'Circuit Board & Copper Components (E-Waste)',
    recyclability: 88,
    estimatedWeightKg: 1.4,
    estimatedValueINR: 196,
    confidence: 93,
    recommendation: 'Specialized E-Waste Drop-off',
    greenPoints: 220,
    co2SavedKg: 8.4,
    reuseAnalysis: 'Contains recoverable gold, silver, copper, and palladium.',
    suggestedPrice: 250
  },
  {
    category: 'Paper',
    material: 'Corrugated Cardboard (Kraft Paperboard)',
    recyclability: 99,
    estimatedWeightKg: 2.5,
    estimatedValueINR: 35,
    confidence: 98,
    recommendation: 'Recycle via Paper Pulping Drive',
    greenPoints: 120,
    co2SavedKg: 3.75,
    reuseAnalysis: '100% biodegradable and recyclable up to 7 times.',
    suggestedPrice: 40
  },
  {
    category: 'Metal',
    material: 'Aluminum Cans (#41 ALU)',
    recyclability: 98,
    estimatedWeightKg: 1.2,
    estimatedValueINR: 132,
    confidence: 97,
    recommendation: 'Direct Smelter Circular Recycling',
    greenPoints: 180,
    co2SavedKg: 10.8,
    reuseAnalysis: 'Infinitely recyclable with 95% energy savings vs primary bauxite smelting.',
    suggestedPrice: 150
  }
];

export const mockWasteAI = {
  async analyzeImage(imageInput) {
    await delay(1200);
    const selected = possibleResults[Math.floor(Math.random() * possibleResults.length)];
    return {
      success: true,
      timestamp: new Date().toISOString(),
      analysis: selected
    };
  }
};

export default mockWasteAI;
