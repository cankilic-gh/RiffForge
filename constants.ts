import { Chord, TuningMode, VibeMode } from './types';

export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// New structured chord library with 36 playable chords
export const CHORD_LIBRARY: Record<TuningMode, Record<VibeMode, Chord[]>> = {
  [TuningMode.STANDARD]: {
    [VibeMode.DARK]: [
      // E Phrygian Dominant: E, F, G#, A, B, C, D#
      // All chords share E as tonal center with m2 and tritone intervals
      {
        id: 'dark-1',
        name: 'The Omen',
        subtext: 'm2 Clash',
        notes: ['E2', 'F2', 'B2', 'E3'],
        description: 'Minor 2nd dissonance. Pure evil.',
        fretboard: '0 1 2 x x x',
        baseRoot: 'E',
        relatedChords: [
          { id: 'dark-1-child-1', name: 'Phrygian Root', subtext: 'b2', notes: ['E2', 'F2', 'G#2', 'B2', 'E3'], description: 'Phrygian foundation.', fretboard: '0 1 4 2 0 x', baseRoot: 'E' },
          { id: 'dark-1-child-2', name: 'Tritone Stack', subtext: 'b5', notes: ['E2', 'A#2', 'E3', 'A#3'], description: 'Devil\'s interval.', fretboard: '0 6 0 6 x x', baseRoot: 'E' },
          { id: 'dark-1-child-3', name: 'Diminished Phrygian', subtext: 'Dim/b2', notes: ['E2', 'F2', 'G2', 'A#2'], description: 'Maximum tension.', fretboard: '0 1 3 6 x x', baseRoot: 'E' },
          { id: 'dark-1-child-4', name: 'Phrygian b6', subtext: 'b2/b6', notes: ['E2', 'F2', 'G#2', 'B2', 'C3'], description: 'Exotic darkness.', fretboard: '0 1 4 2 3 x', baseRoot: 'E' },
          { id: 'dark-1-child-5', name: 'Tritone Resolve', subtext: 'b5/m2', notes: ['E2', 'F2', 'A#2', 'E3'], description: 'Unsettling resolve.', fretboard: '0 1 6 0 x x', baseRoot: 'E' },
          { id: 'dark-1-child-6', name: 'Phrygian 7th', subtext: 'b2/b7', notes: ['E2', 'F2', 'D3', 'E3'], description: 'Dark dominant.', fretboard: '0 1 0 2 x x', baseRoot: 'E' }
        ]
      },
      {
        id: 'dark-2',
        name: 'Phrygian Root',
        subtext: 'b2',
        notes: ['E2', 'F2', 'G#2', 'B2', 'E3'],
        description: 'Phrygian dominant foundation. Exotic.',
        fretboard: '0 1 4 2 0 x',
        baseRoot: 'E',
        relatedChords: [
          { id: 'dark-2-child-1', name: 'The Omen', subtext: 'm2 Clash', notes: ['E2', 'F2', 'B2', 'E3'], description: 'Minor 2nd dissonance.', fretboard: '0 1 2 x x x', baseRoot: 'E' },
          { id: 'dark-2-child-2', name: 'Tritone Stack', subtext: 'b5', notes: ['E2', 'A#2', 'E3', 'A#3'], description: 'Devil\'s interval.', fretboard: '0 6 0 6 x x', baseRoot: 'E' },
          { id: 'dark-2-child-3', name: 'Diminished Phrygian', subtext: 'Dim/b2', notes: ['E2', 'F2', 'G2', 'A#2'], description: 'Maximum tension.', fretboard: '0 1 3 6 x x', baseRoot: 'E' },
          { id: 'dark-2-child-4', name: 'Phrygian b6', subtext: 'b2/b6', notes: ['E2', 'F2', 'G#2', 'B2', 'C3'], description: 'Exotic darkness.', fretboard: '0 1 4 2 3 x', baseRoot: 'E' },
          { id: 'dark-2-child-5', name: 'Tritone Resolve', subtext: 'b5/m2', notes: ['E2', 'F2', 'A#2', 'E3'], description: 'Unsettling resolve.', fretboard: '0 1 6 0 x x', baseRoot: 'E' },
          { id: 'dark-2-child-6', name: 'Phrygian 7th', subtext: 'b2/b7', notes: ['E2', 'F2', 'D3', 'E3'], description: 'Dark dominant.', fretboard: '0 1 0 2 x x', baseRoot: 'E' }
        ]
      },
      {
        id: 'dark-3',
        name: 'Tritone Stack',
        subtext: 'b5',
        notes: ['E2', 'A#2', 'E3', 'A#3'],
        description: 'The devil in music. Pure instability.',
        fretboard: '0 6 0 6 x x',
        baseRoot: 'E',
        relatedChords: [
          { id: 'dark-3-child-1', name: 'The Omen', subtext: 'm2 Clash', notes: ['E2', 'F2', 'B2', 'E3'], description: 'Minor 2nd dissonance.', fretboard: '0 1 2 x x x', baseRoot: 'E' },
          { id: 'dark-3-child-2', name: 'Phrygian Root', subtext: 'b2', notes: ['E2', 'F2', 'G#2', 'B2', 'E3'], description: 'Phrygian foundation.', fretboard: '0 1 4 2 0 x', baseRoot: 'E' },
          { id: 'dark-3-child-3', name: 'Diminished Phrygian', subtext: 'Dim/b2', notes: ['E2', 'F2', 'G2', 'A#2'], description: 'Maximum tension.', fretboard: '0 1 3 6 x x', baseRoot: 'E' },
          { id: 'dark-3-child-4', name: 'Phrygian b6', subtext: 'b2/b6', notes: ['E2', 'F2', 'G#2', 'B2', 'C3'], description: 'Exotic darkness.', fretboard: '0 1 4 2 3 x', baseRoot: 'E' },
          { id: 'dark-3-child-5', name: 'Tritone Resolve', subtext: 'b5/m2', notes: ['E2', 'F2', 'A#2', 'E3'], description: 'Unsettling resolve.', fretboard: '0 1 6 0 x x', baseRoot: 'E' },
          { id: 'dark-3-child-6', name: 'Phrygian 7th', subtext: 'b2/b7', notes: ['E2', 'F2', 'D3', 'E3'], description: 'Dark dominant.', fretboard: '0 1 0 2 x x', baseRoot: 'E' }
        ]
      },
      {
        id: 'dark-4',
        name: 'Diminished Phrygian',
        subtext: 'Dim/b2',
        notes: ['E2', 'F2', 'G2', 'A#2'],
        description: 'Diminished with m2. Maximum tension.',
        fretboard: '0 1 3 6 x x',
        baseRoot: 'E',
        relatedChords: [
          { id: 'dark-4-child-1', name: 'The Omen', subtext: 'm2 Clash', notes: ['E2', 'F2', 'B2', 'E3'], description: 'Minor 2nd dissonance.', fretboard: '0 1 2 x x x', baseRoot: 'E' },
          { id: 'dark-4-child-2', name: 'Phrygian Root', subtext: 'b2', notes: ['E2', 'F2', 'G#2', 'B2', 'E3'], description: 'Phrygian foundation.', fretboard: '0 1 4 2 0 x', baseRoot: 'E' },
          { id: 'dark-4-child-3', name: 'Tritone Stack', subtext: 'b5', notes: ['E2', 'A#2', 'E3', 'A#3'], description: 'Devil\'s interval.', fretboard: '0 6 0 6 x x', baseRoot: 'E' },
          { id: 'dark-4-child-4', name: 'Phrygian b6', subtext: 'b2/b6', notes: ['E2', 'F2', 'G#2', 'B2', 'C3'], description: 'Exotic darkness.', fretboard: '0 1 4 2 3 x', baseRoot: 'E' },
          { id: 'dark-4-child-5', name: 'Tritone Resolve', subtext: 'b5/m2', notes: ['E2', 'F2', 'A#2', 'E3'], description: 'Unsettling resolve.', fretboard: '0 1 6 0 x x', baseRoot: 'E' },
          { id: 'dark-4-child-6', name: 'Phrygian 7th', subtext: 'b2/b7', notes: ['E2', 'F2', 'D3', 'E3'], description: 'Dark dominant.', fretboard: '0 1 0 2 x x', baseRoot: 'E' }
        ]
      },
      {
        id: 'dark-5',
        name: 'Phrygian b6',
        subtext: 'b2/b6',
        notes: ['E2', 'F2', 'G#2', 'B2', 'C3'],
        description: 'Exotic darkness. Middle Eastern.',
        fretboard: '0 1 4 2 3 x',
        baseRoot: 'E',
        relatedChords: [
          { id: 'dark-5-child-1', name: 'The Omen', subtext: 'm2 Clash', notes: ['E2', 'F2', 'B2', 'E3'], description: 'Minor 2nd dissonance.', fretboard: '0 1 2 x x x', baseRoot: 'E' },
          { id: 'dark-5-child-2', name: 'Phrygian Root', subtext: 'b2', notes: ['E2', 'F2', 'G#2', 'B2', 'E3'], description: 'Phrygian foundation.', fretboard: '0 1 4 2 0 x', baseRoot: 'E' },
          { id: 'dark-5-child-3', name: 'Tritone Stack', subtext: 'b5', notes: ['E2', 'A#2', 'E3', 'A#3'], description: 'Devil\'s interval.', fretboard: '0 6 0 6 x x', baseRoot: 'E' },
          { id: 'dark-5-child-4', name: 'Diminished Phrygian', subtext: 'Dim/b2', notes: ['E2', 'F2', 'G2', 'A#2'], description: 'Maximum tension.', fretboard: '0 1 3 6 x x', baseRoot: 'E' },
          { id: 'dark-5-child-5', name: 'Tritone Resolve', subtext: 'b5/m2', notes: ['E2', 'F2', 'A#2', 'E3'], description: 'Unsettling resolve.', fretboard: '0 1 6 0 x x', baseRoot: 'E' },
          { id: 'dark-5-child-6', name: 'Phrygian 7th', subtext: 'b2/b7', notes: ['E2', 'F2', 'D3', 'E3'], description: 'Dark dominant.', fretboard: '0 1 0 2 x x', baseRoot: 'E' }
        ]
      },
      {
        id: 'dark-6',
        name: 'Tritone Resolve',
        subtext: 'b5/m2',
        notes: ['E2', 'F2', 'A#2', 'E3'],
        description: 'Tritone with m2 clash. Unsettling.',
        fretboard: '0 1 6 0 x x',
        baseRoot: 'E',
        relatedChords: [
          { id: 'dark-6-child-1', name: 'The Omen', subtext: 'm2 Clash', notes: ['E2', 'F2', 'B2', 'E3'], description: 'Minor 2nd dissonance.', fretboard: '0 1 2 x x x', baseRoot: 'E' },
          { id: 'dark-6-child-2', name: 'Phrygian Root', subtext: 'b2', notes: ['E2', 'F2', 'G#2', 'B2', 'E3'], description: 'Phrygian foundation.', fretboard: '0 1 4 2 0 x', baseRoot: 'E' },
          { id: 'dark-6-child-3', name: 'Tritone Stack', subtext: 'b5', notes: ['E2', 'A#2', 'E3', 'A#3'], description: 'Devil\'s interval.', fretboard: '0 6 0 6 x x', baseRoot: 'E' },
          { id: 'dark-6-child-4', name: 'Diminished Phrygian', subtext: 'Dim/b2', notes: ['E2', 'F2', 'G2', 'A#2'], description: 'Maximum tension.', fretboard: '0 1 3 6 x x', baseRoot: 'E' },
          { id: 'dark-6-child-5', name: 'Phrygian b6', subtext: 'b2/b6', notes: ['E2', 'F2', 'G#2', 'B2', 'C3'], description: 'Exotic darkness.', fretboard: '0 1 4 2 3 x', baseRoot: 'E' },
          { id: 'dark-6-child-6', name: 'Phrygian 7th', subtext: 'b2/b7', notes: ['E2', 'F2', 'D3', 'E3'], description: 'Dark dominant.', fretboard: '0 1 0 2 x x', baseRoot: 'E' }
        ]
      }
    ],
    [VibeMode.MELODIC]: [
      // E Minor Diatonic: Em (i), C (VI), Am (iv) - smooth voice leading
      // All chords flow naturally in E Minor key
      {
        id: 'melodic-1',
    name: 'The "Ghost" Chord',
        subtext: 'Em(add9)',
    notes: ['E2', 'B2', 'F#3', 'G3', 'B3', 'E4'],
    description: 'The quintessential melancholy shape.',
    fretboard: '0 2 4 0 0 0',
        baseRoot: 'E',
        relatedChords: [
          { id: 'melodic-1-child-1', name: 'C Maj7 Bridge', subtext: 'C(VI)', notes: ['C3', 'E3', 'G3', 'B3'], description: 'Relative major transition.', fretboard: 'x 3 2 0 1 0', baseRoot: 'C' },
          { id: 'melodic-1-child-2', name: 'Am Add9 Flow', subtext: 'Am(iv)', notes: ['A2', 'E3', 'A3', 'B3', 'E4'], description: 'Subdominant extension.', fretboard: 'x 0 2 2 0 0', baseRoot: 'A' },
          { id: 'melodic-1-child-3', name: 'G Major Lift', subtext: 'G(V)', notes: ['G2', 'B2', 'D3', 'G3'], description: 'Dominant resolution.', fretboard: '3 2 0 0 3 x', baseRoot: 'G' },
          { id: 'melodic-1-child-4', name: 'Bm Suspension', subtext: 'Bm(iii)', notes: ['B2', 'D3', 'F#3', 'B3'], description: 'Mediant tension.', fretboard: 'x 2 4 4 2 x', baseRoot: 'B' },
          { id: 'melodic-1-child-5', name: 'D Minor Resolve', subtext: 'Dm(ii)', notes: ['D3', 'F3', 'A3', 'D4'], description: 'Supertonic movement.', fretboard: 'x x 0 2 3 1', baseRoot: 'D' },
          { id: 'melodic-1-child-6', name: 'F# Diminished', subtext: 'F#dim(vii)', notes: ['F#2', 'A2', 'C3', 'F#3'], description: 'Leading tone tension.', fretboard: '2 0 2 1 x x', baseRoot: 'F#' }
        ]
      },
      {
        id: 'melodic-2',
        name: 'C Major 7',
        subtext: 'C(VI)',
        notes: ['C3', 'E3', 'G3', 'B3'],
        description: 'Relative major. Bright contrast.',
        fretboard: 'x 3 2 0 1 0',
        baseRoot: 'C',
        relatedChords: [
          { id: 'melodic-2-child-1', name: 'Em Ghost Return', subtext: 'Em(i)', notes: ['E2', 'B2', 'F#3', 'G3', 'B3', 'E4'], description: 'Back to tonic.', fretboard: '0 2 4 0 0 0', baseRoot: 'E' },
          { id: 'melodic-2-child-2', name: 'Am Add9 Flow', subtext: 'Am(iv)', notes: ['A2', 'E3', 'A3', 'B3', 'E4'], description: 'Subdominant flow.', fretboard: 'x 0 2 2 0 0', baseRoot: 'A' },
          { id: 'melodic-2-child-3', name: 'F Major Bright', subtext: 'F(IV)', notes: ['F2', 'A2', 'C3', 'F3'], description: 'Bright subdominant.', fretboard: '1 3 3 2 1 x', baseRoot: 'F' },
          { id: 'melodic-2-child-4', name: 'G Major Lift', subtext: 'G(V)', notes: ['G2', 'B2', 'D3', 'G3'], description: 'Dominant movement.', fretboard: '3 2 0 0 3 x', baseRoot: 'G' },
          { id: 'melodic-2-child-5', name: 'Dm Suspension', subtext: 'Dm(ii)', notes: ['D3', 'F3', 'A3', 'D4'], description: 'Smooth transition.', fretboard: 'x x 0 2 3 1', baseRoot: 'D' },
          { id: 'melodic-2-child-6', name: 'F# Diminished', subtext: 'F#dim(vii)', notes: ['F#2', 'A2', 'C3', 'F#3'], description: 'Leading tone tension.', fretboard: '2 0 2 1 x x', baseRoot: 'F#' }
        ]
      },
      {
        id: 'melodic-3',
        name: 'Am Add9',
        subtext: 'Am(iv)',
        notes: ['A2', 'E3', 'A3', 'B3', 'E4'],
        description: 'Subdominant with extension. Flowing.',
        fretboard: 'x 0 2 2 0 0',
        baseRoot: 'A',
        relatedChords: [
          { id: 'melodic-3-child-1', name: 'Em Ghost Return', subtext: 'Em(i)', notes: ['E2', 'B2', 'F#3', 'G3', 'B3', 'E4'], description: 'Return to tonic.', fretboard: '0 2 4 0 0 0', baseRoot: 'E' },
          { id: 'melodic-3-child-2', name: 'C Maj7 Bright', subtext: 'C(VI)', notes: ['C3', 'E3', 'G3', 'B3'], description: 'Relative major.', fretboard: 'x 3 2 0 1 0', baseRoot: 'C' },
          { id: 'melodic-3-child-3', name: 'F Major Transition', subtext: 'F(IV)', notes: ['F2', 'A2', 'C3', 'F3'], description: 'Smooth movement.', fretboard: '1 3 3 2 1 x', baseRoot: 'F' },
          { id: 'melodic-3-child-4', name: 'Dm Suspension', subtext: 'Dm(ii)', notes: ['D3', 'F3', 'A3', 'D4'], description: 'Tension builder.', fretboard: 'x x 0 2 3 1', baseRoot: 'D' },
          { id: 'melodic-3-child-5', name: 'G Major Resolve', subtext: 'G(V)', notes: ['G2', 'B2', 'D3', 'G3'], description: 'Dominant resolution.', fretboard: '3 2 0 0 3 x', baseRoot: 'G' },
          { id: 'melodic-3-child-6', name: 'F# Diminished', subtext: 'F#dim(vii)', notes: ['F#2', 'A2', 'C3', 'F#3'], description: 'Leading tone tension.', fretboard: '2 0 2 1 x x', baseRoot: 'F#' }
        ]
      },
      {
        id: 'melodic-4',
        name: 'Em Maj7',
        subtext: 'Em(i)',
        notes: ['E2', 'G2', 'B2', 'D#3', 'E4'],
        description: 'Tonic with major 7th. Ethereal.',
        fretboard: '0 3 2 1 0 x',
        baseRoot: 'E',
        relatedChords: [
          { id: 'melodic-4-child-1', name: 'C Maj7 Ethereal', subtext: 'C(VI)', notes: ['C3', 'E3', 'G3', 'B3'], description: 'Ethereal transition.', fretboard: 'x 3 2 0 1 0', baseRoot: 'C' },
          { id: 'melodic-4-child-2', name: 'Am Add9 Flow', subtext: 'Am(iv)', notes: ['A2', 'E3', 'A3', 'B3', 'E4'], description: 'Flowing subdominant.', fretboard: 'x 0 2 2 0 0', baseRoot: 'A' },
          { id: 'melodic-4-child-3', name: 'G Major Lift', subtext: 'G(V)', notes: ['G2', 'B2', 'D3', 'G3'], description: 'Dominant movement.', fretboard: '3 2 0 0 3 x', baseRoot: 'G' },
          { id: 'melodic-4-child-4', name: 'Bm Mediant', subtext: 'Bm(iii)', notes: ['B2', 'D3', 'F#3', 'B3'], description: 'Mediant tension.', fretboard: 'x 2 4 4 2 x', baseRoot: 'B' },
          { id: 'melodic-4-child-5', name: 'Dm Suspension', subtext: 'Dm(ii)', notes: ['D3', 'F3', 'A3', 'D4'], description: 'Smooth transition.', fretboard: 'x x 0 2 3 1', baseRoot: 'D' },
          { id: 'melodic-4-child-6', name: 'F# Diminished', subtext: 'F#dim(vii)', notes: ['F#2', 'A2', 'C3', 'F#3'], description: 'Leading tone tension.', fretboard: '2 0 2 1 x x', baseRoot: 'F#' }
        ]
      },
      {
        id: 'melodic-5',
        name: 'C sus2',
        subtext: 'C(VI)sus2',
        notes: ['C3', 'D3', 'G3', 'C4'],
        description: 'Suspended VI. Smooth transition.',
        fretboard: 'x 3 5 5 3 x',
        baseRoot: 'C',
        relatedChords: [
          { id: 'melodic-5-child-1', name: 'Em Ghost Return', subtext: 'Em(i)', notes: ['E2', 'B2', 'F#3', 'G3', 'B3', 'E4'], description: 'Return to tonic.', fretboard: '0 2 4 0 0 0', baseRoot: 'E' },
          { id: 'melodic-5-child-2', name: 'Am Add9 Flow', subtext: 'Am(iv)', notes: ['A2', 'E3', 'A3', 'B3', 'E4'], description: 'Subdominant flow.', fretboard: 'x 0 2 2 0 0', baseRoot: 'A' },
          { id: 'melodic-5-child-3', name: 'F Major Bright', subtext: 'F(IV)', notes: ['F2', 'A2', 'C3', 'F3'], description: 'Bright movement.', fretboard: '1 3 3 2 1 x', baseRoot: 'F' },
          { id: 'melodic-5-child-4', name: 'G Major Resolve', subtext: 'G(V)', notes: ['G2', 'B2', 'D3', 'G3'], description: 'Dominant resolution.', fretboard: '3 2 0 0 3 x', baseRoot: 'G' },
          { id: 'melodic-5-child-5', name: 'Dm Suspension', subtext: 'Dm(ii)', notes: ['D3', 'F3', 'A3', 'D4'], description: 'Smooth transition.', fretboard: 'x x 0 2 3 1', baseRoot: 'D' },
          { id: 'melodic-5-child-6', name: 'F# Diminished', subtext: 'F#dim(vii)', notes: ['F#2', 'A2', 'C3', 'F#3'], description: 'Leading tone tension.', fretboard: '2 0 2 1 x x', baseRoot: 'F#' }
        ]
      },
      {
        id: 'melodic-6',
        name: 'Em 11th',
        subtext: 'Em(i)11',
        notes: ['E2', 'G2', 'B2', 'D3', 'F#3', 'A3'],
        description: 'Rich tonic extension. Loathe-style.',
        fretboard: '0 3 2 0 2 0',
        baseRoot: 'E',
        relatedChords: [
          { id: 'melodic-6-child-1', name: 'C Maj7 Rich', subtext: 'C(VI)', notes: ['C3', 'E3', 'G3', 'B3'], description: 'Rich transition.', fretboard: 'x 3 2 0 1 0', baseRoot: 'C' },
          { id: 'melodic-6-child-2', name: 'Am Add9 Flow', subtext: 'Am(iv)', notes: ['A2', 'E3', 'A3', 'B3', 'E4'], description: 'Flowing subdominant.', fretboard: 'x 0 2 2 0 0', baseRoot: 'A' },
          { id: 'melodic-6-child-3', name: 'G Major Lift', subtext: 'G(V)', notes: ['G2', 'B2', 'D3', 'G3'], description: 'Dominant movement.', fretboard: '3 2 0 0 3 x', baseRoot: 'G' },
          { id: 'melodic-6-child-4', name: 'Bm Mediant', subtext: 'Bm(iii)', notes: ['B2', 'D3', 'F#3', 'B3'], description: 'Mediant tension.', fretboard: 'x 2 4 4 2 x', baseRoot: 'B' },
          { id: 'melodic-6-child-5', name: 'Dm Suspension', subtext: 'Dm(ii)', notes: ['D3', 'F3', 'A3', 'D4'], description: 'Smooth transition.', fretboard: 'x x 0 2 3 1', baseRoot: 'D' },
          { id: 'melodic-6-child-6', name: 'F# Diminished', subtext: 'F#dim(vii)', notes: ['F#2', 'A2', 'C3', 'F#3'], description: 'Leading tone tension.', fretboard: '2 0 2 1 x x', baseRoot: 'F#' }
        ]
      }
    ],
    [VibeMode.ENERGETIC]: [
      // E Pedal Point: Open E string drones throughout
      // All chords use E as constant drone for rhythmic cohesion
      {
        id: 'energetic-1',
        name: 'E Power',
        subtext: '5th',
        notes: ['E2', 'B2', 'E3'],
        description: 'Classic power. Palm mute ready.',
        fretboard: '0 2 2 x x x',
        baseRoot: 'E',
        relatedChords: [
          { id: 'energetic-1-child-1', name: 'E Sus4', subtext: 'Sus4', notes: ['E2', 'A2', 'B2', 'E3'], description: 'Sus4 variation.', fretboard: '0 0 2 2 x x', baseRoot: 'E' },
          { id: 'energetic-1-child-2', name: 'E Sus2', subtext: 'Sus2', notes: ['E2', 'F#2', 'B2', 'E3'], description: 'Sus2 variation.', fretboard: '0 2 2 0 x x', baseRoot: 'E' },
          { id: 'energetic-1-child-3', name: 'E Octave', subtext: 'Octave', notes: ['E2', 'E3', 'B3'], description: 'Octave variation.', fretboard: '0 2 0 x x x', baseRoot: 'E' },
          { id: 'energetic-1-child-4', name: 'E Low Stack', subtext: 'Low 5th', notes: ['E1', 'E2', 'B2'], description: 'Ultra low-end.', fretboard: '0 0 2 x x x', baseRoot: 'E' },
          { id: 'energetic-1-child-5', name: 'E Double 5th', subtext: '5th Stack', notes: ['E2', 'B2', 'E3', 'B3'], description: 'Double stop power.', fretboard: '0 2 2 0 x x', baseRoot: 'E' },
          { id: 'energetic-1-child-6', name: 'E Add4', subtext: '5th/4th', notes: ['E2', 'A2', 'B2', 'E3'], description: 'Djent-style add4.', fretboard: '0 0 2 0 x x', baseRoot: 'E' }
        ]
      },
      {
        id: 'energetic-2',
        name: 'E Sus4',
        subtext: 'Sus4',
        notes: ['E2', 'A2', 'B2', 'E3'],
        description: 'Tight sus4. Gallop-friendly.',
        fretboard: '0 0 2 2 x x',
        baseRoot: 'E',
        relatedChords: [
          { id: 'energetic-2-child-1', name: 'E Power', subtext: '5th', notes: ['E2', 'B2', 'E3'], description: 'Power variation.', fretboard: '0 2 2 x x x', baseRoot: 'E' },
          { id: 'energetic-2-child-2', name: 'E Sus2', subtext: 'Sus2', notes: ['E2', 'F#2', 'B2', 'E3'], description: 'Sus2 variation.', fretboard: '0 2 2 0 x x', baseRoot: 'E' },
          { id: 'energetic-2-child-3', name: 'E Octave', subtext: 'Octave', notes: ['E2', 'E3', 'B3'], description: 'Octave variation.', fretboard: '0 2 0 x x x', baseRoot: 'E' },
          { id: 'energetic-2-child-4', name: 'E Low Stack', subtext: 'Low 5th', notes: ['E1', 'E2', 'B2'], description: 'Ultra low-end.', fretboard: '0 0 2 x x x', baseRoot: 'E' },
          { id: 'energetic-2-child-5', name: 'E Double 5th', subtext: '5th Stack', notes: ['E2', 'B2', 'E3', 'B3'], description: 'Double stop power.', fretboard: '0 2 2 0 x x', baseRoot: 'E' },
          { id: 'energetic-2-child-6', name: 'E Add4', subtext: '5th/4th', notes: ['E2', 'A2', 'B2', 'E3'], description: 'Djent-style add4.', fretboard: '0 0 2 0 x x', baseRoot: 'E' }
        ]
      },
      {
        id: 'energetic-3',
        name: 'E Sus2',
        subtext: 'Sus2',
        notes: ['E2', 'F#2', 'B2', 'E3'],
        description: 'Sus2 with E drone. Modern metalcore.',
        fretboard: '0 2 2 0 x x',
        baseRoot: 'E',
        relatedChords: [
          { id: 'energetic-3-child-1', name: 'E Power', subtext: '5th', notes: ['E2', 'B2', 'E3'], description: 'Power variation.', fretboard: '0 2 2 x x x', baseRoot: 'E' },
          { id: 'energetic-3-child-2', name: 'E Sus4', subtext: 'Sus4', notes: ['E2', 'A2', 'B2', 'E3'], description: 'Sus4 variation.', fretboard: '0 0 2 2 x x', baseRoot: 'E' },
          { id: 'energetic-3-child-3', name: 'E Octave', subtext: 'Octave', notes: ['E2', 'E3', 'B3'], description: 'Octave variation.', fretboard: '0 2 0 x x x', baseRoot: 'E' },
          { id: 'energetic-3-child-4', name: 'E Low Stack', subtext: 'Low 5th', notes: ['E1', 'E2', 'B2'], description: 'Ultra low-end.', fretboard: '0 0 2 x x x', baseRoot: 'E' },
          { id: 'energetic-3-child-5', name: 'E Double 5th', subtext: '5th Stack', notes: ['E2', 'B2', 'E3', 'B3'], description: 'Double stop power.', fretboard: '0 2 2 0 x x', baseRoot: 'E' },
          { id: 'energetic-3-child-6', name: 'E Add4', subtext: '5th/4th', notes: ['E2', 'A2', 'B2', 'E3'], description: 'Djent-style add4.', fretboard: '0 0 2 0 x x', baseRoot: 'E' }
        ]
      },
      {
        id: 'energetic-4',
        name: 'E Octave',
        subtext: 'Octave',
        notes: ['E2', 'E3', 'B3'],
        description: 'Clean octaves. Rhythmic clarity.',
        fretboard: '0 2 0 x x x',
        baseRoot: 'E',
        relatedChords: [
          { id: 'energetic-4-child-1', name: 'E Power', subtext: '5th', notes: ['E2', 'B2', 'E3'], description: 'Power variation.', fretboard: '0 2 2 x x x', baseRoot: 'E' },
          { id: 'energetic-4-child-2', name: 'E Sus4', subtext: 'Sus4', notes: ['E2', 'A2', 'B2', 'E3'], description: 'Sus4 variation.', fretboard: '0 0 2 2 x x', baseRoot: 'E' },
          { id: 'energetic-4-child-3', name: 'E Sus2', subtext: 'Sus2', notes: ['E2', 'F#2', 'B2', 'E3'], description: 'Sus2 variation.', fretboard: '0 2 2 0 x x', baseRoot: 'E' },
          { id: 'energetic-4-child-4', name: 'E Low Stack', subtext: 'Low 5th', notes: ['E1', 'E2', 'B2'], description: 'Ultra low-end.', fretboard: '0 0 2 x x x', baseRoot: 'E' },
          { id: 'energetic-4-child-5', name: 'E Double 5th', subtext: '5th Stack', notes: ['E2', 'B2', 'E3', 'B3'], description: 'Double stop power.', fretboard: '0 2 2 0 x x', baseRoot: 'E' },
          { id: 'energetic-4-child-6', name: 'E Add4', subtext: '5th/4th', notes: ['E2', 'A2', 'B2', 'E3'], description: 'Djent-style add4.', fretboard: '0 0 2 0 x x', baseRoot: 'E' }
        ]
      },
      {
        id: 'energetic-5',
        name: 'E Low Stack',
        subtext: 'Low 5th',
        notes: ['E1', 'E2', 'B2'],
        description: 'Ultra low-end. Palm mute required.',
        fretboard: '0 0 2 x x x',
        baseRoot: 'E',
        relatedChords: [
          { id: 'energetic-5-child-1', name: 'E Power', subtext: '5th', notes: ['E2', 'B2', 'E3'], description: 'Power variation.', fretboard: '0 2 2 x x x', baseRoot: 'E' },
          { id: 'energetic-5-child-2', name: 'E Sus4', subtext: 'Sus4', notes: ['E2', 'A2', 'B2', 'E3'], description: 'Sus4 variation.', fretboard: '0 0 2 2 x x', baseRoot: 'E' },
          { id: 'energetic-5-child-3', name: 'E Sus2', subtext: 'Sus2', notes: ['E2', 'F#2', 'B2', 'E3'], description: 'Sus2 variation.', fretboard: '0 2 2 0 x x', baseRoot: 'E' },
          { id: 'energetic-5-child-4', name: 'E Octave', subtext: 'Octave', notes: ['E2', 'E3', 'B3'], description: 'Octave variation.', fretboard: '0 2 0 x x x', baseRoot: 'E' },
          { id: 'energetic-5-child-5', name: 'E Double 5th', subtext: '5th Stack', notes: ['E2', 'B2', 'E3', 'B3'], description: 'Double stop power.', fretboard: '0 2 2 0 x x', baseRoot: 'E' },
          { id: 'energetic-5-child-6', name: 'E Add4', subtext: '5th/4th', notes: ['E2', 'A2', 'B2', 'E3'], description: 'Djent-style add4.', fretboard: '0 0 2 0 x x', baseRoot: 'E' }
        ]
      },
      {
        id: 'energetic-6',
        name: 'E Double 5th',
        subtext: '5th Stack',
        notes: ['E2', 'B2', 'E3', 'B3'],
        description: 'Double stop power. Maximum punch.',
        fretboard: '0 2 2 0 x x',
        baseRoot: 'E',
        relatedChords: [
          { id: 'energetic-6-child-1', name: 'E Power', subtext: '5th', notes: ['E2', 'B2', 'E3'], description: 'Power variation.', fretboard: '0 2 2 x x x', baseRoot: 'E' },
          { id: 'energetic-6-child-2', name: 'E Sus4', subtext: 'Sus4', notes: ['E2', 'A2', 'B2', 'E3'], description: 'Sus4 variation.', fretboard: '0 0 2 2 x x', baseRoot: 'E' },
          { id: 'energetic-6-child-3', name: 'E Sus2', subtext: 'Sus2', notes: ['E2', 'F#2', 'B2', 'E3'], description: 'Sus2 variation.', fretboard: '0 2 2 0 x x', baseRoot: 'E' },
          { id: 'energetic-6-child-4', name: 'E Octave', subtext: 'Octave', notes: ['E2', 'E3', 'B3'], description: 'Octave variation.', fretboard: '0 2 0 x x x', baseRoot: 'E' },
          { id: 'energetic-6-child-5', name: 'E Low Stack', subtext: 'Low 5th', notes: ['E1', 'E2', 'B2'], description: 'Ultra low-end.', fretboard: '0 0 2 x x x', baseRoot: 'E' },
          { id: 'energetic-6-child-6', name: 'E Add4', subtext: '5th/4th', notes: ['E2', 'A2', 'B2', 'E3'], description: 'Djent-style add4.', fretboard: '0 0 2 0 x x', baseRoot: 'E' }
        ]
      }
    ]
  },
  [TuningMode.DROP]: {
    [VibeMode.DARK]: [
      // D Phrygian Dominant: D, D#, F#, G, A, A#, C
      // All chords share D as tonal center with m2 and tritone intervals
      {
        id: 'drop-dark-1',
        name: 'Drop Omen',
        subtext: 'm2 Clash',
        notes: ['D2', 'D#2', 'A2', 'D3'],
        description: 'Drop tuning darkness. Heavy m2.',
        fretboard: '0 1 2 x x x',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-dark-1-child-1', name: 'Drop Phrygian', subtext: 'b2', notes: ['D2', 'D#2', 'F#2', 'A2', 'D3'], description: 'Phrygian foundation.', fretboard: '0 1 4 2 0 x', baseRoot: 'D' },
          { id: 'drop-dark-1-child-2', name: 'Drop Tritone', subtext: 'b5', notes: ['D2', 'G#2', 'D3', 'G#3'], description: 'Devil\'s interval.', fretboard: '0 6 0 6 x x', baseRoot: 'D' },
          { id: 'drop-dark-1-child-3', name: 'Drop Dim Phrygian', subtext: 'Dim/b2', notes: ['D2', 'D#2', 'F2', 'G#2'], description: 'Maximum tension.', fretboard: '0 1 3 6 x x', baseRoot: 'D' },
          { id: 'drop-dark-1-child-4', name: 'Drop Phrygian b6', subtext: 'b2/b6', notes: ['D2', 'D#2', 'F#2', 'A2', 'A#2'], description: 'Exotic darkness.', fretboard: '0 1 4 2 3 x', baseRoot: 'D' },
          { id: 'drop-dark-1-child-5', name: 'Drop Tritone Resolve', subtext: 'b5/m2', notes: ['D2', 'D#2', 'G#2', 'D3'], description: 'Unsettling resolve.', fretboard: '0 1 6 0 x x', baseRoot: 'D' },
          { id: 'drop-dark-1-child-6', name: 'Drop Phrygian 7th', subtext: 'b2/b7', notes: ['D2', 'D#2', 'C3', 'D3'], description: 'Dark dominant.', fretboard: '0 1 0 2 x x', baseRoot: 'D' }
        ]
      },
      {
        id: 'drop-dark-2',
        name: 'Drop Phrygian',
        subtext: 'b2',
        notes: ['D2', 'D#2', 'F#2', 'A2', 'D3'],
        description: 'Phrygian dominant drop. Exotic.',
        fretboard: '0 1 4 2 0 x',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-dark-2-child-1', name: 'Drop Omen', subtext: 'm2 Clash', notes: ['D2', 'D#2', 'A2', 'D3'], description: 'Minor 2nd dissonance.', fretboard: '0 1 2 x x x', baseRoot: 'D' },
          { id: 'drop-dark-2-child-2', name: 'Drop Tritone', subtext: 'b5', notes: ['D2', 'G#2', 'D3', 'G#3'], description: 'Devil\'s interval.', fretboard: '0 6 0 6 x x', baseRoot: 'D' },
          { id: 'drop-dark-2-child-3', name: 'Drop Dim Phrygian', subtext: 'Dim/b2', notes: ['D2', 'D#2', 'F2', 'G#2'], description: 'Maximum tension.', fretboard: '0 1 3 6 x x', baseRoot: 'D' },
          { id: 'drop-dark-2-child-4', name: 'Drop Phrygian b6', subtext: 'b2/b6', notes: ['D2', 'D#2', 'F#2', 'A2', 'A#2'], description: 'Exotic darkness.', fretboard: '0 1 4 2 3 x', baseRoot: 'D' },
          { id: 'drop-dark-2-child-5', name: 'Drop Tritone Resolve', subtext: 'b5/m2', notes: ['D2', 'D#2', 'G#2', 'D3'], description: 'Unsettling resolve.', fretboard: '0 1 6 0 x x', baseRoot: 'D' },
          { id: 'drop-dark-2-child-6', name: 'Drop Phrygian 7th', subtext: 'b2/b7', notes: ['D2', 'D#2', 'C3', 'D3'], description: 'Dark dominant.', fretboard: '0 1 0 2 x x', baseRoot: 'D' }
        ]
      },
      {
        id: 'drop-dark-3',
        name: 'Drop Tritone',
        subtext: 'b5',
        notes: ['D2', 'G#2', 'D3', 'G#3'],
        description: 'Devil\'s interval. Drop power.',
        fretboard: '0 6 0 6 x x',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-dark-3-child-1', name: 'Drop Omen', subtext: 'm2 Clash', notes: ['D2', 'D#2', 'A2', 'D3'], description: 'Minor 2nd dissonance.', fretboard: '0 1 2 x x x', baseRoot: 'D' },
          { id: 'drop-dark-3-child-2', name: 'Drop Phrygian', subtext: 'b2', notes: ['D2', 'D#2', 'F#2', 'A2', 'D3'], description: 'Phrygian foundation.', fretboard: '0 1 4 2 0 x', baseRoot: 'D' },
          { id: 'drop-dark-3-child-3', name: 'Drop Dim Phrygian', subtext: 'Dim/b2', notes: ['D2', 'D#2', 'F2', 'G#2'], description: 'Maximum tension.', fretboard: '0 1 3 6 x x', baseRoot: 'D' },
          { id: 'drop-dark-3-child-4', name: 'Drop Phrygian b6', subtext: 'b2/b6', notes: ['D2', 'D#2', 'F#2', 'A2', 'A#2'], description: 'Exotic darkness.', fretboard: '0 1 4 2 3 x', baseRoot: 'D' },
          { id: 'drop-dark-3-child-5', name: 'Drop Tritone Resolve', subtext: 'b5/m2', notes: ['D2', 'D#2', 'G#2', 'D3'], description: 'Unsettling resolve.', fretboard: '0 1 6 0 x x', baseRoot: 'D' },
          { id: 'drop-dark-3-child-6', name: 'Drop Phrygian 7th', subtext: 'b2/b7', notes: ['D2', 'D#2', 'C3', 'D3'], description: 'Dark dominant.', fretboard: '0 1 0 2 x x', baseRoot: 'D' }
        ]
      },
      {
        id: 'drop-dark-4',
        name: 'Drop Dim Phrygian',
        subtext: 'Dim/b2',
        notes: ['D2', 'D#2', 'F2', 'G#2'],
        description: 'Diminished with m2. Maximum tension.',
        fretboard: '0 1 3 6 x x',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-dark-4-child-1', name: 'Drop Omen', subtext: 'm2 Clash', notes: ['D2', 'D#2', 'A2', 'D3'], description: 'Minor 2nd dissonance.', fretboard: '0 1 2 x x x', baseRoot: 'D' },
          { id: 'drop-dark-4-child-2', name: 'Drop Phrygian', subtext: 'b2', notes: ['D2', 'D#2', 'F#2', 'A2', 'D3'], description: 'Phrygian foundation.', fretboard: '0 1 4 2 0 x', baseRoot: 'D' },
          { id: 'drop-dark-4-child-3', name: 'Drop Tritone', subtext: 'b5', notes: ['D2', 'G#2', 'D3', 'G#3'], description: 'Devil\'s interval.', fretboard: '0 6 0 6 x x', baseRoot: 'D' },
          { id: 'drop-dark-4-child-4', name: 'Drop Phrygian b6', subtext: 'b2/b6', notes: ['D2', 'D#2', 'F#2', 'A2', 'A#2'], description: 'Exotic darkness.', fretboard: '0 1 4 2 3 x', baseRoot: 'D' },
          { id: 'drop-dark-4-child-5', name: 'Drop Tritone Resolve', subtext: 'b5/m2', notes: ['D2', 'D#2', 'G#2', 'D3'], description: 'Unsettling resolve.', fretboard: '0 1 6 0 x x', baseRoot: 'D' },
          { id: 'drop-dark-4-child-6', name: 'Drop Phrygian 7th', subtext: 'b2/b7', notes: ['D2', 'D#2', 'C3', 'D3'], description: 'Dark dominant.', fretboard: '0 1 0 2 x x', baseRoot: 'D' }
        ]
      },
      {
        id: 'drop-dark-5',
        name: 'Drop Phrygian b6',
        subtext: 'b2/b6',
        notes: ['D2', 'D#2', 'F#2', 'A2', 'A#2'],
        description: 'Exotic drop darkness. Heavy.',
        fretboard: '0 1 4 2 3 x',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-dark-5-child-1', name: 'Drop Omen', subtext: 'm2 Clash', notes: ['D2', 'D#2', 'A2', 'D3'], description: 'Minor 2nd dissonance.', fretboard: '0 1 2 x x x', baseRoot: 'D' },
          { id: 'drop-dark-5-child-2', name: 'Drop Phrygian', subtext: 'b2', notes: ['D2', 'D#2', 'F#2', 'A2', 'D3'], description: 'Phrygian foundation.', fretboard: '0 1 4 2 0 x', baseRoot: 'D' },
          { id: 'drop-dark-5-child-3', name: 'Drop Tritone', subtext: 'b5', notes: ['D2', 'G#2', 'D3', 'G#3'], description: 'Devil\'s interval.', fretboard: '0 6 0 6 x x', baseRoot: 'D' },
          { id: 'drop-dark-5-child-4', name: 'Drop Dim Phrygian', subtext: 'Dim/b2', notes: ['D2', 'D#2', 'F2', 'G#2'], description: 'Maximum tension.', fretboard: '0 1 3 6 x x', baseRoot: 'D' },
          { id: 'drop-dark-5-child-5', name: 'Drop Tritone Resolve', subtext: 'b5/m2', notes: ['D2', 'D#2', 'G#2', 'D3'], description: 'Unsettling resolve.', fretboard: '0 1 6 0 x x', baseRoot: 'D' },
          { id: 'drop-dark-5-child-6', name: 'Drop Phrygian 7th', subtext: 'b2/b7', notes: ['D2', 'D#2', 'C3', 'D3'], description: 'Dark dominant.', fretboard: '0 1 0 2 x x', baseRoot: 'D' }
        ]
      },
      {
        id: 'drop-dark-6',
        name: 'Drop Tritone Resolve',
        subtext: 'b5/m2',
        notes: ['D2', 'D#2', 'G#2', 'D3'],
        description: 'Tritone with m2 clash. Unsettling.',
        fretboard: '0 1 6 0 x x',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-dark-6-child-1', name: 'Drop Omen', subtext: 'm2 Clash', notes: ['D2', 'D#2', 'A2', 'D3'], description: 'Minor 2nd dissonance.', fretboard: '0 1 2 x x x', baseRoot: 'D' },
          { id: 'drop-dark-6-child-2', name: 'Drop Phrygian', subtext: 'b2', notes: ['D2', 'D#2', 'F#2', 'A2', 'D3'], description: 'Phrygian foundation.', fretboard: '0 1 4 2 0 x', baseRoot: 'D' },
          { id: 'drop-dark-6-child-3', name: 'Drop Tritone', subtext: 'b5', notes: ['D2', 'G#2', 'D3', 'G#3'], description: 'Devil\'s interval.', fretboard: '0 6 0 6 x x', baseRoot: 'D' },
          { id: 'drop-dark-6-child-4', name: 'Drop Dim Phrygian', subtext: 'Dim/b2', notes: ['D2', 'D#2', 'F2', 'G#2'], description: 'Maximum tension.', fretboard: '0 1 3 6 x x', baseRoot: 'D' },
          { id: 'drop-dark-6-child-5', name: 'Drop Phrygian b6', subtext: 'b2/b6', notes: ['D2', 'D#2', 'F#2', 'A2', 'A#2'], description: 'Exotic darkness.', fretboard: '0 1 4 2 3 x', baseRoot: 'D' },
          { id: 'drop-dark-6-child-6', name: 'Drop Phrygian 7th', subtext: 'b2/b7', notes: ['D2', 'D#2', 'C3', 'D3'], description: 'Dark dominant.', fretboard: '0 1 0 2 x x', baseRoot: 'D' }
        ]
      }
    ],
    [VibeMode.MELODIC]: [
      // D Minor Diatonic: Dm (i), Bb (VI), Gm (iv) - smooth voice leading
      // All chords flow naturally in D Minor key
      {
        id: 'drop-melodic-1',
        name: 'Drop Ghost',
        subtext: 'Dm(add9)',
        notes: ['D2', 'A2', 'E3', 'F3', 'A3', 'D4'],
        description: 'Drop melancholy. Wide intervals.',
        fretboard: '0 2 4 0 0 0',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-melodic-1-child-1', name: 'Drop Bb Maj7', subtext: 'Bb(VI)', notes: ['Bb2', 'D3', 'F3', 'A3'], description: 'Relative major transition.', fretboard: 'x 1 3 2 1 x', baseRoot: 'A#' },
          { id: 'drop-melodic-1-child-2', name: 'Drop Gm Add9', subtext: 'Gm(iv)', notes: ['G2', 'D3', 'G3', 'A3', 'D4'], description: 'Subdominant extension.', fretboard: '3 0 0 2 0 x', baseRoot: 'G' },
          { id: 'drop-melodic-1-child-3', name: 'Drop Am Lift', subtext: 'Am(v)', notes: ['A2', 'C3', 'E3', 'A3'], description: 'Dominant resolution.', fretboard: 'x 0 2 2 0 x', baseRoot: 'A' },
          { id: 'drop-melodic-1-child-4', name: 'Drop Fm Mediant', subtext: 'Fm(iii)', notes: ['F2', 'A#2', 'C3', 'F3'], description: 'Mediant tension.', fretboard: '1 3 3 1 1 x', baseRoot: 'F' },
          { id: 'drop-melodic-1-child-5', name: 'Drop Edim Suspension', subtext: 'Edim(ii)', notes: ['E2', 'G2', 'A#2', 'E3'], description: 'Supertonic movement.', fretboard: '0 3 6 0 x x', baseRoot: 'E' },
          { id: 'drop-melodic-1-child-6', name: 'Drop C Major', subtext: 'C(VII)', notes: ['C2', 'E2', 'G2', 'C3'], description: 'Subtonic resolution.', fretboard: 'x 3 5 5 5 x', baseRoot: 'C' }
        ]
      },
      {
        id: 'drop-melodic-2',
        name: 'Drop Bb Maj7',
        subtext: 'Bb(VI)',
        notes: ['Bb2', 'D3', 'F3', 'A3'],
        description: 'Relative major. Bright contrast.',
        fretboard: 'x 1 3 2 1 x',
        baseRoot: 'A#',
        relatedChords: [
          { id: 'drop-melodic-2-child-1', name: 'Drop Ghost Return', subtext: 'Dm(i)', notes: ['D2', 'A2', 'E3', 'F3', 'A3', 'D4'], description: 'Back to tonic.', fretboard: '0 2 4 0 0 0', baseRoot: 'D' },
          { id: 'drop-melodic-2-child-2', name: 'Drop Gm Add9', subtext: 'Gm(iv)', notes: ['G2', 'D3', 'G3', 'A3', 'D4'], description: 'Subdominant flow.', fretboard: '3 0 0 2 0 x', baseRoot: 'G' },
          { id: 'drop-melodic-2-child-3', name: 'Drop F Major Bright', subtext: 'F(IV)', notes: ['F2', 'A2', 'C3', 'F3'], description: 'Bright subdominant.', fretboard: '1 3 3 2 1 x', baseRoot: 'F' },
          { id: 'drop-melodic-2-child-4', name: 'Drop Am Lift', subtext: 'Am(v)', notes: ['A2', 'C3', 'E3', 'A3'], description: 'Dominant movement.', fretboard: 'x 0 2 2 0 x', baseRoot: 'A' },
          { id: 'drop-melodic-2-child-5', name: 'Drop Edim Suspension', subtext: 'Edim(ii)', notes: ['E2', 'G2', 'A#2', 'E3'], description: 'Smooth transition.', fretboard: '0 3 6 0 x x', baseRoot: 'E' },
          { id: 'drop-melodic-2-child-6', name: 'Drop C Major', subtext: 'C(VII)', notes: ['C2', 'E2', 'G2', 'C3'], description: 'Subtonic resolution.', fretboard: 'x 3 5 5 5 x', baseRoot: 'C' }
        ]
      },
      {
        id: 'drop-melodic-3',
        name: 'Drop Gm Add9',
        subtext: 'Gm(iv)',
        notes: ['G2', 'D3', 'G3', 'A3', 'D4'],
        description: 'Subdominant with extension. Flowing.',
        fretboard: '3 0 0 2 0 x',
        baseRoot: 'G',
        relatedChords: [
          { id: 'drop-melodic-3-child-1', name: 'Drop Ghost Return', subtext: 'Dm(i)', notes: ['D2', 'A2', 'E3', 'F3', 'A3', 'D4'], description: 'Return to tonic.', fretboard: '0 2 4 0 0 0', baseRoot: 'D' },
          { id: 'drop-melodic-3-child-2', name: 'Drop Bb Maj7', subtext: 'Bb(VI)', notes: ['Bb2', 'D3', 'F3', 'A3'], description: 'Relative major.', fretboard: 'x 1 3 2 1 x', baseRoot: 'A#' },
          { id: 'drop-melodic-3-child-3', name: 'Drop F Major Transition', subtext: 'F(IV)', notes: ['F2', 'A2', 'C3', 'F3'], description: 'Smooth movement.', fretboard: '1 3 3 2 1 x', baseRoot: 'F' },
          { id: 'drop-melodic-3-child-4', name: 'Drop Edim Suspension', subtext: 'Edim(ii)', notes: ['E2', 'G2', 'A#2', 'E3'], description: 'Tension builder.', fretboard: '0 3 6 0 x x', baseRoot: 'E' },
          { id: 'drop-melodic-3-child-5', name: 'Drop Am Resolve', subtext: 'Am(v)', notes: ['A2', 'C3', 'E3', 'A3'], description: 'Dominant resolution.', fretboard: 'x 0 2 2 0 x', baseRoot: 'A' },
          { id: 'drop-melodic-3-child-6', name: 'Drop C Major', subtext: 'C(VII)', notes: ['C2', 'E2', 'G2', 'C3'], description: 'Subtonic resolution.', fretboard: 'x 3 5 5 5 x', baseRoot: 'C' }
        ]
      },
      {
        id: 'drop-melodic-4',
        name: 'Drop Dm Maj7',
        subtext: 'Dm(i)',
        notes: ['D2', 'F2', 'A2', 'C#3', 'D4'],
        description: 'Tonic with major 7th. Ethereal.',
        fretboard: '0 3 0 1 0 x',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-melodic-4-child-1', name: 'Drop Bb Maj7 Ethereal', subtext: 'Bb(VI)', notes: ['Bb2', 'D3', 'F3', 'A3'], description: 'Ethereal transition.', fretboard: 'x 1 3 2 1 x', baseRoot: 'A#' },
          { id: 'drop-melodic-4-child-2', name: 'Drop Gm Add9 Flow', subtext: 'Gm(iv)', notes: ['G2', 'D3', 'G3', 'A3', 'D4'], description: 'Flowing subdominant.', fretboard: '3 0 0 2 0 x', baseRoot: 'G' },
          { id: 'drop-melodic-4-child-3', name: 'Drop Am Lift', subtext: 'Am(v)', notes: ['A2', 'C3', 'E3', 'A3'], description: 'Dominant movement.', fretboard: 'x 0 2 2 0 x', baseRoot: 'A' },
          { id: 'drop-melodic-4-child-4', name: 'Drop Fm Mediant', subtext: 'Fm(iii)', notes: ['F2', 'A#2', 'C3', 'F3'], description: 'Mediant tension.', fretboard: '1 3 3 1 1 x', baseRoot: 'F' },
          { id: 'drop-melodic-4-child-5', name: 'Drop Edim Suspension', subtext: 'Edim(ii)', notes: ['E2', 'G2', 'A#2', 'E3'], description: 'Smooth transition.', fretboard: '0 3 6 0 x x', baseRoot: 'E' },
          { id: 'drop-melodic-4-child-6', name: 'Drop C Major', subtext: 'C(VII)', notes: ['C2', 'E2', 'G2', 'C3'], description: 'Subtonic resolution.', fretboard: 'x 3 5 5 5 x', baseRoot: 'C' }
        ]
      },
      {
        id: 'drop-melodic-5',
        name: 'Drop Bb sus2',
        subtext: 'Bb(VI)sus2',
        notes: ['Bb2', 'C3', 'F3', 'Bb3'],
        description: 'Suspended VI. Smooth transition.',
        fretboard: 'x 1 3 3 1 x',
        baseRoot: 'A#',
        relatedChords: [
          { id: 'drop-melodic-5-child-1', name: 'Drop Ghost Return', subtext: 'Dm(i)', notes: ['D2', 'A2', 'E3', 'F3', 'A3', 'D4'], description: 'Return to tonic.', fretboard: '0 2 4 0 0 0', baseRoot: 'D' },
          { id: 'drop-melodic-5-child-2', name: 'Drop Gm Add9 Flow', subtext: 'Gm(iv)', notes: ['G2', 'D3', 'G3', 'A3', 'D4'], description: 'Subdominant flow.', fretboard: '3 0 0 2 0 x', baseRoot: 'G' },
          { id: 'drop-melodic-5-child-3', name: 'Drop F Major Bright', subtext: 'F(IV)', notes: ['F2', 'A2', 'C3', 'F3'], description: 'Bright movement.', fretboard: '1 3 3 2 1 x', baseRoot: 'F' },
          { id: 'drop-melodic-5-child-4', name: 'Drop Am Resolve', subtext: 'Am(v)', notes: ['A2', 'C3', 'E3', 'A3'], description: 'Dominant resolution.', fretboard: 'x 0 2 2 0 x', baseRoot: 'A' },
          { id: 'drop-melodic-5-child-5', name: 'Drop Edim Suspension', subtext: 'Edim(ii)', notes: ['E2', 'G2', 'A#2', 'E3'], description: 'Smooth transition.', fretboard: '0 3 6 0 x x', baseRoot: 'E' },
          { id: 'drop-melodic-5-child-6', name: 'Drop C Major', subtext: 'C(VII)', notes: ['C2', 'E2', 'G2', 'C3'], description: 'Subtonic resolution.', fretboard: 'x 3 5 5 5 x', baseRoot: 'C' }
        ]
      },
      {
        id: 'drop-melodic-6',
        name: 'Drop Dm 11th',
        subtext: 'Dm(i)11',
        notes: ['D2', 'F2', 'A2', 'C3', 'E3', 'G3'],
        description: 'Rich tonic extension. Loathe-style.',
        fretboard: '0 3 0 0 2 3',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-melodic-6-child-1', name: 'Drop Bb Maj7 Rich', subtext: 'Bb(VI)', notes: ['Bb2', 'D3', 'F3', 'A3'], description: 'Rich transition.', fretboard: 'x 1 3 2 1 x', baseRoot: 'A#' },
          { id: 'drop-melodic-6-child-2', name: 'Drop Gm Add9 Flow', subtext: 'Gm(iv)', notes: ['G2', 'D3', 'G3', 'A3', 'D4'], description: 'Flowing subdominant.', fretboard: '3 0 0 2 0 x', baseRoot: 'G' },
          { id: 'drop-melodic-6-child-3', name: 'Drop Am Lift', subtext: 'Am(v)', notes: ['A2', 'C3', 'E3', 'A3'], description: 'Dominant movement.', fretboard: 'x 0 2 2 0 x', baseRoot: 'A' },
          { id: 'drop-melodic-6-child-4', name: 'Drop Fm Mediant', subtext: 'Fm(iii)', notes: ['F2', 'A#2', 'C3', 'F3'], description: 'Mediant tension.', fretboard: '1 3 3 1 1 x', baseRoot: 'F' },
          { id: 'drop-melodic-6-child-5', name: 'Drop Edim Suspension', subtext: 'Edim(ii)', notes: ['E2', 'G2', 'A#2', 'E3'], description: 'Smooth transition.', fretboard: '0 3 6 0 x x', baseRoot: 'E' },
          { id: 'drop-melodic-6-child-6', name: 'Drop C Major', subtext: 'C(VII)', notes: ['C2', 'E2', 'G2', 'C3'], description: 'Subtonic resolution.', fretboard: 'x 3 5 5 5 x', baseRoot: 'C' }
        ]
      }
    ],
    [VibeMode.ENERGETIC]: [
      // D Pedal Point: Open D string drones throughout
      // All chords use D as constant drone for rhythmic cohesion
      {
        id: 'drop-energetic-1',
        name: 'Drop D Power',
        subtext: '5th',
        notes: ['D2', 'A2', 'D3'],
        description: 'Classic drop power. Heavy.',
        fretboard: '0 0 2 x x x',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-energetic-1-child-1', name: 'Drop D Sus4', subtext: 'Sus4', notes: ['D2', 'G2', 'A2', 'D3'], description: 'Sus4 variation.', fretboard: '0 0 2 2 x x', baseRoot: 'D' },
          { id: 'drop-energetic-1-child-2', name: 'Drop D Sus2', subtext: 'Sus2', notes: ['D2', 'E2', 'A2', 'D3'], description: 'Sus2 variation.', fretboard: '0 2 0 0 x x', baseRoot: 'D' },
          { id: 'drop-energetic-1-child-3', name: 'Drop D Octave', subtext: 'Octave', notes: ['D2', 'D3', 'A3'], description: 'Octave variation.', fretboard: '0 0 0 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-1-child-4', name: 'Drop D Low Stack', subtext: 'Low 5th', notes: ['D1', 'D2', 'A2'], description: 'Ultra low-end.', fretboard: '0 0 2 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-1-child-5', name: 'Drop D Double 5th', subtext: '5th Stack', notes: ['D2', 'A2', 'D3', 'A3'], description: 'Double stop power.', fretboard: '0 0 2 0 x x', baseRoot: 'D' },
          { id: 'drop-energetic-1-child-6', name: 'Drop D Add4', subtext: '5th/4th', notes: ['D2', 'G2', 'A2', 'D3'], description: 'Djent-style add4.', fretboard: '0 0 0 2 x x', baseRoot: 'D' }
        ]
      },
      {
        id: 'drop-energetic-2',
        name: 'Drop D Sus4',
        subtext: 'Sus4',
        notes: ['D2', 'G2', 'A2', 'D3'],
        description: 'Drop sus4 chug. Gallop-ready.',
        fretboard: '0 0 2 2 x x',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-energetic-2-child-1', name: 'Drop D Power', subtext: '5th', notes: ['D2', 'A2', 'D3'], description: 'Power variation.', fretboard: '0 0 2 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-2-child-2', name: 'Drop D Sus2', subtext: 'Sus2', notes: ['D2', 'E2', 'A2', 'D3'], description: 'Sus2 variation.', fretboard: '0 2 0 0 x x', baseRoot: 'D' },
          { id: 'drop-energetic-2-child-3', name: 'Drop D Octave', subtext: 'Octave', notes: ['D2', 'D3', 'A3'], description: 'Octave variation.', fretboard: '0 0 0 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-2-child-4', name: 'Drop D Low Stack', subtext: 'Low 5th', notes: ['D1', 'D2', 'A2'], description: 'Ultra low-end.', fretboard: '0 0 2 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-2-child-5', name: 'Drop D Double 5th', subtext: '5th Stack', notes: ['D2', 'A2', 'D3', 'A3'], description: 'Double stop power.', fretboard: '0 0 2 0 x x', baseRoot: 'D' },
          { id: 'drop-energetic-2-child-6', name: 'Drop D Add4', subtext: '5th/4th', notes: ['D2', 'G2', 'A2', 'D3'], description: 'Djent-style add4.', fretboard: '0 0 0 2 x x', baseRoot: 'D' }
        ]
      },
      {
        id: 'drop-energetic-3',
        name: 'Drop D Sus2',
        subtext: 'Sus2',
        notes: ['D2', 'E2', 'A2', 'D3'],
        description: 'Sus2 with D drone. Modern metalcore.',
        fretboard: '0 2 0 0 x x',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-energetic-3-child-1', name: 'Drop D Power', subtext: '5th', notes: ['D2', 'A2', 'D3'], description: 'Power variation.', fretboard: '0 0 2 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-3-child-2', name: 'Drop D Sus4', subtext: 'Sus4', notes: ['D2', 'G2', 'A2', 'D3'], description: 'Sus4 variation.', fretboard: '0 0 2 2 x x', baseRoot: 'D' },
          { id: 'drop-energetic-3-child-3', name: 'Drop D Octave', subtext: 'Octave', notes: ['D2', 'D3', 'A3'], description: 'Octave variation.', fretboard: '0 0 0 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-3-child-4', name: 'Drop D Low Stack', subtext: 'Low 5th', notes: ['D1', 'D2', 'A2'], description: 'Ultra low-end.', fretboard: '0 0 2 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-3-child-5', name: 'Drop D Double 5th', subtext: '5th Stack', notes: ['D2', 'A2', 'D3', 'A3'], description: 'Double stop power.', fretboard: '0 0 2 0 x x', baseRoot: 'D' },
          { id: 'drop-energetic-3-child-6', name: 'Drop D Add4', subtext: '5th/4th', notes: ['D2', 'G2', 'A2', 'D3'], description: 'Djent-style add4.', fretboard: '0 0 0 2 x x', baseRoot: 'D' }
        ]
      },
      {
        id: 'drop-energetic-4',
        name: 'Drop D Octave',
        subtext: 'Octave',
        notes: ['D2', 'D3', 'A3'],
        description: 'Drop octaves. Rhythmic clarity.',
        fretboard: '0 0 0 x x x',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-energetic-4-child-1', name: 'Drop D Power', subtext: '5th', notes: ['D2', 'A2', 'D3'], description: 'Power variation.', fretboard: '0 0 2 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-4-child-2', name: 'Drop D Sus4', subtext: 'Sus4', notes: ['D2', 'G2', 'A2', 'D3'], description: 'Sus4 variation.', fretboard: '0 0 2 2 x x', baseRoot: 'D' },
          { id: 'drop-energetic-4-child-3', name: 'Drop D Sus2', subtext: 'Sus2', notes: ['D2', 'E2', 'A2', 'D3'], description: 'Sus2 variation.', fretboard: '0 2 0 0 x x', baseRoot: 'D' },
          { id: 'drop-energetic-4-child-4', name: 'Drop D Low Stack', subtext: 'Low 5th', notes: ['D1', 'D2', 'A2'], description: 'Ultra low-end.', fretboard: '0 0 2 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-4-child-5', name: 'Drop D Double 5th', subtext: '5th Stack', notes: ['D2', 'A2', 'D3', 'A3'], description: 'Double stop power.', fretboard: '0 0 2 0 x x', baseRoot: 'D' },
          { id: 'drop-energetic-4-child-6', name: 'Drop D Add4', subtext: '5th/4th', notes: ['D2', 'G2', 'A2', 'D3'], description: 'Djent-style add4.', fretboard: '0 0 0 2 x x', baseRoot: 'D' }
        ]
      },
      {
        id: 'drop-energetic-5',
        name: 'Drop D Low Stack',
        subtext: 'Low 5th',
        notes: ['D1', 'D2', 'A2'],
        description: 'Ultra low-end. Palm mute.',
        fretboard: '0 0 2 x x x',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-energetic-5-child-1', name: 'Drop D Power', subtext: '5th', notes: ['D2', 'A2', 'D3'], description: 'Power variation.', fretboard: '0 0 2 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-5-child-2', name: 'Drop D Sus4', subtext: 'Sus4', notes: ['D2', 'G2', 'A2', 'D3'], description: 'Sus4 variation.', fretboard: '0 0 2 2 x x', baseRoot: 'D' },
          { id: 'drop-energetic-5-child-3', name: 'Drop D Sus2', subtext: 'Sus2', notes: ['D2', 'E2', 'A2', 'D3'], description: 'Sus2 variation.', fretboard: '0 2 0 0 x x', baseRoot: 'D' },
          { id: 'drop-energetic-5-child-4', name: 'Drop D Octave', subtext: 'Octave', notes: ['D2', 'D3', 'A3'], description: 'Octave variation.', fretboard: '0 0 0 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-5-child-5', name: 'Drop D Double 5th', subtext: '5th Stack', notes: ['D2', 'A2', 'D3', 'A3'], description: 'Double stop power.', fretboard: '0 0 2 0 x x', baseRoot: 'D' },
          { id: 'drop-energetic-5-child-6', name: 'Drop D Add4', subtext: '5th/4th', notes: ['D2', 'G2', 'A2', 'D3'], description: 'Djent-style add4.', fretboard: '0 0 0 2 x x', baseRoot: 'D' }
        ]
      },
      {
        id: 'drop-energetic-6',
        name: 'Drop D Double 5th',
        subtext: '5th Stack',
        notes: ['D2', 'A2', 'D3', 'A3'],
        description: 'Double drop power. Maximum punch.',
        fretboard: '0 0 2 0 x x',
        baseRoot: 'D',
        relatedChords: [
          { id: 'drop-energetic-6-child-1', name: 'Drop D Power', subtext: '5th', notes: ['D2', 'A2', 'D3'], description: 'Power variation.', fretboard: '0 0 2 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-6-child-2', name: 'Drop D Sus4', subtext: 'Sus4', notes: ['D2', 'G2', 'A2', 'D3'], description: 'Sus4 variation.', fretboard: '0 0 2 2 x x', baseRoot: 'D' },
          { id: 'drop-energetic-6-child-3', name: 'Drop D Sus2', subtext: 'Sus2', notes: ['D2', 'E2', 'A2', 'D3'], description: 'Sus2 variation.', fretboard: '0 2 0 0 x x', baseRoot: 'D' },
          { id: 'drop-energetic-6-child-4', name: 'Drop D Octave', subtext: 'Octave', notes: ['D2', 'D3', 'A3'], description: 'Octave variation.', fretboard: '0 0 0 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-6-child-5', name: 'Drop D Low Stack', subtext: 'Low 5th', notes: ['D1', 'D2', 'A2'], description: 'Ultra low-end.', fretboard: '0 0 2 x x x', baseRoot: 'D' },
          { id: 'drop-energetic-6-child-6', name: 'Drop D Add4', subtext: '5th/4th', notes: ['D2', 'G2', 'A2', 'D3'], description: 'Djent-style add4.', fretboard: '0 0 0 2 x x', baseRoot: 'D' }
        ]
      }
    ]
  }
};

// Legacy export for backward compatibility (will be removed)
export const CHORDS: Chord[] = CHORD_LIBRARY[TuningMode.STANDARD][VibeMode.MELODIC];
