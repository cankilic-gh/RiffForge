export interface Chord {
  id: string;
  name: string;
  subtext: string;
  notes: string[]; // Original notes
  description: string;
  fretboard?: string;
  baseRoot: string; // The root note of the original voicing (e.g., 'E' for Opeth chord)
}

export enum AppMode {
  CLEAN = 'CLEAN',
  DIRTY = 'DIRTY'
}

export enum TuningMode {
  STANDARD = 'STANDARD',
  DROP = 'DROP'
}

export enum VibeMode {
  DARK = 'DARK',
  MELODIC = 'MELODIC',
  ENERGETIC = 'ENERGETIC'
}

export interface AudioState {
  isInitialized: boolean;
  isDistorted: boolean;
  volume: number;
}