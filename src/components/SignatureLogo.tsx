import React from 'react';

interface SignatureLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const SignatureLogo: React.FC<SignatureLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const dimensions = {
    sm: { icon: 32, text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 42, text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 56, text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 84, text: 'text-4xl', sub: 'text-sm' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Clean LC Monogram with Sparkle Star and Blue-to-Purple Gradient */}
      <div 
        className="relative flex items-center justify-center shrink-0 drop-shadow-md"
        style={{ width: dimensions.icon, height: dimensions.icon }}
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full overflow-visible transition-transform duration-300 hover:scale-105"
        >
          <defs>
            <linearGradient id="navBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="navSparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
            <filter id="navGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Squircle Glass Frame with gradient border */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="24"
            fill="#0F172A"
            stroke="url(#navBrandGrad)"
            strokeWidth="3.5"
            className="transition-all duration-300"
          />

          {/* Subtle inner ambient glow */}
          <circle cx="50" cy="50" r="32" fill="url(#navBrandGrad)" opacity="0.18" />

          {/* Stylized Modern Letter 'L' */}
          <path
            d="M 28 26 L 28 68 Q 28 75 36 75 L 68 75"
            fill="none"
            stroke="url(#navBrandGrad)"
            strokeWidth="9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Stylized Intertwining Letter 'C' */}
          <path
            d="M 78 36 Q 44 26 40 50 Q 36 74 68 75"
            fill="none"
            stroke="url(#navBrandGrad)"
            strokeWidth="9"
            strokeLinecap="round"
          />

          {/* Signature Creative Sparkle Star */}
          <g transform="translate(76, 26)">
            <path
              d="M 0 -11 Q 0 0 11 0 Q 0 0 0 11 Q 0 0 -11 0 Q 0 0 0 -11 Z"
              fill="url(#navSparkleGrad)"
              filter="url(#navGlow)"
            />
            <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
          </g>

          {/* Miniature Satellite Sparkle */}
          <g transform="translate(26, 75) scale(0.35)">
            <path
              d="M 0 -9 Q 0 0 9 0 Q 0 0 0 9 Q 0 0 -9 0 Q 0 0 0 -9 Z"
              fill="#38BDF8"
            />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span 
              className={`font-bold tracking-tight text-white font-['Outfit'] ${dimensions.text}`}
            >
              Logo<span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Craft</span>
            </span>
            <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm shadow-blue-500/20">
              AI
            </span>
          </div>
          <span className={`font-semibold tracking-[0.2em] text-slate-400 uppercase font-['Inter'] mt-1 ${dimensions.sub}`}>
            Brand Studio
          </span>
        </div>
      )}
    </div>
  );
};
