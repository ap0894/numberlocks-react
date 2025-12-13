import { TILE_SIZE } from '../../config/constants';
import styles from './GridLines.module.css';

interface GridLinesProps {
  size: number;
  enableDiagonal: boolean;
}

/**
 * Visual guide lines showing valid swipe directions
 */
export function GridLines({ size, enableDiagonal }: GridLinesProps) {
  const gridDimension = size * TILE_SIZE;
  const lines = [];

  // Horizontal lines
  for (let i = 1; i < size; i++) {
    lines.push(
      <div
        key={`h-${i}`}
        className={styles.horizontalLine}
        style={{
          top: i * TILE_SIZE,
          width: gridDimension
        }}
      />
    );
  }

  // Vertical lines
  for (let i = 1; i < size; i++) {
    lines.push(
      <div
        key={`v-${i}`}
        className={styles.verticalLine}
        style={{
          left: i * TILE_SIZE,
          height: gridDimension
        }}
      />
    );
  }

  // Diagonal lines (only for levels 11+)
  if (enableDiagonal) {
    // Diagonal from top-left to bottom-right
    lines.push(
      <div
        key="diag-1"
        className={styles.diagonalLine}
        style={{
          width: Math.sqrt(2) * gridDimension,
          transform: `rotate(45deg)`,
          transformOrigin: '0 0',
          top: 0,
          left: 0
        }}
      />
    );

    // Diagonal from top-right to bottom-left
    lines.push(
      <div
        key="diag-2"
        className={styles.diagonalLine}
        style={{
          width: Math.sqrt(2) * gridDimension,
          transform: `rotate(-45deg)`,
          transformOrigin: '100% 0',
          top: 0,
          right: 0
        }}
      />
    );
  }

  return (
    <div
      className={styles.linesContainer}
      style={{
        width: gridDimension,
        height: gridDimension
      }}
    >
      {lines}
    </div>
  );
}
