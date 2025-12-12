import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.virtualteambuild.numberlocks',
  appName: 'Number Locks',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    StatusBar: {
      style: 'dark',
      overlaysWebView: false,
      backgroundColor: '#1f253d'
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1f253d',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      iosSpinnerStyle: 'small',
      spinnerColor: '#4a90e2'
    },
    ScreenOrientation: {
      orientation: 'portrait'
    }
  }
};

export default config;
