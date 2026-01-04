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
  const handleLockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLockToggle) {
      onLockToggle(chord);
    }
  };

  return (
    <div className="relative w-full h-full group" style={{ pointerEvents: 'auto', isolation: 'isolate' }}>
      {/* Lock Button - Completely isolated, outside card bounds, highest priority */}
      {onLockToggle && (
        <div
          className="absolute -top-3 -right-3 z-[999999]"
          style={{ 
            pointerEvents: 'auto',
            zIndex: 999999,
            isolation: 'isolate'
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
          <button
            type="button"
            className="w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 active:scale-90 cursor-pointer shadow-2xl backdrop-blur-md"
            data-locked={isLocked ? 'true' : 'false'}
            title="Lock as main chord"
            aria-label="Lock as main chord"
            style={{ 
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 999999,
              width: '3rem',
              height: '3rem',
              borderRadius: '9999px',
              ...(isLocked 
                ? isDistorted
                  ? { 
                      border: '2px solid #ef4444',
                      backgroundColor: 'rgba(239, 68, 68, 0.95)', 
                      color: '#fce7f3'
                    }
                  : { 
                      border: '2px solid #06b6d4',
                      backgroundColor: 'rgba(6, 182, 212, 0.95)', 
                      color: '#cffafe'
                    }
                : isDistorted
                  ? {
                      border: '2px solid rgba(127, 29, 29, 0.6)',
                      backgroundColor: 'rgba(30, 7, 7, 0.9)',
                      color: '#fb7185'
                    }
                  : {
                      border: '2px solid rgba(82, 82, 82, 0.6)',
                      backgroundColor: 'rgba(23, 23, 23, 0.9)',
                      color: '#a3a3a3'
                    }
              )
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
          <svg 
            className={`w-5 h-5 transition-transform pointer-events-none ${isLocked ? '' : 'opacity-70'}`} 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            {isLocked ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            )}
            </svg>
          </button>
        </div>
      )}

      {/* Main Card */}
      <div
        className="relative overflow-visible p-6 text-left transition-all duration-200 group w-full h-full flex flex-col justify-between"
        style={{ 
          pointerEvents: 'auto',
          ...(isLocked
            ? isDistorted
              ? {
                  border: '1px solid #ef4444',
                  backgroundColor: 'rgba(30, 7, 7, 0.2)',
                  boxShadow: '0 0 20px rgba(225, 29, 72, 0.4)'
                }
              : {
                  border: '1px solid #06b6d4',
                  backgroundColor: 'rgba(8, 47, 73, 0.2)',
                  boxShadow: '0 0 20px rgba(8, 145, 178, 0.4)'
                }
            : isDistorted
              ? {
                  border: '1px solid rgba(127, 29, 29, 0.2)'
                }
              : {
                  border: '1px solid rgba(115, 115, 115, 0.2)'
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
        {/* Background Number Faded */}
        <span className="absolute -right-4 -bottom-8 text-9xl font-['Oswald'] font-bold text-white opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.07] transition-opacity">
          {chord.id.substring(0, 2).toUpperCase()}
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
          className="relative z-10 w-full text-left active:scale-[0.98] transition-transform flex-1 flex flex-col"
          style={{ pointerEvents: 'auto' }}
        >
        <div className="relative z-10 w-full">
          <h3 className={`font-['Oswald'] text-2xl uppercase tracking-wide mb-1 ${isDistorted ? 'group-hover:text-rose-400' : 'group-hover:text-cyan-400'}`}>
            {chord.name}
          </h3>
          <p className="font-['Share_Tech_Mono'] text-xs text-neutral-500 mb-4 tracking-wider">
            {chord.subtext}
          </p>
          
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