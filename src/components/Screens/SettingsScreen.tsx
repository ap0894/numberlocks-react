import { motion } from 'framer-motion';
import { useSettingsStore } from '@/store/settingsStore';
import { useProgressStore } from '@/store/progressStore';
import { ratingService } from '@/services/RatingService';
import { ScreenHeader } from '@/components/UI/ScreenHeader';
import styles from './SettingsScreen.module.css';

interface SettingsScreenProps {
  onClose: () => void;
}

export function SettingsScreen({ onClose }: SettingsScreenProps) {
  const { soundEnabled, toggleSound } = useSettingsStore();
  const { resetProgress } = useProgressStore();

  // Get app version from package.json (will be bundled by Vite)
  const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';

  const handleReset = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset all progress? This will delete all your level completions and keys.'
    );
    if (confirmed) {
      resetProgress();
    }
  };

  const handleReviewApp = async () => {
    await ratingService.requestReview();
  };

  return (
    <div className={styles.container}>
      <ScreenHeader onBackClick={onClose} />

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Sound Effects Toggle */}
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

        <div className={styles.divider} />

        {/* Reset Progress */}
        <div className={styles.setting}>
          <div className={styles.settingInfo}>
            <div className={styles.settingLabel}>Reset Progress</div>
            <div className={styles.settingDescription}>
              Delete all level completions and reset collected keys
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

        <div className={styles.divider} />

        {/* App Version */}
        <div className={styles.setting}>
          <div className={styles.settingInfo}>
            <div className={styles.settingLabel}>App Version</div>
            <div className={styles.settingDescription}>
              Current version number
            </div>
          </div>

          <div className={styles.versionText}>{appVersion}</div>
        </div>

        <div className={styles.divider} />

        {/* Review App */}
        <div className={styles.setting}>
          <div className={styles.settingInfo}>
            <div className={styles.settingLabel}>Review App</div>
            <div className={styles.settingDescription}>
              Help us improve by leaving a review
            </div>
          </div>

          <motion.button
            className={styles.reviewButton}
            onClick={handleReviewApp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Review
          </motion.button>
        </div>
      </div>
    </div>
  );
}
