/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_TRACKING_ID: string;
  readonly VITE_IOS_APP_ID: string;
  readonly VITE_ADMOB_ANDROID_BANNER: string;
  readonly VITE_ADMOB_ANDROID_INTERSTITIAL: string;
  readonly VITE_ADMOB_IOS_BANNER: string;
  readonly VITE_ADMOB_IOS_INTERSTITIAL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
