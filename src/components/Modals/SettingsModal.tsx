import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '../../store/settingsStore';
import { useProgressStore } from '../../store/progressStore';
import styles from './SettingsModal.module.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { soundEnabled, toggleSound } = useSettingsStore();
  const { resetProgress } = useProgressStore();

  const handleReset = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset all progress? This will delete all your level completions and stars.'
    );
    if (confirmed) {
      resetProgress();
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
            <div className={styles.header}>
              <h2 className={styles.title}>Settings</h2>
            </div>

            <div className={styles.content}>
              {/* Sound Toggle */}
              <div className={styles.setting}>
                <div className={styles.settingInfo}>
                  <div className={styles.settingLabel}>Sound Effects</div>
                  <div className={styles.settingDescription}>
                    Play sound effects during gameplay
                  </div>
                </div>

                <button
                  className={`${styles.toggle} ${soundEnabled ? styles.toggleOn : styles.toggleOff}`}
                  onClick={toggleSound}
                  aria-label="Toggle sound effects"
                >
                  <motion.div
                    className={styles.toggleThumb}
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Divider */}
              <div className={styles.divider} />

              {/* Reset Progress */}
              <div className={styles.setting}>
                <div className={styles.settingInfo}>
                  <div className={styles.settingLabel}>Reset Progress</div>
                  <div className={styles.settingDescription}>
                    Delete all level completions and stars
                  </div>
                </div>

                <motion.button
                  className={styles.resetButton}
                  onClick={handleReset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset
                </motion.button>
              </div>

              {/* Close Button */}
              <div className={styles.buttons}>
                <motion.button
                  className={styles.closeButton}
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
