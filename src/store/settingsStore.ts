import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { SettingsState } from '../types/game.types';

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
        name: 'numberlocks-settings', // localStorage key
        version: 1,
        // Migrate old localStorage data
        migrate: (persistedState: any, version: number) => {
          if (version === 0) {
            // Check for old cordova app data
            const oldSoundFx = localStorage.getItem('soundFx');
            if (oldSoundFx) {
              return {
                ...persistedState,
                soundEnabled: oldSoundFx === 'true'
              };
            }
          }
          return persistedState;
        }
      }
    ),
    { name: 'SettingsStore' }
  )
);
