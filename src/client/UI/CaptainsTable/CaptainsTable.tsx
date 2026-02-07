import { useEffect, useState } from 'react';
import { usePirateChestAPI } from '../../hooks/usePirateChestApi';
import { LeaderboardEntry } from '../../../shared/types/api';
import { context } from '@devvit/web/client';
import { Header } from '../ViewComponents';

interface CaptainsTableProps {
  limit?: number;
  className?: string;
  variant?: 'default' | 'endgame';
}

export const CaptainsTable = ({
  limit = 5,
  className = '',
  variant = 'default',
}: CaptainsTableProps) => {
  const { getLeaderboard } = usePirateChestAPI();
  const { username } = context;

  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [userEntry, setUserEntry] = useState<LeaderboardEntry | null>(null);
  const [loading, setLoading] = useState(true);

  const backgroundStyle = variant === 'default' ? {} : {
    borderImageSource: 'url("/images/banner_hud.png")',
    borderImageSlice: '96 fill',
    borderWidth: '20px',
    borderStyle: 'solid',
    background: 'none',
    filter: 'sepia(0.2)'
  }

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
          {entries.map((entry) => (
            <LeaderboardRow
              key={entry.rank}
              entry={entry}
              isHighlighted={entry.username === username}
              variant={variant}
            />
          ))}

          {userEntry && !isUserInTop && (
            <>
              <div className="text-center text-xs leading-[0.5rem] mt-1 mb-1 text-amber-400">
                ...
              </div>
              <LeaderboardRow entry={userEntry} isHighlighted={true} variant={variant} />
            </>
          )}
        </div>
      );
    }

    if (variant === 'endgame') {
      return (
        <div className="font-bree text-xs py-2 italic text-center font-bold text-amber-800">
          Ye set the bar! First captain on these lands!
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
    <div className={`w-full ${className}`} style={{ ...backgroundStyle }}>
      <div className={variant === 'default' ? 'mb-2 pb-1' : 'py-2'}>
        <Header>Captains Table</Header>
      </div>
      {renderContent()}
    </div>
  );
};

const LeaderboardRow = ({
  entry,
  isHighlighted,
  variant = 'default',
}: {
  entry: LeaderboardEntry;
  isHighlighted: boolean;
  variant: 'default' | 'endgame';
}) => {
  return (
    <div
      className={`flex justify-between items-center text-sm sm:text-base py-2 w-full rounded-md transition-colors ${
        isHighlighted
          ? `${variant === 'default' ? 'bg-amber-100 border border-amber-300 text-amber-900 px-3' : 'text-lime-700 font-bold'} `
          : `${variant === 'default' && 'bg-white odd:bg-amber-100 border border-amber-100 px-3'} text-amber-900`
      } font-bree`}
    >
      <div className="flex gap-2 items-center">
        <span className="font-bree w-6 text-right shrink-0">{entry.rank}.</span>
        <span className="font-bold truncate grow">{entry.username}</span>
      </div>
      <span className={`font-bree font-bold  shrink-0 ${(isHighlighted && variant === 'default') && 'text-amber-900'} ${(isHighlighted && variant === 'endgame') && 'text-lime-700'}`}>{entry.score}</span>
    </div>
  );
};
