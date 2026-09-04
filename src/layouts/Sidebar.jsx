import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Scan,
  QrCode,
  Truck,
  Store,
  BarChart3,
  Trophy,
  Flame,
  User,
  LogOut,
  Sparkles,
  ShieldCheck,
  Navigation,
  Tag,
  MapPinned,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/scan', label: 'AI Waste Scanner', icon: Scan, badge: 'AI' },
  { path: '/collections', label: 'Collections', icon: Truck },
  { path: '/collector', label: 'Collector View', icon: ShieldCheck },
  { path: '/collector/route', label: 'Pickup Route Map', icon: Navigation },
  { path: '/collector/scan', label: 'Collector QR Scan', icon: QrCode },
  { path: '/marketplace', label: 'Marketplace', icon: Store },
  { path: '/sell', label: 'Sell / List Item', icon: Tag },
  { path: '/hotspots', label: 'AI Hotspot Map', icon: MapPinned, badge: 'AI' },
  { path: '/passport', label: 'Waste Passport', icon: QrCode },
  { path: '/impact', label: 'Impact', icon: BarChart3 },
  { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/challenges', label: 'Challenges', icon: Flame },
  { path: '/profile', label: 'Profile', icon: User }
];

export const Sidebar = () => {
  const { logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info('Logged out successfully.');
    navigate('/login');
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200/80 bg-white min-h-[calc(100vh-4rem)] p-4 flex-shrink-0">
      {/* Primary Nav Links */}
      <nav className="flex flex-col gap-1 flex-1">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Platform Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-600 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors w-full mt-2"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span>Logout</span>
        </button>
      </nav>

      {/* Sustainability Promo Card */}
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-emerald-900 to-green-950 text-white relative overflow-hidden shadow-lg">
        <div className="flex items-center gap-2 mb-2 text-emerald-400">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Scan Waste</span>
        </div>
        <p className="text-xs text-emerald-100/90 leading-relaxed mb-3">
          Upload photo & receive instant AI evaluation & Green Points!
        </p>
        <NavLink
          to="/scan"
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold rounded-lg transition-colors"
        >
          <span>Scan Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
