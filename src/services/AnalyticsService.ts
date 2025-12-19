import { Capacitor } from '@capacitor/core';
import { FirebaseAnalytics } from '@capacitor-firebase/analytics';

export type AnalyticsEvent =
  | 'level_start'
  | 'level_complete'
  | 'level_failed'
  | 'vault_unlock'
  | 'tutorial_start'
  | 'tutorial_complete'
  | 'app_launch';

interface AnalyticsParams {
  [key: string]: string | number | boolean;
}

class AnalyticsManager {
  private isInitialized: boolean = false;
  private isNative: boolean;

  constructor() {
    this.isNative = Capacitor.isNativePlatform();
  }

  /**
   * Initialize analytics (call on app start)
   */
  async initialize() {
    if (this.isInitialized) return;

    try {
      if (this.isNative) {
        // Initialize Firebase Analytics on native platforms
        await FirebaseAnalytics.setEnabled({ enabled: true });
        console.log('Firebase Analytics initialized');
      } else {
        console.log('Analytics disabled on web platform');
      }
      this.isInitialized = true;
    } catch (error) {
      console.error('Analytics initialization failed:', error);
    }
  }

  /**
   * Log an analytics event
   */
  async logEvent(eventName: AnalyticsEvent, params?: AnalyticsParams) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      if (this.isNative) {
        // Log to Firebase Analytics
        await FirebaseAnalytics.logEvent({
          name: eventName,
          params: params || {}
        });
        console.log(`Analytics Event: ${eventName}`, params || {});
      } else {
        // Fall back to console on web
        console.log(`Analytics Event (web): ${eventName}`, params || {});
      }
    } catch (error) {
      console.warn('Failed to log analytics event:', error);
    }
  }

  /**
   * Log level start event
   */
  async logLevelStart(levelId: string, vaultId: number) {
    await this.logEvent('level_start', {
      level_id: levelId,
      vault_id: vaultId
    });
  }

  /**
   * Log level complete event
   */
  async logLevelComplete(levelId: string, stars: number, moves: number) {
    await this.logEvent('level_complete', {
      level_id: levelId,
      stars,
      moves
    });
  }

  /**
   * Log level failed event
   */
  async logLevelFailed(levelId: string, moves: number) {
    await this.logEvent('level_failed', {
      level_id: levelId,
      moves
    });
  }

  /**
   * Log vault unlock event
   */
  async logVaultUnlock(vaultId: number, totalStars: number) {
    await this.logEvent('vault_unlock', {
      vault_id: vaultId,
      total_stars: totalStars
    });
  }

  /**
   * Log tutorial start event
   */
  async logTutorialStart() {
    await this.logEvent('tutorial_start');
  }

  /**
   * Log tutorial complete event
   */
  async logTutorialComplete() {
    await this.logEvent('tutorial_complete');
  }

  /**
   * Log app launch event
   */
  async logAppLaunch() {
    await this.logEvent('app_launch');
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsManager();
