import { motion } from 'framer-motion';
import { getStarThresholds } from '@/utils/starCalculator.ts';
import styles from './MovesSlider.module.css';

interface MovesSliderProps {
  moves: number;
  stars: number;
  levelId: string;
}

/**
 * Custom slider showing moves and star thresholds
 * Fixed 10-move scale with position markers
 */
export function MovesSlider({ moves, stars, levelId }: MovesSliderProps) {
  const thresholds = getStarThresholds(levelId);

  if (!thresholds) return null;

  // Fixed 10-move scale
  const maxMoves = 10;

  // Calculate positions as percentages (0-10 scale)
  const threeStarPos = (thresholds.three / maxMoves) * 100;
  const twoStarPos = (thresholds.two.min / maxMoves) * 100;
  const oneStarPos = (thresholds.one.min / maxMoves) * 100;
  const currentPos = Math.min((moves / maxMoves) * 100, 100);

  // Generate move number markers (1-10)
  const moveMarkers = Array.from({ length: maxMoves }, (_, i) => i + 1);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderLabel}>Moves: {moves}</div>

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

        {/* Star threshold key markers */}
        {thresholds.three <= maxMoves && (
          <div
            className={`${styles.keyMarker} ${styles.threeStarMarker}`}
            style={{ left: `${threeStarPos}%` }}
            title={`3 stars: ${thresholds.three} moves`}
          >
            <img src="/img/key.svg" alt="3 stars" className={styles.keyIcon} />
          </div>
        )}

        {thresholds.two.min <= maxMoves && (
          <div
            className={`${styles.keyMarker} ${styles.twoStarMarker}`}
            style={{ left: `${twoStarPos}%` }}
            title={`2 stars: ${thresholds.two.min}-${thresholds.two.max} moves`}
          >
            <img src="/img/key.svg" alt="2 stars" className={styles.keyIcon} />
          </div>
        )}

        {thresholds.one.min <= maxMoves && (
          <div
            className={`${styles.keyMarker} ${styles.oneStarMarker}`}
            style={{ left: `${oneStarPos}%` }}
            title={`1 star: ${thresholds.one.min}+ moves`}
          >
            <img src="/img/keyoff.svg" alt="1 star" className={styles.keyIcon} />
          </div>
        )}
      </div>

      {/* Current star rating display */}
      <div className={styles.starDisplay}>
        {[1, 2, 3].map((star) => (
          <img
            key={star}
            src={star <= stars ? '/img/key.svg' : '/img/keyoff.svg'}
            alt={`Star ${star}`}
            className={styles.starIcon}
          />
        ))}
      </div>
    </div>
  );
}
