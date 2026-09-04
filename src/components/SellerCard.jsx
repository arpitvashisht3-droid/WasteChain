import React from 'react';
import { Star, MapPin, Building, ShieldCheck, MessageSquare } from 'lucide-react';
import Card, { CardContent } from './Card';
import Button from './Button';
import Badge from './Badge';
import { useToast } from '../hooks/useToast';

export const SellerCard = ({ seller = {} }) => {
  const toast = useToast();

  const handleContact = () => {
    toast.success(`Chat initiated with ${seller.name || 'Seller'}! Contact phone: ${seller.phone || '+91 98765 43210'}`);
  };

  return (
    <Card className="p-5 border-slate-200 bg-slate-50/60">
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-600 to-green-800 text-white flex items-center justify-center font-black text-base shadow-xs">
            {seller.name ? seller.name[0] : 'V'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-slate-900 text-base">{seller.name || 'Vikram S.'}</h4>
              <Badge variant="emerald" size="sm">Verified</Badge>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <span className="flex items-center gap-1 text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {seller.rating || '4.9'}
              </span>
              <span>•</span>
              <span>{seller.completedDeals || '14 Deals'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-200/80">
          <p className="flex items-center gap-1.5 font-medium">
            <Building className="w-4 h-4 text-slate-400" /> {seller.college || 'IIT Delhi Campus'}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400" /> {seller.location || 'North Campus Hostels'}
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          icon={MessageSquare}
          onClick={handleContact}
          className="w-full bg-white"
        >
          Contact Seller
        </Button>
      </CardContent>
    </Card>
  );
};

export default SellerCard;
