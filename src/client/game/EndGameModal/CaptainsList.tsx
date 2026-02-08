import { context } from '@devvit/web/client';
import { LeaderboardEntry, LeaderboardResponse } from '../../../shared/types/api';
import { Header } from '../../UI/ViewComponents';
import { formatTime } from '../../utils/formatTime';

interface CaptainsListProps {
  leaderboardData: LeaderboardResponse | null;
  className?: string;
}

export const CaptainsList = ({
   leaderboardData,
   className = '',
 }: CaptainsListProps) => {
  const { username } = context;

  const containerStyle = {
    borderImageSource: 'url("/images/banner_hud.png")',
    borderImageSlice: '96 fill',
    borderWidth: '20px',
    borderStyle: 'solid',
    background: 'none',
    filter: 'sepia(0.2)',
  };

  const renderContent = () => {
    if (!leaderboardData) {
      return (
        <div className="text-xs py-4 animate-pulse italic text-amber-700 text-center font-bree">
          Scouting results...
        </div>
      );
    }

    const { entries, userEntry } = leaderboardData;

    if (entries.length === 0) {
      return (
        <div className="font-bree text-xs py-2 italic text-center font-bold text-amber-800">
          Ye set the bar! First captain on these lands!
        </div>
      );
    }

    const isUserInTop = userEntry && entries.some(
      (e) => e.rank === userEntry.rank && e.username === userEntry.username
    );

    return (
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between px-2 text-[10px] text-amber-800/60 font-bold uppercase tracking-wider mb-1">
          <span>Captain</span>
          <div className="flex gap-4">
            <span>Time</span>
            <span>Score</span>
          </div>
        </div>

        {entries.map((entry) => (
          <LeaderboardRow
            key={`${entry.rank}-${entry.username}`}
            entry={entry}
            isHighlighted={entry.username === username}
          />
        ))}

        {userEntry && !isUserInTop && (
          <>
            <div className="text-center text-xs leading-[0.5rem] mt-1 mb-1 text-amber-400/50 select-none">
              • • •
            </div>
            <LeaderboardRow
              entry={userEntry}
              isHighlighted={true}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`} style={containerStyle}>
      <div className="py-2 mb-2 border-b border-amber-900/10">
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
      className={`
        flex justify-between items-center text-sm py-1.5 w-full rounded-md transition-colors font-bree px-2
        ${isHighlighted ? 'text-lime-700 font-bold bg-lime-900/5' : 'text-amber-900'}
      `}
    >
      <div className="flex gap-2 items-center min-w-0">
        <span className={`w-5 text-right shrink-0 ${isHighlighted ? 'opacity-100' : 'opacity-60'}`}>
          {entry.rank}.
        </span>
        <span className="truncate grow pr-2" title={entry.username}>
          {entry.username}
        </span>
      </div>

      <div className="flex gap-4 items-center shrink-0">
         <span className={`text-xs ${isHighlighted ? 'text-lime-600' : 'text-amber-800/70'}`}>
            {formatTime(entry.time)}
         </span>

        <span className="font-bold min-w-[30px] shrink-0 text-right">
            {entry.score}
         </span>
      </div>
    </div>
  );
};
