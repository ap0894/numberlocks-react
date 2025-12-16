import { motion } from 'framer-motion';
import { TUTORIAL_LESSONS } from '../../config/constants';
import styles from './TutorialOverlay.module.css';

interface TutorialOverlayProps {
  levelId: string;
}

export function TutorialOverlay({ levelId }: TutorialOverlayProps) {
  // Find the lesson for this level (excluding dynamic lessons like 2.2)
  const lesson = TUTORIAL_LESSONS.find(l => l.level === levelId && !l.isDynamic);

  if (!lesson) {
    return null;
  }

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className={styles.content}>
        <h3
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: lesson.title }}
        />
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: lesson.text }}
        />
      </div>
    </motion.div>
  );
}
