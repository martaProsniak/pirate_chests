interface IconProps {
  className?: string;
}

export const ChestIcon = ({ className = "w-[70%] h-[70%]" }: IconProps) => (
  <svg
    className={`${className} drop-shadow-sm`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 7L4 7" stroke="#5D4037" strokeWidth="2" strokeLinecap="round"/>
    <rect x="2" y="7" width="20" height="14" rx="2" fill="#8D6E63" stroke="#5D4037" strokeWidth="2"/>
    <path d="M2 11H22" stroke="#5D4037" strokeWidth="2"/>
    <rect x="9" y="9" width="6" height="4" rx="1" fill="#FFD700" stroke="#F57F17" strokeWidth="1"/>
    <circle cx="12" cy="11" r="1" fill="#F57F17"/>
  </svg>
);

export const GoldIcon = ({ className = "w-[60%] h-[60%]" }: IconProps) => (
  <svg
    className={`${className} drop-shadow-sm`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9" fill="#FFD700" stroke="#F9A825" strokeWidth="2"/>
    <circle cx="12" cy="12" r="6" stroke="#F9A825" strokeWidth="2" strokeDasharray="2 2"/>
    <path d="M12 8V16M10 10L14 14" stroke="#F57F17" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const FullScreenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
)

export const ReplayIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={`${className} drop-shadow-sm`}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);
