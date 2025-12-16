import { motion } from 'framer-motion';
import styles from './TutorialHand.module.css';

interface TutorialHandProps {
  levelId: string;
}

export function TutorialHand({ levelId }: TutorialHandProps) {
  const getAnimationConfig = () => {
    switch (levelId) {
      case 'level-1':
        // Horizontal swipe - starts over right tile, moves left, fades out, then resets
        return {
          className: styles.hand,
          animate: {
            x: [20, -20, -20],
            y: [14, 14, 14],
            opacity: [0, 1, 0]
          },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            times: [0, 0.5, 1]
          }
        };

      case 'level-2':
        // Horizontal swipe - starts right, moves to center, fades out, then resets
        return {
          className: styles.hand,
          animate: {
            x: [40, 0, 0],
            y: [14, 14, 14],
            opacity: [0, 1, 0]
          },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            times: [0, 0.5, 1]
          }
        };

      case 'level-3':
        // Vertical swipe - starts top, moves down, fades out, then resets
        return {
          className: styles.hand,
          animate: {
            x: [0, 0, 0],
            y: [-6, 34, 34],
            opacity: [0, 1, 0]
          },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            times: [0, 0.5, 1]
          }
        };

      case 'level11':
        // Diagonal swipe - starts top-left, moves bottom-right, fades out, then resets
        return {
          className: styles.hand,
          animate: {
            x: [-20, 20, 20],
            y: [-6, 34, 34],
            opacity: [0, 1, 0]
          },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            times: [0, 0.5, 1]
          }
        };

      default:
        return null;
    }
  };

  const animationConfig = getAnimationConfig();

  if (!animationConfig) {
    return null;
  }

  return (
    <div className={styles.container}>
      <motion.img
        src="/img/hand.svg"
        alt="Swipe gesture"
        className={`${styles.hand} ${animationConfig.className}`}
        animate={animationConfig.animate}
        transition={animationConfig.transition}
      />
    </div>
  );
}
