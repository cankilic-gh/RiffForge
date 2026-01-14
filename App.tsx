import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioEngine } from './services/audioEngine';
import { DistortionSwitch } from './components/DistortionSwitch';
import { ChordCard } from './components/ChordCard';
import { RootSelector } from './components/RootSelector';
import { TuningSelector } from './components/TuningSelector';
import { VibeSelector } from './components/VibeSelector';
// Lazy load CHORD_LIBRARY to prevent blocking initial render
let CHORD_LIBRARY: any = null;
const getChordLibrary = async () => {
  if (!CHORD_LIBRARY) {
    const module = await import('./constants');
    CHORD_LIBRARY = module.CHORD_LIBRARY;
  }
  return CHORD_LIBRARY;
};

import { Chord, TuningMode, VibeMode } from './types';
import { transposeChord } from './utils/musicTheory';

const App: React.FC = () => {
  console.log('🎨 App component rendering...');
  
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
    console.log('🔄 Tuning or vibe changed, resetting locks');
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
    const library = await getChordLibrary();
    const baseChords = library[tuningMode][vibeMode];
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
      // Same chord clicked - unlock it, return to initial state
      setLockedChordId(null);
      setLastDisplayedParentId(null);
      lastDisplayedChordsRef.current = null;
      
      // Reload initial 6 chords (reuse already loaded library)
      setIsLoadingChords(true);
      const library = CHORD_LIBRARY || await getChordLibrary();
      const baseChords = library[tuningMode][vibeMode];
      const initialBatch = baseChords.slice(0, CHORDS_PER_BATCH);
      const transposed = initialBatch.map(c => transposeChord(c, selectedRoot, tuningMode));
      setDisplayedChords(transposed);
      setChordsToLoad(CHORDS_PER_BATCH);
      setIsLoadingChords(false);
    } else {
      // Different chord clicked - lock it and load related chords if needed
      await playChord(chord);
      setLockedChordId(chord.id);
      setLastDisplayedParentId(targetParentId);
      
      // Load related chords if this chord has them (5 chords)
      setIsLoadingChords(true);
      console.log('🔒 Checking for related chords...');
      
      // Find the original parent from baseChords (before transpose)
      const originalParent = baseChords.find(p => {
        const transposed = transposeChord(p, selectedRoot, tuningMode);
        return transposed.id === targetParentId || p.id === targetParentId;
      });
      
      if (originalParent && originalParent.relatedChords && originalParent.relatedChords.length >= RELATED_CHORDS_COUNT) {
        // Take first 5 related chords
        const relatedBatch = originalParent.relatedChords.slice(0, RELATED_CHORDS_COUNT);
        const transposedRelated = relatedBatch.map(relatedChord => 
          transposeChord(relatedChord, selectedRoot, tuningMode)
        );
        
        // Show locked parent + 5 related chords
        const lockedTransposed = transposeChord(originalParent, selectedRoot, tuningMode);
        setDisplayedChords([lockedTransposed, ...transposedRelated]);
        console.log('✅ Loaded', transposedRelated.length, 'related chords');
      } else {
        // No related chords or not enough, just show the locked chord
        const lockedTransposed = transposeChord(originalParent || chord, selectedRoot, tuningMode);
        setDisplayedChords([lockedTransposed]);
        console.log('ℹ️ No related chords to load');
      }
      setIsLoadingChords(false);
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

  // LAZY LOADING: Load chords progressively
  const [displayedChords, setDisplayedChords] = React.useState<Chord[]>([]);
  const [isLoadingChords, setIsLoadingChords] = React.useState(false);
  const [chordsToLoad, setChordsToLoad] = React.useState(6); // Start with 6 chords
  const [totalChordsAvailable, setTotalChordsAvailable] = React.useState(0);
  const CHORDS_PER_BATCH = 6; // Initial load: 6 chords
  const RELATED_CHORDS_COUNT = 5; // When locked, load 5 related chords
  
  // Load initial batch of chords - ULTRA FAST: Show UI first, load data after
  React.useEffect(() => {
    console.log('🔄 App useEffect triggered', { tuningMode, vibeMode, selectedRoot });
    
    // IMMEDIATE: Show loading state instantly
    setIsLoadingChords(true);
    setDisplayedChords([]);
    setChordsToLoad(6); // Reset to 6 for initial load
    
    // Load data asynchronously after UI is shown
    requestAnimationFrame(() => {
      setTimeout(async () => {
        try {
          console.log('🔄 Loading chords library...');
          
          // Lazy load library
          const library = await getChordLibrary();
          
          if (!library || !library[tuningMode] || !library[tuningMode][vibeMode]) {
            console.error('❌ CHORD_LIBRARY not available');
            setDisplayedChords([]);
            setIsLoadingChords(false);
            return;
          }
          
          const baseChords = library[tuningMode][vibeMode];
          if (!baseChords || baseChords.length === 0) {
            console.warn('⚠️ No chords found');
            setDisplayedChords([]);
            setIsLoadingChords(false);
            return;
          }
          
          setTotalChordsAvailable(baseChords.length);
          
          // ULTRA FAST: Show first 6 chords immediately without transpose
          const firstBatch = baseChords.slice(0, CHORDS_PER_BATCH);
          const strippedChords = firstBatch.map(chord => ({
            ...chord,
            relatedChords: undefined // Remove for speed
          }));
          
          console.log('✅ Showing', strippedChords.length, 'chords (no transpose)');
          setDisplayedChords(strippedChords as Chord[]);
          setIsLoadingChords(false);
          
          // Transpose in background
          setTimeout(() => {
            console.log('🔄 Transposing in background...');
            const transposed = firstBatch.map(chord => {
              try {
                return transposeChord(chord, selectedRoot, tuningMode);
              } catch (e) {
                console.error('Transpose error:', e);
                return chord;
              }
            });
            setDisplayedChords(transposed);
            console.log('✅ Transpose done');
          }, 150);
        } catch (error) {
          console.error('❌ Error loading chords:', error);
          setDisplayedChords([]);
          setIsLoadingChords(false);
        }
      }, 50); // Very short delay
    });
  }, [selectedRoot, tuningMode, vibeMode]);
  
  // Load more chords function - with progressive transpose
  const loadMoreChords = React.useCallback(async () => {
    if (isLoadingChords) return;
    
    setIsLoadingChords(true);
    console.log('📥 Loading more chords...', chordsToLoad);
    
    try {
      const library = CHORD_LIBRARY || await getChordLibrary();
      if (!library || !library[tuningMode] || !library[tuningMode][vibeMode]) {
        setIsLoadingChords(false);
        return;
      }
      
      const baseChords = library[tuningMode][vibeMode];
      const nextBatch = baseChords.slice(chordsToLoad, chordsToLoad + CHORDS_PER_BATCH);
      
      if (nextBatch.length === 0) {
        console.log('✅ All chords loaded');
        setIsLoadingChords(false);
        return;
      }
      
      // Show chords immediately, transpose in background
      setDisplayedChords(prev => [...prev, ...(nextBatch as Chord[])]);
      setChordsToLoad(prev => prev + CHORDS_PER_BATCH);
      
      // Transpose in background
      setTimeout(() => {
        const transposed = nextBatch.map(chord => {
          try {
            return transposeChord(chord, selectedRoot, tuningMode);
          } catch (e) {
            console.error('Transpose error:', e);
            return chord;
          }
        });
        
        // Replace untransposed chords with transposed ones
        setDisplayedChords(prev => {
          const newChords = [...prev];
          const startIndex = prev.length - transposed.length;
          transposed.forEach((chord, i) => {
            newChords[startIndex + i] = chord;
          });
          return newChords;
        });
        console.log('✅ Transposed', transposed.length, 'more chords');
      }, 100);
      
      setIsLoadingChords(false);
    } catch (error) {
      console.error('❌ Error loading more:', error);
      setIsLoadingChords(false);
    }
  }, [chordsToLoad, tuningMode, vibeMode, selectedRoot, isLoadingChords]);
  
  // Store displayed chords for position tracking (using ref to avoid re-renders)
  // REMOVED to prevent infinite loop - this was causing the issue
  // React.useEffect(() => {
  //   if (displayedChords.length > 0) {
  //     lastDisplayedChordsRef.current = displayedChords;
  //   }
  // }, [displayedChords]);

  return (
    <motion.div
      className={`min-h-screen transition-colors duration-700 ${isDistorted ? 'bg-[#080505]' : 'bg-[#0a0a0a]'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* Animated Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: isDistorted
              ? 'radial-gradient(circle, rgba(225, 29, 72, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(8, 145, 178, 0.3) 0%, transparent 70%)',
            left: '50%',
            top: '20%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(100px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Background Ambiance / Noise */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Main Container - Expanded to max-w-7xl for wider layout */}
      <div className={`relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col min-h-screen ${isDistorted ? 'glitch-active' : ''}`}>

        {/* Header - Animated */}
        <motion.header
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="inline-block mb-4">
            <motion.h1
              className={`
                text-5xl md:text-7xl font-['Oswald'] font-bold tracking-tighter uppercase
                ${isDistorted
                  ? 'text-transparent bg-clip-text bg-gradient-to-b from-rose-500 to-rose-900'
                  : 'text-neutral-100'
                }
              `}
              animate={{
                textShadow: isDistorted
                  ? '0 2px 20px rgba(225, 29, 72, 0.5)'
                  : '0 2px 10px rgba(255, 255, 255, 0.1)'
              }}
            >
              Riff<motion.span
                className={isDistorted ? 'text-rose-500' : 'text-cyan-500'}
                animate={{
                  textShadow: isDistorted
                    ? ['0 0 20px rgba(225, 29, 72, 0.8)', '0 0 40px rgba(225, 29, 72, 0.5)', '0 0 20px rgba(225, 29, 72, 0.8)']
                    : ['0 0 20px rgba(8, 145, 178, 0.8)', '0 0 40px rgba(8, 145, 178, 0.5)', '0 0 20px rgba(8, 145, 178, 0.8)']
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >Forge</motion.span>
            </motion.h1>
          </div>
          <motion.p
            className="font-['Share_Tech_Mono'] text-neutral-500 tracking-widest text-sm uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Context-Aware Sonic Prototyping
          </motion.p>
        </motion.header>

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
          {displayedChords && displayedChords.length > 0 ? (
            <>
              {displayedChords.map((chord, index) => {
                const locked = isChordLocked(chord);
                // Use index as key to prevent layout jumps on root change
                // The chord content will smoothly update
                return (
                  <div
                    key={`chord-slot-${index}`}
                    className="h-full relative"
                    style={{ isolation: 'isolate', zIndex: 'auto' }}
                  >
                    <ChordCard
                      chord={chord}
                      isDistorted={isDistorted}
                      onPlay={handleChordClick}
                      onLockToggle={handleLockToggle}
                      isLocked={locked}
                      index={index}
                      skipInitialAnimation={index < 6}
                    />
                  </div>
                );
              })}
              
              {/* Load More Button - Only show if there are more chords to load */}
              {chordsToLoad < totalChordsAvailable && (
                <motion.div
                  className="col-span-full flex justify-center py-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {isLoadingChords ? (
                    <div className="flex items-center gap-3 text-neutral-400">
                      <motion.div
                        className={`w-5 h-5 border-2 ${isDistorted ? 'border-rose-500' : 'border-cyan-500'} border-t-transparent rounded-full`}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <span className="font-mono text-sm">Loading chords...</span>
                    </div>
                  ) : (
                    <motion.button
                      onClick={loadMoreChords}
                      className={`px-6 py-3 ${isDistorted ? 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-500/50 hover:border-rose-500 text-rose-400' : 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-500/50 hover:border-cyan-500 text-cyan-400'} border rounded-lg font-mono text-sm uppercase tracking-wider`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Load More Chords ({totalChordsAvailable - displayedChords.length} remaining)
                    </motion.button>
                  )}
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              className="col-span-full text-center text-neutral-500 py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className={`w-8 h-8 border-2 ${isDistorted ? 'border-rose-500' : 'border-cyan-500'} border-t-transparent rounded-full`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <p className="font-mono text-sm">Loading chords...</p>
              </div>
            </motion.div>
          )}
        </main>

        {/* Footer - Animated */}
        <motion.footer
          className="mt-auto pt-12 border-t border-neutral-900 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.p
            className="text-neutral-600 text-xs font-mono"
            whileHover={{ color: isDistorted ? '#f43f5e' : '#22d3ee' }}
          >
            DESIGNED FOR METAL ARCHITECTS // V0.2.3 BETA
          </motion.p>
        </motion.footer>

      </div>
    </motion.div>
  );
};

export default App;