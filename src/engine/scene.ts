// Scene Manager - Handles scene loading, unloading, and transitions

import EntityManager from './entity';
import AudioManager from './audio';

export interface Scene {
  name: string;
  background?: string;
  tilemap?: any;
  entities: any[];
  update(deltaTime: number, input: any): void;
  onEnter(): Promise<void>;
  onExit(): Promise<void>;
}

class SceneManager {
  private scenes: Map<string, Scene> = new Map();
  private currentScene: Scene | null = null;
  private entityManager: EntityManager | null = null;
  private audioManager: AudioManager | null = null;

  /**
   * Initialize scene manager
   */
  init(entityManager: EntityManager, audioManager: AudioManager): void {
    this.entityManager = entityManager;
    this.audioManager = audioManager;
    this.registerScenes();
  }

  /**
   * Register all available scenes
   */
  private registerScenes(): void {
    // Scenes will be registered here
    // For now, placeholder structure
    console.log('📍 Scene Manager initialized');
  }

  /**
   * Load a scene
   */
  async loadScene(sceneName: string): Promise<void> {
    // Exit current scene
    if (this.currentScene) {
      await this.currentScene.onExit();
    }

    // Get or create scene
    let scene = this.scenes.get(sceneName);
    if (!scene) {
      scene = this.createScene(sceneName);
      this.scenes.set(sceneName, scene);
    }

    this.currentScene = scene;
    await scene.onEnter();
    console.log(`🔄 Loaded scene: ${sceneName}`);
  }

  /**
   * Create a scene instance
   */
  private createScene(sceneName: string): Scene {
    // Placeholder scene creation
    // Will be expanded with actual scene implementations
    return {
      name: sceneName,
      background: '#1a1a2e',
      entities: [],
      update: () => {},
      onEnter: async () => {},
      onExit: async () => {},
    };
  }

  /**
   * Get current scene
   */
  getCurrentScene(): Scene | null {
    return this.currentScene;
  }

  /**
   * Update current scene
   */
  update(deltaTime: number, input: any): void {
    if (this.currentScene) {
      this.currentScene.update(deltaTime, input);
    }
  }
}

export default SceneManager;