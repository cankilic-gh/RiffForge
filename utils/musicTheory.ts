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

  // Second pass: make tabs playable with maximum 7-fret spread
  // Include ALL frets (including open strings) in spread calculation for realistic playability
  const allFrets = transposedStrings
    .filter((s): s is FretInfo => typeof s === 'object' && !s.isMuted)
    .map(s => s.fret);
  
  if (allFrets.length > 0) {
    let iterations = 0;
    const maxIterations = 5; // Prevent infinite loops
    
    while (iterations < maxIterations) {
      const currentFrets = transposedStrings
        .filter((s): s is FretInfo => typeof s === 'object' && !s.isMuted)
        .map(s => s.fret);
      
      if (currentFrets.length === 0) break;
      
      const currentMin = Math.min(...currentFrets);
      const currentMax = Math.max(...currentFrets);
      const currentSpread = currentMax - currentMin;
      
      // Maximum 7-fret spread: if spread > 7, we need to adjust
      // Also limit max fret to 8 for better playability
      if (currentSpread <= 7 && currentMax <= 8) break;
      
      // Strategy: Move the highest frets down an octave
      // Find the threshold - if spread > 7, move frets that are > (min + 7)
      const threshold = currentMin + 7;
      
      let adjusted = false;
      transposedStrings.forEach((item) => {
        if (typeof item === 'object' && !item.isMuted) {
          // Move frets that exceed the 7-fret spread OR are >= 9
          if (item.fret > threshold || item.fret >= 9) {
            const oldFret = item.fret;
            item.fret -= 12;
            // If it goes negative, revert
            if (item.fret < 0) {
              item.fret = oldFret; // Revert
            } else {
              adjusted = true;
            }
          }
        }
      });
      
      if (!adjusted) break; // No more adjustments possible
      iterations++;
    }
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