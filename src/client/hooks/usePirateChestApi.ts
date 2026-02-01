import { useState, useCallback } from 'react';
import {
  InitResponse,
  DailyChallengeResponse,
  SubmitScoreRequest,
  SubmitScoreResponse,
  LeaderboardResponse, PracticeGameResponse,
} from '../../shared/types/api';

export const usePirateChestAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(async <T>(endpoint: string, options?: RequestInit): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        ...options,
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      return data as T;
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const initApp = useCallback(async () => {
    return await request<InitResponse>('/api/init');
  }, [request]);

  const getDailyChallenge = useCallback(async () => {
    return await request<DailyChallengeResponse>('/api/daily-challenge');
  }, [request]);

  const getPracticeChallenge = useCallback(async () => {
    return await request<PracticeGameResponse>('/api/practice-challenge');
  }, [request]);

  const submitScore = useCallback(async (data: SubmitScoreRequest) => {
    return await request<SubmitScoreResponse>('/api/submit-score', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }, [request]);

  const getLeaderboard = useCallback(async () => {
    return await request<LeaderboardResponse>('/api/leaderboard');
  }, [request]);

  return {
    loading,
    error,
    initApp,
    getDailyChallenge,
    getPracticeChallenge,
    submitScore,
    getLeaderboard
  };
};
