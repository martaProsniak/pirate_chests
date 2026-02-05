import { useEffect, useState } from 'react';
import { UserStats } from '../../../shared/types/api';
import { TreasureKind } from '../../../shared/types/game';
import { usePirateChestAPI } from '../../hooks/usePirateChestApi';
import { Header, ViewWrapper } from '../../UI/ViewComponents';

const formatScore = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
        console.error('Failed to load user stats', e);
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
      <ViewWrapper>
        <div className="w-full min-h-[150px] flex items-center justify-center">
          <div className="text-base text-amber-800 animate-pulse italic font-bold">
            Counting yer booty...
          </div>
        </div>
      </ViewWrapper>
    );
  }

  if (!stats) {
    return (
      <ViewWrapper>
        <div className="w-full text-center">
          <div className="font-pirate text-xl text-amber-900">
            No records found in the captains log!
          </div>
        </div>
      </ViewWrapper>
    );
  }

  const treasureOrder: TreasureKind[] = ['chest', 'gold', 'fish', 'bomb'];

  return (
    <ViewWrapper>
      <div className="flex flex-col items-center justify-center w-full py-2 border-b-2 border-amber-200">
        <Header>Yer Total Loot</Header>

        <span className="font-bree text-3xl leading-tight tracking-wide text-amber-950">
          {formatScore(stats.score)}
        </span>

        <div className="mt-3 px-4 py-1 rounded-full bg-amber-100 border border-amber-300">
          <span className="text-xs font-bold font-bree uppercase tracking-widest text-amber-900">
            Voyages Sailed: {stats.gamesPlayed}
          </span>
        </div>
      </div>

      <div className="w-full">
        <h4 className="font-pirate text-lg mb-3 text-center text-amber-800">Plundered Items</h4>

        <div className="grid grid-cols-2 gap-3 w-full">
          {treasureOrder.map((kind) => (
            <div
              key={kind}
              className="flex items-center justify-between px-4 py-3 rounded-lg bg-white border border-amber-200 shadow-sm"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src={`/images/${kind}.png`}
                  alt={kind}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bree text-xl text-amber-900">
                x{formatScore(stats.findings[kind])}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ViewWrapper>
  );
};
