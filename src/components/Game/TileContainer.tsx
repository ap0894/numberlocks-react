import { AnimatePresence } from 'framer-motion';
import { Tile } from './Tile';
import { Tile as TileType, SwipeDirection } from '../../types/level.types';
import { TILE_SIZE } from '@/config/constants.ts';
import styles from './TileContainer.module.css';

interface TileContainerProps {
  tiles: TileType[];
  onSwipe: (tileId: string, direction: SwipeDirection) => void;
  enableDiagonal: boolean;
  gridSize: number;
}

/**
 * Container that manages all tiles and handles swipe gestures
 */
export function TileContainer({
  tiles,
  onSwipe,
  enableDiagonal,
  gridSize
}: TileContainerProps) {
  const containerSize = gridSize * TILE_SIZE;

  return (
    <div
      className={styles.tileContainer}
      style={{
        width: containerSize,
        height: containerSize
      }}
    >
      <AnimatePresence>
        {tiles.map((tile) => (
          <Tile
            key={tile.id}
            tile={tile}
            onSwipe={onSwipe}
            enableDiagonal={enableDiagonal}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
