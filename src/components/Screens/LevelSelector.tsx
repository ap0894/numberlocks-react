import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VAULTS } from '@/config/constants.ts';
import { useProgressStore } from '@/store/progressStore.ts';
import { audioService } from '@/services/AudioService';
import { ScreenHeader } from '@/components/UI/ScreenHeader';
import styles from './LevelSelector.module.css';

interface LevelSelectorProps {
  vaultId: number;
  onLevelSelect: (levelId: string) => void;
  onBackClick: () => void;
  onTutorialClick?: () => void;
  onSettingsClick?: () => void;
}

export function LevelSelector({ vaultId, onLevelSelect, onBackClick, onTutorialClick, onSettingsClick }: LevelSelectorProps) {
  const vault = VAULTS.find((v) => v.id === vaultId);
  const { levelStars, isLevelUnlocked } = useProgressStore();
  const [currentPage, setCurrentPage] = useState(0);

  if (!vault) {
    return <div>Vault not found</div>;
  }

  const levelsPerPage = 10; // 3 columns layout with 10 levels total
  const totalPages = Math.ceil(vault.levels.length / levelsPerPage);
  const startIdx = currentPage * levelsPerPage;
  const endIdx = startIdx + levelsPerPage;
  const currentLevels = vault.levels.slice(startIdx, endIdx);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const getLevelNumber = (levelId: string): number => {
    return parseInt(levelId.replace('level', ''), 10);
  };

  return (
    <div className={styles.container}>
      <ScreenHeader onBackClick={onBackClick} />

      {/* Header - centered title */}
      <div className={styles.header}>
        <h1 className={styles.title}>{vault.name}</h1>
      </div>

      <div className={styles.content}>
        {/* Level Grid */}
        <div className={styles.levelsContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className={styles.levelsGrid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {currentLevels.map((levelId) => {
                const levelNum = getLevelNumber(levelId);
                const stars = levelStars[levelId] || 0;
                const isUnlocked = isLevelUnlocked(levelId);

                return (
                  <motion.button
                    key={levelId}
                    className={`${styles.levelCard} ${!isUnlocked ? styles.locked : ''}`}
                    onClick={() => {
                        if (isUnlocked) {
                            onLevelSelect(levelId);
                        } else {
                            audioService.playLock();   // locked feedback sound
                        }
                    }}
                    whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
                    whileTap={isUnlocked ? { scale: 0.95 } : {}}
                  >
                    <div className={styles.levelNumber}>{levelNum}</div>

                    {!isUnlocked && (
                      <img src="/img/locked.svg" alt="Locked" className={styles.lockIcon} />
                    )}

                    {isUnlocked && (
                      <div className={styles.starsContainer}>
                        {[1, 2, 3].map((star) => (
                          <img
                            key={star}
                            src={star <= stars ? '/img/keyblue.svg' : '/img/keyempty.svg'}
                            alt={star <= stars ? 'Star earned' : 'Star empty'}
                            className={styles.starIcon}
                          />
                        ))}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.navButton}
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              <img src="/img/back.svg" alt="Previous" className={styles.navIcon} />
            </button>

            <div className={styles.pageIndicator}>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <div
                  key={idx}
                  className={`${styles.dot} ${idx === currentPage ? styles.activeDot : ''}`}
                  onClick={() => setCurrentPage(idx)}
                />
              ))}
            </div>

            <button
              className={styles.navButton}
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              <img src="/img/back.svg" alt="Next" className={`${styles.navIcon} ${styles.next}`} />
            </button>
          </div>
        )}
      </div>

      {/* Tutorial button - bottom left */}
      {onTutorialClick && (
        <motion.button
          className={styles.tutorialButton}
          onClick={onTutorialClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <img src="/img/info.svg" alt="Tutorial" className={styles.tutorialIcon} />
        </motion.button>
      )}

      {/* Settings button - bottom right */}
      {onSettingsClick && (
        <motion.button
          className={styles.settingsButton}
          onClick={onSettingsClick}
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <img src="/img/settings.svg" alt="Settings" className={styles.settingsIcon} />
        </motion.button>
      )}
    </div>
  );
}
