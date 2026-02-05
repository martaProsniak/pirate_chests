import { useEffect, useState } from 'react';
import { UserStats } from '../../../shared/types/api';
import { TreasureKind } from '../../../shared/types/game';
import { usePirateChestAPI } from '../../hooks/usePirateChestApi'; // Import typu

const formatScore = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

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
      <div className="rounded-lg p-4 w-full min-h-[200px] flex items-center justify-center shadow-lg">
        <div className="text-orange-800 text-base animate-pulse italic font-bold">
          Counting yer booty...
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-lg p-4 w-full text-center shadow-lg">
        <div className="text-orange-900 font-pirate text-xl">
          No records found in the captains log!
        </div>
      </div>
    );
  }

  const treasureOrder: TreasureKind[] = ['chest', 'gold', 'fish', 'bomb'];

  return (
    <div className="rounded-xl p-4 w-full max-w-2xl mx-auto shadow-xl flex flex-col gap-4 animate-fade-in">
      <div className="flex flex-col items-center justify-center py-2 border-b border-orange-200/50">
        <h2 className="text-orange-900/70 font-pirate text-2xl drop-shadow-sm mb-0">
          Yer Total Loot
        </h2>
        <span className="text-orange-800 font-bree text-xl leading-tight drop-shadow-md tracking-wide">
        {formatScore(stats.score)}
      </span>

        <div className="mt-2 bg-orange-200/40 px-3 py-1 rounded-full border border-orange-300/40">
        <span className="text-orange-900 text-xs font-bold uppercase tracking-widest">
          Voyages Sailed: {stats.gamesPlayed}
        </span>
        </div>
      </div>

      <div>
        <h4 className="text-orange-800 font-pirate text-lg mb-3 text-center opacity-90">
          Plundered Items
        </h4>

        <div className="grid grid-cols-2 gap-3">
          {treasureOrder.map((kind) => (
            <div
              key={kind}
              className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/50 border border-orange-200/60 shadow-sm hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src={`/images/${kind}.png`}
                  alt={kind}
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <span className="text-orange-900 font-bree text-xl">
              x{formatScore(stats.findings[kind])}
            </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
