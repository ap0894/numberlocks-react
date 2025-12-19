import { motion } from 'framer-motion';
import { useProgressStore } from '@/store/progressStore.ts';
import styles from './ScreenHeader.module.css';

interface ScreenHeaderProps {
  onBackClick: () => void;
}

export function ScreenHeader({ onBackClick }: ScreenHeaderProps) {
  const { totalStars } = useProgressStore();

  return (
    <>
      {/* Back Button - positioned at top left */}
      <motion.button
        className={styles.backButton}
        onClick={onBackClick}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/img/back.svg" alt="Back" className={styles.backIcon} />
      </motion.button>

      {/* Key Count Display - positioned at top right */}
      <motion.div
        className={styles.keyCount}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/img/key.svg" alt="Keys" className={styles.keyCountIcon} />
        <span className={styles.keyCountNumber}>{totalStars}</span>
      </motion.div>
    </>
  );
}
