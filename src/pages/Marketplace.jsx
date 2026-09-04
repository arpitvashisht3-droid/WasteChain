import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Plus, Search, Filter, RefreshCw } from 'lucide-react';
import Button from '../components/Button';
import CategoryFilter from '../components/CategoryFilter';
import MarketplaceCard from '../components/MarketplaceCard';
import Loader from '../components/Loader';
import { useMarketplace } from '../hooks/useMarketplace';

export const Marketplace = () => {
  const {
    items,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    isLoading,
    error,
    refetch
  } = useMarketplace();

  if (isLoading) {
    return <Loader size="lg" text="Loading Reusable Marketplace..." />;
  }

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-7xl mx-auto">
      {/* Marketplace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold mb-2">
            <Store className="w-3.5 h-3.5" />
            <span>P2P Circular Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Give Things a Second Life
          </h1>
          <p className="text-slate-500 text-sm">
            Buy, sell, exchange, or give away pre-owned university furniture, electronics, and books.
          </p>
        </div>

        <Link to="/sell">
          <Button
            variant="primary"
            icon={Plus}
            className="self-start sm:self-auto bg-gradient-to-r from-emerald-600 to-green-700 shadow-md shadow-emerald-600/20"
          >
            Sell or List Item
          </Button>
        </Link>
      </div>

      {/* Search & Category Filter Strip */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search study desks, engineering books, monitors, chairs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-xs"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-800">
          <span>{error}</span>
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={refetch}>
            Retry
          </Button>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.length > 0 ? (
          items.map((item) => (
            <MarketplaceCard key={item.id} item={item} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 space-y-3">
            <Store className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">No reusable items found in this category.</p>
            <Button variant="outline" size="sm" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
              Clear Search Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
