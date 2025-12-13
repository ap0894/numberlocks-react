import { motion } from 'framer-motion';
import { Tile as TileType, SwipeDirection } from '../../types/level.types';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import { TILE_SIZE } from '../../config/constants';
import styles from './Tile.module.css';

interface TileProps {
  tile: TileType;
  onSwipe: (tileId: string, direction: SwipeDirection) => void;
  enableDiagonal: boolean;
}

export function Tile({ tile, onSwipe, enableDiagonal }: TileProps) {
  const handleSwipe = (direction: SwipeDirection) => {
    if (!tile.isComplete) {
      onSwipe(tile.id, direction);
    }
  };

  const bind = useSwipeGesture({
    onSwipe: handleSwipe,
    enableDiagonal,
    threshold: 10,
    velocity: 0.1
  });

  // Calculate pixel position from grid position
  const left = tile.position.col * TILE_SIZE;
  const top = tile.position.row * TILE_SIZE;

  // Build className
  const className = [
    styles.tile,
    !tile.isComplete && styles.tileMovable,
    tile.isComplete && styles.tileComplete,
    tile.isPair && styles.pair,
    tile.isIsolated && styles.isolated
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      {...(bind() as any)}
      className={className}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        left,
        top,
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
        width: TILE_SIZE,
        height: TILE_SIZE,
        touchAction: 'none' // Prevent default touch behavior
      }}
    >
      {tile.isComplete ? (
        <img
          src="/img/Tick2NoCircle.svg"
          alt="Complete"
          className={styles.tickIcon}
        />
      ) : (
        <span className={styles.tileValue}>{tile.value}</span>
      )}
    </motion.div>
  );
}
