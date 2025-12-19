import { motion } from 'framer-motion';
import { getStarThresholds } from '@/utils/starCalculator.ts';
import styles from './MovesSlider.module.css';

interface MovesSliderProps {
  moves: number;
  levelId: string;
}

/**
 * Custom slider showing moves and key thresholds
 * Dynamic scale (10-20 moves) based on level thresholds
 */
export function MovesSlider({ moves, levelId }: MovesSliderProps) {
  const thresholds = getStarThresholds(levelId);

  if (!thresholds) return null;

  // Dynamic scale based on level thresholds
  // Use the highest threshold value, with min 10 and max 20
  const highestThreshold = Math.max(
    thresholds.three,
    thresholds.two.max,
    thresholds.one.max
  );
  const maxMoves = Math.min(20, Math.max(10, highestThreshold + 2));

  // Calculate positions as percentages (0-maxMoves scale)
  const threeStarPos = (thresholds.three / maxMoves) * 100;
  const twoStarPos = (thresholds.two.min / maxMoves) * 100;
  const oneStarPos = (thresholds.one.min / maxMoves) * 100;
  const currentPos = Math.min((moves / maxMoves) * 100, 100);

  // Generate move number markers (1-10)
  const moveMarkers = Array.from({ length: maxMoves }, (_, i) => i + 1);

  return (
    <div className={styles.sliderContainer}>
      {/* Top Keys Display - shows which keys are still achievable */}
      <div className={styles.topKeysDisplay}>
        {[3, 2, 1].map((starLevel) => {
          const threshold = starLevel === 3 ? thresholds.three
                          : starLevel === 2 ? thresholds.two.min
                          : thresholds.one.min;

          const isLost = moves > threshold;

          return (
            <motion.div
              key={starLevel}
              className={`${styles.topKey} ${isLost ? styles.lostKey : ''}`}
              initial={false}
              animate={{
                opacity: isLost ? 0.3 : 1,
                scale: isLost ? 0.9 : 1
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <img
                src={isLost ? '/img/keyoffgrey.svg' : '/img/key.svg'}
                alt={`${starLevel} keys`}
                className={styles.topKeyIcon}
              />
              {isLost && <div className={styles.strikethrough} />}
            </motion.div>
          );
        })}
        <div className={styles.movesLabel}>Moves: {moves}</div>
      </div>

      <div className={styles.sliderTrack}>
        {/* Move number markers */}
        {moveMarkers.map((moveNum) => {
          const position = (moveNum / maxMoves) * 100;
          const isPassed = moves >= moveNum;

          return (
            <div
              key={moveNum}
              className={`${styles.moveMarker} ${isPassed ? styles.passedMove : ''}`}
              style={{ left: `${position}%` }}
            >
              <div className={styles.moveDot} />
              <span className={styles.moveNumber}>{moveNum}</span>
            </div>
          );
        })}

        {/* Current position indicator */}
        <motion.div
          className={styles.currentIndicator}
          initial={{ left: '0%' }}
          animate={{ left: `${currentPos}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className={styles.indicatorDot} />
        </motion.div>

        {/* Threshold markers with labels */}
        {thresholds.three <= maxMoves && (
          <div
            className={`${styles.thresholdMarker} ${styles.threeStarMarker}`}
            style={{ left: `${threeStarPos}%` }}
          >
            <div className={styles.thresholdLabel}>{thresholds.three}</div>
            <div className={styles.thresholdSubLabel}>3🔑</div>
          </div>
        )}

        {thresholds.two.min <= maxMoves && (
          <div
            className={`${styles.thresholdMarker} ${styles.twoStarMarker}`}
            style={{ left: `${twoStarPos}%` }}
          >
            <div className={styles.thresholdLabel}>{thresholds.two.min}</div>
            <div className={styles.thresholdSubLabel}>2🔑</div>
          </div>
        )}

        {thresholds.one.min <= maxMoves && (
          <div
            className={`${styles.thresholdMarker} ${styles.oneStarMarker}`}
            style={{ left: `${oneStarPos}%` }}
          >
            <div className={styles.thresholdLabel}>{thresholds.one.min}</div>
            <div className={styles.thresholdSubLabel}>1🔑</div>
          </div>
        )}
      </div>
    </div>
  );
}
