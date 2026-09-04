import { useState, useEffect, useCallback } from 'react';
import { collectionApi } from '../api';

export const useCollections = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchCollections = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await collectionApi.getCollections();
      setRequests(data);
    } catch (err) {
      console.error('[useCollections] Error fetching collections:', err);
      setError(err.message || 'Failed to load collections');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const createRequest = async (requestPayload) => {
    setIsCreating(true);
    try {
      const created = await collectionApi.createCollectionRequest(requestPayload);
      setRequests((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      console.error('[useCollections] Error creating collection request:', err);
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  const activeRequests = requests.filter((r) => r.status !== 'Completed' && r.status !== 'Verified');
  const completedRequests = requests.filter((r) => r.status === 'Completed' || r.status === 'Verified');

  return {
    requests,
    activeRequests,
    completedRequests,
    isLoading,
    isCreating,
    error,
    createRequest,
    refetch: fetchCollections
  };
};

export default useCollections;
