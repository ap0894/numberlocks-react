import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Screen = 'home' | 'vaults' | 'levels' | 'game';

interface NavigationState {
  currentScreen: Screen;
  selectedVault: number | null;
  selectedLevel: string | null;
  history: Screen[];
}

interface NavigationStore extends NavigationState {
  // Actions
  navigateToHome: () => void;
  navigateToVaults: () => void;
  navigateToLevels: (vaultId: number) => void;
  navigateToGame: (levelId: string) => void;
  goBack: () => void;
  clearHistory: () => void;
}

export const useNavigationStore = create<NavigationStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentScreen: 'home',
      selectedVault: null,
      selectedLevel: null,
      history: [],

      // Navigate to home screen
      navigateToHome: () => {
        set({
          currentScreen: 'home',
          selectedVault: null,
          selectedLevel: null,
          history: []
        });
      },

      // Navigate to vaults screen
      navigateToVaults: () => {
        const state = get();
        set({
          currentScreen: 'vaults',
          selectedVault: null,
          selectedLevel: null,
          history: [...state.history, state.currentScreen]
        });
      },

      // Navigate to levels screen for a specific vault
      navigateToLevels: (vaultId: number) => {
        const state = get();
        set({
          currentScreen: 'levels',
          selectedVault: vaultId,
          selectedLevel: null,
          history: [...state.history, state.currentScreen]
        });
      },

      // Navigate to game screen for a specific level
      navigateToGame: (levelId: string) => {
        const state = get();
        set({
          currentScreen: 'game',
          selectedLevel: levelId,
          history: [...state.history, state.currentScreen]
        });
      },

      // Go back to previous screen
      goBack: () => {
        const state = get();
        if (state.history.length === 0) {
          // No history, go to home
          set({
            currentScreen: 'home',
            selectedVault: null,
            selectedLevel: null,
            history: []
          });
          return;
        }

        const previousScreen = state.history[state.history.length - 1];
        const newHistory = state.history.slice(0, -1);

        // Determine what to clear based on the screen we're going back to
        let updates: Partial<NavigationState> = {
          currentScreen: previousScreen,
          history: newHistory
        };

        if (previousScreen === 'home') {
          updates.selectedVault = null;
          updates.selectedLevel = null;
        } else if (previousScreen === 'vaults') {
          updates.selectedVault = null;
          updates.selectedLevel = null;
        } else if (previousScreen === 'levels') {
          updates.selectedLevel = null;
        }

        set(updates);
      },

      // Clear navigation history
      clearHistory: () => {
        set({ history: [] });
      }
    }),
    { name: 'NavigationStore' }
  )
);
