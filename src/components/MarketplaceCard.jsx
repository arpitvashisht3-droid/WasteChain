import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Building, ArrowUpRight } from 'lucide-react';
import Card, { CardContent, CardFooter } from './Card';
import Badge from './Badge';
import { formatCurrency } from '../utils/formatters';

export const MarketplaceCard = ({ item }) => {
  if (!item) return null;

  const typeBadgeVariants = {
    List: 'emerald',
    Giveaway: 'amber',
    Exchange: 'indigo'
  };

  const formattedPrice = item.price === 0 ? 'FREE' : formatCurrency(item.price);
  const sellerRating = item.sellerRating || '4.9';

  return (
    <Card hover className="flex flex-col group">
      <Link to={`/marketplace/${item.id}`} className="block relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={item.images?.[0] || 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=80'}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant="emerald" size="sm">Reuse Verified</Badge>
          <Badge variant={typeBadgeVariants[item.type] || 'emerald'} size="sm">
            {item.type === 'List' ? 'For Sale' : item.type}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 bg-slate-900/90 text-white px-2.5 py-1 rounded-full text-xs font-black shadow-xs">
          {formattedPrice}
        </div>
      </Link>

      <CardContent className="flex-1 space-y-3 p-5">
        <Link to={`/marketplace/${item.id}`}>
          <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors line-clamp-1">
            {item.title}
          </h3>
        </Link>
        
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {item.description || 'Pre-loved reusable item in good condition.'}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Condition: <strong className="text-slate-800 font-bold">{item.condition}</strong></span>
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.distance || '1.2 km away'}
          </span>
        </div>
      </CardContent>

      <CardFooter className="bg-slate-50/80 p-4">
        <div className="flex items-center justify-between w-full text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
              {item.seller ? item.seller[0] : 'V'}
            </div>
            <span>{item.seller || 'Seller'}</span>
            <span className="flex items-center gap-0.5 text-amber-600 font-bold ml-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {sellerRating}
            </span>
          </div>

          <Link
            to={`/marketplace/${item.id}`}
            className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MarketplaceCard;
