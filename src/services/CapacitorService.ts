import { Capacitor } from '@capacitor/core';

export async function initializeCapacitor() {
  if (!Capacitor.isNativePlatform()) {
    console.log('Running as PWA - skipping native initialization');
    return;
  }

  try {
    // Import plugins only when running on native platform
    const { StatusBar } = await import('@capacitor/status-bar');
    const { SplashScreen } = await import('@capacitor/splash-screen');
    const { ScreenOrientation } = await import('@capacitor/screen-orientation');

    // Hide status bar
    await StatusBar.hide();

    // Hide splash screen
    await SplashScreen.hide();

    // Lock to portrait orientation
    await ScreenOrientation.lock({ orientation: 'portrait' });

    console.log('Capacitor initialized successfully');
  } catch (error) {
    console.error('Capacitor initialization failed:', error);
  }
}
