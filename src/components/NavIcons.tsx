import React from "react";

// Grid icon (Dashboard) - 2x2 grid pattern
export const GridIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

// Paw print icon (Participants) - pixelated style: three circles on top, trapezoidal pad below
export const PawIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    {/* Three smaller circular shapes arranged horizontally at the top */}
    <circle cx="8" cy="8" r="2" />
    <circle cx="12" cy="7" r="2" />
    <circle cx="16" cy="8" r="2" />
    {/* Main pad below - simplified rounded shape */}
    <path d="M12 10c-3 0-5 2-5 5s2 5 5 5 5-2 5-5-2-5-5-5z" />
  </svg>
);

// Settings/Gear icon - six-petaled flower/gear with center square
export const GearIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Six rounded lobes/petals arranged in a circle */}
    <circle cx="12" cy="4" r="2.5" />
    <circle cx="19.07" cy="7.07" r="2.5" />
    <circle cx="19.07" cy="16.93" r="2.5" />
    <circle cx="12" cy="20" r="2.5" />
    <circle cx="4.93" cy="16.93" r="2.5" />
    <circle cx="4.93" cy="7.07" r="2.5" />
    {/* Small solid square in the center */}
    <rect x="10" y="10" width="4" height="4" />
  </svg>
);

// Studies icon (document/shield)
export const StudiesIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);
