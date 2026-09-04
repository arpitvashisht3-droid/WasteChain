import { useState, useEffect, useCallback } from 'react';
import { marketplaceApi } from '../api';

export const useMarketplace = (initialFilters = { category: 'All', search: '' }) => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || 'All');
  const [searchQuery, setSearchQuery] = useState(initialFilters.search || '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await marketplaceApi.getListings({
        category: selectedCategory,
        search: searchQuery
      });
      setItems(data);
    } catch (err) {
      console.error('[useMarketplace] Error fetching marketplace items:', err);
      setError(err.message || 'Failed to load marketplace listings');
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createListing = async (listingData) => {
    try {
      const created = await marketplaceApi.createListing(listingData);
      setItems((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      console.error('[useMarketplace] Error creating listing:', err);
      throw err;
    }
  };

  return {
    items,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    isLoading,
    error,
    createListing,
    refetch: fetchItems
  };
};

export default useMarketplace;
