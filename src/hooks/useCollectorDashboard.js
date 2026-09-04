import { useState, useEffect, useCallback } from 'react';
import { collectorApi, collectionApi } from '../api';

export const useCollectorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [nearbyRequests, setNearbyRequests] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollectorData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [collectorStats, requests] = await Promise.all([
        collectorApi.getCollectorStats(),
        collectorApi.getNearbyRequests()
      ]);
      setStats(collectorStats);
      setNearbyRequests(requests);

      // Find first active task assigned or accepted
      const ongoing = requests.find((r) => r.status === 'Accepted' || r.status === 'On the way' || r.status === 'Collected');
      if (ongoing) {
        setActiveTask(ongoing);
      }
    } catch (err) {
      console.error('[useCollectorDashboard] Error fetching collector data:', err);
      setError(err.message || 'Failed to load collector dashboard');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollectorData();
  }, [fetchCollectorData]);

  const acceptRequest = async (id) => {
    try {
      const updated = await collectorApi.updateStatus(id, 'Accepted');
      setNearbyRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: 'Accepted' } : r))
      );
      setActiveTask(updated);
      return updated;
    } catch (err) {
      console.error('[useCollectorDashboard] Error accepting request:', err);
      throw err;
    }
  };

  const updateTaskStatus = async (id, status) => {
    try {
      const updated = await collectorApi.updateStatus(id, status);
      setActiveTask(updated);
      setNearbyRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      return updated;
    } catch (err) {
      console.error('[useCollectorDashboard] Error updating task status:', err);
      throw err;
    }
  };

  return {
    stats,
    nearbyRequests,
    activeTask,
    isLoading,
    error,
    acceptRequest,
    updateTaskStatus,
    setActiveTask,
    refetch: fetchCollectorData
  };
};

export default useCollectorDashboard;
