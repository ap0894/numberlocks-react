// Analytics configuration
export const ANALYTICS_CONFIG = {
  trackingId: import.meta.env.VITE_GA_TRACKING_ID || 'UA-100425165-1',
  enabled: !import.meta.env.DEV, // Disable in development
  debugMode: import.meta.env.DEV
};

// iOS App Store ID for rating prompts
export const IOS_APP_ID = import.meta.env.VITE_IOS_APP_ID || '1180420632';

// Rating prompt configuration
export const RATING_CONFIG = {
  usesUntilPrompt: 3, // Show after 3 levels completed
  iosAppId: IOS_APP_ID
};
