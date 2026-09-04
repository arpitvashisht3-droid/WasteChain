import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Heart,
  Share2,
  ShieldCheck,
  MapPin,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import ProductGallery from '../components/ProductGallery';
import SellerCard from '../components/SellerCard';
import { formatCurrency } from '../utils/formatters';
import { useMarketplaceItem } from '../hooks/useMarketplaceItem';
import { useToast } from '../hooks/useToast';

export const MarketplaceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const { item, isLoading, error, refetch } = useMarketplaceItem(id);
  const [isSaved, setIsSaved] = useState(false);

  const handleBuyNow = () => {
    if (!item) return;
    navigate('/checkout', { state: { item } });
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from saved items' : 'Saved to your wishlist!');
  };

  if (isLoading) {
    return <Loader size="lg" text="Loading product details..." />;
  }

  if (error && !item) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto bg-white rounded-2xl border border-rose-200 shadow-md space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Product Not Found</h3>
        <p className="text-xs text-slate-500">{error}</p>
        <div className="flex justify-center gap-3">
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={refetch}>
            Retry
          </Button>
          <Link to="/marketplace">
            <Button variant="primary" size="sm">
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-6xl mx-auto">
      {/* Back Header */}
      <div className="flex items-center justify-between">
        <Link to="/marketplace">
          <Button variant="outline" size="sm" icon={ArrowLeft}>
            Back to Marketplace
          </Button>
        </Link>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            toast.info('Link copied to clipboard!');
          }}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          title="Share Listing"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Gallery & Description Column */}
        <div className="lg:col-span-7 space-y-6">
          <ProductGallery images={item.images} />

          <Card className="p-6 space-y-4">
            <CardHeader className="p-0 border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between">
                <Badge variant="emerald">Reuse Verified</Badge>
                <span className="text-xs font-bold text-slate-400">ID: {item.id}</span>
              </div>
              <CardTitle className="text-2xl mt-2">{item.title}</CardTitle>
              <CardDescription>Category: {item.category} • Condition: {item.condition}</CardDescription>
            </CardHeader>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Item Description</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>

            {/* AI Reuse Analysis Box */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>AI Circular Economy Analysis</span>
              </div>
              <p className="text-xs text-emerald-950 font-bold">
                Reuse Potential: {item.aiReusePotential}
              </p>
              <p className="text-xs text-emerald-800/90">
                Purchasing this item avoids manufacturing carbon emissions equivalent to planting ~0.8 trees ({item.co2SavedKg || '15.2 kg'} CO₂ saved).
              </p>
            </div>
          </Card>
        </div>

        {/* Right Checkout & Seller Column */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-6 border-emerald-100 shadow-lg">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Listing Price</span>
              <p className="text-3xl font-black text-slate-900">{formatCurrency(item.price)}</p>
              <p className="text-xs text-slate-500">Original New Value: {formatCurrency(item.originalValue)}</p>
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                icon={ShoppingBag}
                onClick={handleBuyNow}
                className="w-full shadow-md shadow-emerald-600/20"
              >
                Buy Now ({formatCurrency(item.price)})
              </Button>

              <Button
                variant="outline"
                size="lg"
                icon={Heart}
                onClick={handleToggleSave}
                className={`w-full ${isSaved ? 'bg-rose-50 text-rose-700 border-rose-200' : ''}`}
              >
                {isSaved ? 'Saved in Wishlist ✓' : 'Save to Wishlist'}
              </Button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.distance || 'Campus Area'}
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Platform Protected
              </span>
            </div>
          </Card>

          {/* Seller Card */}
          <SellerCard seller={{ name: item.seller, rating: item.sellerRating, college: item.college, location: item.location }} />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceDetailPage;
