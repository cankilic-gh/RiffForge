import { Chord, TuningMode, VibeMode } from './types';

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// New structured chord library with 36 playable chords
export const CHORD_LIBRARY: Record<TuningMode, Record<VibeMode, Chord[]>> = {
  [TuningMode.STANDARD]: {
    [VibeMode.DARK]: [
      {
        id: 'dark-1',
        name: 'The Omen',
        subtext: 'm2 Clash',
        notes: ['E2', 'F2', 'B2', 'E3'],
        description: 'Minor 2nd dissonance. Pure evil.',
        fretboard: '0 1 2 x x x',
        baseRoot: 'E'
      },
      {
        id: 'dark-2',
        name: 'Void Triad',
        subtext: 'Dim',
        notes: ['E2', 'G2', 'A#2', 'E3'],
        description: 'Diminished tension. Unstable.',
        fretboard: '0 3 6 x x x',
        baseRoot: 'E'
      },
      {
        id: 'dark-3',
        name: 'Tritone Stack',
        subtext: 'b5 Cluster',
        notes: ['E1', 'A#1', 'E2', 'A#2'],
        description: 'The devil in music. Pure instability.',
        fretboard: '0 6 7 x x x',
        baseRoot: 'E'
      },
      {
        id: 'dark-4',
        name: 'Minor 9th Hell',
        subtext: 'm(add9)',
        notes: ['E2', 'G2', 'B2', 'F#3'],
        description: 'Dark with extension. Melancholy.',
        fretboard: '0 3 2 4 x x',
        baseRoot: 'E'
      },
      {
        id: 'dark-5',
        name: 'Diminished 7th',
        subtext: 'Dim7',
        notes: ['E2', 'G2', 'A#2', 'C#3'],
        description: 'Fully diminished. Maximum tension.',
        fretboard: '0 3 6 4 x x',
        baseRoot: 'E'
      },
      {
        id: 'dark-6',
        name: 'Phrygian Dominant',
        subtext: 'b2/b6',
        notes: ['E2', 'F2', 'G#2', 'B2', 'C3'],
        description: 'Exotic darkness. Middle Eastern.',
        fretboard: '0 1 4 2 3 x',
        baseRoot: 'E'
      }
    ],
    [VibeMode.MELODIC]: [
      {
        id: 'melodic-1',
        name: 'The "Ghost" Chord',
        subtext: 'm(add9)',
        notes: ['E2', 'B2', 'F#3', 'G3', 'B3', 'E4'],
        description: 'The quintessential melancholy shape.',
        fretboard: '0 2 4 0 0 0',
        baseRoot: 'E'
      },
      {
        id: 'melodic-2',
        name: 'Whales Maj7',
        subtext: 'Maj7(no5)',
        notes: ['E2', 'D#3', 'B3', 'E4'],
        description: 'Massive, open, and atmospheric.',
        fretboard: '0 x 1 4 5 x',
        baseRoot: 'E'
      },
      {
        id: 'melodic-3',
        name: 'Ethereal Wall',
        subtext: 'sus2/Maj7',
        notes: ['E2', 'B2', 'D#3', 'F#3', 'B3', 'E4'],
        description: 'Beautifully muddy with high gain.',
        fretboard: '0 2 1 3 0 0',
        baseRoot: 'E'
      },
      {
        id: 'melodic-4',
        name: 'Add9 Dream',
        subtext: 'Add9',
        notes: ['E2', 'G#2', 'B2', 'F#3'],
        description: 'Wide intervals. Emotional resonance.',
        fretboard: '0 4 2 4 x x',
        baseRoot: 'E'
      },
      {
        id: 'melodic-5',
        name: 'Maj7 Suspension',
        subtext: 'Maj7sus2',
        notes: ['E2', 'F#2', 'B2', 'D#3', 'E4'],
        description: 'Suspended beauty. Opeth-style.',
        fretboard: '0 2 2 1 0 x',
        baseRoot: 'E'
      },
      {
        id: 'melodic-6',
        name: 'Minor 11th',
        subtext: 'm11',
        notes: ['E2', 'G2', 'B2', 'D3', 'F#3'],
        description: 'Rich extension. Loathe-inspired.',
        fretboard: '0 3 2 0 2 x',
        baseRoot: 'E'
      }
    ],
    [VibeMode.ENERGETIC]: [
      {
        id: 'energetic-1',
        name: 'Modern Metalcore',
        subtext: 'Sus2 Stack',
        notes: ['E2', 'B2', 'E3', 'F#3', 'B3'],
        description: 'Tight, percussive, and emotionally resonant.',
        fretboard: '0 2 2 4 x x',
        baseRoot: 'E'
      },
      {
        id: 'energetic-2',
        name: 'Power Chord Stack',
        subtext: '5th',
        notes: ['E2', 'B2', 'E3'],
        description: 'Classic power. Palm mute ready.',
        fretboard: '0 2 2 x x x',
        baseRoot: 'E'
      },
      {
        id: 'energetic-3',
        name: 'Bleed Stack',
        subtext: 'Poly-Rhythm',
        notes: ['E1', 'E2', 'B2'],
        description: 'Just the low end. Palm mute required.',
        fretboard: '0 0 2 x x x',
        baseRoot: 'E'
      },
      {
        id: 'energetic-4',
        name: 'Sus4 Chug',
        subtext: 'Sus4',
        notes: ['E2', 'A2', 'B2', 'E3'],
        description: 'Tight sus4. Gallop-friendly.',
        fretboard: '0 0 2 2 x x',
        baseRoot: 'E'
      },
      {
        id: 'energetic-5',
        name: 'Octave Stack',
        subtext: 'Octave',
        notes: ['E2', 'E3', 'B3'],
        description: 'Clean octaves. Rhythmic clarity.',
        fretboard: '0 2 0 x x x',
        baseRoot: 'E'
      },
      {
        id: 'energetic-6',
        name: 'Drop 5th',
        subtext: '5th',
        notes: ['E2', 'B2', 'E3', 'B3'],
        description: 'Double stop power. Punchy.',
        fretboard: '0 2 2 0 x x',
        baseRoot: 'E'
      }
    ]
  },
  [TuningMode.DROP]: {
    [VibeMode.DARK]: [
      {
        id: 'drop-dark-1',
        name: 'Drop Omen',
        subtext: 'm2 Clash',
        notes: ['D2', 'D#2', 'A2', 'D3'],
        description: 'Drop tuning darkness. Heavy m2.',
        fretboard: '0 1 2 x x x',
        baseRoot: 'E'
      },
      {
        id: 'drop-dark-2',
        name: 'Drop Void',
        subtext: 'Dim',
        notes: ['D2', 'F2', 'G#2', 'D3'],
        description: 'Low-end diminished. Crushing.',
        fretboard: '0 3 6 x x x',
        baseRoot: 'E'
      },
      {
        id: 'drop-dark-3',
        name: 'Drop Tritone',
        subtext: 'b5',
        notes: ['D1', 'G#1', 'D2', 'G#2'],
        description: 'Devil\'s interval. Drop power.',
        fretboard: '0 6 7 x x x',
        baseRoot: 'E'
      },
      {
        id: 'drop-dark-4',
        name: 'Drop Minor 9th',
        subtext: 'm(add9)',
        notes: ['D2', 'F2', 'A2', 'E3'],
        description: 'Dark extension. Low-end melody.',
        fretboard: '0 3 2 4 x x',
        baseRoot: 'E'
      },
      {
        id: 'drop-dark-5',
        name: 'Drop Dim7',
        subtext: 'Dim7',
        notes: ['D2', 'F2', 'G#2', 'B2'],
        description: 'Fully diminished drop. Tension.',
        fretboard: '0 3 6 4 x x',
        baseRoot: 'E'
      },
      {
        id: 'drop-dark-6',
        name: 'Drop Phrygian',
        subtext: 'b2',
        notes: ['D2', 'D#2', 'F#2', 'A2', 'B2'],
        description: 'Exotic drop darkness. Heavy.',
        fretboard: '0 1 4 2 3 x',
        baseRoot: 'E'
      }
    ],
    [VibeMode.MELODIC]: [
      {
        id: 'drop-melodic-1',
        name: 'Drop Ghost',
        subtext: 'm(add9)',
        notes: ['D2', 'A2', 'E3', 'F3', 'A3', 'D4'],
        description: 'Drop melancholy. Wide intervals.',
        fretboard: '0 2 4 0 0 0',
        baseRoot: 'E'
      },
      {
        id: 'drop-melodic-2',
        name: 'Drop Maj7',
        subtext: 'Maj7',
        notes: ['D2', 'F#2', 'A2', 'C#3'],
        description: 'Open drop Maj7. Atmospheric.',
        fretboard: '0 2 0 1 x x',
        baseRoot: 'E'
      },
      {
        id: 'drop-melodic-3',
        name: 'Drop Ethereal',
        subtext: 'sus2/Maj7',
        notes: ['D2', 'A2', 'C#3', 'E3', 'A3', 'D4'],
        description: 'Drop shoegaze. Beautiful mud.',
        fretboard: '0 2 1 3 0 0',
        baseRoot: 'E'
      },
      {
        id: 'drop-melodic-4',
        name: 'Drop Add9',
        subtext: 'Add9',
        notes: ['D2', 'F#2', 'A2', 'E3'],
        description: 'Wide drop intervals. Emotional.',
        fretboard: '0 2 0 2 x x',
        baseRoot: 'E'
      },
      {
        id: 'drop-melodic-5',
        name: 'Drop Maj7sus2',
        subtext: 'Maj7sus2',
        notes: ['D2', 'E2', 'A2', 'C#3', 'D4'],
        description: 'Suspended drop beauty. Opeth.',
        fretboard: '0 2 0 1 0 x',
        baseRoot: 'E'
      },
      {
        id: 'drop-melodic-6',
        name: 'Drop m11',
        subtext: 'm11',
        notes: ['D2', 'F2', 'A2', 'C3', 'E3'],
        description: 'Rich drop extension. Loathe.',
        fretboard: '0 3 0 0 2 x',
        baseRoot: 'E'
      }
    ],
    [VibeMode.ENERGETIC]: [
      {
        id: 'drop-energetic-1',
        name: 'Drop Metalcore',
        subtext: 'Sus2',
        notes: ['D2', 'A2', 'D3', 'E3', 'A3'],
        description: 'Drop sus2 stack. Tight chug.',
        fretboard: '0 0 2 3 x x',
        baseRoot: 'E'
      },
      {
        id: 'drop-energetic-2',
        name: 'Drop Power',
        subtext: '5th',
        notes: ['D2', 'A2', 'D3'],
        description: 'Classic drop power. Heavy.',
        fretboard: '0 0 2 x x x',
        baseRoot: 'E'
      },
      {
        id: 'drop-energetic-3',
        name: 'Drop Bleed',
        subtext: 'Low Stack',
        notes: ['D1', 'D2', 'A2'],
        description: 'Ultra low-end. Palm mute.',
        fretboard: '0 0 2 x x x',
        baseRoot: 'E'
      },
      {
        id: 'drop-energetic-4',
        name: 'Drop Sus4',
        subtext: 'Sus4',
        notes: ['D2', 'G2', 'A2', 'D3'],
        description: 'Drop sus4 chug. Gallop-ready.',
        fretboard: '0 0 2 2 x x',
        baseRoot: 'E'
      },
      {
        id: 'drop-energetic-5',
        name: 'Drop Octave',
        subtext: 'Octave',
        notes: ['D2', 'D3', 'A3'],
        description: 'Drop octaves. Rhythmic clarity.',
        fretboard: '0 0 0 x x x',
        baseRoot: 'E'
      },
      {
        id: 'drop-energetic-6',
        name: 'Drop Double 5th',
        subtext: '5th Stack',
        notes: ['D2', 'A2', 'D3', 'A3'],
        description: 'Double drop power. Maximum punch.',
        fretboard: '0 0 2 0 x x',
        baseRoot: 'E'
      }
    ]
  }
};

// Legacy export for backward compatibility (will be removed)
export const CHORDS: Chord[] = CHORD_LIBRARY[TuningMode.STANDARD][VibeMode.MELODIC];
