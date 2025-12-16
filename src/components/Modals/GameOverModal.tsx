import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore.ts';
import { useProgressStore } from '@/store/progressStore.ts';
import { CONGRATS_TITLE, CONGRATS_TEXT } from '@/config/constants.ts';
import styles from './GameOverModal.module.css';

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  onNext?: () => void;
  levelId: string;
}

export function GameOverModal({ isOpen, onClose, onRetry, onNext, levelId }: GameOverModalProps) {
  const { moves, stars, isComplete } = useGameStore();
  const { updateLevelProgress } = useProgressStore();

  const getLevelDisplay = (levelId: string): { name: string; number: string } => {
    if (levelId.startsWith('level-')) {
      return {
        name: 'TUTORIAL',
        number: levelId.replace('level-', '')
      };
    }
    return {
      name: 'LEVEL',
      number: levelId.replace('level', '')
    };
  };

  const handleClose = () => {
    if (isComplete && stars > 0) {
      updateLevelProgress(levelId, stars);
    }
    onClose();
  };

  const handleNext = () => {
    if (isComplete && stars > 0) {
      updateLevelProgress(levelId, stars);
    }
    if (onNext) {
      onNext();
    }
  };

  const levelDisplay = getLevelDisplay(levelId);
  const isTutorialLevel = levelId.startsWith('level-');
  const isFinalTutorialLevel = levelId === 'level-4';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>
                {isTutorialLevel && isComplete ? CONGRATS_TITLE :
                  `${levelDisplay.name} ${levelDisplay.number} ${isComplete ? 'COMPLETE!' : 'GAME OVER'}`}
              </h2>
            </div>

            <div className={styles.content}>
              {isComplete ? (
                <>
                  {isTutorialLevel && !isFinalTutorialLevel ? (
                    // Special message for tutorial levels (except the last one)
                    <>
                      <p className={styles.congratsText}>{CONGRATS_TEXT}</p>

                      <div className={styles.buttons}>
                        <motion.button
                          className={styles.nextButton}
                          onClick={handleNext}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Okay
                        </motion.button>

                        <motion.button
                          className={styles.cancelButton}
                          onClick={handleClose}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Skip
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    // Standard completion message for final tutorial and regular levels
                    <>
                  <div className={styles.scoreContainer}>
                    <p className={styles.movesLabel}>Moves: <span className={styles.movesValue}>{moves}</span></p>

                    <motion.div
                      className={styles.starsContainer}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    >
                      {[1, 2, 3].map((star, index) => (
                        <motion.img
                          key={star}
                          src={star <= stars ? '/img/keyblue.svg' : '/img/keyempty.svg'}
                          alt={star <= stars ? 'Star earned' : 'Star empty'}
                          className={styles.starIcon}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5 + index * 0.15, type: 'spring' }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  <div className={styles.buttons}>
                    {onNext && (
                      <motion.button
                        className={styles.nextButton}
                        onClick={handleNext}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Next
                      </motion.button>
                    )}

                    {!onNext && (
                      <motion.button
                        className={styles.nextButton}
                        onClick={handleClose}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Okay
                      </motion.button>
                    )}

                    <motion.button
                      className={styles.retryButton}
                      onClick={onRetry}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Retry
                    </motion.button>
                  </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <p className={styles.gameOverText}>
                    You've isolated a tile!<br />
                    Try again to complete the level.
                  </p>

                  <div className={styles.buttons}>
                    <motion.button
                      className={styles.retryButton}
                      onClick={onRetry}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Retry
                    </motion.button>

                    <motion.button
                      className={styles.cancelButton}
                      onClick={handleClose}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Back
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
