import { useState, useEffect, useCallback } from 'react';
import { rewardsApi } from '../api';

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaderboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await rewardsApi.getLeaderboard();
      setLeaderboard(data);
    } catch (err) {
      console.error('[useLeaderboard] Error fetching leaderboard:', err);
      setError(err.message || 'Failed to load leaderboard standings');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  const topThree = leaderboard.slice(0, 3);
  const userCollegeEntry = leaderboard.find((item) => item.name.includes('DTU')) || leaderboard[3] || null;

  return {
    leaderboard,
    topThree,
    userCollegeEntry,
    isLoading,
    error,
    refetch: fetchLeaderboard
  };
};

export default useLeaderboard;
