import { TILE_SIZE } from '@/config/constants.ts';
import styles from './Grid.module.css';

interface GridProps {
  size: number; // Grid dimension (2 for 2x2, 3 for 3x3, etc.)
  tileCount: number; // Total number of tiles
}

/**
 * Background grid circles
 * Shows where tiles can be placed
 */
export function Grid({ size, tileCount }: GridProps) {
  const circles = [];

  // For levels with less than 4 tiles, create a straight horizontal line
  if (tileCount < 4) {
    for (let col = 0; col < tileCount; col++) {
      circles.push(
        <div
          key={`circle-0-${col}`}
          className={styles.circle}
          style={{
            left: col * TILE_SIZE,
            top: 0,
            width: TILE_SIZE,
            height: TILE_SIZE
          }}
        />
      );
    }
  } else {
    // Standard grid layout for 4+ tiles
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
  }

  // For straight line layouts, use single row height
  const gridHeight = tileCount < 4 ? TILE_SIZE : size * TILE_SIZE;
  const gridWidth = tileCount < 4 ? tileCount * TILE_SIZE : size * TILE_SIZE;

  return (
    <div
      className={styles.gridContainer}
      style={{
        width: gridWidth,
        height: gridHeight
      }}
    >
      {circles.map((circle) => (
          <div>

          </div>
      ))}
    </div>
  );
}
