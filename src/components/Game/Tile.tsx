import { memo } from 'react';
import { motion } from 'framer-motion';
import { Tile as TileType, SwipeDirection } from '../../types/level.types';
// import { useSwipeGesture } from '@/hooks/useSwipeGesture.ts';
import { useHammerSwipe } from '@/hooks/useHammerSwipe.ts';
import { TILE_SIZE } from '@/config/constants.ts';
import styles from './Tile.module.css';

interface TileProps {
  tile: TileType;
  onSwipe: (tileId: string, direction: SwipeDirection) => void;
  enableDiagonal: boolean;
}

function TileComponent({ tile, onSwipe, enableDiagonal }: TileProps) {

    const tileRef = useHammerSwipe({
        enableDiagonal,
        onSwipe: (direction) => onSwipe(tile.id, direction),
    });

  // Calculate pixel position from grid position
  const left = tile.position.col * TILE_SIZE;
  const top = tile.position.row * TILE_SIZE;

  // Build className
  const className = [
    styles.tile,
    !tile.isComplete && styles.tileMovable,
    tile.isComplete && styles.tileComplete,
    tile.isPair && !tile.isComplete && styles.pair,
    tile.isIsolated && styles.isolated
  ]
    .filter(Boolean)
    .join(' ');

  // Tile visual size is 65% of grid spacing to show background grid
  const tileVisualSize = TILE_SIZE * 0.65;
  const offset = (TILE_SIZE - tileVisualSize) / 2;

  return (
    <motion.div
        ref={tileRef}

        className={className}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        left: left + offset,
        top: top + offset,
        scale: 1,
        opacity: 1
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        duration: 0.25,
        ease: 'easeInOut'
      }}
      style={{
        position: 'absolute',
        width: tileVisualSize,
        height: tileVisualSize
      }}
    >
      {tile.isComplete && tile.showTick ? (
        <img
          src="/img/Tick2NoCircle.svg"
          alt="Complete"
          className={styles.tickIcon}
        />
      ) : !tile.isComplete ? (
        <span className={styles.tileValue}>{tile.value}</span>
      ) : null}
    </motion.div>
  );
}

export const Tile = memo(TileComponent);
