import { describe, it, expect } from 'vitest';
import {
  calculateTargetPosition,
  processTileMove,
  checkForPairs,
  checkGameOver,
  getGridSize,
  indexToPosition
} from '../gameLogic';
import { Tile } from '@/types/level.types.ts';

describe('gameLogic', () => {
  describe('calculateTargetPosition', () => {
    it('should calculate correct target position for all directions', () => {
      const startPos = { row: 1, col: 1 };

      expect(calculateTargetPosition(startPos, 'up')).toEqual({ row: 0, col: 1 });
      expect(calculateTargetPosition(startPos, 'down')).toEqual({ row: 2, col: 1 });
      expect(calculateTargetPosition(startPos, 'left')).toEqual({ row: 1, col: 0 });
      expect(calculateTargetPosition(startPos, 'right')).toEqual({ row: 1, col: 2 });
      expect(calculateTargetPosition(startPos, 'upleft')).toEqual({ row: 0, col: 0 });
      expect(calculateTargetPosition(startPos, 'upright')).toEqual({ row: 0, col: 2 });
      expect(calculateTargetPosition(startPos, 'downleft')).toEqual({ row: 2, col: 0 });
      expect(calculateTargetPosition(startPos, 'downright')).toEqual({ row: 2, col: 2 });
    });
  });

  describe('processTileMove', () => {
    it('should subtract tiles correctly', () => {
      const tiles: Tile[] = [
        {
          id: 'tile-0',
          value: 5,
          position: { row: 0, col: 0 },
          isComplete: false,
          isPair: false,
          isIsolated: false,
          showTick: false
        },
        {
          id: 'tile-1',
          value: 3,
          position: { row: 0, col: 1 },
          isComplete: false,
          isPair: false,
          isIsolated: false,
          showTick: false
        }
      ];

      const result = processTileMove(tiles, 'tile-0', 'right');

      // Source tile should move to target position with new value (5-3=2)
      const sourceTile = result.tiles.find((t) => t.id === 'tile-0');
      expect(sourceTile?.value).toBe(2);
      expect(sourceTile?.position).toEqual({ row: 0, col: 1 });
      expect(sourceTile?.isComplete).toBe(false);

      // Target tile should be marked complete
      const targetTile = result.tiles.find((t) => t.id === 'tile-1');
      expect(targetTile?.isComplete).toBe(true);

      // Should have 1 remaining tile
      expect(result.remainingTiles).toBe(1);
    });

    it('should eliminate both tiles when result is 0', () => {
      const tiles: Tile[] = [
        {
          id: 'tile-0',
          value: 3,
          position: { row: 0, col: 0 },
          isComplete: false,
          isPair: false,
          isIsolated: false,
          showTick: false
        },
        {
          id: 'tile-1',
          value: 3,
          position: { row: 0, col: 1 },
          isComplete: false,
          isPair: false,
          isIsolated: false,
          showTick: false
        }
      ];

      const result = processTileMove(tiles, 'tile-0', 'right');

      // Both tiles should be marked complete
      expect(result.tiles.every((t) => t.isComplete)).toBe(true);
      expect(result.remainingTiles).toBe(0);
    });

    it('should handle invalid moves (no target tile)', () => {
      const tiles: Tile[] = [
        {
          id: 'tile-0',
          value: 5,
          position: { row: 0, col: 0 },
          isComplete: false,
          isPair: false,
          isIsolated: false,
          showTick: false
        }
      ];

      const result = processTileMove(tiles, 'tile-0', 'right');

      // Nothing should change
      expect(result.tiles).toEqual(tiles);
      expect(result.remainingTiles).toBe(1);
    });
  });

  describe('checkForPairs', () => {
    it('should detect matching adjacent tiles', () => {
      const tiles: Tile[] = [
        {
          id: 'tile-0',
          value: 3,
          position: { row: 0, col: 0 },
          isComplete: false,
          isPair: false,
          isIsolated: false,
          showTick: false
        },
        {
          id: 'tile-1',
          value: 3,
          position: { row: 0, col: 1 },
          isComplete: false,
          isPair: false,
          isIsolated: false,
          showTick: false
        },
        {
          id: 'tile-2',
          value: 5,
          position: { row: 1, col: 0 },
          isComplete: false,
          isPair: false,
          isIsolated: false,
          showTick: false
        }
      ];

      const result = checkForPairs(tiles);

      // First two tiles should be marked as pairs
      expect(result.find((t) => t.id === 'tile-0')?.isPair).toBe(true);
      expect(result.find((t) => t.id === 'tile-1')?.isPair).toBe(true);
      expect(result.find((t) => t.id === 'tile-2')?.isPair).toBe(false);
    });
  });

  describe('checkGameOver', () => {
    it('should detect isolated tiles in non-diagonal levels', () => {
      const tiles: Tile[] = [
        {
          id: 'tile-0',
          value: 5,
          position: { row: 1, col: 1 }, // center
          isComplete: false,
          isPair: false,
          isIsolated: false,
          showTick: false
        },
        {
          id: 'tile-1',
          value: 3,
          position: { row: 0, col: 1 }, // top
          isComplete: true,
          isPair: false,
          isIsolated: false,
          showTick: false
        },
        {
          id: 'tile-2',
          value: 3,
          position: { row: 2, col: 1 }, // bottom
          isComplete: true,
          isPair: false,
          isIsolated: false,
          showTick: false
        },
        {
          id: 'tile-3',
          value: 3,
          position: { row: 1, col: 0 }, // left
          isComplete: true,
          isPair: false,
          isIsolated: false,
          showTick: false
        },
        {
          id: 'tile-4',
          value: 3,
          position: { row: 1, col: 2 }, // right
          isComplete: true,
          isPair: false,
          isIsolated: false,
          showTick: false
        }
      ];

      const result = checkGameOver(tiles, 'level5');

      expect(result.isGameOver).toBe(true);
      expect(result.tiles.find((t) => t.id === 'tile-0')?.isIsolated).toBe(true);
    });

    it('should not flag as game over if tile has valid moves', () => {
      const tiles: Tile[] = [
        {
          id: 'tile-0',
          value: 5,
          position: { row: 1, col: 1 },
          isComplete: false,
          isPair: false,
          isIsolated: false,
          showTick: false
        },
        {
          id: 'tile-1',
          value: 3,
          position: { row: 0, col: 1 },
          isComplete: false, // Not complete - valid move exists
          isPair: false,
          isIsolated: false,
          showTick: false
        }
      ];

      const result = checkGameOver(tiles, 'level5');

      expect(result.isGameOver).toBe(false);
    });
  });

  describe('utility functions', () => {
    it('should calculate correct grid size', () => {
      expect(getGridSize(4)).toBe(2); // 2x2
      expect(getGridSize(9)).toBe(3); // 3x3
      expect(getGridSize(16)).toBe(4); // 4x4
    });

    it('should convert index to position correctly for standard grid', () => {
      // 3x3 grid (9 tiles)
      expect(indexToPosition(0, 3, 9)).toEqual({ row: 0, col: 0 });
      expect(indexToPosition(1, 3, 9)).toEqual({ row: 0, col: 1 });
      expect(indexToPosition(3, 3, 9)).toEqual({ row: 1, col: 0 });
      expect(indexToPosition(4, 3, 9)).toEqual({ row: 1, col: 1 });
      expect(indexToPosition(8, 3, 9)).toEqual({ row: 2, col: 2 });
    });

    it('should convert index to position correctly for straight line layout', () => {
      // Straight line layout (2 tiles)
      expect(indexToPosition(0, 2, 2)).toEqual({ row: 0, col: 0 });
      expect(indexToPosition(1, 2, 2)).toEqual({ row: 0, col: 1 });

      // Straight line layout (3 tiles)
      expect(indexToPosition(0, 3, 3)).toEqual({ row: 0, col: 0 });
      expect(indexToPosition(1, 3, 3)).toEqual({ row: 0, col: 1 });
      expect(indexToPosition(2, 3, 3)).toEqual({ row: 0, col: 2 });
    });
  });
});
