export type ViewState = 'home' | 'stats' | 'leaderboard' | 'guides';

interface NavigationProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  return (
    <div className="w-full flex justify-center z-50 px-0">
      <div
        className={`grid grid-cols-4 w-full glassPanel border-t border-x border-white/10 overflow-hidden transition-colors duration-500 !rounded-none`}
      >
        <NavButton
          active={currentView === 'home'}
          onClick={() => onViewChange('home')}
          label="Ship"
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

const NavButton = ({ active, onClick, label, icon }: NavButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        font-bree flex flex-col items-center justify-center py-3 px-1 transition-all duration-300 relative group cursor-pointer border-t-2
        ${
          active
            ? `border-opacity-100 border-orange-400 bg-orange-800/20`
            : 'border-transparent bg-transparent'
        }
      `}
    >
      <img
        src={icon}
        alt={label}
        className={`
          h-6 w-6 object-contain mb-1 transition-transform duration-300
          ${active ? 'scale-110' : 'opacity-80 group-hover:opacity-100 group-hover:scale-105'}
        `}
      />

      <span className="text-xs uppercase font-bold tracking-wider">{label}</span>
    </button>
  );
};
