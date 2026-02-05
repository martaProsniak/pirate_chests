import styles from './ShipLoader.module.css';

export const ShipLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[60vh] gap-6">
      <div className="relative">
        <img
          src="/images/ship.png"
          alt="Loading..."
          className={`w-32 h-32 sm:w-40 sm:h-40 object-contain ${styles.animateRock} drop-shadow-xl`}
        />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/20 blur-md rounded-[100%]"></div>
      </div>
      <span className="font-pirate text-stone-100 text-lg tracking-widest animate-pulse drop-shadow-sm">
        Navigating to Treasure Island
      </span>
    </div>
  );
};
