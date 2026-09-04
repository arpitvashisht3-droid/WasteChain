import React from 'react';
import { Trophy, Award, Flame, Sparkles, Building, CheckCircle2, UserCheck, RefreshCw, AlertCircle } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { formatWeight } from '../utils/formatters';

export const Leaderboard = () => {
  const { leaderboard, topThree, userCollegeEntry, isLoading, error, refetch } = useLeaderboard();

  if (isLoading) {
    return <Loader size="lg" text="Fetching Campus Recycling League standings..." />;
  }

  if (error && leaderboard.length === 0) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto bg-white rounded-2xl border border-rose-200 shadow-md space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Leaderboard Unavailable</h3>
        <p className="text-xs text-slate-500">{error}</p>
        <Button variant="primary" icon={RefreshCw} onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
          <Trophy className="w-3.5 h-3.5" />
          <span>Inter-College Circular Economy Competition</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Campus Recycling League
        </h1>
        <p className="text-slate-500 text-sm">
          Colleges and universities competing for circular recycling honors, eco-grants, and Green Points rewards.
        </p>
      </div>

      {/* User's Current Rank Banner */}
      {userCollegeEntry && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-green-900 to-emerald-950 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-emerald-700/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-lg">
              #{userCollegeEntry.rank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base">{userCollegeEntry.name}</span>
                <span className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full">Your Campus</span>
              </div>
              <p className="text-xs text-emerald-200 mt-0.5">
                {formatWeight(userCollegeEntry.recycledKg)} Waste Recycled • {formatWeight(userCollegeEntry.co2SavedKg || (userCollegeEntry.recycledKg * 1.7))} CO₂ Avoided
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-emerald-300">Total Points</span>
              <p className="text-xl font-black text-emerald-400">{(userCollegeEntry.points || 31200).toLocaleString()} Pts</p>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 Podium Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* Rank 2 - Silver */}
        {topThree[1] && (
          <Card hover className="p-6 text-center border-slate-300 bg-gradient-to-b from-slate-50 to-white order-2 md:order-1">
            <div className="w-12 h-12 rounded-2xl bg-slate-200 text-slate-700 flex items-center justify-center font-black text-lg mx-auto mb-3 shadow-xs">
              🥈 #2
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">{topThree[1].name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{topThree[1].type || 'College'}</p>
            <div className="my-4 pt-4 border-t border-slate-100 space-y-1">
              <p className="text-2xl font-black text-slate-900">{topThree[1].points.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400 uppercase font-bold">Green Points</p>
            </div>
            <div className="p-2.5 bg-slate-100 rounded-xl text-xs font-bold text-slate-700">
              {formatWeight(topThree[1].recycledKg)} Recycled
            </div>
          </Card>
        )}

        {/* Rank 1 - Gold (Elevated) */}
        {topThree[0] && (
          <Card hover className="p-8 text-center border-amber-300 bg-gradient-to-b from-amber-50/80 to-white order-1 md:order-2 md:-translate-y-4 shadow-xl ring-2 ring-amber-400/30">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center font-black text-2xl mx-auto mb-3 shadow-md shadow-amber-500/30">
              🥇
            </div>
            <Badge variant="amber" size="sm" showDot className="mb-2">League Leader</Badge>
            <h3 className="font-black text-slate-900 text-lg">{topThree[0].name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{topThree[0].type || 'College'}</p>
            <div className="my-4 pt-4 border-t border-amber-200 space-y-1">
              <p className="text-3xl font-black text-amber-950">{topThree[0].points.toLocaleString()}</p>
              <p className="text-[11px] text-amber-700 uppercase font-extrabold">Green Points</p>
            </div>
            <div className="p-3 bg-amber-100 text-amber-900 rounded-xl text-xs font-extrabold">
              {formatWeight(topThree[0].recycledKg)} Recycled • Eco Grant Winner
            </div>
          </Card>
        )}

        {/* Rank 3 - Bronze */}
        {topThree[2] && (
          <Card hover className="p-6 text-center border-amber-200 bg-gradient-to-b from-amber-50/30 to-white order-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-700 text-white flex items-center justify-center font-black text-lg mx-auto mb-3 shadow-xs">
              🥉 #3
            </div>
            <h3 className="font-extrabold text-slate-900 text-base">{topThree[2].name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{topThree[2].type || 'Neighborhood'}</p>
            <div className="my-4 pt-4 border-t border-slate-100 space-y-1">
              <p className="text-2xl font-black text-slate-900">{topThree[2].points.toLocaleString()}</p>
              <p className="text-[11px] text-slate-400 uppercase font-bold">Green Points</p>
            </div>
            <div className="p-2.5 bg-slate-100 rounded-xl text-xs font-bold text-slate-700">
              {formatWeight(topThree[2].recycledKg)} Recycled
            </div>
          </Card>
        )}
      </div>

      {/* Full Standings Table */}
      <Card>
        <CardHeader className="p-6 flex flex-row items-center justify-between">
          <div>
            <CardTitle>Full League Standings</CardTitle>
            <CardDescription>Real-time campus & community rankings updated continuously</CardDescription>
          </div>
          <Badge variant="emerald" showDot>Active Sprint</Badge>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-y border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Rank</th>
                <th className="py-3.5 px-6">College / Community</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6 text-right">Waste Recycled</th>
                <th className="py-3.5 px-6 text-right">Green Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {leaderboard.map((item) => {
                const isUserCollege = item.name.includes('DTU');
                return (
                  <tr
                    key={item.rank}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isUserCollege ? 'bg-emerald-50/70 font-bold text-emerald-950 border-l-4 border-emerald-600' : ''
                    }`}
                  >
                    <td className="py-4 px-6 font-mono font-black text-slate-900">
                      #{item.rank}
                    </td>
                    <td className="py-4 px-6 flex items-center gap-3">
                      <span className="text-lg">{item.avatar || '🏛️'}</span>
                      <div>
                        <span className="font-extrabold text-slate-900 text-sm block">{item.name}</span>
                        {isUserCollege && <span className="text-[10px] text-emerald-700 font-bold">Your Campus</span>}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500">{item.type || 'College'}</td>
                    <td className="py-4 px-6 text-right font-mono font-bold text-slate-900">
                      {formatWeight(item.recycledKg)}
                    </td>
                    <td className="py-4 px-6 text-right font-mono font-black text-emerald-700 text-sm">
                      {item.points.toLocaleString()} Pts
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
