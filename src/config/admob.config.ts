import { Capacitor } from '@capacitor/core';

export interface AdMobConfig {
  banner: string;
  interstitial: string;
}

// Get platform-specific AdMob IDs from environment variables or defaults
function getAdMobConfig(): AdMobConfig {
  const platform = Capacitor.getPlatform();

  if (platform === 'android') {
    return {
      banner: import.meta.env.VITE_ADMOB_ANDROID_BANNER || 'ca-app-pub-6268166388384710/7929783380',
      interstitial: import.meta.env.VITE_ADMOB_ANDROID_INTERSTITIAL || 'ca-app-pub-6268166388384710/1883249783'
    };
  } else if (platform === 'ios') {
    return {
      banner: import.meta.env.VITE_ADMOB_IOS_BANNER || 'ca-app-pub-6268166388384710/2302052184',
      interstitial: import.meta.env.VITE_ADMOB_IOS_INTERSTITIAL || 'ca-app-pub-6268166388384710/4836716184'
    };
  }

  // Default/fallback (not used on web)
  return {
    banner: '',
    interstitial: ''
  };
}

export const ADMOB_CONFIG = getAdMobConfig();

// Test mode - set to false for production builds
export const ADMOB_TEST_MODE = import.meta.env.DEV;
