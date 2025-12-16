import { motion } from 'framer-motion';
import styles from './TutorialHand.module.css';

interface TutorialHandProps {
  levelId: string;
}

export function TutorialHand({ levelId }: TutorialHandProps) {
  const getAnimationConfig = () => {
    switch (levelId) {
      case 'level-1':
        // Horizontal swipe (left to right)
        return {
          className: styles.horizontal1,
          animate: {
            x: [0, 80, 80, 0],
            opacity: [0, 1, 1, 0]
          },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            times: [0, 0.3, 0.7, 1]
          }
        };

      case 'level-2':
        // Horizontal swipe variant (right to left)
        return {
          className: styles.horizontal2,
          animate: {
            x: [80, 0, 0, 80],
            opacity: [0, 1, 1, 0]
          },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            times: [0, 0.3, 0.7, 1]
          }
        };

      case 'level-3':
        // Vertical swipe (top to bottom)
        return {
          className: styles.vertical,
          animate: {
            y: [0, 80, 80, 0],
            opacity: [0, 1, 1, 0]
          },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            times: [0, 0.3, 0.7, 1]
          }
        };

      case 'level11':
        // Diagonal swipe (top-left to bottom-right)
        return {
          className: styles.diagonal,
          animate: {
            x: [0, 80, 80, 0],
            y: [0, 80, 80, 0],
            opacity: [0, 1, 1, 0]
          },
          transition: {
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 0.5,
            times: [0, 0.3, 0.7, 1]
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
