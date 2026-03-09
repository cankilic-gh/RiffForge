# RiffForge - Current State

**Last Updated:** 2026-03-09
**Status:** Active Development
**Priority:** High

## Active Decisions
- Vite 6 + React 19 + TypeScript 5.8, Tailwind CSS 3.4
- Tone.js 15 for audio (PolySynth -> Distortion -> Reverb -> Limiter chain)
- Zustand 5 for state management (single store)
- Flat project structure (no src/ directory, @ alias resolves to root)
- Dark mode only, brutalist/industrial guitar amp aesthetic
- Dual mode system: Clean (cyan) vs Distortion (rose) with full UI theme switching
- Chord data as static JSON in public/chords/, transposed at runtime

## Current Focus
- Audio-reactive visualization features
- Chord library expansion and UX refinement

## Blockers
- None

## Recent Changes
- v0.2.3 Beta live at riffforge.thegridbase.com
- Dual mode (Clean/Distortion) with full UI theme switching
- Cursor-following radial glow on chord cards
- Lock & Related Chords feature with auto-scroll
- Strum effect with 30ms note delay

## Tech Debt
- No test framework (Vitest planned)
- No routing (single-page, everything in App.tsx)
- StrictMode disabled due to Tone.js double-render issues
- External texture URLs (grainy-gradients, transparenttextures) could break
- Debug logging in index.tsx needs cleanup
- Denormalized relatedChords in JSON (full objects, not ID refs)
- Gemini API key env setup exists but unused (planned for AI chord suggestions)
