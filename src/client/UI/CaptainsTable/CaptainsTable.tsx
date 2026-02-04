import { useEffect, useState } from 'react';
import { usePirateChestAPI } from '../../hooks/usePirateChestApi';
import { LeaderboardEntry } from '../../../shared/types/api';
import { context } from '@devvit/web/client';

interface CaptainsTableProps {
  limit?: number;
  className?: string;
  variant?: 'default' | 'endgame';
}

export const CaptainsTable = ({
                                limit = 5,
                                className = '',
                                variant = 'default'
                              }: CaptainsTableProps) => {
  const { getLeaderboard } = usePirateChestAPI();
  const { username } = context;

  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userEntry, setUserEntry] = useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getLeaderboard();
        if (data && mounted) {
          setEntries(data.entries.slice(0, limit));
          setUserEntry(data.userEntry || null);
        }
      } catch (e) {
        console.error("Failed to load leaderboard", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [getLeaderboard, limit]);

  const isUserInTop = userEntry && entries.some(e => e.rank === userEntry.rank);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-sky-600 text-xs py-2 animate-pulse italic">
          Scouting results...
        </div>
      );
    }

    if (entries.length > 0) {
      return (
        <div className="flex flex-col gap-1">
          {entries.map((entry) => (
            <LeaderboardRow
              key={entry.rank}
              entry={entry}
              isHighlighted={entry.username === username}
            />
          ))}

          {userEntry && !isUserInTop && (
            <>
              <div className="text-center text-stone-400 text-xs leading-[0.5rem] mt-1 mb-1">...</div>
              <LeaderboardRow
                entry={userEntry}
                isHighlighted={true}
              />
            </>
          )}
        </div>
      );
    }

    if (variant === 'endgame') {
      return (
        <div className="text-emerald-600 text-xs py-2 italic text-center font-bold">
          Ye set the bar! First captain on these lands!
        </div>
      );
    }

    return (
      <div className="text-stone-500 text-xs py-2 italic">
        Be the first to find today's loot!
      </div>
    );
  };

  return (
    <div className={`bg-white/20 rounded-lg p-3 border border-sky-100/50 ${className}`}>
      <h4 className="text-sky-800 font-pirate text-xl mb-2 border-b border-sky-200 pb-1 flex justify-between items-end">
        <span>Captains Table</span>
      </h4>
      {renderContent()}
    </div>
  );
};

const LeaderboardRow = ({ entry, isHighlighted }: { entry: LeaderboardEntry; isHighlighted: boolean }) => {
  return (
    <div className={`flex justify-between items-center text-xs sm:text-sm px-2 py-1 w-full h-full rounded transition-colors ${
      isHighlighted
        ? 'bg-sky-200/60 border border-sky-400/50 shadow-sm'
        : 'odd:bg-sky-50/40 border border-transparent'
    }`}>
      <div className="flex gap-2 items-center">
        <span className={`font-bold w-6 text-right ${isHighlighted ? 'text-sky-800' : 'text-sky-600'}`}>
          {entry.rank}.
        </span>
        <span className={`font-bold truncate max-w-[200px] ${isHighlighted ? 'text-sky-900' : 'text-stone-700'}`}>
          {entry.username}
        </span>
      </div>
      <span className={`font-mono font-bold ${isHighlighted ? 'text-sky-800' : 'text-sky-700'}`}>
        {entry.score}
      </span>
    </div>
  );
};
