import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GameBoard } from '../Game/GameBoard';
import { MovesSlider } from '../Game/MovesSlider';
import { TutorialOverlay } from '../Game/TutorialOverlay';
import { TutorialModal } from '../Modals/TutorialModal';
import { useGameStore } from '@/store/gameStore.ts';
import { TUTORIAL_LESSONS } from '@/config/constants.ts';
import styles from './GameScreen.module.css';

interface GameScreenProps {
  levelId: string;
  onBackClick: () => void;
  onGameOver: () => void;
  onPauseClick?: () => void;
  onLessonStart?: () => void;
}

export function GameScreen({ levelId, onBackClick, onGameOver, onPauseClick, onLessonStart }: GameScreenProps) {
  const { currentLevel, moves, stars, isComplete, isGameOver, tiles, initLevel, resetLevel } = useGameStore();
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const pairTutorialShownRef = useRef(false);

  // Initialize level when it changes
  useEffect(() => {
    if (levelId && levelId !== currentLevel) {
      initLevel(levelId);
    }
  }, [levelId, currentLevel, initLevel]);

  // Check for pairs in level-2 and show LESSON 2.2
  useEffect(() => {
    if (levelId === 'level-2' && !pairTutorialShownRef.current && tiles.length > 0) {
      const hasPairs = tiles.some(tile => tile.isPair && !tile.isComplete);
      if (hasPairs) {
        pairTutorialShownRef.current = true;
        setCurrentLessonId('lesson2.2');
        setShowLessonModal(true);
      }
    }
  }, [levelId, tiles]);

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
      // Find the lesson for this level
      const lesson = TUTORIAL_LESSONS.find(l => l.level === levelId && !l.isDynamic);
      if (lesson) {
        // Extract lesson number (e.g., "LESSON 2.1" from "LESSON 2.1: NO NEGATIVES")
        const colonIndex = lesson.title.indexOf(':');
        if (colonIndex !== -1) {
          return lesson.title.substring(0, colonIndex).trim();
        }
        return lesson.title;
      }
      return `Tutorial ${levelId.replace('level-', '')}`;
    }
    // Handle regular levels (level1, level2, etc.)
    return `Level ${levelId.replace('level', '')}`;
  };

  const handleReset = () => {
    resetLevel();
    // Reset pair tutorial flag when resetting level-2
    if (levelId === 'level-2') {
      pairTutorialShownRef.current = false;
    }
  };

  const handleLessonClose = () => {
    setShowLessonModal(false);
    setCurrentLessonId(null);
  };

  const handleLessonStart = () => {
    setShowLessonModal(false);
    setCurrentLessonId(null);
    if (onLessonStart) {
      onLessonStart();
    }
  };

  // Check if this is a tutorial level
  const isTutorialLevel = levelId.startsWith('level-');

  return (
    <>
      <div className={styles.container}>
      {/* Tutorial Overlay - shows instructions on screen for tutorial levels */}
      {isTutorialLevel && <TutorialOverlay levelId={levelId} />}
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

    {/* Lesson Modal */}
    {currentLessonId && (
      <TutorialModal
        isOpen={showLessonModal}
        onClose={handleLessonClose}
        onStart={handleLessonStart}
        lessonId={currentLessonId}
        isFirstTime={false}
      />
    )}
  </>
  );
}
