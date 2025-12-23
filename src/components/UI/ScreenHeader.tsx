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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src="/img/back.svg" alt="Back" className={styles.backIcon} />
      </motion.button>

      {/* Key Count Display - positioned at top right */}
      <div className={styles.keyCount}>
        <img src="/img/key.svg" alt="Keys" className={styles.keyCountIcon} />
        <span className={styles.keyCountNumber}>{totalStars}</span>
      </div>
    </>
  );
}
