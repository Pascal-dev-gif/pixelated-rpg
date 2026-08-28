// Audio Manager - Handles all audio playback

class AudioManager {
  private audioContext: AudioContext | null = null;
  private currentMusic: HTMLAudioElement | null = null;
  private soundEffects: Map<string, HTMLAudioElement> = new Map();
  private masterVolume: number = 1.0;
  private musicVolume: number = 0.7;
  private sfxVolume: number = 0.8;

  /**
   * Initialize audio manager
   */
  async init(): Promise<void> {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      console.log('🔊 Audio Manager initialized');
    } catch (error) {
      console.warn('Audio context not available:', error);
    }
  }

  /**
   * Play background music
   */
  playMusic(musicPath: string, loop: boolean = true, fadeIn: number = 0): void {
    // Stop current music if playing
    if (this.currentMusic) {
      this.stopMusic();
    }

    const audio = new Audio(musicPath);
    audio.loop = loop;
    audio.volume = this.musicVolume * this.masterVolume;

    if (fadeIn > 0) {
      audio.volume = 0;
      this.fadeAudio(audio, this.musicVolume * this.masterVolume, fadeIn);
    }

    audio.play().catch((err) => {
      console.warn('Failed to play music:', err);
    });

    this.currentMusic = audio;
    console.log(`🎵 Playing music: ${musicPath}`);
  }

  /**
   * Stop background music
   */
  stopMusic(fadeOut: number = 0): void {
    if (!this.currentMusic) return;

    if (fadeOut > 0) {
      this.fadeAudio(this.currentMusic, 0, fadeOut, () => {
        if (this.currentMusic) {
          this.currentMusic.pause();
          this.currentMusic = null;
        }
      });
    } else {
      this.currentMusic.pause();
      this.currentMusic = null;
    }
  }

  /**
   * Play a sound effect
   */
  playSFX(sfxPath: string): void {
    const audio = new Audio(sfxPath);
    audio.volume = this.sfxVolume * this.masterVolume;
    audio.play().catch((err) => {
      console.warn('Failed to play SFX:', err);
    });
  }

  /**
   * Fade audio volume
   */
  private fadeAudio(audio: HTMLAudioElement, targetVolume: number, duration: number, callback?: () => void): void {
    const startVolume = audio.volume;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      audio.volume = startVolume + (targetVolume - startVolume) * progress;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (callback) {
        callback();
      }
    };
    step();
  }

  /**
   * Set master volume
   */
  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.currentMusic) {
      this.currentMusic.volume = this.musicVolume * this.masterVolume;
    }
  }

  /**
   * Set music volume
   */
  setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.currentMusic) {
      this.currentMusic.volume = this.musicVolume * this.masterVolume;
    }
  }

  /**
   * Set SFX volume
   */
  setSFXVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }
}

export default AudioManager;