import React from 'react';

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = 'h-8 w-auto', showText = true }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Nexgile Frosted Glass Emblem */}
      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-lg text-white shadow-md shadow-blue-500/25 shrink-0">
        N
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-bold text-lg leading-tight tracking-tight text-white">
            Nexgile
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-[0.14em] text-blue-400">
            WealthAgent
          </span>
        </div>
      )}
    </div>
  );
};
