import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Bell, Sparkles, Award } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';

const pageTitles = {
  '/': 'WasteChain Platform',
  '/dashboard': 'Dashboard Overview',
  '/scan': 'AI Waste Scanner',
  '/scanner': 'AI Waste Scanner',
  '/passport': 'Digital Waste Passport',
  '/collections': 'Collection Requests',
  '/marketplace': 'Reusable Marketplace',
  '/sell': 'Sell / List Item',
  '/checkout': 'Marketplace Checkout',
  '/collector': 'Collector Dashboard',
  '/collector/route': 'Collector Pickup Route',
  '/collector/scan': 'Collector QR Verification',
  '/hotspots': 'AI Waste Hotspot Monitor',
  '/impact': 'Environmental Impact',
  '/leaderboard': 'Leaderboards & Rankings',
  '/challenges': 'Active Challenges',
  '/profile': 'Profile & Settings'
};

export const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const getTitle = (path) => {
    if (pageTitles[path]) return pageTitles[path];
    if (path.startsWith('/passport/')) return 'Waste Passport Provenance';
    if (path.startsWith('/marketplace/')) return 'Product Listing Details';
    return 'WasteChain Platform';
  };

  const currentTitle = getTitle(location.pathname);

  const userAvatar = user?.avatar || (user?.name ? user.name.substring(0, 2).toUpperCase() : 'AK');
  const userPts = user?.greenPoints ? user.greenPoints.toLocaleString() : '840';

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Brand & Page Title */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-800 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg text-slate-900 tracking-tight leading-none">
                Waste<span className="text-emerald-600">Chain</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest mt-0.5">
                AI Circular Economy
              </span>
            </div>
          </Link>

          <div className="hidden md:block h-5 w-[1px] bg-slate-200" />
          <h1 className="hidden md:block text-sm font-semibold text-slate-700">
            {currentTitle}
          </h1>
        </div>

        {/* Right Side: Quick Action & User Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Scan CTA button */}
          <Link to="/scan">
            <Button
              variant="primary"
              size="sm"
              icon={Sparkles}
              className="hidden sm:inline-flex bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 shadow-sm"
            >
              Scan Waste with AI
            </Button>
          </Link>

          {/* Green Points Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-xl">
            <Award className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-900">{userPts} Pts</span>
          </div>

          {/* Notification Button */}
          <button
            aria-label="Notifications"
            className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
          </button>

          {/* User Profile Pill */}
          <Link to="/profile" className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-700 to-green-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-emerald-500/20">
              {userAvatar}
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-tight">{user?.name || 'Atharv K.'}</span>
              <span className="text-[10px] font-medium text-emerald-600">{user?.role || 'Verified Recycler'}</span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
