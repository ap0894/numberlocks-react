import { Tile, Position, SwipeDirection } from '../types/level.types';
import { DIAGONAL_UNLOCK_LEVEL } from '../config/constants';

/**
 * Calculate the target position based on swipe direction
 */
export function calculateTargetPosition(
  current: Position,
  direction: SwipeDirection
): Position {
  const deltas: Record<SwipeDirection, { row: number; col: number }> = {
    up: { row: -1, col: 0 },
    down: { row: 1, col: 0 },
    left: { row: 0, col: -1 },
    right: { row: 0, col: 1 },
    upleft: { row: -1, col: -1 },
    upright: { row: -1, col: 1 },
    downleft: { row: 1, col: -1 },
    downright: { row: 1, col: 1 }
  };

  const delta = deltas[direction];
  return {
    row: current.row + delta.row,
    col: current.col + delta.col
  };
}

/**
 * Find a tile at a specific position
 */
function findTileAtPosition(tiles: Tile[], position: Position): Tile | undefined {
  return tiles.find(
    (t) =>
      t.position.row === position.row &&
      t.position.col === position.col &&
      !t.isComplete
  );
}

/**
 * Process a tile move (swipe)
 * Returns updated tiles array and count of remaining active tiles
 */
export function processTileMove(
  tiles: Tile[],
  tileId: string,
  direction: SwipeDirection
): { tiles: Tile[]; remainingTiles: number } {
  const sourceTile = tiles.find((t) => t.id === tileId);

  if (!sourceTile || sourceTile.isComplete) {
    return { tiles, remainingTiles: countActiveTiles(tiles) };
  }

  const targetPosition = calculateTargetPosition(sourceTile.position, direction);
  const targetTile = findTileAtPosition(tiles, targetPosition);

  // No tile at target position - invalid move
  if (!targetTile) {
    return { tiles, remainingTiles: countActiveTiles(tiles) };
  }

  // Calculate new value after subtraction
  const newValue = Math.abs(sourceTile.value - targetTile.value);

  // Update tiles
  const updatedTiles = tiles.map((t) => {
    // Mark target tile as complete (it's being removed)
    if (t.id === targetTile.id) {
      return { ...t, isComplete: true };
    }

    // Update source tile
    if (t.id === sourceTile.id) {
      if (newValue === 0) {
        // Both tiles eliminated
        return {
          ...t,
          isComplete: true,
          position: targetPosition
        };
      }
      // Source tile moves to target position with new value
      return {
        ...t,
        value: newValue,
        position: targetPosition
      };
    }

    return t;
  });

  // Check for pairs after move
  const tilesWithPairs = checkForPairs(updatedTiles);

  return {
    tiles: tilesWithPairs,
    remainingTiles: countActiveTiles(tilesWithPairs)
  };
}

/**
 * Count active (non-complete) tiles
 */
function countActiveTiles(tiles: Tile[]): number {
  return tiles.filter((t) => !t.isComplete).length;
}

/**
 * Get all surrounding tiles (neighbors)
 */
function getSurroundingTiles(
  tile: Tile,
  allTiles: Tile[],
  includeDiagonal: boolean
): Tile[] {
  const { row, col } = tile.position;
  const neighbors: Position[] = [
    { row: row - 1, col }, // up
    { row: row + 1, col }, // down
    { row, col: col - 1 }, // left
    { row, col: col + 1 }  // right
  ];

  if (includeDiagonal) {
    neighbors.push(
      { row: row - 1, col: col - 1 }, // upleft
      { row: row - 1, col: col + 1 }, // upright
      { row: row + 1, col: col - 1 }, // downleft
      { row: row + 1, col: col + 1 }  // downright
    );
  }

  return allTiles.filter((t) =>
    neighbors.some(
      (pos) => pos.row === t.position.row && pos.col === t.position.col
    )
  );
}

/**
 * Check for matching adjacent tiles (pairs) and mark them
 */
export function checkForPairs(tiles: Tile[]): Tile[] {
  return tiles.map((tile) => {
    if (tile.isComplete) return tile;

    // Check all adjacent tiles (not diagonal for pairs)
    const neighbors = getSurroundingTiles(tile, tiles, false);
    const hasPair = neighbors.some(
      (n) => !n.isComplete && n.value === tile.value
    );

    return { ...tile, isPair: hasPair };
  });
}

/**
 * Check if a tile is isolated (blocked, game over)
 */
export function checkGameOver(
  tiles: Tile[],
  levelId: string
): { isGameOver: boolean; tiles: Tile[] } {
  const levelNumber = parseInt(levelId.replace(/\D/g, ''), 10);
  const includeDiagonal = levelNumber >= DIAGONAL_UNLOCK_LEVEL;

  let isGameOver = false;

  const updatedTiles = tiles.map((tile) => {
    if (tile.isComplete) return tile;

    // Get all neighbors
    const neighbors = getSurroundingTiles(tile, tiles, includeDiagonal);

    // Check if all neighbors are complete
    const allNeighborsComplete =
      neighbors.length > 0 &&
      neighbors.every((n) => n.isComplete);

    if (allNeighborsComplete) {
      isGameOver = true;
      return { ...tile, isIsolated: true };
    }

    return { ...tile, isIsolated: false };
  });

  return { isGameOver, tiles: updatedTiles };
}

/**
 * Get grid size from tile count
 */
export function getGridSize(tileCount: number): number {
  return Math.sqrt(tileCount);
}

/**
 * Calculate position from index
 */
export function indexToPosition(index: number, gridSize: number): Position {
  return {
    row: Math.floor(index / gridSize),
    col: index % gridSize
  };
}

/**
 * Check if a move is valid
 */
export function isValidMove(
  sourceTile: Tile,
  direction: SwipeDirection,
  tiles: Tile[],
  gridSize: number
): boolean {
  const targetPosition = calculateTargetPosition(sourceTile.position, direction);

  // Check grid boundaries
  if (
    targetPosition.row < 0 ||
    targetPosition.row >= gridSize ||
    targetPosition.col < 0 ||
    targetPosition.col >= gridSize
  ) {
    return false;
  }

  // Check if there's a tile at target position
  const targetTile = findTileAtPosition(tiles, targetPosition);
  return !!targetTile;
}
