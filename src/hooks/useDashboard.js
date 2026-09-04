import { useState, useEffect, useCallback } from 'react';
import { impactApi, collectionApi, passportApi, marketplaceApi } from '../api';
import { useAuth } from './useAuth';

export const useDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [impactMetrics, collections, passports] = await Promise.all([
        impactApi.getImpactMetrics(),
        collectionApi.getCollections(),
        passportApi.getPassports()
      ]);

      setStats({
        recycledKg: user?.recycledKg || 42.8,
        co2AvoidedKg: user?.co2AvoidedKg || 18.2,
        greenPoints: user?.greenPoints || 840,
        collectionsCount: user?.collectionsCount || collections.length || 12,
        tier: user?.tier || 'Gold Recycler'
      });

      setMonthlyTrend(impactMetrics.monthlyTrend || []);

      // Derive recent activities from real collections and passports
      const activities = [
        ...collections.slice(0, 2).map((c) => ({
          id: `act-${c.id}`,
          title: `${c.category} collection ${c.status.toLowerCase()}`,
          timestamp: c.timeAgo || 'Recently',
          points: `+${c.rewardPts || 40} Green Points`,
          type: 'collection'
        })),
        ...passports.slice(0, 2).map((p) => ({
          id: `act-${p.id}`,
          title: `Waste Passport ${p.id} status: ${p.status}`,
          timestamp: p.createdAt?.substring(0, 10) || 'Recently',
          points: `+${p.greenPointsEarned || 50} Pts`,
          type: 'passport'
        }))
      ];

      setRecentActivity(activities.length > 0 ? activities : [
        { id: 'act-1', title: 'Plastic collection verified', timestamp: 'Today 10:30 AM', points: '+47 Green Points', type: 'collection' },
        { id: 'act-2', title: 'Study table listed on Marketplace', timestamp: 'Yesterday', points: '+50 Pts', type: 'marketplace' },
        { id: 'act-3', title: 'Waste Passport WC-2026-00124 updated', timestamp: '2 days ago', points: '+160 Pts', type: 'passport' }
      ]);
    } catch (err) {
      console.error('[useDashboard] Error loading dashboard data:', err);
      setError(err.message || 'Failed to load dashboard metrics');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    stats,
    recentActivity,
    monthlyTrend,
    isLoading,
    error,
    refetch: fetchDashboardData
  };
};

export default useDashboard;
