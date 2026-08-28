// Entity Manager - Component-based entity system

export interface Component {
  name: string;
  update?(deltaTime: number): void;
}

export interface Entity {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
  visible: boolean;
  components: Map<string, Component>;
  sprite?: string;
  color?: string;
  velocity: { x: number; y: number };
  addComponent(component: Component): void;
  getComponent(name: string): Component | undefined;
  removeComponent(name: string): void;
  update(deltaTime: number): void;
}

class EntityManager {
  private entities: Map<string, Entity> = new Map();
  private nextId: number = 0;

  /**
   * Create a new entity
   */
  createEntity(x: number = 0, y: number = 0, width: number = 16, height: number = 16): Entity {
    const id = `entity_${this.nextId++}`;
    const entity: Entity = {
      id,
      x,
      y,
      width,
      height,
      depth: 0,
      visible: true,
      components: new Map(),
      velocity: { x: 0, y: 0 },
      addComponent: (component: Component) => {
        entity.components.set(component.name, component);
      },
      getComponent: (name: string) => {
        return entity.components.get(name);
      },
      removeComponent: (name: string) => {
        entity.components.delete(name);
      },
      update: (deltaTime: number) => {
        entity.components.forEach((component) => {
          if (component.update) {
            component.update(deltaTime);
          }
        });
      },
    };

    this.entities.set(id, entity);
    return entity;
  }

  /**
   * Get entity by ID
   */
  getEntity(id: string): Entity | undefined {
    return this.entities.get(id);
  }

  /**
   * Remove entity
   */
  removeEntity(id: string): void {
    this.entities.delete(id);
  }

  /**
   * Get all entities
   */
  getAllEntities(): Entity[] {
    return Array.from(this.entities.values());
  }

  /**
   * Update all entities
   */
  update(deltaTime: number): void {
    this.entities.forEach((entity) => {
      entity.update(deltaTime);
    });
  }

  /**
   * Clear all entities
   */
  clear(): void {
    this.entities.clear();
  }
}

export default EntityManager;