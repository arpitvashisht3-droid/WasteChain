import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Scan,
  QrCode,
  Truck,
  Store,
  Menu,
  X,
  BarChart3,
  Trophy,
  Flame,
  User,
  ShieldCheck,
  Navigation,
  MapPinned,
  Tag
} from 'lucide-react';

const primaryMobileItems = [
  { path: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { path: '/passport', label: 'Passport', icon: QrCode },
  { path: '/scan', label: 'AI Scan', icon: Scan, isAction: true },
  { path: '/collections', label: 'Collect', icon: Truck },
  { path: '/marketplace', label: 'Market', icon: Store }
];

const allRoutesList = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/scan', label: 'AI Waste Scanner', icon: Scan },
  { path: '/collections', label: 'Collections', icon: Truck },
  { path: '/collector', label: 'Collector View', icon: ShieldCheck },
  { path: '/collector/route', label: 'Pickup Route Map', icon: Navigation },
  { path: '/collector/scan', label: 'Collector QR Scan', icon: QrCode },
  { path: '/marketplace', label: 'Marketplace', icon: Store },
  { path: '/sell', label: 'Sell / List Item', icon: Tag },
  { path: '/hotspots', label: 'AI Hotspot Map', icon: MapPinned },
  { path: '/passport', label: 'Waste Passport', icon: QrCode },
  { path: '/impact', label: 'Impact', icon: BarChart3 },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/challenges', label: 'Challenges', icon: Flame },
  { path: '/profile', label: 'Profile', icon: User }
];

export const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Slide-Up Drawer Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-fade-in">
          <div className="bg-white rounded-t-3xl p-6 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">Platform Directory Navigation</h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {allRoutesList.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-xl text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Mobile Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto relative">
          {primaryMobileItems.map((item) => {
            const Icon = item.icon;

            if (item.isAction) {
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="relative -top-5 flex flex-col items-center justify-center group"
                >
                  <div className="w-13 h-13 rounded-full bg-gradient-to-br from-emerald-600 to-green-800 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-active:scale-95 transition-transform border-4 border-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 mt-0.5">
                    {item.label}
                  </span>
                </NavLink>
              );
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-colors ${
                    isActive ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-800'
                  }`
                }
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </NavLink>
            );
          })}

          {/* More Drawer Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center py-2 px-3 rounded-xl text-slate-500 hover:text-slate-800 transition-colors"
          >
            <Menu className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium leading-none">More</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
