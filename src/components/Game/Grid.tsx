import { TILE_SIZE } from '../../config/constants';
import styles from './Grid.module.css';

interface GridProps {
  size: number; // Grid dimension (2 for 2x2, 3 for 3x3, etc.)
}

/**
 * Background grid circles
 * Shows where tiles can be placed
 */
export function Grid({ size }: GridProps) {
  const circles = [];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      circles.push(
        <div
          key={`circle-${row}-${col}`}
          className={styles.circle}
          style={{
            left: col * TILE_SIZE,
            top: row * TILE_SIZE,
            width: TILE_SIZE,
            height: TILE_SIZE
          }}
        />
      );
    }
  }

  return (
    <div
      className={styles.gridContainer}
      style={{
        width: size * TILE_SIZE,
        height: size * TILE_SIZE
      }}
    >
      {circles}
    </div>
  );
}
