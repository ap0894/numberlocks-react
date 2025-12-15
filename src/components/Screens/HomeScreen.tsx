import { motion } from 'framer-motion';
import styles from './HomeScreen.module.css';

interface HomeScreenProps {
  onPlayClick: () => void;
  onSettingsClick: () => void;
  onTutorialClick: () => void;
  totalStars: number;
}

export function HomeScreen({ onPlayClick, onSettingsClick, onTutorialClick, totalStars }: HomeScreenProps) {
  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>
          NUM<span className={styles.highlight}>6</span>ER L
          <img className={styles.logo} src="/img/padlocknew.svg" alt="Lock" />
          CKS
        </h1>
      </motion.div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h3 className={styles.heading}>Choose a challenge:</h3>

        <div className={styles.iconContainer}>
          <motion.button
            className={styles.playButton}
            onClick={onPlayClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img className={styles.playIcon} src="/img/player.svg" alt="One Player" />
            <span className={styles.buttonLabel}>One Player</span>
          </motion.button>
        </div>

        {totalStars > 0 && (
          <motion.div
            className={styles.statsContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className={styles.totalStars}>
              <img src="/img/keyblue.svg" alt="Key" className={styles.keyIcon} />
              <span>{totalStars}</span>
            </div>
          </motion.div>
        )}

        <div className={styles.comingSoonSection}>
          <div className={styles.comingSoonLabel}>Coming Soon</div>
          <div className={styles.smallIconContainer}>
            <div className={styles.smallButton}>
              <img className={styles.smallIcon} src="/img/playervsplayer.svg" alt="Two Player" />
              <span className={styles.smallLabel}>Two Player</span>
            </div>
            <div className={styles.smallButton}>
              <img className={styles.smallIcon} src="/img/trophy.svg" alt="Multi Player" />
              <span className={styles.smallLabel}>Multi Player</span>
            </div>
            <div className={styles.smallButton}>
              <img className={styles.smallIcon} src="/img/timetrial.svg" alt="Time Trial" />
              <span className={styles.smallLabel}>Time Trial</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tutorial button */}
      <motion.button
        className={styles.tutorialButton}
        onClick={onTutorialClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <img src="/img/info.svg" alt="Tutorial" className={styles.tutorialIcon} />
      </motion.button>

      {/* Settings button */}
      <motion.button
        className={styles.settingsButton}
        onClick={onSettingsClick}
        whileHover={{ rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <img src="/img/settings.svg" alt="Settings" className={styles.settingsIcon} />
      </motion.button>
    </div>
  );
}
