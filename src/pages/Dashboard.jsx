import React from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  Sparkles,
  Award,
  Truck,
  QrCode,
  Store,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Leaf,
  Zap,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import { useAuth } from '../hooks/useAuth';
import { useDashboard } from '../hooks/useDashboard';

export const Dashboard = () => {
  const { user } = useAuth();
  const { stats, recentActivity, monthlyTrend, isLoading, error, refetch } = useDashboard();

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = user?.name ? user.name.split(' ')[0] : 'Atharv';

  if (isLoading) {
    return <Loader size="lg" text="Loading your WasteChain User Dashboard..." />;
  }

  if (error && !stats) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto bg-white rounded-2xl border border-rose-200 shadow-md space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Unable to load dashboard</h3>
        <p className="text-xs text-slate-500">{error}</p>
        <Button variant="primary" icon={RefreshCw} onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  const chartData = monthlyTrend.length > 0
    ? monthlyTrend.map((m) => ({ day: m.month, kg: m.recycledKg || 0, pts: m.co2Saved || 0 }))
    : [
        { day: 'Mon', kg: 4.2, pts: 60 },
        { day: 'Tue', kg: 6.8, pts: 110 },
        { day: 'Wed', kg: 3.5, pts: 50 },
        { day: 'Thu', kg: 9.1, pts: 160 },
        { day: 'Fri', kg: 5.4, pts: 80 },
        { day: 'Sat', kg: 8.2, pts: 140 },
        { day: 'Sun', kg: 5.6, pts: 90 }
      ];

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-7xl mx-auto">
      {/* Dynamic Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{getTimeGreeting()}, {userName} 👋</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Here is your circular recycling activity and environmental impact summary.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/scan">
            <Button variant="primary" size="md" icon={Sparkles} className="shadow-md shadow-emerald-600/20">
              AI Waste Scanner
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Stat 1: Waste Recycled */}
        <Card hover className="p-5 border-emerald-100 bg-gradient-to-br from-emerald-50/40 to-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Waste Recycled</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Leaf className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900">{stats?.recycledKg ?? 42.8} kg</h3>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +14%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Total diverted from landfills</p>
        </Card>

        {/* Stat 2: CO2 Avoided */}
        <Card hover className="p-5 border-sky-100 bg-gradient-to-br from-sky-50/40 to-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">CO₂ Avoided</span>
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900">{stats?.co2AvoidedKg ?? 18.2} kg</h3>
            <span className="text-xs font-bold text-sky-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +18%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Emissions footprint reduced</p>
        </Card>

        {/* Stat 3: Green Points */}
        <Card hover className="p-5 border-amber-100 bg-gradient-to-br from-amber-50/40 to-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Green Points</span>
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900">{stats?.greenPoints ?? 840} Pts</h3>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              {stats?.tier || 'Gold Tier'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Earned via verified recycling</p>
        </Card>

        {/* Stat 4: Collections */}
        <Card hover className="p-5 border-indigo-100 bg-gradient-to-br from-indigo-50/40 to-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Collections</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <h3 className="text-2xl font-black text-slate-900">{stats?.collectionsCount ?? 12} Pickups</h3>
            <span className="text-xs font-bold text-emerald-600">Verified</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">QR handshake complete</p>
        </Card>
      </div>

      {/* Quick Actions Strip */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/scan">
            <Card hover className="p-4 bg-gradient-to-br from-emerald-600 to-green-800 text-white flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/20 text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Scan Waste</p>
                  <p className="text-xs text-emerald-100">AI Material Identification</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Card>
          </Link>

          <Link to="/marketplace">
            <Card hover className="p-4 bg-white border-slate-200 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">List an Item</p>
                  <p className="text-xs text-slate-500">Sell or giveaway for reuse</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition-colors" />
            </Card>
          </Link>

          <Link to="/collections">
            <Card hover className="p-4 bg-white border-slate-200 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">Request Collection</p>
                  <p className="text-xs text-slate-500">Schedule waste pickup</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-slate-700 transition-colors" />
            </Card>
          </Link>
        </div>
      </div>

      {/* Main Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recycling Recharts Graph & Recent Activity */}
        <div className="lg:col-span-8 space-y-6">
          {/* Recycling Chart */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recycling Activity Trend (kg)</CardTitle>
                <CardDescription>Volume logged via AI scans & verified collections</CardDescription>
              </div>
              <Badge variant="emerald" showDot>Live Data</Badge>
            </CardHeader>

            <CardContent className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorKg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A34A" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="kg"
                    stroke="#16A34A"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorKg)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity Feed */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest transactions and passport status changes</CardDescription>
              </div>
              <Link to="/passport">
                <Button variant="ghost" size="sm" icon={ArrowUpRight} iconPosition="right">
                  All Passports
                </Button>
              </Link>
            </CardHeader>

            <CardContent className="divide-y divide-slate-100 p-0">
              {recentActivity.length > 0 ? (
                recentActivity.map((act) => (
                  <div key={act.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
                        {act.type === 'collection' ? (
                          <Truck className="w-5 h-5 text-emerald-600" />
                        ) : act.type === 'marketplace' || act.type === 'sale' ? (
                          <Store className="w-5 h-5 text-amber-600" />
                        ) : act.type === 'reward' ? (
                          <Award className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <QrCode className="w-5 h-5 text-sky-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{act.title}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {act.timestamp || act.time}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      {act.points && <span className="font-extrabold text-emerald-700 text-sm">{act.points}</span>}
                      {act.value && <span className="font-extrabold text-slate-900 text-sm">{act.value}</span>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-xs text-slate-400">
                  No recent activity logged yet. Start by scanning a waste photo!
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Green Points Progress & "Your Impact" */}
        <div className="lg:col-span-4 space-y-6">
          {/* Green Points Progress Card */}
          <Card glass className="border-amber-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-1.5">
                  <Award className="w-5 h-5 text-amber-600" /> Green Points Wallet
                </CardTitle>
                <Badge variant="amber">Tier 2</Badge>
              </div>
              <CardDescription>Progress towards Platinum Recycler status</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-slate-900">{stats?.greenPoints ?? 840} Pts</span>
                <span className="text-xs font-semibold text-slate-500">Goal: 1,000 Pts</span>
              </div>

              <div className="space-y-1.5">
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round(((stats?.greenPoints || 840) / 1000) * 100))}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 text-right">
                  {Math.max(0, 1000 - (stats?.greenPoints || 840))} Pts left until Platinum Badge
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                <p className="font-bold text-slate-800">Platinum Tier Rewards:</p>
                <p className="text-slate-500">• 15% Bonus Pts on all E-Waste scans</p>
                <p className="text-slate-500">• Free priority pickup window</p>
              </div>
            </CardContent>
          </Card>

          {/* Your Impact Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your Impact</CardTitle>
              <CardDescription>Personal lifetime ecological contribution</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-emerald-950">Landfill Diverted</span>
                </div>
                <span className="font-extrabold text-emerald-800">{stats?.recycledKg ?? 42.8} kg</span>
              </div>

              <div className="p-3 bg-sky-50/80 rounded-xl border border-sky-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span className="font-bold text-sky-950">Trees Saved Equiv.</span>
                </div>
                <span className="font-extrabold text-sky-800">
                  ~{((stats?.co2AvoidedKg || 18.2) / 8.5).toFixed(1)} Trees
                </span>
              </div>

              <div className="p-3 bg-indigo-50/80 rounded-xl border border-indigo-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span className="font-bold text-indigo-950">Energy Saved</span>
                </div>
                <span className="font-extrabold text-indigo-800">
                  {Math.round((stats?.recycledKg || 42.8) * 3.3)} kWh
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
