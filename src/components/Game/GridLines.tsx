import { TILE_SIZE } from '@/config/constants.ts';
import styles from './GridLines.module.css';

interface GridLinesProps {
  size: number;
  enableDiagonal: boolean;
  tileCount: number;
}

/**
 * Visual guide lines showing valid swipe directions
 */
export function GridLines({ size, enableDiagonal, tileCount }: GridLinesProps) {
  const lines = [];

  const gridDimension = size * TILE_SIZE;
  const centerOffset = TILE_SIZE / 2;

  // For straight line layouts (< 4 tiles), show simplified lines
  if (tileCount < 4) {
    const lineLength = (tileCount - 1) * TILE_SIZE;
    // Just show a horizontal line connecting the tiles
    lines.push(
      <div
        key="h-0"
        className={styles.horizontalLine}
        style={{
          top: centerOffset - 2,
          left: centerOffset,
          width: lineLength
        }}
      />
    );

    return (
      <div
        className={styles.linesContainer}
        style={{
          width: tileCount * TILE_SIZE,
          height: TILE_SIZE
        }}
      >
        {lines}
      </div>
    );
  }

  const lineLength = (size - 1) * TILE_SIZE; // Lines go from first to last tile center

  // Horizontal lines - through centers of tile positions
  for (let i = 0; i < size; i++) {
    lines.push(
      <div
        key={`h-${i}`}
        className={styles.horizontalLine}
        style={{
          top: i * TILE_SIZE + centerOffset - 2,
          left: centerOffset,
          width: lineLength
        }}
      />
    );
  }

  // Vertical lines - through centers of tile positions
  for (let i = 0; i < size; i++) {
    lines.push(
      <div
        key={`v-${i}`}
        className={styles.verticalLine}
        style={{
          left: i * TILE_SIZE + centerOffset - 2,
          top: centerOffset,
          height: lineLength
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
