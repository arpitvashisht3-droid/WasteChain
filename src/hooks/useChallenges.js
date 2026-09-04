import { useState, useEffect, useCallback } from 'react';
import { rewardsApi } from '../api';

export const useChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [joinedMap, setJoinedMap] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChallenges = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await rewardsApi.getChallenges();
      setChallenges(data);
    } catch (err) {
      console.error('[useChallenges] Error fetching challenges:', err);
      setError(err.message || 'Failed to load challenges');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  const joinChallenge = async (id) => {
    try {
      await rewardsApi.joinChallenge(id);
      setJoinedMap((prev) => ({ ...prev, [id]: true }));
      return true;
    } catch (err) {
      console.error('[useChallenges] Error joining challenge:', err);
      throw err;
    }
  };

  return {
    challenges,
    joinedMap,
    isLoading,
    error,
    joinChallenge,
    refetch: fetchChallenges
  };
};

export default useChallenges;
