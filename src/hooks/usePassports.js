import { useState, useEffect, useCallback } from 'react';
import { passportApi } from '../api';

export const usePassports = (filter = {}) => {
  const [passports, setPassports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPassports = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await passportApi.getPassports(filter);
      setPassports(data);
    } catch (err) {
      console.error('[usePassports] Error fetching passport list:', err);
      setError(err.message || 'Failed to load Waste Passports registry');
    } finally {
      setIsLoading(false);
    }
  }, [JSON.stringify(filter)]);

  useEffect(() => {
    fetchPassports();
  }, [fetchPassports]);

  const createPassport = async (passportData) => {
    try {
      const created = await passportApi.createPassport(passportData);
      setPassports((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      console.error('[usePassports] Error creating passport:', err);
      throw err;
    }
  };

  return {
    passports,
    isLoading,
    error,
    createPassport,
    refetch: fetchPassports
  };
};

export default usePassports;
