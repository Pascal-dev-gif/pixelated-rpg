// Renderer - Handles all graphics and rendering
// Canvas: 320x180px (SNES-style)

class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number = 320;
  private height: number = 180;
  private spriteCache: Map<string, HTMLImageElement> = new Map();

  constructor(canvasId: string) {
    const element = document.getElementById(canvasId);
    if (!element || !(element instanceof HTMLCanvasElement)) {
      throw new Error(`Canvas element with id "${canvasId}" not found`);
    }

    this.canvas = element;

    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D context from canvas');
    }

    this.ctx = context;
    this.setupCanvas();
  }

  /**
   * Initialize renderer
   */
  async init(): Promise<void> {
    // Setup canvas for pixelated rendering
    this.ctx.imageSmoothingEnabled = false;
    (this.ctx as any).webkitImageSmoothingEnabled = false;
    (this.ctx as any).mozImageSmoothingEnabled = false;
    (this.ctx as any).msImageSmoothingEnabled = false;
    
    console.log('✏️ Renderer initialized (320x180)');
  }

  /**
   * Setup canvas size and styling
   */
  private setupCanvas(): void {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.imageRendering = 'pixelated';
    this.canvas.style.imageRendering = 'crisp-edges';
  }

  /**
   * Clear the canvas
   */
  clear(): void {
    this.ctx.fillStyle = '#1a1a2e'; // Dark blue background
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Render a scene
   */
  render(scene: any): void {
    // Render background
    if (scene.background) {
      this.ctx.fillStyle = scene.background;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // Render tilemap
    if (scene.tilemap) {
      this.renderTilemap(scene.tilemap);
    }

    // Render entities (sorted by depth)
    if (scene.entities) {
      const sortedEntities = [...scene.entities].sort((a, b) => (a.depth || 0) - (b.depth || 0));
      sortedEntities.forEach((entity: any) => {
        this.renderEntity(entity);
      });
    }
  }

  /**
   * Render tilemap
   */
  private renderTilemap(tilemap: any): void {
    const tileDisplaySize = 16; // Display size for tiles
    
    for (let y = 0; y < tilemap.height; y++) {
      for (let x = 0; x < tilemap.width; x++) {
        const tileId = tilemap.getTile(x, y);
        const tile = tilemap.getTileData(tileId);
        
        if (tile) {
          this.ctx.fillStyle = tile.color || '#228b22';
          this.ctx.fillRect(x * tileDisplaySize, y * tileDisplaySize, tileDisplaySize, tileDisplaySize);
          
          // Draw border for definition
          if (tile.border) {
            this.ctx.strokeStyle = tile.borderColor || '#1a6b1a';
            this.ctx.lineWidth = 1;
            this.ctx.strokeRect(x * tileDisplaySize, y * tileDisplaySize, tileDisplaySize, tileDisplaySize);
          }
        }
      }
    }
  }

  /**
   * Render an entity
   */
  private renderEntity(entity: any): void {
    if (entity.visible === false) return;

    if (entity.sprite) {
      this.drawSprite(
        entity.sprite,
        Math.round(entity.x),
        Math.round(entity.y),
        entity.width || 16,
        entity.height || 16,
        entity.frame || 0
      );
    } else if (entity.color) {
      // Fallback: draw as colored rectangle
      this.ctx.fillStyle = entity.color;
      this.ctx.fillRect(entity.x, entity.y, entity.width || 16, entity.height || 16);
    }
  }

  /**
   * Draw a sprite (placeholder - will be replaced with asset loader)
   */
  private drawSprite(sprite: string, x: number, y: number, width: number, height: number, frame: number = 0): void {
    // Placeholder for sprite rendering
    // When Grok's assets are integrated, this will load from the sprite cache
    this.ctx.fillStyle = '#00ff00';
    this.ctx.fillRect(x, y, width, height);
    
    // Draw sprite name for debugging
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '8px Arial';
    this.ctx.fillText(sprite.substring(0, 5), x + 2, y + 12);
  }

  /**
   * Load a sprite asset
   */
  async loadSprite(name: string, path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.spriteCache.set(name, img);
        resolve();
      };
      img.onerror = () => reject(new Error(`Failed to load sprite: ${path}`));
      img.src = path;
    });
  }

  /**
   * Render UI layer
   */
  renderUI(): void {
    // Placeholder for UI rendering
    // Will be implemented with UI system
  }

  /**
   * Get canvas dimensions
   */
  getSize(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  /**
   * Draw text to canvas (for debugging/UI)
   */
  drawText(text: string, x: number, y: number, color: string = '#ffffff', size: number = 12): void {
    this.ctx.fillStyle = color;
    this.ctx.font = `${size}px Arial`;
    this.ctx.fillText(text, x, y);
  }

  /**
   * Draw rectangle (for UI elements)
   */
  drawRect(x: number, y: number, width: number, height: number, color: string, stroke: boolean = false): void {
    this.ctx.fillStyle = color;
    if (stroke) {
      this.ctx.strokeRect(x, y, width, height);
    } else {
      this.ctx.fillRect(x, y, width, height);
    }
  }
}

export default Renderer;