import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GameBoard } from '../Game/GameBoard';
import { MovesSlider } from '../Game/MovesSlider';
import { useGameStore } from '../../store/gameStore';
import styles from './GameScreen.module.css';

interface GameScreenProps {
  levelId: string;
  onBackClick: () => void;
  onGameOver: () => void;
  onPauseClick?: () => void;
}

export function GameScreen({ levelId, onBackClick, onGameOver, onPauseClick }: GameScreenProps) {
  const { currentLevel, moves, stars, isComplete, isGameOver, initLevel, resetLevel } = useGameStore();

  useEffect(() => {
    if (levelId && levelId !== currentLevel) {
      initLevel(levelId);
    }
  }, [levelId, currentLevel, initLevel]);

  useEffect(() => {
    if (isComplete || isGameOver) {
      // Small delay before showing game over modal
      const timer = setTimeout(() => {
        onGameOver();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isComplete, isGameOver, onGameOver]);

  const getLevelNumber = (levelId: string): string => {
    // Handle tutorial levels (level-1, level-2, etc.)
    if (levelId.startsWith('level-')) {
      return `Tutorial ${levelId.replace('level-', '')}`;
    }
    // Handle regular levels (level1, level2, etc.)
    return `Level ${levelId.replace('level', '')}`;
  };

  const handleReset = () => {
    resetLevel();
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button className={styles.backButton} onClick={onBackClick}>
          <img src="/img/back.svg" alt="Back" className={styles.backIcon} />
        </button>

        <div className={styles.levelInfo}>
          <h2 className={styles.levelName}>{getLevelNumber(levelId)}</h2>
        </div>

        {onPauseClick && (
          <button className={styles.pauseButton} onClick={onPauseClick}>
            <img src="/img/pause.svg" alt="Pause" className={styles.pauseIcon} />
          </button>
        )}
      </motion.div>

      {/* Game Board */}
      <motion.div
        className={styles.gameWrapper}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <GameBoard levelId={levelId} />
      </motion.div>

      {/* Footer Controls */}
      <motion.div
        className={styles.footer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Moves Slider */}
        <div className={styles.sliderWrapper}>
          <MovesSlider moves={moves} stars={stars} levelId={levelId} />
        </div>

        {/* Control Buttons */}
        <div className={styles.controls}>
          <motion.button
            className={styles.resetButton}
            onClick={handleReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/img/reset.svg" alt="Reset" className={styles.resetIcon} />
            <span>Reset</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
