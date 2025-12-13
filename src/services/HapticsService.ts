import { Capacitor } from '@capacitor/core';

class HapticsManager {
  private isNative: boolean;

  constructor() {
    this.isNative = Capacitor.isNativePlatform();
  }

  /**
   * Provide light haptic feedback (tile tap, button press)
   */
  async light() {
    if (!this.isNative) return;

    try {
      const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      console.warn('Haptics not available:', error);
    }
  }

  /**
   * Provide medium haptic feedback (successful tile subtraction)
   */
  async medium() {
    if (!this.isNative) return;

    try {
      const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
      console.warn('Haptics not available:', error);
    }
  }

  /**
   * Provide heavy haptic feedback (level complete, error)
   */
  async heavy() {
    if (!this.isNative) return;

    try {
      const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
      await Haptics.impact({ style: ImpactStyle.Heavy });
    } catch (error) {
      console.warn('Haptics not available:', error);
    }
  }

  /**
   * Provide success notification haptic
   */
  async success() {
    if (!this.isNative) return;

    try {
      const { Haptics, NotificationType } = await import('@capacitor/haptics');
      await Haptics.notification({ type: NotificationType.Success });
    } catch (error) {
      console.warn('Haptics not available:', error);
    }
  }

  /**
   * Provide warning notification haptic
   */
  async warning() {
    if (!this.isNative) return;

    try {
      const { Haptics, NotificationType } = await import('@capacitor/haptics');
      await Haptics.notification({ type: NotificationType.Warning });
    } catch (error) {
      console.warn('Haptics not available:', error);
    }
  }

  /**
   * Provide error notification haptic
   */
  async error() {
    if (!this.isNative) return;

    try {
      const { Haptics, NotificationType } = await import('@capacitor/haptics');
      await Haptics.notification({ type: NotificationType.Error });
    } catch (error) {
      console.warn('Haptics not available:', error);
    }
  }
}

// Export singleton instance
export const hapticsService = new HapticsManager();
