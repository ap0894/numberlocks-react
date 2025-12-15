import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore.ts';
import { Grid } from './Grid';
import { GridLines } from './GridLines';
import { TileContainer } from './TileContainer';
import { TutorialHand } from './TutorialHand';
import { getGridSize } from '@/utils/gameLogic.ts';
import { DIAGONAL_UNLOCK_LEVEL, TILE_SIZE } from '@/config/constants.ts';
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
  const tileCount = tiles.length;
  const gridSize = tileCount > 0 ? getGridSize(tileCount) : 3;

  // Calculate natural dimensions based on tiles
  const naturalWidth = tileCount < 4 ? tileCount * TILE_SIZE : gridSize * TILE_SIZE;
  const naturalHeight = tileCount < 4 ? TILE_SIZE : gridSize * TILE_SIZE;

  // Check if diagonal swipes are enabled
  const levelNumber = parseInt(levelId.replace(/\D/g, ''), 10);
  const enableDiagonal = levelNumber >= DIAGONAL_UNLOCK_LEVEL;

  // Check if this is a tutorial level that should show hand gestures
  const isTutorialLevel = levelId.startsWith('level-') || levelId === 'level11';
  const showTutorialHand = isTutorialLevel && (
    levelId === 'level-1' ||
    levelId === 'level-2' ||
    levelId === 'level-3' ||
    levelId === 'level11'
  );

  return (
    <div className={styles.superContainer}>
      <div className={styles.gameContainer}>
        <div className={styles.boardWrapper}>
          <div
            className={styles.boardContent}
            style={{
              '--natural-width': `${naturalWidth}px`,
              '--natural-height': `${naturalHeight}px`,
              width: naturalWidth,
              height: naturalHeight
            } as React.CSSProperties}
          >
            {/* Background grid circles */}
            <Grid size={gridSize} tileCount={tileCount} />

            {/* Guide lines */}
            <GridLines size={gridSize} enableDiagonal={enableDiagonal} tileCount={tileCount} />

            {/* Tiles */}
            <TileContainer
              tiles={tiles}
              onSwipe={makeMove}
              enableDiagonal={enableDiagonal}
              gridSize={gridSize}
            />

            {/* Tutorial hand gesture overlay */}
            {showTutorialHand && <TutorialHand levelId={levelId} />}
          </div>
        </div>
      </div>
    </div>
  );
}
