import { motion, AnimatePresence } from 'framer-motion';
import { TUTORIAL_LESSONS, FIRST_TIME_TITLE, FIRST_TIME_TUTORIAL } from '../../config/constants';
import styles from './TutorialModal.module.css';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart?: () => void;
  lessonId?: string;
  isFirstTime?: boolean;
}

export function TutorialModal({ isOpen, onClose, onStart, lessonId, isFirstTime = false }: TutorialModalProps) {
  const lesson = lessonId ? TUTORIAL_LESSONS.find((l) => l.id === lessonId) : null;

  const handleStart = () => {
    if (onStart) {
      onStart();
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {isFirstTime ? (
              <>
                <div className={styles.header}>
                  <h2 className={styles.title}>{FIRST_TIME_TITLE}</h2>
                </div>

                <div className={styles.content}>
                  <p
                    className={styles.text}
                    dangerouslySetInnerHTML={{ __html: FIRST_TIME_TUTORIAL }}
                  />

                  <div className={styles.buttons}>
                    <motion.button
                      className={styles.confirmButton}
                      onClick={handleStart}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Tutorial
                    </motion.button>

                    <motion.button
                      className={styles.cancelButton}
                      onClick={onClose}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Skip
                    </motion.button>
                  </div>
                </div>
              </>
            ) : lesson ? (
              <>
                <div className={styles.header}>
                  <h2 className={styles.title}>{lesson.title}</h2>
                </div>

                <div className={styles.content}>
                  <p
                    className={styles.text}
                    dangerouslySetInnerHTML={{ __html: lesson.text }}
                  />

                  <div className={styles.buttons}>
                    <motion.button
                      className={styles.confirmButton}
                      onClick={handleStart}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Let's Go!
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.content}>
                <p className={styles.text}>No tutorial lesson found.</p>
                <div className={styles.buttons}>
                  <motion.button
                    className={styles.confirmButton}
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Okay
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
