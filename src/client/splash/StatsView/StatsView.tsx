import { useEffect, useState } from 'react';
import { UserStats } from '../../../shared/types/api';
import { TreasureKind } from '../../../shared/types/game';
import { usePirateChestAPI } from '../../hooks/usePirateChestApi'; // Import typu

export const StatsView = () => {
  const { getUserStats } = usePirateChestAPI();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getUserStats();
        if (response && response.success && response.stats && mounted) {
          setStats(response.stats);
        }
      } catch (e) {
        console.error("Failed to load user stats", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [getUserStats]);


  if (loading) {
    return (
      <div className="bg-white/20 rounded-lg p-6 border border-orange-100/50 w-full min-h-[200px] flex items-center justify-center">
        <div className="text-orange-600 text-sm animate-pulse italic font-bold">
          Counting yer booty...
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white/20 rounded-lg p-6 border border-orange-100/50 w-full text-center">
        <div className="text-orange-800 font-pirate text-lg">
          No records found in the captains log!
        </div>
      </div>
    );
  }

  const treasureOrder: TreasureKind[] = ['chest', 'gold', 'fish', 'bomb'];

  return (
    <div className="bg-white/20 rounded-lg p-4 border border-orange-100/50 w-full max-w-2xl mx-auto shadow-sm flex flex-col gap-4 animate-fade-in">

      {/* HEADER */}
      <h2 className="text-orange-800 font-pirate text-2xl text-center border-b border-orange-200/60 pb-2 drop-shadow-sm">
        Your Lifetime Loot
      </h2>

      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 bg-orange-100/40 rounded border border-orange-200 p-3 flex flex-col items-center">
            <span className="text-orange-900/60 text-xs uppercase font-bold tracking-wider mb-1">
              Total Score
            </span>
          <span className="text-orange-800 font-bree text-3xl leading-none drop-shadow-sm">
              {stats.score}
            </span>
        </div>

        <div className="flex-1 bg-orange-100/40 rounded border border-orange-200 p-3 flex flex-col items-center">
             <span className="text-orange-900/60 text-xs uppercase font-bold tracking-wider mb-1">
              Voyages Sailed
            </span>
          <span className="text-orange-800 font-bree text-3xl leading-none drop-shadow-sm">
              {stats.gamesPlayed}
            </span>
        </div>
      </div>

      <div>
        <h4 className="text-orange-800/80 font-pirate text-lg mb-2 pl-1">
          Plundered Items
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {treasureOrder.map((kind) => (
            <div
              key={kind}
              className="flex justify-between items-center px-3 py-2 rounded bg-orange-50/40 border border-orange-200/30 hover:bg-orange-100/50 transition-colors"
            >
              <span className="text-orange-900 font-bold capitalize text-sm">
                {kind}
              </span>
              <span className="text-orange-700 font-bree text-lg">
                x{stats.findings[kind]}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
