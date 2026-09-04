import { useState, useEffect, useCallback } from 'react';
import { passportApi } from '../api';

export const usePassport = (id) => {
  const [passport, setPassport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPassport = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await passportApi.getPassportById(id);
      setPassport(data);
    } catch (err) {
      console.error(`[usePassport] Error fetching passport ${id}:`, err);
      setError(err.message || 'Failed to load Waste Passport');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPassport();
  }, [fetchPassport]);

  return {
    passport,
    isLoading,
    error,
    refetch: fetchPassport
  };
};

export default usePassport;
