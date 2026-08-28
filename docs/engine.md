# Core Game Engine Architecture

The heart of **The Shattered Crown**. Handles rendering, input, game state, and the main loop.

## Architecture Overview

```
GameEngine
├── Renderer (Canvas 320x180)
├── InputManager
├── SceneManager
├── EntityManager
├── SystemManager
│   ├── CombatSystem
│   ├── AlchemySystem
│   ├── CraftingSystem
│   ├── DialogueSystem
│   └── QuestSystem
├── AudioManager
└── GameLoop (60 FPS target)
```

## Main Game Loop

```
Initialize()
  ↓
While (running) {
  HandleInput()
  UpdateGame(deltaTime)
  Render()
  PlayAudio()
}
Cleanup()
```

## Key Components

### Renderer
- Canvas: 320x180px (SNES-style)
- Sprite management and animation
- Tilemap rendering (8x8 tile base, 16x16 display)
- Camera/viewport control
- Layered rendering (background, entities, UI, effects)
- Pixelated rendering (no smoothing)

### InputManager
- Keyboard input handling (Arrow Keys, WASD)
- Action binding (Move, Interact, Menu, Confirm, Cancel)
- Input buffering for responsive feel

### SceneManager
- Load/unload scenes dynamically
- Scene transitions and effects
- State persistence between scenes
- Scene stack for menus/dialogs

### EntityManager
- Component-based entity system
- Entity spawning and destruction
- Collision detection
- Movement and animation system

### CombatSystem
- Turn-based combat
- Action selection (Attack, Defend, Pacify, Item, Run)
- Enemy behavior AI
- Damage calculation
- Pacify mechanics (mood system)

### AlchemySystem
- Ingredient management
- Recipe discovery
- Crafting interface
- Potion effects

### CraftingSystem
- Material gathering
- Recipe system
- Inventory management
- Equipment creation

### DialogueSystem
- NPC dialogue trees
- Branching conversations
- Choice tracking
- Dialogue state persistence

### QuestSystem
- Quest tracking
- Objective management
- Quest rewards
- Progress indicators

### AudioManager
- Background music playback
- Sound effect queueing
- Volume control
- Music fade in/out

## Module Structure

```
src/
├── engine/
│   ├── game-loop.ts          # Main engine orchestrator
│   ├── renderer.ts           # Graphics system
│   ├── input.ts              # Input handling
│   ├── scene.ts              # Scene management
│   ├── entity.ts             # Entity and component system
│   └── audio.ts              # Audio management
├── systems/
│   ├── combat.ts             # Combat mechanics
│   ├── alchemy.ts            # Alchemy system
│   ├── crafting.ts           # Crafting system
│   ├── dialogue.ts           # Dialogue system
│   └── quest.ts              # Quest system
├── scenes/
│   ├── title-screen.ts       # Title menu
│   ├── oakrest-village.ts    # Village exploration
│   ├── whispering-woods.ts   # Forest exploration
│   └── combat-scene.ts       # Combat encounters
├── data/
│   ├── enemies.ts            # Enemy definitions
│   ├── items.ts              # Item definitions
│   ├── recipes.ts            # Alchemy recipes
│   └── quests.ts             # Quest data
└── main.ts                   # Entry point
```

## Technical Specs

| Feature | Value |
|---------|-------|
| Canvas Resolution | 320x180px |
| Tile Size | 8x8px base, 16x16px display |
| Sprite Size | 16px - 64px |
| Target FPS | 60 |
| Pixel Aspect | Square (no distortion) |
| Color Depth | 24-bit (8-bit per channel) |
| Animation | Frame-based |

## Dependencies
- TypeScript 5.0+
- No external game engine required (pure Canvas API)
- Vite for bundling

---

*Engine architecture by Copilot*