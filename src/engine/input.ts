// Input Manager - Handles all player input

export interface InputState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  interact: boolean;
  menu: boolean;
  confirm: boolean;
  cancel: boolean;
}

class InputManager {
  private currentInput: InputState = {
    up: false,
    down: false,
    left: false,
    right: false,
    interact: false,
    menu: false,
    confirm: false,
    cancel: false,
  };

  private previousInput: InputState = { ...this.currentInput };

  private keyMap: Record<string, keyof InputState> = {
    // Arrow keys
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
    // WASD
    w: 'up',
    W: 'up',
    s: 'down',
    S: 'down',
    a: 'left',
    A: 'left',
    d: 'right',
    D: 'right',
    // Actions
    e: 'interact',
    E: 'interact',
    Enter: 'confirm',
    Escape: 'menu',
    Backspace: 'cancel',
    ' ': 'confirm', // Space bar
  };

  /**
   * Initialize input listeners
   */
  init(): void {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  /**
   * Handle key down event
   */
  private handleKeyDown(event: KeyboardEvent): void {
    const action = this.keyMap[event.key];
    if (action) {
      this.currentInput[action] = true;
      event.preventDefault();
    }
  }

  /**
   * Handle key up event
   */
  private handleKeyUp(event: KeyboardEvent): void {
    const action = this.keyMap[event.key];
    if (action) {
      this.currentInput[action] = false;
      event.preventDefault();
    }
  }

  /**
   * Get current input state
   */
  getInput(): InputState {
    return { ...this.currentInput };
  }

  /**
   * Check if specific action is pressed
   */
  isPressed(action: keyof InputState): boolean {
    return this.currentInput[action];
  }

  /**
   * Check if action was just pressed (edge detection)
   */
  justPressed(action: keyof InputState): boolean {
    return this.currentInput[action] && !this.previousInput[action];
  }

  /**
   * Update previous input state (call once per frame)
   */
  updatePrevious(): void {
    this.previousInput = { ...this.currentInput };
  }
}

export default InputManager;