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
  const [lockedParentId, setLockedParentId] = useState<string | null>(null);

  // Reset lock when tuning or vibe changes
  React.useEffect(() => {
    setLockedParentId(null);
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
    
    // Check if this is a related chord (child) - if so, find its parent
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
            // Found the parent, use parent's id
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
    // Otherwise, lock the new chord
    if (lockedParentId === targetParentId) {
      // Same chord clicked - unlock it
      setLockedParentId(null);
    } else {
      // Different chord clicked - lock it
      await playChord(chord);
      setLockedParentId(targetParentId);
    }
  };

  // Calculate which chords are locked (parent + its children)
  const lockedChordIds = React.useMemo(() => {
    if (!lockedParentId) {
      return new Set<string>();
    }
    
    const lockedIds = new Set<string>([lockedParentId]);
    
    // Add all children of the locked parent
    const baseChords = CHORD_LIBRARY[tuningMode][vibeMode];
    const transposedParents = baseChords.map(c => transposeChord(c, selectedRoot, tuningMode));
    const lockedParent = transposedParents.find(p => p.id === lockedParentId);
    
    if (lockedParent && lockedParent.relatedChords) {
      const transposedChildren = lockedParent.relatedChords.map(child => 
        transposeChord(child, selectedRoot, tuningMode)
      );
      transposedChildren.forEach(child => {
        lockedIds.add(child.id);
      });
    }
    
    return lockedIds;
  }, [selectedRoot, tuningMode, vibeMode, lockedParentId]);

  // Helper function to check if a chord is locked
  // Only the parent chord should be visually locked, not its children
  const isChordLocked = React.useCallback((chord: Chord) => {
    if (!lockedParentId) {
      return false;
    }
    // Only return true if this chord is the locked parent itself
    return chord.id === lockedParentId;
  }, [lockedParentId]);

  // Dynamically calculate displayed chords based on selected root, tuning, and vibe
  // When a chord is locked, show it in its original position + related chords in other positions
  const displayedChords = useMemo(() => {
    const baseChords = CHORD_LIBRARY[tuningMode][vibeMode];
    const transposedParents = baseChords.map(chord => transposeChord(chord, selectedRoot, tuningMode));
    
    // If a parent is locked, show it in its original position + related chords in other positions
    if (lockedParentId) {
      const lockedIndex = transposedParents.findIndex(c => c.id === lockedParentId);
      if (lockedIndex !== -1) {
        const lockedParent = transposedParents[lockedIndex];
        if (lockedParent && lockedParent.relatedChords) {
          // Transpose related chords
          const transposedChildren = lockedParent.relatedChords.map(child => 
            transposeChord(child, selectedRoot, tuningMode)
          );
          
          // Create new array with locked parent in original position
          const result = [...transposedParents];
          result[lockedIndex] = lockedParent; // Keep locked parent in original position
          
          // Fill other positions with related chords
          let childIndex = 0;
          for (let i = 0; i < result.length; i++) {
            if (i !== lockedIndex && childIndex < transposedChildren.length) {
              result[i] = transposedChildren[childIndex];
              childIndex++;
            }
          }
          
          return result;
        }
      }
    }
    
    // Default: show all 6 parents
    return transposedParents;
  }, [selectedRoot, tuningMode, vibeMode, lockedParentId]);

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