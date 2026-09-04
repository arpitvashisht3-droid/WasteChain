import { useState, useEffect, useCallback } from 'react';
import { collectorApi } from '../api';

export const useCollectorRoute = () => {
  const [routeData, setRouteData] = useState(null);
  const [stops, setStops] = useState([]);
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRoute = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await collectorApi.getRouteMap();
      setRouteData(data);
      setStops(data.stops || []);
    } catch (err) {
      console.error('[useCollectorRoute] Error fetching route map:', err);
      setError(err.message || 'Failed to load collector route map');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoute();
  }, [fetchRoute]);

  const markStopCompleted = (stopId) => {
    setStops((prev) =>
      prev.map((s) => (s.id === stopId ? { ...s, status: 'Completed' } : s))
    );
    if (activeStopIndex < stops.length - 1) {
      setActiveStopIndex((prev) => prev + 1);
    }
  };

  return {
    routeData,
    stops,
    activeStopIndex,
    isLoading,
    error,
    markStopCompleted,
    setActiveStopIndex,
    refetch: fetchRoute
  };
};

export default useCollectorRoute;
