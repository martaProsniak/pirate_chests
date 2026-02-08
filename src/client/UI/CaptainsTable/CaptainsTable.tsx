import { useEffect, useState } from 'react';
import { usePirateChestAPI } from '../../hooks/usePirateChestApi';
import { LeaderboardEntry } from '../../../shared/types/api';
import { context } from '@devvit/web/client';
import { Header } from '../ViewComponents';
import { formatScore, formatters } from '../../utils/formatters';

interface CaptainsTableProps {
  period: 'daily' | 'weekly';
  limit?: number;
  className?: string;
}

export const CaptainsTable = ({
    period,
    limit = 10,
    className = '',
  }: CaptainsTableProps) => {
  const { getLeaderboard } = usePirateChestAPI();
  const { username } = context;

  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userEntry, setUserEntry] = useState<LeaderboardEntry | null>(null);
  const [dateLabel, setDateLabel] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getLeaderboard(period, limit);
        if (data && mounted) {
          setEntries(data.entries);
          setUserEntry(data.userEntry || null);
          setDateLabel(data.dateLabel);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [getLeaderboard, limit, period]);

  const isUserInTop = userEntry && entries.some((e) => e.rank === userEntry.rank);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-4 opacity-70">
          <div className="animate-spin text-xl mb-1">☠️</div>
          <div className="font-bree text-xs text-amber-900">Scouting...</div>
        </div>
      );
    }

    if (entries.length > 0) {
      return (
        <div className="w-full flex flex-col gap-1">
          <div className="flex justify-between items-center px-2 pb-1 border-b border-amber-900/10 text-[10px] font-bold text-amber-900/50 uppercase tracking-wider w-full">
            <span className="w-5 text-center shrink-0">#</span>
            <span className="grow text-left">Captain</span>
            <div className="flex gap-2 items-center justify-end shrink-0">
              <span className="w-10 text-right">Time</span>
              <span className="w-10 text-right">Loot</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            {entries.map((entry) => (
              <LeaderboardRow
                key={entry.rank}
                entry={entry}
                isHighlighted={entry.username === username}
              />
            ))}
          </div>

          {userEntry && !isUserInTop && (
            <>
              <div className="text-center text-amber-900/40 font-bold py-0.5 text-[10px] tracking-widest">
                • • •
              </div>
              <LeaderboardRow entry={userEntry} isHighlighted={true} />
            </>
          )}
        </div>
      );
    }

    return (
      <div className="py-4 text-center">
        <p className="font-bree text-amber-800 text-sm mb-1">Log Empty!</p>
        <p className="text-xs text-amber-900/70">Be the first legend.</p>
      </div>
    );
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <div className="mb-2 flex flex-col items-center text-center w-full">
        <div className="mb-1">
          <Header>{period === 'daily' ? 'Raid Log' : 'Voyage Log'}</Header>
        </div>

        {!loading && dateLabel && (
          <div className="font-bree text-amber-900/60 text-[10px] pb-1 flex items-center gap-1">
            <span>⚔️ Best Captains of {dateLabel} ⚔️</span>
          </div>
        )}
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
      className={`
        relative flex items-center justify-between py-1 px-2 rounded-md transition-all w-full
        ${
        isHighlighted
          ? 'bg-gradient-to-r from-amber-200 to-amber-100 border border-amber-300 shadow-sm'
          : 'bg-white odd:bg-amber-50 border border-amber-100/50 shadow-sm'
      }
      `}
    >
      <div
        className={`w-5 text-center font-bold text-xs shrink-0 font-bree ${
          isHighlighted ? 'text-amber-900' : 'text-amber-900/60'
        }`}
      >
        {entry.rank}
      </div>

      <div className="grow min-w-0 pr-1 text-left">
        <div
          className={`truncate text-xs font-bree ${
            isHighlighted ? 'text-amber-900' : 'text-amber-800'
          }`}
        >
          {entry.username}
        </div>
      </div>

      <div className="flex gap-2 items-center justify-end shrink-0">
        <div
          className={`w-10 text-right text-[10px] font-bree ${
            isHighlighted ? 'text-amber-900 font-bold' : 'text-amber-900/60'
          }`}
        >
          {formatters(entry.time)}
        </div>
        <div
          className={`w-10 text-right font-bold text-xs font-bree ${
            isHighlighted ? 'text-amber-900' : 'text-amber-800'
          }`}
        >
          {formatScore(entry.score)}
        </div>
      </div>
    </div>
  );
};
