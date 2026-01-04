import { NOTES } from '../constants';
import { Chord, TuningMode } from '../types';

// Helper to get semitone distance between two notes
const getSemitoneDistance = (fromNote: string, toNote: string): number => {
  const fromIndex = NOTES.indexOf(fromNote);
  const toIndex = NOTES.indexOf(toNote);
  if (fromIndex === -1 || toIndex === -1) return 0;
  return toIndex - fromIndex;
};

// Transpose a single scientific pitch notation note (e.g., "C#2")
const transposeNote = (note: string, semitones: number): string => {
  // Regex to split Note Name (e.g. F#) and Octave (e.g. 2)
  const match = note.match(/^([A-G]#?)(-?\d+)$/);
  if (!match) return note;

  const [, name, octaveStr] = match;
  const octave = parseInt(octaveStr, 10);
  
  let currentIndex = NOTES.indexOf(name);
  if (currentIndex === -1) return note;

  let newIndex = currentIndex + semitones;
  let octaveShift = Math.floor(newIndex / 12);

  // Handle negative wrapping correctly
  newIndex = ((newIndex % 12) + 12) % 12;

  const newName = NOTES[newIndex];
  const newOctave = octave + octaveShift;

  return `${newName}${newOctave}`;
};

// Helper to transpose fretboard numbers (Tabs)
// Added tuningMode param
const transposeTabs = (originalTabs: string | undefined, semitones: number, tuningMode: TuningMode): string => {
  if (!originalTabs) return '';
  if (originalTabs === 'TRANSPOSED') return originalTabs;

  const strings = originalTabs.split(' ');
  
  interface FretInfo {
    fret: number;
    isOpen: boolean;
    isMuted: boolean;
  }
  
  // First pass: apply transposition
  const transposedStrings: (FretInfo | string)[] = strings.map((val, index) => {
    // If it's muted ('x'), keep it muted
    if (val.toLowerCase() === 'x') return 'x';
    
    // Parse the fret number
    const fret = parseInt(val, 10);
    if (isNaN(fret)) return val;

    // Apply Key Transposition
    let newFret = fret + semitones;

    // Apply Tuning Logic (Drop Tuning Logic)
    // If we are in Drop mode, the 6th string (index 0) is tuned down 2 semitones.
    // To play the same pitch as Standard tuning, we must fret it 2 frets HIGHER.
    if (tuningMode === TuningMode.DROP && index === 0) {
      newFret += 2; 
    }

    // Guitar Logic: Prevent negative frets
    while (newFret < 0) {
      newFret += 12;
    }

    return { fret: newFret, isOpen: fret === 0, isMuted: false };
  });

  // Second pass: make tabs playable with maximum 4-fret spread (realistic hand span)
  // CRITICAL: One hand can only span ~4-5 frets maximum
  const allFrets = transposedStrings
    .filter((s): s is FretInfo => typeof s === 'object' && !s.isMuted)
    .map(s => s.fret);
  
  if (allFrets.length > 0) {
    let iterations = 0;
    const maxIterations = 50; // Increased to ensure we fix all cases
    
    while (iterations < maxIterations) {
      const currentFrets = transposedStrings
        .filter((s): s is FretInfo => typeof s === 'object' && !s.isMuted)
        .map(s => s.fret);
      
      if (currentFrets.length === 0) break;
      
      const currentMin = Math.min(...currentFrets);
      const currentMax = Math.max(...currentFrets);
      const currentSpread = currentMax - currentMin;
      
      // SUCCESS CRITERIA: spread <= 4 AND max <= 7
      if (currentSpread <= 4 && currentMax <= 7) break;
      
      let adjusted = false;
      const threshold = currentMin + 4;
      
      // STEP 1: Try moving high frets down individually
      transposedStrings.forEach((item) => {
        if (typeof item === 'object' && !item.isMuted) {
          if (item.fret > threshold || item.fret >= 8) {
            const oldFret = item.fret;
            item.fret -= 12;
            if (item.fret >= 0) {
              adjusted = true;
            } else {
              item.fret = oldFret; // Revert if negative
            }
          }
        }
      });
      
      // STEP 2: Re-check after STEP 1 adjustments
      const afterStep1Frets = transposedStrings
        .filter((s): s is FretInfo => typeof s === 'object' && !s.isMuted)
        .map(s => s.fret);
      
      if (afterStep1Frets.length > 0) {
        const afterStep1Min = Math.min(...afterStep1Frets);
        const afterStep1Max = Math.max(...afterStep1Frets);
        const afterStep1Spread = afterStep1Max - afterStep1Min;
        
        // If still problematic, move entire chord up an octave
        // This allows high frets to then be moved down
        if (afterStep1Spread > 4 || afterStep1Max >= 8) {
          const hasOpenOrLow = afterStep1Frets.some(f => f <= 2);
          const hasHigh = afterStep1Frets.some(f => f >= 8);
          
          // If we have both low and high frets, move everything up
          // This creates space to then move high frets down
          if (hasOpenOrLow && hasHigh) {
            transposedStrings.forEach((item) => {
              if (typeof item === 'object' && !item.isMuted) {
                item.fret += 12;
              }
            });
            adjusted = true;
            continue; // Re-check with new values
          }
          
          // If only high frets, try moving them down
          // If they can't go down, move everything up first
          if (hasHigh && !hasOpenOrLow) {
            const canMoveAnyDown = afterStep1Frets.some(f => f >= 8 && f - 12 >= 0);
            if (!canMoveAnyDown) {
              // Move everything up to create space
              transposedStrings.forEach((item) => {
                if (typeof item === 'object' && !item.isMuted) {
                  item.fret += 12;
                }
              });
              adjusted = true;
              continue;
            }
          }
        }
      }
      
      if (!adjusted) {
        // Last resort: if we can't adjust, try moving the highest frets down
        const currentFretsAfterStep2 = transposedStrings
          .filter((s): s is FretInfo => typeof s === 'object' && !s.isMuted)
          .map(s => s.fret);
        
        if (currentFretsAfterStep2.length > 0) {
          const highestFret = Math.max(...currentFretsAfterStep2);
          if (highestFret >= 8) {
            transposedStrings.forEach((item) => {
              if (typeof item === 'object' && !item.isMuted && item.fret === highestFret) {
                item.fret -= 12;
                if (item.fret < 0) {
                  // If negative, move everything up instead
                  transposedStrings.forEach((i) => {
                    if (typeof i === 'object' && !i.isMuted) {
                      i.fret += 12;
                    }
                  });
                }
                adjusted = true;
              }
            });
          }
        }
      }
      
      if (!adjusted) break; // No more adjustments possible
      iterations++;
    }
    
    // Final safety check: ensure no negative frets
    transposedStrings.forEach((item) => {
      if (typeof item === 'object' && !item.isMuted && item.fret < 0) {
        item.fret += 12;
      }
    });
  }

  // Convert back to strings
  return transposedStrings.map(item => {
    if (typeof item === 'object') {
      return item.fret.toString();
    }
    return item;
  }).join(' ');
};

// Transpose an entire Chord object
export const transposeChord = (chord: Chord, targetRoot: string, tuningMode: TuningMode): Chord => {
  // 1. Calculate distance
  const distance = getSemitoneDistance(chord.baseRoot, targetRoot);
  
  // 2. Transpose notes (Notes sound the same regardless of tuning, only tabs change physically)
  // Optimization: If distance is 0, notes are same, but tabs might change due to tuningMode.
  const newNotes = distance === 0 
    ? chord.notes 
    : chord.notes.map(note => transposeNote(note, distance));

  // 3. Update name/subtext dynamically
  const isGenericSubtext = !chord.subtext.match(/^[A-G]/); 
  const newSubtext = isGenericSubtext 
    ? `${targetRoot}${chord.subtext}` 
    : chord.subtext.replace(/^[A-G]#?/, targetRoot); 

  // 4. Update Tabs
  // We always recalculate tabs because TuningMode might have changed even if root didn't.
  const newTabs = transposeTabs(chord.fretboard, distance, tuningMode);

  return {
    ...chord,
    name: chord.name, 
    subtext: newSubtext,
    notes: newNotes,
    fretboard: newTabs
  };
};