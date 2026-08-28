// Game Engine - Main Game Loop
// Orchestrates all systems and runs the game at target FPS

import Renderer from './renderer';
import InputManager from './input';
import SceneManager from './scene';
import EntityManager from './entity';
import AudioManager from './audio';

class GameEngine {
  private renderer: Renderer;
  private inputManager: InputManager;
  private sceneManager: SceneManager;
  private entityManager: EntityManager;
  private audioManager: AudioManager;
  private isRunning: boolean = false;
  private targetFPS: number = 60;
  private deltaTime: number = 0;
  private lastFrameTime: number = 0;

  constructor(canvasId: string) {
    this.renderer = new Renderer(canvasId);
    this.inputManager = new InputManager();
    this.sceneManager = new SceneManager();
    this.entityManager = new EntityManager();
    this.audioManager = new AudioManager();
  }

  /**
   * Initialize the game engine
   */
  async init(): Promise<void> {
    console.log('🗡️ The Shattered Crown - Initializing...');
    
    await this.renderer.init();
    this.inputManager.init();
    this.sceneManager.init(this.entityManager, this.audioManager);
    this.audioManager.init();
    
    // Load title screen
    await this.sceneManager.loadScene('title-screen');
    
    console.log('✨ Game Engine Ready!');
  }

  /**
   * Start the game loop
   */
  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.gameLoop();
  }

  /**
   * Stop the game loop
   */
  stop(): void {
    this.isRunning = false;
  }

  /**
   * Main game loop - runs at target FPS
   */
  private gameLoop = (): void => {
    if (!this.isRunning) return;

    const currentTime = performance.now();
    this.deltaTime = Math.min((currentTime - this.lastFrameTime) / 1000, 0.05); // Cap at 50ms
    this.lastFrameTime = currentTime;

    // Update phase
    this.update();

    // Render phase
    this.render();

    // Schedule next frame
    requestAnimationFrame(this.gameLoop);
  };

  /**
   * Update game state
   */
  private update(): void {
    // Process input
    const input = this.inputManager.getInput();
    
    // Update current scene
    this.sceneManager.update(this.deltaTime, input);
    
    // Update entities
    this.entityManager.update(this.deltaTime);
  }

  /**
   * Render frame
   */
  private render(): void {
    this.renderer.clear();
    
    // Render current scene
    const scene = this.sceneManager.getCurrentScene();
    if (scene) {
      this.renderer.render(scene);
    }
    
    // Render UI layer
    this.renderer.renderUI();
  }

  /**
   * Get entity manager for scene access
   */
  getEntityManager(): EntityManager {
    return this.entityManager;
  }

  /**
   * Get scene manager
   */
  getSceneManager(): SceneManager {
    return this.sceneManager;
  }

  /**
   * Get audio manager
   */
  getAudioManager(): AudioManager {
    return this.audioManager;
  }
}

export default GameEngine;