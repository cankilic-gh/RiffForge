import React, { useState, useMemo } from 'react';
import { audioEngine } from './services/audioEngine';
import { DistortionSwitch } from './components/DistortionSwitch';
import { ChordCard } from './components/ChordCard';
import { RootSelector } from './components/RootSelector';
import { TuningSelector } from './components/TuningSelector';
import { VibeSelector } from './components/VibeSelector';
import { CHORD_LIBRARY } from './constants';
import { Chord, TuningMode, VibeMode } from './types';
import { transposeChord } from './utils/musicTheory';

const App: React.FC = () => {
  const [isDistorted, setIsDistorted] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [activeChordId, setActiveChordId] = useState<string | null>(null);
  const [selectedRoot, setSelectedRoot] = useState('E'); // Default to Standard E
  const [tuningMode, setTuningMode] = useState<TuningMode>(TuningMode.STANDARD);
  const [vibeMode, setVibeMode] = useState<VibeMode>(VibeMode.MELODIC);
  const [lockedChordId, setLockedChordId] = useState<string | null>(null);
  const [lastDisplayedParentId, setLastDisplayedParentId] = useState<string | null>(null);
  const lastDisplayedChordsRef = React.useRef<Chord[] | null>(null);

  // Reset lock and last displayed parent when tuning or vibe changes
  React.useEffect(() => {
    setLockedChordId(null);
    setLastDisplayedParentId(null);
    lastDisplayedChordsRef.current = null;
  }, [tuningMode, vibeMode]);

  // Initialize Audio Context on first interaction
  const handleUserInteraction = async () => {
    if (!isAudioReady) {
      await audioEngine.init();
      setIsAudioReady(true);
    }
  };

  const setDistortionMode = async (shouldBeDistorted: boolean) => {
    // Only act if the mode is actually changing to prevent re-triggering same state unnecessarily
    if (isDistorted === shouldBeDistorted && isAudioReady) return;

    await handleUserInteraction();
    setIsDistorted(shouldBeDistorted);
    audioEngine.setDistortion(shouldBeDistorted);
  };

  const playChord = async (chord: Chord) => {
    await handleUserInteraction();
    audioEngine.playChord(chord.notes);
    
    // Visual trigger for active chord
    setActiveChordId(chord.id);
    setTimeout(() => setActiveChordId(null), 300);
  };

  const handleChordClick = async (chord: Chord) => {
    // Only play the chord - don't lock it
    // Locking only happens when lock button is pressed
    await playChord(chord);
  };

  const handleLockToggle = async (chord: Chord) => {
    // When lock button is pressed, toggle the lock state
    // If clicking the same locked chord, unlock it
    // If clicking a different chord, lock that one instead
    // For child chords, lock the child itself (not its parent)
    
    // Check if this is a related chord (child) - if so, find its parent for display purposes
    const baseChords = CHORD_LIBRARY[tuningMode][vibeMode];
    const transposedParents = baseChords.map(c => transposeChord(c, selectedRoot, tuningMode));
    
    // Check if chord.id exists in parent chords
    const isParentChord = transposedParents.some(c => c.id === chord.id);
    
    let targetParentId: string | null = null;
    
    if (isParentChord) {
      // It's a parent chord, use its id directly
      targetParentId = chord.id;
    } else {
      // It's a related chord (child), find which parent it belongs to
      for (const parent of transposedParents) {
        if (parent.relatedChords) {
          const transposedChildren = parent.relatedChords.map(child => 
            transposeChord(child, selectedRoot, tuningMode)
          );
          const childMatch = transposedChildren.find(c => c.id === chord.id);
          if (childMatch) {
            // Found the parent, use parent's id for display
            targetParentId = parent.id;
            break;
          }
        }
      }
      // Fallback: if we can't find the parent, just use the chord's id
      if (!targetParentId) {
        targetParentId = chord.id;
      }
    }
    
    // Toggle logic: if clicking the same locked chord, unlock it
    // Otherwise, lock the new chord (lock the chord itself, not its parent)
    if (lockedChordId === chord.id) {
      // Same chord clicked - unlock it
      // If this was the only locked chord, reset to initial state
      setLockedChordId(null);
      // Clear lastDisplayedParentId to return to initial state
      setLastDisplayedParentId(null);
      lastDisplayedChordsRef.current = null;
    } else {
      // Different chord clicked - lock it (lock the chord itself)
      await playChord(chord);
      setLockedChordId(chord.id);
      // Update last displayed parent to show compatible chords
      setLastDisplayedParentId(targetParentId);
    }
  };

  // Calculate which chords are locked (for internal use, not for display)
  const lockedChordIds = React.useMemo(() => {
    if (!lockedChordId) {
      return new Set<string>();
    }
    
    // Only the locked chord itself is considered locked
    return new Set<string>([lockedChordId]);
  }, [lockedChordId]);

  // Helper function to check if a chord is locked
  // The locked chord itself should be visually locked
  const isChordLocked = React.useCallback((chord: Chord) => {
    if (!lockedChordId) {
      return false;
    }
    // Return true if this chord is the locked chord
    return chord.id === lockedChordId;
  }, [lockedChordId]);

  // Dynamically calculate displayed chords based on selected root, tuning, and vibe
  // When a chord is locked, show it in its original position + related chords in other positions
  // When unlocked, keep showing the last displayed parent's compatible chords
  const displayedChords = useMemo(() => {
    const baseChords = CHORD_LIBRARY[tuningMode][vibeMode];
    const transposedParents = baseChords.map(chord => transposeChord(chord, selectedRoot, tuningMode));
    
    // Determine which parent to use for displaying compatible chords
    // If a chord is locked, find its parent (if it's a child) or use it directly (if it's a parent)
    // Otherwise, use lastDisplayedParentId if available
    let parentIdToUse: string | null = null;
    let lockedChord: Chord | null = null;
    let isLockedChordAChild = false;
    
    if (lockedChordId) {
      // Check if locked chord is a parent
      const lockedParent = transposedParents.find(c => c.id === lockedChordId);
      if (lockedParent) {
        parentIdToUse = lockedChordId;
        lockedChord = lockedParent;
      } else {
        // It's a child, find its parent and the child itself
        isLockedChordAChild = true;
        for (const parent of transposedParents) {
          if (parent.relatedChords) {
            const transposedChildren = parent.relatedChords.map(child => 
              transposeChord(child, selectedRoot, tuningMode)
            );
            const childMatch = transposedChildren.find(c => c.id === lockedChordId);
            if (childMatch) {
              parentIdToUse = parent.id;
              lockedChord = childMatch;
              break;
            }
          }
        }
      }
    } else {
      // No chord locked
      // If lastDisplayedParentId is also null, return to initial state (show all 6 parents)
      if (!lastDisplayedParentId) {
        // Reset lastDisplayedChordsRef to null when returning to initial state
        lastDisplayedChordsRef.current = null;
        // Return default: show all 6 parents
        return transposedParents;
      }
      // Otherwise, use last displayed parent to keep showing compatible chords
      parentIdToUse = lastDisplayedParentId;
    }
    
    if (parentIdToUse) {
      const parentIndex = transposedParents.findIndex(c => c.id === parentIdToUse);
      if (parentIndex !== -1) {
        const parent = transposedParents[parentIndex];
        if (parent && parent.relatedChords) {
          // Transpose related chords
          const transposedChildren = parent.relatedChords.map(child => 
            transposeChord(child, selectedRoot, tuningMode)
          );
          
          // If locked chord is a child, keep it in its original position
          if (isLockedChordAChild && lockedChord) {
            // Find the locked child's current position in last displayed chords
            let lockedChildIndex = -1;
            if (lastDisplayedChordsRef.current) {
              lockedChildIndex = lastDisplayedChordsRef.current.findIndex(c => c.id === lockedChordId);
            }
            
            // If we can't find it in last displayed, find it based on parent's children order
            if (lockedChildIndex === -1) {
              const childIndexInChildren = transposedChildren.findIndex(c => c.id === lockedChordId);
              // Children are typically placed in positions 1-5 (after parent at position 0)
              lockedChildIndex = childIndexInChildren >= 0 ? childIndexInChildren + 1 : 0;
            }
            
            // Ensure index is valid (0-5)
            lockedChildIndex = Math.max(0, Math.min(5, lockedChildIndex));
            
            // Create new array with locked child in its original position
            const result: Chord[] = new Array(6).fill(null) as any;
            result[lockedChildIndex] = lockedChord; // Keep locked child in its original position
            
            // Track which chords are already on screen and their positions
            const existingChordPositions = new Map<string, number>();
            if (lastDisplayedChordsRef.current) {
              lastDisplayedChordsRef.current.forEach((chord, index) => {
                if (chord && chord.id !== lockedChordId) {
                  existingChordPositions.set(chord.id, index);
                }
              });
            }
            
            // Add other children (excluding the locked child itself)
            const otherChildren = transposedChildren.filter(c => c.id !== lockedChordId);
            
            // Fill other positions: first preserve existing chord positions, then add new ones
            const chordsToAdd = [...otherChildren, parent];
            const usedPositions = new Set([lockedChildIndex]);
            
            // First, place chords that are already on screen in their original positions
            for (const chord of chordsToAdd) {
              const existingPosition = existingChordPositions.get(chord.id);
              if (existingPosition !== undefined && !usedPositions.has(existingPosition)) {
                result[existingPosition] = chord;
                usedPositions.add(existingPosition);
              }
            }
            
            // Then, fill remaining positions with chords that aren't on screen yet
            let chordIndex = 0;
            for (let i = 0; i < result.length; i++) {
              if (!result[i] && !usedPositions.has(i)) {
                // Find a chord that's not already placed
                while (chordIndex < chordsToAdd.length) {
                  const chord = chordsToAdd[chordIndex];
                  // Check if this chord is already placed
                  const alreadyPlaced = result.some(r => r && r.id === chord.id);
                  if (!alreadyPlaced) {
                    result[i] = chord;
                    usedPositions.add(i);
                    chordIndex++;
                    break;
                  }
                  chordIndex++;
                }
              }
            }
            
            // Fill any remaining empty slots with any available chords
            const allAvailableChords = [...transposedChildren, ...transposedParents];
            for (let i = 0; i < result.length; i++) {
              if (!result[i]) {
                const chord = allAvailableChords.find(c => !result.some(r => r && r.id === c.id));
                if (chord) {
                  result[i] = chord;
                }
              }
            }
            
            // Final safety check: ensure all slots are filled
            for (let i = 0; i < result.length; i++) {
              if (!result[i]) {
                // Use parent as fallback
                result[i] = parent;
              }
            }
            
            return result;
          } else {
            // Normal case: parent is locked, show parent + children
            // Preserve positions of chords that are already on screen
            const result: Chord[] = new Array(6).fill(null) as any;
            
            // Track existing chord positions
            const existingChordPositions = new Map<string, number>();
            if (lastDisplayedChordsRef.current) {
              lastDisplayedChordsRef.current.forEach((chord, index) => {
                if (chord) {
                  existingChordPositions.set(chord.id, index);
                }
              });
            }
            
            // Keep parent in its original position
            const parentExistingPosition = existingChordPositions.get(parent.id);
            if (parentExistingPosition !== undefined) {
              result[parentExistingPosition] = parent;
            } else {
              result[parentIndex] = parent; // Use original parent index if not found
            }
            
            // Fill other positions: first preserve existing chord positions, then add new ones
            const usedPositions = new Set<number>();
            if (parentExistingPosition !== undefined) {
              usedPositions.add(parentExistingPosition);
            } else {
              usedPositions.add(parentIndex);
            }
            
            // First, place children that are already on screen in their original positions
            for (const child of transposedChildren) {
              const existingPosition = existingChordPositions.get(child.id);
              if (existingPosition !== undefined && !result[existingPosition]) {
                result[existingPosition] = child;
                usedPositions.add(existingPosition);
              }
            }
            
            // Then, fill remaining positions with children that aren't on screen yet
            let childIndex = 0;
            for (let i = 0; i < result.length; i++) {
              if (!result[i] && childIndex < transposedChildren.length) {
                // Find a child that's not already placed
                while (childIndex < transposedChildren.length) {
                  const child = transposedChildren[childIndex];
                  const alreadyPlaced = result.some(r => r && r.id === child.id);
                  if (!alreadyPlaced) {
                    result[i] = child;
                    break;
                  }
                  childIndex++;
                }
                childIndex++;
              }
            }
            
            return result;
          }
        }
      }
    }
    
    // Default: show all 6 parents (only on initial load or when tuning/vibe changes)
    return transposedParents;
  }, [selectedRoot, tuningMode, vibeMode, lockedChordId, lastDisplayedParentId]);
  
  // Store displayed chords for position tracking (using ref to avoid re-renders)
  React.useEffect(() => {
    if (displayedChords.length > 0) {
      lastDisplayedChordsRef.current = displayedChords;
    }
  }, [displayedChords]);

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDistorted ? 'bg-[#080505]' : 'bg-[#0a0a0a]'}`}>
      
      {/* Background Ambiance / Noise */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Main Container - Expanded to max-w-7xl for wider layout */}
      <div className={`relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col min-h-screen ${isDistorted ? 'glitch-active' : ''}`}>
        
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-block mb-4">
            <h1 className={`
              text-5xl md:text-7xl font-['Oswald'] font-bold tracking-tighter uppercase
              ${isDistorted 
                ? 'text-transparent bg-clip-text bg-gradient-to-b from-rose-500 to-rose-900 drop-shadow-[0_2px_10px_rgba(225,29,72,0.5)]' 
                : 'text-neutral-100 drop-shadow-lg'
              }
            `}>
              Riff<span className={isDistorted ? 'text-rose-500' : 'text-cyan-500'}>Forge</span>
            </h1>
          </div>
          <p className="font-['Share_Tech_Mono'] text-neutral-500 tracking-widest text-sm uppercase">
            Context-Aware Sonic Prototyping
          </p>
        </header>

        {/* Control Center - Constrained width to keep UI tight while main grid is wide */}
        <div className="w-full max-w-4xl mx-auto">
          <section className="mb-12 sticky top-4 z-50 backdrop-blur-md bg-black/40 p-4 rounded-xl border border-white/5 shadow-2xl">
            <DistortionSwitch isDistorted={isDistorted} onChange={setDistortionMode} />
            
            {/* Status Indicators */}
            <div className="flex justify-between items-center mt-4 px-2 md:px-4 max-w-lg mx-auto">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isAudioReady ? 'bg-green-500 shadow-[0_0_5px_lime]' : 'bg-red-900'}`}></div>
                <span className="text-[10px] font-mono text-neutral-600 uppercase">Engine {isAudioReady ? 'Online' : 'Standby'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-neutral-600 uppercase">Output</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className={`w-1 h-3 ${isDistorted ? 'bg-rose-900' : 'bg-cyan-900'} ${i < 4 ? (isDistorted ? 'bg-rose-500' : 'bg-cyan-500') : ''}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Tuning, Vibe & Root Selection */}
          <section className="mb-8">
              <TuningSelector 
                tuning={tuningMode} 
                setTuning={setTuningMode} 
                isDistorted={isDistorted} 
              />
              
              <VibeSelector 
                vibe={vibeMode} 
                setVibe={setVibeMode} 
                isDistorted={isDistorted} 
              />
              
              <RootSelector 
                  selectedRoot={selectedRoot} 
                  onSelectRoot={setSelectedRoot} 
                  isDistorted={isDistorted}
              />
          </section>
        </div>

        {/* Chord Grid - Responsive: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20" style={{ isolation: 'isolate' }}>
          {displayedChords.map((chord) => {
            const locked = isChordLocked(chord);
            return (
              <div 
                key={chord.id} 
                className={`transition-transform duration-100 h-full relative ${activeChordId === chord.id ? 'scale-[0.98]' : ''}`}
                style={{ isolation: 'isolate', zIndex: 'auto' }}
              >
                <ChordCard 
                  chord={chord} 
                  isDistorted={isDistorted} 
                  onPlay={handleChordClick}
                  onLockToggle={handleLockToggle}
                  isLocked={locked}
                />
              </div>
            );
          })}
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-12 border-t border-neutral-900 text-center">
          <p className="text-neutral-600 text-xs font-mono">
            DESIGNED FOR METAL ARCHITECTS // V0.2.3 BETA
          </p>
        </footer>

      </div>
    </div>
  );
};

export default App;