import { GuiButton } from '../UI/GUIButton';

export const NewMenu = () => {

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 gap-4 w-full"
         style={{
           backgroundImage: 'url("/images/wood.png")',
           backgroundRepeat: 'repeat',
           backgroundSize: '512px auto',
         }}
    >
      <div className="flex flex-col items-center w-full">
        <div className="h-[120px] w-full"
             style={{
               backgroundImage: 'url("/images/logo.png")',
               backgroundSize: 'contain',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
             }}
        >
          {/*<img*/}
          {/*  src="/images/logo.png"*/}
          {/*  alt="Pirate Sweeper Logo"*/}
          {/*  className="h-20 w-24 object-contain"*/}
          {/*/>*/}
          {/*<h1 className="font-bold text-4xl text-shadow-xs text-amber-100 text-shadow-amber-900">Pirate Chest</h1>*/}
        </div>
      </div>
      <div className="py-6 px-8 w-full max-w-[460px] flex flex-col items-center justify-center grow text-base font-normal"
           style={{
             backgroundImage: 'url("/images/scroll-big.png")',
             backgroundSize: '100% 100%',
             backgroundRepeat: 'no-repeat',
           }}
      >
        <p>
          Count steps to find treasures!
        </p>
        <p>
          Be careful of surrounding bombs!
        </p>
        <p>
          Moves costs rum. Don't ru dry!
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-full grow">
        <GuiButton image="menu_btn" label="Dig in!" variant="text" onClick={() => console.log("Dig in!")} />
        <div className="flex flex-row items-center">
          <GuiButton image="leadership_btn" label="Leaders" variant="icon" onClick={() => console.log("Leaders")} />
        </div>
      </div>
      <div className="text-amber-100">
        Pomelo
      </div>
    </div>
  )
}
