import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { ProgressState } from '../types/game.types';
import { LEVEL_ORDER } from '../config/levels';

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

            set({
              levelStars: { ...state.levelStars, [levelId]: stars },
              totalStars: state.totalStars + starDelta,
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
        name: 'numberlocks-progress', // localStorage key
        version: 1,
        // Migrate old localStorage data if needed
        migrate: (persistedState: any, version: number) => {
          if (version === 0) {
            // Check for old cordova app data
            const oldTutorialComplete = localStorage.getItem('tutorialComplete');
            const oldHighestLevel = localStorage.getItem('highestLevel');
            const oldTotalStars = localStorage.getItem('totalStars');

            if (oldTutorialComplete || oldHighestLevel || oldTotalStars) {
              return {
                ...persistedState,
                tutorialComplete: oldTutorialComplete === 'true',
                highestLevel: parseInt(oldHighestLevel || '5', 10),
                totalStars: parseInt(oldTotalStars || '0', 10)
              };
            }
          }
          return persistedState;
        }
      }
    ),
    { name: 'ProgressStore' }
  )
);
