import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  Sparkles,
  Store,
  Gift,
  Repeat,
  CheckCircle,
  Tag,
  MapPin,
  Camera
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { marketplaceApi, aiApi } from '../api';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

export const SellItemPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const [imagePreview, setImagePreview] = useState(
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80'
  );
  const [dealType, setDealType] = useState('List'); // 'List' (Sell) | 'Giveaway' | 'Exchange'

  // AI Suggestion State
  const [aiSuggestion, setAiSuggestion] = useState({
    category: 'Furniture',
    condition: 'Like New',
    suggestedPrice: 900,
    reusePotential: 'High (96% Market Demand)'
  });

  // Form State
  const [title, setTitle] = useState('Ergonomic Wooden Study Table');
  const [description, setDescription] = useState('Solid teak finish study desk in clean condition with drawer.');
  const [price, setPrice] = useState(900);
  const [category, setCategory] = useState('Furniture');
  const [condition, setCondition] = useState('Like New');
  const [location, setLocation] = useState(user?.location || 'Hostel Block B, Campus');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setImagePreview(reader.result);
        try {
          const suggestion = await aiApi.getReuseSuggestion({ category, condition, price });
          setAiSuggestion(suggestion);
          toast.success('AI Valuation refreshed for new image!');
        } catch (err) {
          toast.success('Image loaded!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitListing = async (e) => {
    e.preventDefault();
    if (!title || (!price && dealType === 'List') || !location) {
      toast.error('Please fill in all mandatory listing fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await marketplaceApi.createListing({
        title,
        description,
        price: dealType === 'Giveaway' ? 0 : Number(price),
        category,
        condition,
        type: dealType,
        location,
        seller: user?.name || 'Community Recycler',
        sellerRating: 4.9,
        college: user?.college || 'Campus Hostels',
        images: [imagePreview],
        co2SavedKg: '15.2 kg',
        aiReusePotential: aiSuggestion.reusePotential
      });

      toast.success('Item listed on Reusable Marketplace!');
      navigate('/marketplace');
    } catch (err) {
      toast.error('Failed to publish listing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
          <Tag className="w-3.5 h-3.5" />
          <span>List Item for Reuse</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create Marketplace Listing
        </h1>
        <p className="text-slate-500 text-sm">
          Upload photo for instant AI valuation, select deal terms (sell, giveaway, exchange), and connect with campus peers.
        </p>
      </div>

      <form onSubmit={handleSubmitListing} className="space-y-8">
        {/* Deal Type Selector */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'List', label: 'Sell for Cash', icon: Store, desc: 'Set price in INR' },
            { id: 'Giveaway', label: 'Give Away Free', icon: Gift, desc: '₹0 free reuse' },
            { id: 'Exchange', label: 'Swap / Exchange', icon: Repeat, desc: 'Barter item' }
          ].map((t) => {
            const Icon = t.icon;
            const isSelected = dealType === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setDealType(t.id);
                  if (t.id === 'Giveaway') setPrice(0);
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 shadow-xs ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && <Badge variant="emerald" size="sm">Selected</Badge>}
                </div>
                <p className="font-bold text-slate-900 text-xs sm:text-sm">{t.label}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{t.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Photo Upload & AI Valuation Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-6 space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Item Photograph
            </label>

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-200 shadow-md group">
              <img src={imagePreview} alt="Item preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <label className="cursor-pointer px-3 py-1.5 bg-white text-slate-900 rounded-xl font-bold text-xs shadow-md">
                  Change Photo
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* AI Suggestion Box */}
          <div className="md:col-span-6 p-5 bg-gradient-to-br from-emerald-50 to-green-50/50 rounded-2xl border border-emerald-200 space-y-4">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>AI Smart Valuation Engine</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                <span className="text-slate-400 font-semibold uppercase">Category</span>
                <p className="font-black text-slate-900 mt-0.5">{aiSuggestion.category}</p>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-emerald-100">
                <span className="text-slate-400 font-semibold uppercase">Suggested Price</span>
                <p className="font-black text-emerald-700 mt-0.5">₹{aiSuggestion.suggestedPrice}</p>
              </div>
            </div>

            <div className="text-xs text-emerald-900">
              <p className="font-bold">Reuse Potential: {aiSuggestion.reusePotential}</p>
              <p className="text-[11px] text-emerald-700/90 mt-0.5">Based on campus student marketplace transaction patterns.</p>
            </div>
          </div>
        </div>

        {/* Listing Form Fields */}
        <Card className="p-6 space-y-4">
          <Input
            label="Listing Title"
            placeholder="e.g. Ergonomic Wooden Study Table"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Item Category"
              type="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: 'Furniture', label: 'Furniture (Desks, Chairs, Shelves)' },
                { value: 'Electronics', label: 'Electronics (Monitors, Cables, Gizmos)' },
                { value: 'Books', label: 'Books & Course Textbooks' },
                { value: 'Clothes', label: 'Apparel & Uniforms' },
                { value: 'Household', label: 'Household & Appliances' },
                { value: 'Other', label: 'Other Reusable Items' }
              ]}
            />

            <Input
              label="Condition"
              type="select"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              options={[
                { value: 'Like New', label: 'Like New (Barely used)' },
                { value: 'Excellent', label: 'Excellent (Minor cosmetic wear)' },
                { value: 'Good', label: 'Good (Fully functional)' },
                { value: 'Fair', label: 'Fair (Usable condition)' }
              ]}
            />
          </div>

          {dealType === 'List' && (
            <Input
              label="Selling Price (₹ INR)"
              type="number"
              placeholder="e.g. 900"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          )}

          <Input
            label="Campus Pickup Location"
            placeholder="e.g. Hostel Block B, Room 204, North Campus"
            icon={MapPin}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <Input
            label="Description & Notes"
            multiline
            rows={3}
            placeholder="Describe features, reason for selling, item age..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/marketplace')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={Store}
              isLoading={isSubmitting}
              className="shadow-md shadow-emerald-600/20"
            >
              Publish Listing
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default SellItemPage;
