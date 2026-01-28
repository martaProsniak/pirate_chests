export const NewMenu = () => {

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4 gap-4 w-full"
         style={{
           backgroundImage: 'url("/images/wood.png")',
           backgroundRepeat: 'repeat',
           backgroundSize: '512px auto',
         }}
    >
      <div className="flex flex-col items-center w-full">
        <div className="h-[100px] w-full"
             style={{
               backgroundImage: 'url("/images/logo.png")',
               backgroundSize: '188px auto',
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
      <div className="h-full w-full py-12 px-8 grow max-w-[340px] flex flex-col items-center justify-center"
           style={{
             backgroundImage: 'url("/images/banner_paper.png")',
             backgroundSize: '100% 100%',
             backgroundRepeat: 'no-repeat',
           }}
      >
        <button>Start searching!</button>
      </div>
      <div className="text-amber-100">
        Pomelo
      </div>
    </div>
  )
}
