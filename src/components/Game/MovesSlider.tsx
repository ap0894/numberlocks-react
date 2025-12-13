import { motion } from 'framer-motion';
import { getStarThresholds } from '../../utils/starCalculator';
import styles from './MovesSlider.module.css';

interface MovesSliderProps {
  moves: number;
  stars: number;
  levelId: string;
}

/**
 * Custom slider showing moves and star thresholds
 * Replaces noUiSlider from original game
 */
export function MovesSlider({ moves, stars, levelId }: MovesSliderProps) {
  const thresholds = getStarThresholds(levelId);

  if (!thresholds) return null;

  // Calculate slider range
  const maxMoves = Math.max(
    thresholds.one.max + 5,
    moves + 2
  );

  // Calculate positions as percentages
  const threeStarPos = (thresholds.three / maxMoves) * 100;
  const twoStarPos = (thresholds.two.min / maxMoves) * 100;
  const oneStarPos = (thresholds.one.min / maxMoves) * 100;
  const currentPos = Math.min((moves / maxMoves) * 100, 100);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderLabel}>Moves: {moves}</div>

      <div className={styles.sliderTrack}>
        {/* Current position indicator */}
        <motion.div
          className={styles.currentIndicator}
          initial={{ left: '0%' }}
          animate={{ left: `${currentPos}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className={styles.indicatorDot} />
        </motion.div>

        {/* Star threshold markers */}
        <div
          className={`${styles.marker} ${styles.threeStarMarker}`}
          style={{ left: `${threeStarPos}%` }}
          title={`3 stars: ${thresholds.three} moves`}
        >
          <img src="/img/key.svg" alt="3 stars" className={styles.markerIcon} />
          <span className={styles.markerLabel}>{thresholds.three}</span>
        </div>

        <div
          className={`${styles.marker} ${styles.twoStarMarker}`}
          style={{ left: `${twoStarPos}%` }}
          title={`2 stars: ${thresholds.two.min}-${thresholds.two.max} moves`}
        >
          <img src="/img/key.svg" alt="2 stars" className={styles.markerIcon} />
          <span className={styles.markerLabel}>{thresholds.two.min}</span>
        </div>

        <div
          className={`${styles.marker} ${styles.oneStarMarker}`}
          style={{ left: `${oneStarPos}%` }}
          title={`1 star: ${thresholds.one.min}+ moves`}
        >
          <img src="/img/keyoff.svg" alt="1 star" className={styles.markerIcon} />
          <span className={styles.markerLabel}>{thresholds.one.min}</span>
        </div>
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
