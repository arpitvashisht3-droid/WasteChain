import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  BarChart3,
  Leaf,
  ShieldCheck,
  Droplet,
  Award,
  TrendingUp,
  Sparkles,
  DollarSign,
  Users,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import { useImpact } from '../hooks/useImpact';
import { formatCurrency, formatWeight } from '../utils/formatters';

export const Impact = () => {
  const { impactData, isLoading, error, refetch } = useImpact();

  if (isLoading) {
    return <Loader size="lg" text="Calculating Real-time Environmental Impact..." />;
  }

  if (error && !impactData) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto bg-white rounded-2xl border border-rose-200 shadow-md space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Unable to Load Impact Data</h3>
        <p className="text-xs text-slate-500">{error}</p>
        <Button variant="primary" icon={RefreshCw} onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  const categoryPieData = impactData?.categoryBreakdown || [
    { name: 'Plastic', value: 4850, color: '#16A34A' },
    { name: 'Paper', value: 3900, color: '#D97706' },
    { name: 'E-Waste', value: 2100, color: '#2563EB' },
    { name: 'Metal', value: 2400, color: '#475569' },
    { name: 'Glass', value: 1600, color: '#0D9488' }
  ];

  const participationBarData = impactData?.sectorParticipation || [
    { sector: 'Colleges', volume: 6450, participants: 1850 },
    { sector: 'Neighborhoods', volume: 4900, participants: 1200 },
    { sector: 'Tech Parks', volume: 3500, participants: 950 }
  ];

  const monthlyTrendData = impactData?.monthlyTrend || [
    { month: 'Mar', recycledKg: 1200, co2Saved: 2040 },
    { month: 'Apr', recycledKg: 1800, co2Saved: 3060 },
    { month: 'May', recycledKg: 2400, co2Saved: 4080 },
    { month: 'Jun', recycledKg: 2900, co2Saved: 4930 },
    { month: 'Jul', recycledKg: 3200, co2Saved: 5440 },
    { month: 'Aug', recycledKg: 3350, co2Saved: 5695 }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>ESG & Sustainability Analytics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Environmental Impact Dashboard
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          Real-time aggregated circular metrics showcasing waste diverted, emissions prevented, and material recovery.
        </p>
      </div>

      {/* 5 Main Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1 */}
        <Card hover className="p-5 border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-emerald-900 uppercase">Total Recycled</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-xl font-black text-slate-900">{formatWeight(impactData?.totalRecycledKg || 14850)}</h3>
          <p className="text-[11px] text-slate-500 mt-1">Verified circular material</p>
        </Card>

        {/* Metric 2 */}
        <Card hover className="p-5 border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-emerald-900 uppercase">Landfill Diverted</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-xl font-black text-slate-900">{formatWeight(impactData?.landfillDivertedKg || 14100)}</h3>
          <p className="text-[11px] text-slate-500 mt-1">95% Diversion rate</p>
        </Card>

        {/* Metric 3 */}
        <Card hover className="p-5 border-sky-100 bg-gradient-to-br from-sky-50/50 to-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-sky-900 uppercase">CO₂ Avoided</span>
            <Sparkles className="w-4 h-4 text-sky-600" />
          </div>
          <h3 className="text-xl font-black text-slate-900">{formatWeight(impactData?.co2PreventedKg || 25245)}</h3>
          <p className="text-[11px] text-slate-500 mt-1">~1,200 Mature trees equiv.</p>
        </Card>

        {/* Metric 4 */}
        <Card hover className="p-5 border-blue-100 bg-gradient-to-br from-blue-50/50 to-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-blue-900 uppercase">Material Recovered</span>
            <Droplet className="w-4 h-4 text-blue-600" />
          </div>
          <h3 className="text-xl font-black text-slate-900">{impactData?.materialRecoveredPct || 94.2}%</h3>
          <p className="text-[11px] text-slate-500 mt-1">Recovery efficiency</p>
        </Card>

        {/* Metric 5 */}
        <Card hover className="p-5 border-amber-100 bg-gradient-to-br from-amber-50/50 to-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-amber-900 uppercase">Est. Waste Value</span>
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="text-xl font-black text-slate-900">₹{(impactData?.estimatedValueINR || 345000).toLocaleString()}</h3>
          <p className="text-[11px] text-slate-500 mt-1">Recirculated in circular economy</p>
        </Card>
      </div>

      {/* 3 Visual Recharts Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart 1: Donut Waste By Category */}
        <div className="lg:col-span-5">
          <Card className="p-6 h-full flex flex-col justify-between">
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Waste by Category</CardTitle>
                <Badge variant="emerald">Composition</Badge>
              </div>
              <CardDescription>Breakdown by material type (kg)</CardDescription>
            </CardHeader>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || '#16A34A'} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} kg`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Chart 2: Monthly Recycling Trajectory */}
        <div className="lg:col-span-7">
          <Card className="p-6 h-full flex flex-col justify-between">
            <CardHeader className="p-0 mb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Monthly Recycling Trajectory</CardTitle>
                <Badge variant="emerald" showDot>6 Months Growth</Badge>
              </div>
              <CardDescription>Monthly volume recycled (kg) vs CO₂ Avoidance (kg)</CardDescription>
            </CardHeader>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrendData}>
                  <defs>
                    <linearGradient id="impactGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A34A" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="recycledKg"
                    name="Recycled (kg)"
                    stroke="#16A34A"
                    strokeWidth={3}
                    fill="url(#impactGreen)"
                  />
                  <Area
                    type="monotone"
                    dataKey="co2Saved"
                    name="CO₂ Saved (kg)"
                    stroke="#0284C7"
                    strokeWidth={2}
                    fillOpacity={0}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Chart 3: Community Participation BarChart */}
        <div className="lg:col-span-12">
          <Card className="p-6">
            <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">Community Participation & Volume</CardTitle>
                <CardDescription>Waste recycled (kg) vs active user contributors across sectors</CardDescription>
              </div>
              <Badge variant="emerald">Cross-Sector</Badge>
            </CardHeader>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={participationBarData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="sector" stroke="#64748B" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="volume" name="Volume (kg)" fill="#16A34A" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="participants" name="Active Participants" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Impact;
