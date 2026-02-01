export interface SplashFooterProps {
  username: string | undefined;
  totalGold: number;
}

export const SplashFooter = ({username, totalGold}: SplashFooterProps) => {

  return (
    <footer className="text-amber-100 w-full font-indie p-1 bg-amber-950/60 text-sm font-bold shrink-0">
      {username ? (
        <div className=" flex flex-row items-center justify-center gap-0">
          <span>Ahoy, u/{username}! Ya got {totalGold}</span>
          <div className="size-5">
            <img src="/images/money.png" alt="loot" className="w-full h-full object-contain" />
          </div>
        </div>
      ) : <p className="w-full text-center">
        Ahoy, Matey!
      </p>}
    </footer>
  )
}
