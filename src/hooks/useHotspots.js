import { useState, useEffect, useCallback } from 'react';
import { hotspotApi } from '../api';

export const useHotspots = () => {
  const [hotspots, setHotspots] = useState([]);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHotspots = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await hotspotApi.getHotspots();
      setHotspots(data);
      if (data.length > 0) {
        // Auto-select critical or first hotspot
        const critical = data.find((h) => h.severity === 'Critical') || data[0];
        setSelectedHotspot(critical);
      }
    } catch (err) {
      console.error('[useHotspots] Error fetching hotspots:', err);
      setError(err.message || 'Failed to load AI waste hotspot predictions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHotspots();
  }, [fetchHotspots]);

  return {
    hotspots,
    selectedHotspot,
    setSelectedHotspot,
    isLoading,
    error,
    refetch: fetchHotspots
  };
};

export default useHotspots;
