import { Capacitor } from '@capacitor/core';
import { RATING_CONFIG } from '@/config/analytics.config';

// App Store URLs for rating
const IOS_APP_STORE_URL = 'https://apps.apple.com/app/id1180420632?action=write-review';
const ANDROID_PLAY_STORE_URL = 'market://details?id=com.virtualteambuild.numberlocks';

class RatingManager {
  private isNative: boolean;
  private levelCompletionCount: number = 0;
  private hasPromptedForRating: boolean = false;

  constructor() {
    this.isNative = Capacitor.isNativePlatform();
    this.loadState();
  }

  /**
   * Load rating state from storage
   */
  private loadState() {
    try {
      const saved = localStorage.getItem('rating-state');
      if (saved) {
        const state = JSON.parse(saved);
        this.levelCompletionCount = state.levelCompletionCount || 0;
        this.hasPromptedForRating = state.hasPromptedForRating || false;
      }
    } catch (error) {
      console.warn('Failed to load rating state:', error);
    }
  }

  /**
   * Save rating state to storage
   */
  private saveState() {
    try {
      localStorage.setItem('rating-state', JSON.stringify({
        levelCompletionCount: this.levelCompletionCount,
        hasPromptedForRating: this.hasPromptedForRating
      }));
    } catch (error) {
      console.warn('Failed to save rating state:', error);
    }
  }

  /**
   * Call this when a level is completed
   * Automatically prompts for rating after configured number of levels
   */
  async onLevelComplete() {
    // Only on native platforms
    if (!this.isNative) return;

    // Don't prompt if already prompted
    if (this.hasPromptedForRating) return;

    // Increment counter
    this.levelCompletionCount++;
    this.saveState();

    // Check if we should prompt
    if (this.levelCompletionCount >= RATING_CONFIG.usesUntilPrompt) {
      await this.requestReview();
    }
  }

  /**
   * Request an in-app review by opening the App Store
   * Opens the native App Store with the review page
   */
  async requestReview() {
    if (!this.isNative) {
      console.log('Rating prompt only available on native platforms');
      return;
    }

    try {
      const platform = Capacitor.getPlatform();
      let url: string;

      if (platform === 'ios') {
        url = IOS_APP_STORE_URL;
      } else if (platform === 'android') {
        url = ANDROID_PLAY_STORE_URL;
      } else {
        console.warn('Unsupported platform for rating:', platform);
        return;
      }

      // Open the App Store URL
      window.open(url, '_blank');

      // Mark as prompted
      this.hasPromptedForRating = true;
      this.saveState();

      console.log('Opened App Store for rating');
    } catch (error) {
      console.warn('Failed to open App Store for rating:', error);
    }
  }

  /**
   * Reset rating state (for testing or user reset)
   */
  reset() {
    this.levelCompletionCount = 0;
    this.hasPromptedForRating = false;
    this.saveState();
  }
}

// Export singleton instance
export const ratingService = new RatingManager();
