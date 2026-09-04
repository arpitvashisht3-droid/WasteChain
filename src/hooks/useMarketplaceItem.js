import { useState, useEffect, useCallback } from 'react';
import { marketplaceApi } from '../api';

export const useMarketplaceItem = (id) => {
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItem = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await marketplaceApi.getListingById(id);
      setItem(data);
    } catch (err) {
      console.error(`[useMarketplaceItem] Error loading item ${id}:`, err);
      setError(err.message || 'Failed to load product details');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  return {
    item,
    isLoading,
    error,
    refetch: fetchItem
  };
};

export default useMarketplaceItem;
