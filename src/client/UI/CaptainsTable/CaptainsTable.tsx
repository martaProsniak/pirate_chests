import { useEffect, useState } from 'react';
import { usePirateChestAPI } from '../../hooks/usePirateChestApi';
import { LeaderboardEntry } from '../../../shared/types/api';
import { context } from '@devvit/web/client';

interface CaptainsTableProps {
  limit?: number;
  className?: string;
}

export const CaptainsTable = ({ limit = 5, className = '' }: CaptainsTableProps) => {
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

  return (
    <div className={`bg-black/20 rounded-lg p-3 border border-white/10 ${className}`}>
      <h4 className="text-amber-200 font-pirate text-xl mb-2 border-b border-white/10 pb-1 flex justify-between items-end">
        <span>Captains Table</span>
      </h4>

      {loading ? (
        <div className="text-stone-400 text-xs py-2 animate-pulse italic">Scouting results...</div>
      ) : entries.length > 0 ? (
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
              <div className="text-center text-white/20 text-xs leading-[0.5rem] mt-1 mb-1">...</div>
              <LeaderboardRow
                entry={userEntry}
                isHighlighted={true}
              />
            </>
          )}

        </div>
      ) : (
        <div className="text-stone-300 text-xs py-2 italic">Be the first captain today!</div>
      )}
    </div>
  );
};

const LeaderboardRow = ({ entry, isHighlighted }: { entry: LeaderboardEntry; isHighlighted: boolean }) => {
  return (
    <div className={`flex justify-between items-center text-xs sm:text-sm px-2 py-1 w-full h-full rounded ${
      isHighlighted
        ? 'bg-amber-900/40 border border-amber-500/30'
        : 'odd:bg-white/5 border border-transparent'
    }`}>
      <div className="flex gap-2 items-center">
        <span className={`font-bold w-6 text-right ${isHighlighted ? 'text-amber-300' : 'text-amber-500'}`}>
          {entry.rank}.
        </span>
        <span className={`font-bold truncate max-w-[200px] ${isHighlighted ? 'text-amber-100' : 'text-stone-300'}`}>
          {entry.username}
        </span>
      </div>
      <span className={`font-mono font-bold ${isHighlighted ? 'text-amber-300' : 'text-amber-400'}`}>
        {entry.score}
      </span>
    </div>
  );
};
