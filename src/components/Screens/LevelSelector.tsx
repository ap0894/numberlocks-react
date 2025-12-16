import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VAULTS } from '../../config/constants';
import { useProgressStore } from '../../store/progressStore';
import styles from './LevelSelector.module.css';

interface LevelSelectorProps {
  vaultId: number;
  onLevelSelect: (levelId: string) => void;
  onBackClick: () => void;
}

export function LevelSelector({ vaultId, onLevelSelect, onBackClick }: LevelSelectorProps) {
  const vault = VAULTS.find((v) => v.id === vaultId);
  const { levelStars, highestLevel, totalStars, isLevelUnlocked } = useProgressStore();
  const [currentPage, setCurrentPage] = useState(0);

  if (!vault) {
    return <div>Vault not found</div>;
  }

  const levelsPerPage = 10;
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
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button className={styles.backButton} onClick={onBackClick}>
          <img src="/img/back.svg" alt="Back" className={styles.backIcon} />
        </button>
        <h1 className={styles.title}>{vault.name}</h1>
      </motion.div>

      <motion.div
        className={styles.statsBar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className={styles.totalStars}>
          <img src="/img/keyblue.svg" alt="Keys" className={styles.keyIcon} />
          <span>{totalStars}</span>
        </div>
      </motion.div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {/* Level Grid */}
        <div className={styles.levelsContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className={styles.levelsGrid}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              {currentLevels.map((levelId, index) => {
                const levelNum = getLevelNumber(levelId);
                const stars = levelStars[levelId] || 0;
                const isUnlocked = isLevelUnlocked(levelId);
                const isCurrent = levelNum === highestLevel;

                return (
                  <motion.button
                    key={levelId}
                    className={`${styles.levelCard} ${!isUnlocked ? styles.locked : ''} ${isCurrent ? styles.current : ''}`}
                    onClick={() => isUnlocked && onLevelSelect(levelId)}
                    disabled={!isUnlocked}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
                    whileTap={isUnlocked ? { scale: 0.95 } : {}}
                  >
                    <div className={styles.levelNumber}>
                      {levelNum}
                      {!isUnlocked && (
                        <img src="/img/locked.svg" alt="Locked" className={styles.lockOverlay} />
                      )}
                    </div>

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

                    {isCurrent && isUnlocked && stars === 0 && (
                      <div className={styles.newBadge}>NEXT</div>
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
      </motion.div>
    </div>
  );
}
