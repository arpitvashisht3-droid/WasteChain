import { useState, useCallback } from 'react';
import { aiApi } from '../api';

export const useWasteAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeImage = useCallback(async (imageFileOrUrl) => {
    setAnalyzing(true);
    setError(null);
    try {
      const response = await aiApi.analyzeWasteImage(imageFileOrUrl);
      if (response && response.analysis) {
        setResult(response.analysis);
        return response.analysis;
      } else {
        throw new Error('Invalid analysis response structure from AI service');
      }
    } catch (err) {
      console.error('[useWasteAnalysis] Error analyzing waste image:', err);
      setError(err.message || 'AI analysis failed. Please try again with a clear photo.');
      throw err;
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const resetAnalysis = useCallback(() => {
    setResult(null);
    setError(null);
    setAnalyzing(false);
  }, []);

  return {
    analyzing,
    result,
    error,
    analyzeImage,
    resetAnalysis
  };
};

export default useWasteAnalysis;
