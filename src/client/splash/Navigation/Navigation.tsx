export type ViewState = 'home' | 'stats' | 'leaderboard' | 'guides' | 'settings';

interface NavigationProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  return (
    <div className="w-full flex justify-center z-50">
      <div className="grid grid-cols-5 w-11/12 max-w-2xl bg-stone-900/95 backdrop-blur-xl rounded-2xl border border-sky-900/50 shadow-2xl overflow-hidden ring-1 ring-sky-500/20">
        <NavButton
          active={currentView === 'home'}
          onClick={() => onViewChange('home')}
          label="Home"
          icon="/images/ship.png"
        />
        <NavButton
          active={currentView === 'stats'}
          onClick={() => onViewChange('stats')}
          label="Stats"
          icon="/images/chest.png"
        />
        <NavButton
          active={currentView === 'leaderboard'}
          onClick={() => onViewChange('leaderboard')}
          label="Rank"
          icon="/images/gold.png"
        />
        <NavButton
          active={currentView === 'guides'}
          onClick={() => onViewChange('guides')}
          label="Guide"
          icon="/images/map.png"
        />
        <NavButton
          active={currentView === 'settings'}
          onClick={() => onViewChange('settings')}
          label="Gear"
          icon="/images/hat.png"
        />
      </div>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}

const NavButton = ({ active, onClick, label, icon }: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`
      font-bree flex flex-col items-center justify-center py-3 px-1 transition-all duration-300 relative overflow-hidden group cursor-pointer
      ${active
      ? 'text-sky-300 bg-sky-800/60'
      : 'text-sky-400/70 hover:text-sky-200 hover:bg-sky-800/20'
    }
    `}
  >
    {active && (
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
    )}

    <img
      src={icon}
      alt={label}
      className={`h-6 w-6 object-contain mb-1 transition-transform duration-300 ${active ? 'scale-110 drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]' : 'opacity-50 group-hover:opacity-100 group-hover:scale-105'}`}
    />

    <span className="text-[10px] uppercase font-bold tracking-wider">{label}</span>
  </button>
);
