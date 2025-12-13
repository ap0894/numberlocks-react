import { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { Grid } from './Grid';
import { GridLines } from './GridLines';
import { TileContainer } from './TileContainer';
import { getGridSize } from '../../utils/gameLogic';
import { DIAGONAL_UNLOCK_LEVEL } from '../../config/constants';
import styles from './GameBoard.module.css';

interface GameBoardProps {
  levelId: string;
}

/**
 * Main game board component
 * Combines grid, lines, and tiles
 */
export function GameBoard({ levelId }: GameBoardProps) {
  const { initLevel, tiles, makeMove } = useGameStore();

  // Initialize level on mount or when levelId changes
  useEffect(() => {
    initLevel(levelId);
  }, [levelId, initLevel]);

  // Calculate grid size
  const gridSize = tiles.length > 0 ? getGridSize(tiles.length) : 3;

  // Check if diagonal swipes are enabled
  const levelNumber = parseInt(levelId.replace(/\D/g, ''), 10);
  const enableDiagonal = levelNumber >= DIAGONAL_UNLOCK_LEVEL;

  return (
    <div className={styles.superContainer}>
      <div className={styles.gameContainer}>
        <div className={styles.boardWrapper}>
          {/* Background grid circles */}
          <Grid size={gridSize} />

          {/* Guide lines */}
          <GridLines size={gridSize} enableDiagonal={enableDiagonal} />

          {/* Tiles */}
          <TileContainer
            tiles={tiles}
            onSwipe={makeMove}
            enableDiagonal={enableDiagonal}
            gridSize={gridSize}
          />
        </div>
      </div>
    </div>
  );
}
