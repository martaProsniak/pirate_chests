export interface FeedbackProps {
  score: number;
  rum: number;
}

export const Feedback = ({score, rum}: FeedbackProps) => {

  return (
    <div className="absolute -top-6 left-1/2 flex flex-col items-center min-w-max pointer-events-none z-99 animate-float-up">

      {score > 0 && (
        <div className="flex items-center gap-1 drop-shadow-md">
          <img src="/images/money.png" className="size-5 object-contain" alt="Rum" />
          <span className="text-yellow-400 font-bree font-bold text-lg text-shadow-black text-shadow-md">
                +{score}
          </span>
        </div>
      )}

      {rum > 0 && (
        <div className="flex items-center gap-1 mt-[-4px] drop-shadow-md">
          <img src="/images/rum.png" className="size-4 object-contain" alt="Rum" />
          <span className="text-pink-400 font-bree font-bold text-base text-shadow-black text-shadow-md whitespace-nowrap">
                +{rum}
          </span>
        </div>
      )}
    </div>
  )
}
