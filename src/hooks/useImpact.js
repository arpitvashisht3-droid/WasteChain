import { useState, useEffect, useCallback } from 'react';
import { impactApi } from '../api';

export const useImpact = () => {
  const [impactData, setImpactData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImpact = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await impactApi.getImpactMetrics();
      setImpactData(data);
    } catch (err) {
      console.error('[useImpact] Error fetching impact stats:', err);
      setError(err.message || 'Failed to load environmental impact metrics');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImpact();
  }, [fetchImpact]);

  return {
    impactData,
    isLoading,
    error,
    refetch: fetchImpact
  };
};

export default useImpact;
