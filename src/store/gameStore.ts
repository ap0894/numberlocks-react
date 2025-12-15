import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Tile, SwipeDirection } from '../types/level.types';
import { GameState } from '../types/game.types';
import { LEVELS } from '../config/levels';
import { processTileMove, checkGameOver } from '../utils/gameLogic';
import { calculateStars } from '../utils/starCalculator';

interface GameStore extends GameState {
  // Actions
  initLevel: (levelId: string) => void;
  makeMove: (tileId: string, direction: SwipeDirection) => void;
  resetLevel: () => void;
  completeLevel: () => void;
  setGameOver: (isOver: boolean) => void;
}

// Helper function to calculate position from index and grid size
function calculatePosition(index: number, totalTiles: number): { row: number; col: number } {
  // For levels with less than 4 tiles, lay them out in a straight horizontal line
  if (totalTiles < 4) {
    return {
      row: 0,
      col: index
    };
  }

  // Standard grid layout for 4+ tiles
  const gridSize = Math.sqrt(totalTiles);
  return {
    row: Math.floor(index / gridSize),
    col: index % gridSize
  };
}

export const useGameStore = create<GameStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentLevel: '',
      tiles: [],
      moves: 0,
      stars: 3,
      isComplete: false,
      isGameOver: false,

      // Initialize a level
      initLevel: (levelId: string) => {
        const level = LEVELS[levelId];
        if (!level) {
          console.error(`Level ${levelId} not found`);
          return;
        }

        const tiles: Tile[] = level.tiles.map((value, index) => ({
          id: `tile-${index}`,
          value,
          position: calculatePosition(index, level.tiles.length),
          isComplete: false,
          isPair: false,
          isIsolated: false,
          showTick: false
        }));

        set({
          currentLevel: levelId,
          tiles,
          moves: 0,
          stars: 3,
          isComplete: false,
          isGameOver: false
        });
      },

      // Make a move
      makeMove: (tileId: string, direction: SwipeDirection) => {
        const state = get();

        // Process the tile move
        const result = processTileMove(state.tiles, tileId, direction);
        const newMoves = state.moves + 1;

        // Calculate new star rating
        const newStars = calculateStars(newMoves, state.currentLevel);

        // Check for game over
        const gameOverResult = checkGameOver(result.tiles, state.currentLevel);

        // Check if level is complete
        const isComplete = result.remainingTiles === 0;

        set({
          tiles: gameOverResult.tiles,
          moves: newMoves,
          stars: newStars,
          isComplete,
          isGameOver: gameOverResult.isGameOver
        });
      },

      // Reset current level
      resetLevel: () => {
        const currentLevel = get().currentLevel;
        get().initLevel(currentLevel);
      },

      // Mark level as complete
      completeLevel: () => {
        set({ isComplete: true });
      },

      // Set game over state
      setGameOver: (isOver: boolean) => {
        set({ isGameOver: isOver });
      }
    }),
    { name: 'GameStore' } // DevTools name
  )
);
