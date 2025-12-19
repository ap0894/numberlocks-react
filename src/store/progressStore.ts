import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { ProgressState } from '../types/game.types';
import { LEVEL_ORDER } from '../config/levels';
import { capacitorStorage } from '../utils/capacitorStorage';

interface ProgressStore extends ProgressState {
  // Actions
  updateLevelProgress: (levelId: string, stars: number) => void;
  unlockVault: (vaultId: number) => void;
  completeTutorial: () => void;
  resetProgress: () => void;
  getLevelStars: (levelId: string) => number;
  isLevelUnlocked: (levelId: string) => boolean;
}

export const useProgressStore = create<ProgressStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        highestLevel: 5, // Unlock tutorial levels (0-3) + first real level (4)
        highestVault: 1,
        totalStars: 0,
        levelStars: {},
        tutorialComplete: false,

        // Update progress after completing a level
        updateLevelProgress: (levelId: string, stars: number) => {
          const state = get();
          const currentStars = state.levelStars[levelId] || 0;

          // Only update if new stars are better
          if (stars > currentStars) {
            const starDelta = stars - currentStars;
            const levelIndex = LEVEL_ORDER.indexOf(levelId);

            // Tutorial levels (level-1, level-2, etc.) don't count towards total stars
            const isTutorialLevel = levelId.startsWith('level-');
            const newTotalStars = isTutorialLevel ? state.totalStars : state.totalStars + starDelta;

            set({
              levelStars: { ...state.levelStars, [levelId]: stars },
              totalStars: newTotalStars,
              // Unlock next level
              highestLevel: Math.max(state.highestLevel, levelIndex + 2) // +2 because index is 0-based and we want next level
            });
          }
        },

        // Unlock a vault
        unlockVault: (vaultId: number) => {
          set((state) => ({
            highestVault: Math.max(state.highestVault, vaultId)
          }));
        },

        // Mark tutorial as complete
        completeTutorial: () => {
          set({ tutorialComplete: true });
        },

        // Reset all progress (for testing or user request)
        resetProgress: () => {
          set({
            highestLevel: 5, // Unlock tutorial levels (0-3) + first real level (4)
            highestVault: 1,
            totalStars: 0,
            levelStars: {},
            tutorialComplete: false
          });
        },

        // Get stars earned for a specific level
        getLevelStars: (levelId: string) => {
          return get().levelStars[levelId] || 0;
        },

        // Check if a level is unlocked
        isLevelUnlocked: (levelId: string) => {
          const state = get();
          const levelIndex = LEVEL_ORDER.indexOf(levelId);

          // Tutorial levels (level-1 to level-4) are always unlocked
          if (levelId.startsWith('level-')) {
            return true;
          }

          // Regular levels unlock sequentially
          return levelIndex < state.highestLevel;
        }
      }),
      {
        name: 'numberlocks-progress',
        storage: capacitorStorage,
        version: 2,
        // Migrate old data from localStorage and Cordova app
        migrate: (persistedState: any, version: number) => {
          // If version is 0 or 1, migrate from localStorage
          if (version < 2) {
            try {
              // First check for Zustand localStorage data (version 1)
              const zustandData = localStorage.getItem('numberlocks-progress');
              if (zustandData) {
                const parsed = JSON.parse(zustandData);
                // Remove from localStorage after migration
                localStorage.removeItem('numberlocks-progress');
                return parsed.state || persistedState;
              }

              // Then check for old Cordova app data (version 0)
              const oldTutorialComplete = localStorage.getItem('tutorialComplete');
              const oldHighestLevel = localStorage.getItem('highestLevel');
              const oldTotalStars = localStorage.getItem('totalStars');

              if (oldTutorialComplete || oldHighestLevel || oldTotalStars) {
                // Clean up old localStorage keys
                localStorage.removeItem('tutorialComplete');
                localStorage.removeItem('highestLevel');
                localStorage.removeItem('totalStars');

                return {
                  ...persistedState,
                  tutorialComplete: oldTutorialComplete === 'true',
                  highestLevel: parseInt(oldHighestLevel || '5', 10),
                  totalStars: parseInt(oldTotalStars || '0', 10)
                };
              }
            } catch (error) {
              console.error('[ProgressStore] Error migrating progress data:', error);
            }
          }
          return persistedState;
        },
        onRehydrateStorage: () => {
          return (_state, error) => {
            if (error) {
              console.error('[ProgressStore] Hydration error:', error);
            }
          };
        }
      }
    ),
    { name: 'ProgressStore' }
  )
);
