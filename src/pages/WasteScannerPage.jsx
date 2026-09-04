import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  UploadCloud,
  Camera,
  Scan,
  CheckCircle,
  X,
  Truck,
  Store,
  RefreshCw,
  Zap,
  ShieldCheck,
  Award,
  Layers,
  ArrowRight,
  Info,
  Check,
  AlertCircle
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { useWasteAnalysis } from '../hooks/useWasteAnalysis';
import { passportApi, collectionApi, marketplaceApi } from '../api';
import { useToast } from '../hooks/useToast';

const sampleWastePhotos = [
  {
    name: 'PET Water Bottles',
    category: 'Plastic',
    url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Cardboard Packaging',
    category: 'Paper',
    url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'E-Waste PCB Scraps',
    category: 'E-Waste',
    url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Aluminum Soda Cans',
    category: 'Metal',
    url: 'https://images.unsplash.com/photo-1527871369852-651382253088?w=800&auto=format&fit=crop&q=80'
  }
];

export const WasteScannerPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef(null);

  const { analyzing, result, error, analyzeImage, resetAnalysis } = useWasteAnalysis();

  // States: 'empty' | 'preview' | 'analyzing' | 'result'
  const [scannerState, setScannerState] = useState('empty');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      setScannerState('preview');
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleSelectSample = (sampleUrl) => {
    setSelectedImage(sampleUrl);
    setScannerState('preview');
  };

  const handleAnalyze = async () => {
    setScannerState('analyzing');
    try {
      await analyzeImage(selectedImage);
      setScannerState('result');
      toast.success('AI waste identification complete!');
    } catch (err) {
      toast.error(err.message || 'AI Vision analysis service is not integrated into this backend.');
      setScannerState('preview');
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    resetAnalysis();
    setScannerState('empty');
  };

  const handleCreateCollection = async () => {
    if (!result) return;
    setActionLoading(true);
    try {
      const passport = await passportApi.createPassport({
        itemTitle: `${result.category} (${result.material})`,
        category: result.category,
        material: result.material,
        recyclability: result.recyclability || 96,
        estimatedWeight: result.estimatedWeightKg || 0.5,
        estimatedValue: result.estimatedValueINR || 20,
        greenPointsEarned: result.greenPoints || 140,
        co2Avoided: `${result.co2SavedKg || 1.8} kg`
      });

      await collectionApi.createCollectionRequest({
        passportId: passport.id,
        title: `${result.category} Waste - ${result.estimatedWeightKg || 0.5} kg`,
        category: result.category,
        weight: `${result.estimatedWeightKg || 0.5} kg`,
        location: 'Campus Eco Hub pickup point',
        rewardPts: result.greenPoints || 140
      });

      toast.success('Collection request created! Digital Waste Passport generated.');
      navigate('/collections');
    } catch (err) {
      toast.error('Failed to create collection request.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleListOnMarketplace = async () => {
    if (!result) return;
    setActionLoading(true);
    try {
      await marketplaceApi.createListing({
        title: `${result.category} Item - ${result.material}`,
        category: result.category,
        type: 'List',
        price: result.suggestedPrice || 50,
        originalValue: (result.suggestedPrice || 50) * 2,
        condition: 'Usable / Recyclable',
        seller: 'Atharv Kapoor',
        college: 'Campus Hostels',
        location: 'North Campus',
        images: [selectedImage],
        description: `AI Identified ${result.material}. Estimated weight ${result.estimatedWeightKg || 0.5} kg.`
      });

      toast.success('Item posted to Reusable Marketplace!');
      navigate('/marketplace');
    } catch (err) {
      toast.error('Failed to publish marketplace listing.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Page Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vision AI Material Classifier</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI Waste Scanner
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          Upload a photo of waste material. Our computer vision model will instantly analyze the material composition, recyclability index, weight, and market value.
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* STATE 1: EMPTY STATE */}
      {scannerState === 'empty' && (
        <div className="space-y-8">
          <Card className="p-6 sm:p-10 border-2 border-slate-200">
            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`p-8 sm:p-12 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-4 ${
                isDragOver
                  ? 'border-emerald-600 bg-emerald-50/80 scale-[1.01]'
                  : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-emerald-400'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-xs">
                <Scan className="w-8 h-8" />
              </div>

              <div className="space-y-1 max-w-md">
                <h3 className="text-xl font-extrabold text-slate-900">Scan Your Waste</h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Upload a photo and our AI will identify the material, recyclability and estimated value.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  icon={UploadCloud}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full sm:w-auto shadow-md"
                >
                  Upload Image
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  icon={Camera}
                  onClick={() => setIsCameraModalOpen(true)}
                  className="w-full sm:w-auto"
                >
                  Take Photo
                </Button>
              </div>

              <p className="text-[11px] text-slate-400">Supports JPG, PNG, WEBP up to 10MB</p>
            </div>
          </Card>

          {/* Quick Demo Samples */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Or test with demo sample photos:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {sampleWastePhotos.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(sample.url)}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-slate-200 hover:border-emerald-500 transition-all text-left shadow-xs cursor-pointer"
                >
                  <img
                    src={sample.url}
                    alt={sample.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent p-2.5 flex flex-col justify-end">
                    <span className="text-white text-xs font-bold leading-tight">{sample.name}</span>
                    <span className="text-[10px] text-emerald-300 font-medium">{sample.category}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STATE 2: IMAGE PREVIEW STATE */}
      {scannerState === 'preview' && selectedImage && (
        <Card className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Image Ready for Analysis</h3>
              <p className="text-xs text-slate-500">Confirm your photo selection before starting Vision AI</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={X}
              onClick={handleRemoveImage}
              className="text-slate-400 hover:text-slate-600"
            >
              Remove Image
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-900">Analysis Error</p>
                <p className="text-xs text-amber-800 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          <div className="relative aspect-video w-full max-w-2xl mx-auto rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-lg">
            <img src={selectedImage} alt="Selected waste" className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={Sparkles}
              onClick={handleAnalyze}
              isLoading={analyzing}
              className="w-full sm:w-auto px-8 shadow-lg shadow-emerald-600/30"
            >
              Analyze Waste
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleRemoveImage}
              className="w-full sm:w-auto"
            >
              Remove Image
            </Button>
          </div>
        </Card>
      )}

      {/* STATE 3: ANALYZING STATE */}
      {scannerState === 'analyzing' && selectedImage && (
        <Card className="p-8 sm:p-12 text-center space-y-8 min-h-[420px] flex flex-col justify-center items-center relative overflow-hidden">
          {/* Preview Image with Laser Scan Bar Overlay */}
          <div className="relative aspect-video w-full max-w-xl rounded-2xl overflow-hidden bg-slate-900 border-4 border-emerald-500/40 shadow-2xl">
            <img src={selectedImage} alt="Analyzing waste" className="w-full h-full object-cover opacity-80" />

            {/* Animated Sweeping Laser Scanner Bar */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-400 animate-bounce top-1/3" />
            <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-xs flex items-center justify-center">
              <Scan className="w-16 h-16 text-emerald-400 animate-pulse opacity-70" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900 animate-pulse">
              AI is analyzing your waste...
            </h3>
            <p className="text-xs text-slate-500">
              Evaluating polymer composition, recyclability index & market valuation
            </p>
          </div>
        </Card>
      )}

      {/* STATE 4: RESULT STATE */}
      {scannerState === 'result' && result && (
        <div className="space-y-8 animate-fade-in">
          {/* Main Results Card */}
          <Card glass className="border-emerald-200">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50/50 p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Badge variant="emerald" showDot size="md">
                  AI Identification Complete
                </Badge>
                <span className="text-xs font-extrabold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-200">
                  Confidence: {result.confidence}%
                </span>
              </div>
              <CardTitle className="text-2xl mt-3">{result.material}</CardTitle>
              <CardDescription>Category: {result.category}</CardDescription>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Image Thumbnail + Grid Results */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={selectedImage} alt="Analyzed material" className="w-full h-full object-cover" />
                </div>

                <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {/* Category */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Category</p>
                    <p className="text-lg font-black text-slate-900 mt-1">{result.category}</p>
                  </div>

                  {/* Material */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Material</p>
                    <p className="text-lg font-black text-slate-900 mt-1">{result.material}</p>
                  </div>

                  {/* Recyclable */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Recyclable</p>
                    <p className="text-lg font-black text-emerald-600 mt-1 flex items-center gap-1">
                      <Check className="w-5 h-5 text-emerald-600 stroke-[3]" />
                      <span>{result.recyclability >= 50 ? 'Yes' : 'No'}</span>
                    </p>
                  </div>

                  {/* Estimated Weight */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Estimated Weight</p>
                    <p className="text-lg font-black text-slate-900 mt-1">{result.estimatedWeightKg} kg</p>
                  </div>

                  {/* Estimated Value */}
                  <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-400 uppercase">Estimated Value</p>
                    <p className="text-lg font-black text-emerald-700 mt-1">₹{result.estimatedValueINR}</p>
                  </div>

                  {/* Green Points Reward */}
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <p className="text-[11px] font-bold text-emerald-800 uppercase">Green Points</p>
                    <p className="text-lg font-black text-emerald-700 mt-1">+{result.greenPoints} Pts</p>
                  </div>
                </div>
              </div>

              {/* Recommendation Callout Banner */}
              <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-600 text-white flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-emerald-950 text-sm">
                    AI Circular Recommendation: {result.recommendation}
                  </h4>
                  <p className="text-xs text-emerald-800/90 mt-0.5">
                    {result.reuseAnalysis} (Estimated CO₂ avoidance: {result.co2SavedKg} kg).
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={Truck}
                    isLoading={actionLoading}
                    onClick={handleCreateCollection}
                    className="w-full sm:w-auto shadow-md shadow-emerald-600/20"
                  >
                    Create Collection
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    icon={Store}
                    isLoading={actionLoading}
                    onClick={handleListOnMarketplace}
                    className="w-full sm:w-auto"
                  >
                    List on Marketplace
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="md"
                  icon={RefreshCw}
                  onClick={handleRemoveImage}
                  className="w-full sm:w-auto"
                >
                  Scan Another Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CAMERA CAPTURE SIMULATION MODAL */}
      <Modal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        title="Capture Waste Photo"
        subtitle="Position the item within the camera lens frame"
        size="md"
      >
        <div className="space-y-4 pt-2">
          <div className="relative aspect-video w-full rounded-2xl bg-slate-900 border-2 border-slate-700 overflow-hidden flex flex-col items-center justify-center text-slate-400">
            <Camera className="w-12 h-12 text-slate-500 mb-2" />
            <p className="text-xs font-semibold">Webcam Viewport</p>
            <p className="text-[10px] text-slate-500">Position object in good lighting</p>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsCameraModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Camera}
              onClick={() => {
                setIsCameraModalOpen(false);
                handleSelectSample(sampleWastePhotos[0].url);
              }}
            >
              Capture Snapshot
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WasteScannerPage;
