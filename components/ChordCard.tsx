import React from 'react';
import { Chord } from '../types';

interface ChordCardProps {
  chord: Chord;
  isDistorted: boolean;
  onPlay: (chord: Chord) => void;
  onLockToggle?: (chord: Chord) => void;
  isLocked?: boolean;
}

export const ChordCard: React.FC<ChordCardProps> = ({ 
  chord, 
  isDistorted, 
  onPlay, 
  onLockToggle,
  isLocked = false 
}) => {
  return (
    <div className="relative w-full h-full group" style={{ pointerEvents: 'auto', isolation: 'isolate' }}>

      {/* Main Card */}
      <div
        className="relative overflow-hidden p-6 text-left transition-all duration-300 group w-full h-full flex flex-col justify-between"
        style={{ 
          pointerEvents: 'auto',
          ...(isLocked
            ? isDistorted
              ? {
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  background: 'linear-gradient(to bottom, rgba(225, 29, 72, 0.15) 0%, rgba(30, 7, 7, 0.25) 50%, rgba(30, 7, 7, 0.2) 100%)',
                  boxShadow: '0 -8px 25px rgba(225, 29, 72, 0.25), inset 0 0 40px rgba(225, 29, 72, 0.1)'
                }
              : {
                  border: '1px solid rgba(6, 182, 212, 0.5)',
                  background: 'linear-gradient(to bottom, rgba(8, 145, 178, 0.15) 0%, rgba(8, 47, 73, 0.25) 50%, rgba(8, 47, 73, 0.2) 100%)',
                  boxShadow: '0 -8px 25px rgba(8, 145, 178, 0.25), inset 0 0 40px rgba(8, 145, 178, 0.1)'
                }
            : isDistorted
              ? {
                  border: '1px solid rgba(127, 29, 29, 0.35)',
                  background: 'rgba(0, 0, 0, 0.1)'
                }
              : {
                  border: '1px solid rgba(115, 115, 115, 0.35)',
                  background: 'rgba(0, 0, 0, 0.05)'
                }
          )
        }}
        onClick={(e) => {
          // Prevent card click if clicking on lock button area
          const target = e.target as HTMLElement;
          if (target.closest('button[aria-label="Lock as main chord"]')) {
            e.stopPropagation();
            e.preventDefault();
            return;
          }
        }}
      >
        {/* Background Text Faded - First 2 letters of chord name */}
        <span className="absolute -right-4 -bottom-8 text-9xl font-['Oswald'] font-bold text-white opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.07] transition-opacity">
          {chord.name.substring(0, 2).toUpperCase()}
        </span>

        {/* Main Clickable Area - Exclude top-right corner for lock button */}
        <button
          type="button"
          onClick={(e) => {
            // Don't trigger if clicking on lock button
            const target = e.target as HTMLElement;
            const lockButton = target.closest('button[aria-label="Lock as main chord"]') || 
                              target.closest('div[class*="z-\\[999999\\]"]');
            if (lockButton) {
              e.stopPropagation();
              e.preventDefault();
              return;
            }
            onPlay(chord);
          }}
          className="relative z-10 w-full text-left flex-1 flex flex-col"
          style={{ pointerEvents: 'auto' }}
        >
        <div className="relative z-10 w-full">
          {/* Header with Title and Lock Switch */}
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1">
              <h3 className={`font-['Oswald'] text-2xl uppercase tracking-wide ${isDistorted ? 'group-hover:text-rose-400' : 'group-hover:text-cyan-400'}`}>
                {chord.name}
              </h3>
              <p className="font-['Share_Tech_Mono'] text-xs text-neutral-500 mb-4 tracking-wider">
                {chord.subtext}
              </p>
            </div>
            
            {/* Lock Button - Circular 3D Glass Style */}
            {onLockToggle && (
              <div
                className="relative shrink-0 ml-4"
                style={{ 
                  pointerEvents: 'auto',
                  zIndex: 10,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  e.nativeEvent.stopImmediatePropagation();
                  if (onLockToggle) {
                    onLockToggle(chord);
                  }
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                {/* Circular 3D Glass Button */}
                <button
                  type="button"
                  className={`
                    relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer
                  `}
                  data-locked={isLocked ? 'true' : 'false'}
                  title={isLocked ? "Unlock chord" : "Lock chord"}
                  aria-label={isLocked ? "Unlock chord" : "Lock chord"}
                  style={{ 
                    pointerEvents: 'auto',
                    position: 'relative',
                    zIndex: 10,
                    background: isLocked 
                      ? 'radial-gradient(circle at 30% 30%, rgba(30, 30, 30, 0.9), rgba(10, 10, 10, 0.95))'
                      : 'radial-gradient(circle at 30% 30%, rgba(40, 40, 40, 0.8), rgba(20, 20, 20, 0.9))',
                    boxShadow: isLocked
                      ? '0 0 0 1px rgba(239, 68, 68, 0.6), 0 0 20px rgba(239, 68, 68, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.5)'
                      : '0 0 0 1px rgba(100, 100, 100, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.05), inset 0 -1px 2px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    e.nativeEvent.stopImmediatePropagation();
                    if (onLockToggle) {
                      onLockToggle(chord);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    e.nativeEvent.stopImmediatePropagation();
                  }}
                >
                  {/* Glowing Ring when Locked */}
                  {isLocked && (
                    <div 
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.8), 0 0 15px rgba(239, 68, 68, 0.6), 0 0 30px rgba(239, 68, 68, 0.3)',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                      }}
                    />
                  )}
                  
                  {/* Lock Icon SVG */}
                  <svg 
                    className={`
                      w-4 h-4 transition-all duration-300 relative z-10
                      ${isLocked ? 'text-red-500' : 'text-neutral-400'}
                    `}
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    viewBox="0 0 24 24"
                    style={{
                      filter: isLocked 
                        ? 'drop-shadow(0 0 6px rgba(239, 68, 68, 1)) drop-shadow(0 0 12px rgba(239, 68, 68, 0.8))' 
                        : 'none',
                      transition: 'filter 0.3s ease'
                    }}
                  >
                    {isLocked ? (
                      // Locked icon (closed lock)
                      <>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </>
                    ) : (
                      // Unlocked icon (open lock)
                      <>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 9.33-2.5" />
                      </>
                    )}
                  </svg>
                  
                  {/* Top Highlight for 3D Effect */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full pointer-events-none"
                    style={{
                      background: isLocked
                        ? 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
                      top: '15%'
                    }}
                  />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-end justify-between mb-4">
            <p className="text-sm text-neutral-400 font-light leading-snug max-w-[80%]">
              {chord.description}
            </p>
            
            {/* Play Icon */}
            <div className={`
              shrink-0 w-8 h-8 flex items-center justify-center rounded-full border 
              ${isDistorted ? 'border-rose-900 text-rose-500' : 'border-neutral-700 text-neutral-500'}
              group-hover:border-current transition-colors
            `}>
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Fretboard Data (Technical look) - Pushed to bottom via flex layout */}
        <div className="relative z-10 w-full pt-3 border-t border-white/5 flex justify-between items-center mt-auto">
           <span className="font-mono text-[10px] text-neutral-600 opacity-60">TABLATURE</span>
           <span className={`font-mono text-sm tracking-[0.25em] font-bold ${
              isDistorted 
                ? 'text-rose-500 drop-shadow-[0_0_8px_rgba(225,29,72,0.6)]' 
                : 'text-cyan-500 drop-shadow-[0_0_8px_rgba(8,145,178,0.6)]'
           }`}>
              {chord.fretboard}
           </span>
        </div>
      </button>
      </div>
    </div>
  );
};