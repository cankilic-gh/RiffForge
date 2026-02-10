# 🎸 RiffForge

**Craft killer guitar riffs and chord progressions in your browser.** A powerful web-based music tool for musicians, producers, and songwriters.

[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tone.js](https://img.shields.io/badge/Tone.js-15.1-FF6B6B?style=for-the-badge)](https://tonejs.github.io/)

🌐 **Live Demo:** [riffforge.thegridbase.com](https://riffforge.thegridbase.com)

---

## ✨ Features

### 🎵 Music Generation
- **Interactive Chord Library** - Browse and play hundreds of chord voicings
- **Root Note Selection** - Transpose chords to any key instantly
- **Multiple Tuning Modes** - Standard, Drop D, Open G, and more
- **Vibe Modes** - Switch between Melodic, Harmonic, and Rhythmic styles
- **Real-time Audio Playback** - Powered by Tone.js Web Audio API

### 🎛 Audio Controls
- **Distortion Switch** - Add grit and character to your sound
- **Chord Locking** - Lock chord families while exploring variations
- **Visual Feedback** - Intuitive UI with chord cards and selectors

### 🎨 User Experience
- **Zero Latency** - Optimized audio engine for smooth performance
- **Responsive Design** - Works on desktop and tablet devices
- **Modern UI** - Clean, musician-friendly interface

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- Modern web browser with Web Audio API support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/cankilic-gh/RiffForge.git
   cd RiffForge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:5173](http://localhost:5173)
   
   **Note:** Audio requires user interaction (click anywhere) to initialize due to browser autoplay policies.

---

## 📁 Project Structure

```
RiffForge/
├── components/              # React components
│   ├── ChordCard.tsx       # Individual chord display
│   ├── DistortionSwitch.tsx # Audio effect toggle
│   ├── RootSelector.tsx     # Root note selector
│   ├── TuningSelector.tsx   # Guitar tuning selector
│   └── VibeSelector.tsx      # Musical style selector
├── services/                # Core services
│   └── audioEngine.ts      # Tone.js audio engine
├── utils/                   # Utility functions
│   └── musicTheory.ts      # Music theory calculations
├── constants.ts             # Chord library and constants
├── types.ts                 # TypeScript type definitions
└── App.tsx                  # Main application component
```

---

## 🛠 Tech Stack

### Frontend
- **Vite 6.2** - Next-generation build tool
- **React 19.2** - UI library
- **TypeScript 5.8** - Type safety

### Audio
- **Tone.js 15.1** - Web Audio API framework
  - Synth engines
  - Effects processing
  - Audio scheduling

### Build & Deploy
- **Vite** - Fast HMR and optimized builds
- **Vercel** - Deployment platform (configured)

---

## 📖 Usage

### Playing Chords

1. **Click anywhere** to initialize audio (browser requirement)
2. **Select a root note** (E, A, D, G, B, etc.)
3. **Choose a tuning mode** (Standard, Drop D, etc.)
4. **Pick a vibe** (Melodic, Harmonic, Rhythmic)
5. **Click chord cards** to hear them play
6. **Toggle distortion** for a heavier sound

### Chord Locking

- Click a chord card to **lock** its family
- Locked chords remain active while you explore variations
- Change tuning or vibe to **unlock** automatically

### Tips

- **Experiment with different tunings** - Each tuning mode offers unique chord voicings
- **Combine vibe modes** - Switch between melodic and rhythmic for dynamic progressions
- **Use distortion sparingly** - Great for rock/metal styles, but can mask chord clarity

---

## 🎵 Music Theory

RiffForge uses music theory to:
- **Transpose chords** to any root note
- **Generate chord voicings** based on tuning
- **Filter chord families** by vibe mode
- **Calculate intervals** for accurate playback

### Supported Tunings

- **Standard** (E-A-D-G-B-E)
- **Drop D** (D-A-D-G-B-E)
- **Open G** (D-G-D-G-B-D)
- **More coming soon...**

---

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with HMR

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Audio Engine

The audio engine (`services/audioEngine.ts`) handles:
- Web Audio Context initialization
- Synth creation and management
- Effect routing (distortion)
- Audio scheduling and playback

### Adding New Chords

Edit `constants.ts` to add chord definitions:

```typescript
export const CHORD_LIBRARY: Chord[] = [
  {
    id: 'chord-id',
    name: 'Chord Name',
    intervals: [0, 4, 7], // Semitones from root
    // ... other properties
  },
];
```

---

## 🚢 Deployment

### Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy!

The project includes `vercel.json` for optimal configuration.

### Build Output

```bash
npm run build
```

Outputs to `dist/` directory, ready for static hosting.

---

## 🎹 Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari (with limitations)
- ⚠️ Mobile browsers (limited Web Audio support)

**Note:** Web Audio API requires user interaction to initialize. Always click/tap before playing audio.

---

## 📝 License

This project is private and proprietary.

---

## 👤 Author

**Can Kilic**

- Portfolio: [cankilic.com](https://cankilic.com)
- GitHub: [@cankilic-gh](https://github.com/cankilic-gh)

---

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev)
- Audio powered by [Tone.js](https://tonejs.github.io)
- Inspired by guitarists and music producers worldwide

---

## 🎸 Future Enhancements

- [ ] More tuning modes (Open D, DADGAD, etc.)
- [ ] Chord progression builder
- [ ] MIDI export
- [ ] Recording functionality
- [ ] Metronome integration
- [ ] Scale visualization
