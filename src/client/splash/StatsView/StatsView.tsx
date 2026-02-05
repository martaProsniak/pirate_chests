import { useEffect, useState } from 'react';
import { UserStats } from '../../../shared/types/api';
import { TreasureKind } from '../../../shared/types/game';
import { usePirateChestAPI } from '../../hooks/usePirateChestApi';

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
        <div className="text-base animate-pulse italic font-bold">
          Counting yer booty...
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-lg p-4 w-full text-center shadow-lg">
        <div className="font-pirate text-xl">
          No records found in the captains log!
        </div>
      </div>
    );
  }

  const treasureOrder: TreasureKind[] = ['chest', 'gold', 'fish', 'bomb'];

  return (
    <div className="rounded-xl p-4 w-full max-w-2xl mx-auto shadow-xl flex flex-col gap-4 animate-fade-in">
      <div className="flex flex-col items-center justify-center py-2 border-b">
        <h2 className="font-pirate text-2xl drop-shadow-sm mb-0">
          Yer Total Loot
        </h2>
        <span className="font-bree text-xl leading-tight drop-shadow-md tracking-wide">
          {formatScore(stats.score)}
        </span>

        <div className="mt-2 px-3 py-1 rounded-full border">
          <span className="text-xs font-bold font-bree uppercase tracking-widest">
            Voyages Sailed: {stats.gamesPlayed}
          </span>
        </div>
      </div>

      <div>
        <h4 className="font-pirate text-lg mb-3 text-center opacity-90">
          Plundered Items
        </h4>

        <div className="grid grid-cols-2 gap-3">
          {treasureOrder.map((kind) => (
            <div
              key={kind}
              // Usunięto bg-white, border-orange
              className="flex items-center justify-between px-4 py-3 rounded-lg border shadow-sm hover:scale-[1.02] transition-transform duration-200"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src={`/images/${kind}.png`}
                  alt={kind}
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <span className="font-bree text-xl">
                x{formatScore(stats.findings[kind])}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
