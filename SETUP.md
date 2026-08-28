# Game Development Setup

## Prerequisites

- Node.js 16+
- npm or yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/Pascal-dev-gif/pixelated-rpg.git
cd pixelated-rpg

# Install dependencies
npm install
```

## Development

```bash
# Start development server
npm run dev
```

The game will open at `http://localhost:5173`

## Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
pixelated-rpg/
├── src/
│   ├── engine/              # Core game engine
│   │   ├── game-loop.ts     # Main game loop
│   │   ├── renderer.ts      # Graphics system
│   │   ├── input.ts         # Input handling
│   │   ├── scene.ts         # Scene management
│   │   ├── entity.ts        # Entity system
│   │   └── audio.ts         # Audio management
│   ├── systems/             # Game systems
│   │   ├── combat.ts        # Combat mechanics
│   │   ├── alchemy.ts       # Alchemy system
│   │   ├── crafting.ts      # Crafting system
│   │   ├── dialogue.ts      # Dialogue system
│   │   └── quest.ts         # Quest system
│   ├── scenes/              # Game scenes
│   ├── data/                # Game data
│   └── main.ts              # Entry point
├── assets/
│   ├── sprites/             # Character sprites (by Grok)
│   ├── tiles/               # Tileset data
│   ├── music/               # Background music (by Pascal-dev-gif)
│   └── sfx/                 # Sound effects
├── docs/
│   ├── story.md             # Story & narrative (by ChatGPT)
│   ├── engine.md            # Engine documentation
│   ├── mechanics.md         # Game mechanics (by Perplexity)
│   └── ...
├── index.html               # HTML entry point
├── package.json             # NPM dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
└── SETUP.md                 # This file
```

## Collaboration Workflow

1. **Story** (ChatGPT) → Write chapter events → `docs/story.md`
2. **Art** (Grok) → Create pixel art → `assets/sprites/`
3. **Mechanics** (Perplexity) → Define systems → `docs/mechanics.md`
4. **Music** (Pascal-dev-gif) → Compose tracks → `assets/music/`
5. **Code** (Copilot) → Implement features → `src/`

## Chapter 1: The Red Glow

**Status:** Foundation Complete

- ✅ Story Blueprint (30 events mapped)
- ✅ Engine Foundation
- ✅ Core Systems (Input, Renderer, Audio)
- 🎨 Art Assets (Grok - in progress)
- 🎵 Music Tracks (Pascal-dev-gif - ready)
- ⚙️ Game Systems (Combat, Alchemy, Crafting - to implement)

## Next Steps

1. Start dev server: `npm run dev`
2. Integrate Grok's sprite assets
3. Implement combat system
4. Implement dialogue system
5. Build Chapter 1 scenes

---

*Get started by running `npm install && npm run dev`*
