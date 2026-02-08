import { useEffect, useState } from 'react';
import { usePirateChestAPI } from '../../hooks/usePirateChestApi';
import { LeaderboardEntry } from '../../../shared/types/api';
import { context } from '@devvit/web/client';
import { Header } from '../ViewComponents';
import { formatTime } from '../../utils/formatTime';

interface CaptainsTableProps {
  limit?: number;
  className?: string;
}

export const CaptainsTable = ({
    limit = 10,
    className = '',
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
        console.error('Failed to load leaderboard', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [getLeaderboard, limit]);

  const isUserInTop = userEntry && entries.some((e) => e.rank === userEntry.rank);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-xs py-2 animate-pulse italic text-amber-700 text-center">
          Scouting results...
        </div>
      );
    }

    if (entries.length > 0) {
      return (
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between px-3 text-[10px] text-amber-800/60 font-bold uppercase tracking-wider mb-1">
            <span>Captain</span>
            <div className="flex gap-4">
              <span>Time</span>
              <span>Score</span>
            </div>
          </div>

          {entries.map((entry) => (
            <LeaderboardRow
              key={entry.rank}
              entry={entry}
              isHighlighted={entry.username === username}
            />
          ))}

          {userEntry && !isUserInTop && (
            <>
              <div className="text-center text-xs leading-[0.5rem] mt-1 mb-1 text-amber-400">
                ...
              </div>
              <LeaderboardRow entry={userEntry} isHighlighted={true} />
            </>
          )}
        </div>
      );
    }

    return (
      <div className="text-xs py-2 italic font-bree text-amber-800 text-center">
        Be the first to find today's loot!
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-2 pb-1">
        <Header>Captains Table</Header>
      </div>
      {renderContent()}
    </div>
  );
};

const LeaderboardRow = ({
  entry,
  isHighlighted,
}: {
  entry: LeaderboardEntry;
  isHighlighted: boolean;
}) => {
  return (
    <div
      className={`flex justify-between items-center text-sm sm:text-base py-2 w-full rounded-md transition-colors ${
        isHighlighted
          ? 'bg-amber-100 border border-amber-300 text-amber-900 px-3'
          : 'bg-white odd:bg-amber-100 border border-amber-100 px-3 text-amber-900'
      } font-bree`}
    >
      <div className="flex gap-2 items-center min-w-0">
        <span className="font-bree w-6 text-right shrink-0">{entry.rank}.</span>
        <span className="font-bold truncate grow max-w-[100px] sm:max-w-[140px]">
          {entry.username}
        </span>
      </div>

      <div className="flex gap-3 items-center shrink-0">
        <span className="text-xs text-amber-800/70 font-normal">
          {formatTime(entry.time)}
        </span>
        <span className="font-bree font-bold min-w-[30px] text-right">{entry.score}</span>
      </div>
    </div>
  );
};
