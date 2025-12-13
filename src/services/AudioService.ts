import { useSettingsStore } from '../store/settingsStore';

export type SoundEffect = 'ding' | 'lock' | 'swipe';

class AudioManager {
  private sounds: Map<SoundEffect, HTMLAudioElement> = new Map();
  private isInitialized = false;

  /**
   * Initialize and preload all sound effects
   */
  initialize() {
    if (this.isInitialized) return;

    try {
      // Preload sound effects
      this.loadSound('ding', '/audio/ding.m4a');
      this.loadSound('lock', '/audio/lock.m4a');
      this.loadSound('swipe', '/audio/swipe.mp3');

      this.isInitialized = true;
      console.log('Audio service initialized');
    } catch (error) {
      console.error('Failed to initialize audio service:', error);
    }
  }

  /**
   * Load a sound file into memory
   */
  private loadSound(name: SoundEffect, path: string) {
    try {
      const audio = new Audio(path);
      audio.preload = 'auto';
      this.sounds.set(name, audio);
    } catch (error) {
      console.error(`Failed to load sound: ${name}`, error);
    }
  }

  /**
   * Play a sound effect if sound is enabled in settings
   */
  play(soundName: SoundEffect) {
    const { soundEnabled } = useSettingsStore.getState();

    if (!soundEnabled) return;
    if (!this.isInitialized) {
      this.initialize();
    }

    const sound = this.sounds.get(soundName);
    if (!sound) {
      console.warn(`Sound not found: ${soundName}`);
      return;
    }

    try {
      // Reset the sound to start if it's already playing
      sound.currentTime = 0;

      // Play the sound
      const playPromise = sound.play();

      // Handle browsers that return a promise
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`Failed to play sound: ${soundName}`, error);
        });
      }
    } catch (error) {
      console.error(`Error playing sound: ${soundName}`, error);
    }
  }

  /**
   * Play the ding sound (level complete, successful action)
   */
  playDing() {
    this.play('ding');
  }

  /**
   * Play the lock sound (level unlock, achievement)
   */
  playLock() {
    this.play('lock');
  }

  /**
   * Play the swipe sound (tile movement)
   */
  playSwipe() {
    this.play('swipe');
  }

  /**
   * Stop all currently playing sounds
   */
  stopAll() {
    this.sounds.forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  /**
   * Set volume for all sounds (0.0 to 1.0)
   */
  setVolume(volume: number) {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach(sound => {
      sound.volume = clampedVolume;
    });
  }
}

// Export a singleton instance
export const audioService = new AudioManager();
