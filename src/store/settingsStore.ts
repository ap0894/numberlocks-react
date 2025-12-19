import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { SettingsState } from '../types/game.types';
import { capacitorStorage } from '../utils/capacitorStorage';

interface SettingsStore extends SettingsState {
  // Actions
  toggleSound: () => void;
  enableSound: () => void;
  disableSound: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        soundEnabled: true,

        // Toggle sound on/off
        toggleSound: () => {
          set((state) => ({ soundEnabled: !state.soundEnabled }));
        },

        // Enable sound
        enableSound: () => {
          set({ soundEnabled: true });
        },

        // Disable sound
        disableSound: () => {
          set({ soundEnabled: false });
        }
      }),
      {
        name: 'numberlocks-settings',
        storage: capacitorStorage,
        version: 2,
        // Migrate old data from localStorage and Cordova app
        migrate: (persistedState: any, version: number) => {
          // If version is 0 or 1, migrate from localStorage
          if (version < 2) {
            try {
              // First check for Zustand localStorage data (version 1)
              const zustandData = localStorage.getItem('numberlocks-settings');
              if (zustandData) {
                const parsed = JSON.parse(zustandData);
                // Remove from localStorage after migration
                localStorage.removeItem('numberlocks-settings');
                return parsed.state || persistedState;
              }

              // Then check for old Cordova app data (version 0)
              const oldSoundFx = localStorage.getItem('soundFx');
              if (oldSoundFx) {
                // Clean up old localStorage key
                localStorage.removeItem('soundFx');
                return {
                  ...persistedState,
                  soundEnabled: oldSoundFx === 'true'
                };
              }
            } catch (error) {
              console.error('[SettingsStore] Error migrating settings data:', error);
            }
          }
          return persistedState;
        },
        onRehydrateStorage: () => {
          return (_state, error) => {
            if (error) {
              console.error('[SettingsStore] Hydration error:', error);
            }
          };
        }
      }
    ),
    { name: 'SettingsStore' }
  )
);
