import { motion } from 'framer-motion';
import { VAULTS } from '../../config/constants';
import { useProgressStore } from '../../store/progressStore';
import styles from './VaultScreen.module.css';

interface VaultScreenProps {
  onVaultSelect: (vaultId: number) => void;
  onBackClick: () => void;
}

export function VaultScreen({ onVaultSelect, onBackClick }: VaultScreenProps) {
  const { totalStars, highestVault } = useProgressStore();

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
        <h1 className={styles.title}>
          NUM<span className={styles.highlight}>6</span>ER L
          <img className={styles.logo} src="/img/padlocknew.svg" alt="Lock" />
          CKS
        </h1>
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
        <h2 className={styles.heading}>Select Vault:</h2>

        <div className={styles.vaultsContainer}>
          {VAULTS.map((vault, index) => {
            const isUnlocked = totalStars >= vault.requiredStars || vault.id <= highestVault;
            const isNew = vault.id === highestVault && totalStars >= vault.requiredStars;

            return (
              <motion.button
                key={vault.id}
                className={`${styles.vaultButton} ${!isUnlocked ? styles.locked : ''}`}
                onClick={() => isUnlocked && onVaultSelect(vault.id)}
                disabled={!isUnlocked}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
              >
                <div className={styles.vaultIcon}>
                  {isUnlocked ? (
                    <img src="/img/padlocknew.svg" alt="Unlocked" className={styles.lockIcon} />
                  ) : (
                    <img src="/img/locked.svg" alt="Locked" className={styles.lockIcon} />
                  )}
                </div>

                <div className={styles.vaultInfo}>
                  <h3 className={styles.vaultName}>{vault.name}</h3>
                  <p className={styles.vaultLevels}>
                    Levels {vault.levels[0].replace('level', '')} - {vault.levels[vault.levels.length - 1].replace('level', '')}
                  </p>
                </div>

                {!isUnlocked && (
                  <div className={styles.requirement}>
                    <img src="/img/keyblue.svg" alt="Required" className={styles.reqKeyIcon} />
                    <span>{vault.requiredStars}</span>
                  </div>
                )}

                {isNew && (
                  <div className={styles.newBadge}>NEW!</div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
