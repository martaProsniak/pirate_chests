import { useState } from 'react';
import { usePirateChestAPI } from '../hooks/usePirateChestApi';
import { SubmitScoreRequest } from '../../shared/types/api';

export const Menu = () => {
  const { initApp, getDailyChallenge, submitScore, getLeaderboard, loading, error } = usePirateChestAPI();
  const [lastResponse, setLastResponse] = useState<string>('Oczekiwanie na test...');

  const logResponse = (label: string, data: any) => {
    console.log(`[TEST] ${label}:`, data);
    setLastResponse(`${label}:\n${JSON.stringify(data, null, 2)}`);
  };

  const handleInit = async () => {
    const data = await initApp();
    logResponse('Init Response', data);
  };

  const handleGetDaily = async () => {
    const data = await getDailyChallenge();
    logResponse('Daily Challenge Data', data);
  };

  const handleSimulateWin = async () => {
    const dummyData: SubmitScoreRequest = {
      isDaily: true,
      isWin: true,
      moves: 15,
      score: 500,
      attempt: 1,
      findings: {
        chest: 5,
        gold: 150,
        bomb: 2
      }
    };

    const data = await submitScore(dummyData);
    logResponse('Submit Score (WIN)', data);
  };

  const handleSimulateLoss = async () => {
    const dummyData: SubmitScoreRequest = {
      isDaily: false,
      isWin: false,
      moves: 5,
      score: 50,
      attempt: 1,
      findings: {
        chest: 1,
        gold: 10,
        bomb: 1
      }
    };

    const data = await submitScore(dummyData);
    logResponse('Submit Score (LOSS)', data);
  };

  const handleGetLeaderboard = async () => {
    const data = await getLeaderboard();
    logResponse('Leaderboard', data);
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen font-mono text-sm">
      <h1 className="text-xl font-bold mb-4 text-yellow-500">🛠️ API Test Dashboard</h1>

      {error && (
        <div className="bg-red-900/50 border border-red-500 p-2 mb-4 rounded text-red-200">
          🚨 ERROR: {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={handleInit}
          disabled={loading}
          className="px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded disabled:opacity-50"
        >
          1. Init App
        </button>

        <button
          onClick={handleGetDaily}
          disabled={loading}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded disabled:opacity-50"
        >
          2. Get Daily (Seed)
        </button>

        <button
          onClick={handleSimulateWin}
          disabled={loading}
          className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded disabled:opacity-50"
        >
          3. Submit WIN (Daily)
        </button>

        <button
          onClick={handleSimulateLoss}
          disabled={loading}
          className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded disabled:opacity-50"
        >
          4. Submit LOSS (Practice)
        </button>

        <button
          onClick={handleGetLeaderboard}
          disabled={loading}
          className="px-4 py-2 bg-yellow-700 hover:bg-yellow-600 rounded disabled:opacity-50"
        >
          5. Get Leaderboard
        </button>
      </div>

      <div className="bg-black/50 p-4 rounded border border-gray-700 relative">
        <span className="absolute top-2 right-2 text-xs text-gray-500">RESPONSE LOG</span>
        {loading ? (
          <div className="animate-pulse text-blue-400">Loading data from Reddit/Redis...</div>
        ) : (
          <pre className="whitespace-pre-wrap break-all text-green-400">
            {lastResponse}
          </pre>
        )}
      </div>
    </div>
  );
};
