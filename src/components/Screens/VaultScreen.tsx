import { motion } from 'framer-motion';
import { VAULTS } from '@/config/constants.ts';
import { useProgressStore } from '@/store/progressStore.ts';
import { ScreenHeader } from '@/components/UI/ScreenHeader';
import styles from './VaultScreen.module.css';

interface VaultScreenProps {
  onVaultSelect: (vaultId: number) => void;
  onBackClick: () => void;
  onTutorialClick?: () => void;
  onSettingsClick?: () => void;
}

export function VaultScreen({ onVaultSelect, onBackClick, onTutorialClick, onSettingsClick }: VaultScreenProps) {
  const { totalStars, highestVault } = useProgressStore();

  const getVaultIcon = (vaultId: number, isUnlocked: boolean) => {
    const state = isUnlocked ? 'Open' : 'Lock';
    return `/img/${vaultId}${state}.svg`;
  };

  return (
    <div className={styles.container}>
      <ScreenHeader onBackClick={onBackClick} />

      {/* Header - centered title */}
      <div className={styles.header}>
        <h1 className={styles.title}>
            Select Vault
          {/*NUM<span className={styles.highlight}>6</span>ER L*/}
          {/*<img className={styles.logo} src="/img/padlocknew.svg" alt="Lock" />*/}
          {/*CKS*/}
        </h1>
      </div>

      <div className={styles.content}>
        {/*<h2 className={styles.heading}>Select Vault:</h2>*/}

        <div className={styles.vaultsContainer}>
          {VAULTS.map((vault) => {
            const isUnlocked = totalStars >= vault.requiredStars || vault.id <= highestVault;
            const isNew = vault.id === highestVault && totalStars >= vault.requiredStars;

            return (
              <motion.button
                key={vault.id}
                className={`${styles.vaultButton} ${!isUnlocked ? styles.locked : ''}`}
                onClick={() => isUnlocked && onVaultSelect(vault.id)}
                disabled={!isUnlocked}
                whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
              >
                <div className={styles.vaultIcon}>
                  <img
                    src={getVaultIcon(vault.id, isUnlocked)}
                    alt={isUnlocked ? 'Unlocked' : 'Locked'}
                    className={styles.lockIcon}
                  />
                </div>

                <div className={styles.vaultInfo}>
                  <h3 className={styles.vaultName}>{vault.name}</h3>
                  <p className={styles.vaultLevels}>
                    Levels {vault.levels[0].replace('level', '')} - {vault.levels[vault.levels.length - 1].replace('level', '')}
                  </p>
                </div>

                {!isUnlocked && (
                  <div className={styles.requirement}>
                    <img src="/img/key.svg" alt="Required" className={styles.reqKeyIcon} />
                    <div className={styles.requirementText}>
                      <span className={styles.requirementLabel}>Required</span>
                      <span className={styles.requirementValue}>
                        {vault.requiredStars}
                      </span>
                    </div>
                  </div>
                )}

                {isNew && (
                  <div className={styles.newBadge}>NEW!</div>
                )}
              </motion.button>
            );
          })}
        </div>
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
