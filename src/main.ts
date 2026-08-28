// Main entry point for The Shattered Crown

import GameEngine from './engine/game-loop';

class Game {
  private engine: GameEngine;

  constructor() {
    this.engine = new GameEngine('game-canvas');
  }

  async run(): Promise<void> {
    try {
      await this.engine.init();
      this.engine.start();
      console.log('🎮 Game Started!');
    } catch (error) {
      console.error('❌ Failed to start game:', error);
    }
  }
}

// Initialize and run the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  game.run();
});

export default Game;