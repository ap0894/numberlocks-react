import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { initializeCapacitor } from './services/CapacitorService';
import { HomeScreen } from './components/Screens/HomeScreen';
import { VaultScreen } from './components/Screens/VaultScreen';
import { LevelSelector } from './components/Screens/LevelSelector';
import { GameScreen } from './components/Screens/GameScreen';
import { GameOverModal } from './components/Modals/GameOverModal';
import { TutorialModal } from './components/Modals/TutorialModal';
import { SettingsModal } from './components/Modals/SettingsModal';
import { useNavigationStore } from './store/navigationStore';
import { useGameStore } from './store/gameStore';
import { useProgressStore } from './store/progressStore';
import { VAULTS } from './config/constants';
import './App.css';

function App() {
  const { currentScreen, selectedVault, selectedLevel, navigateToVaults, navigateToLevels, navigateToGame, goBack } = useNavigationStore();
  const { totalStars } = useProgressStore();

  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  useEffect(() => {
    // Initialize Capacitor plugins on mount
    initializeCapacitor();
  }, []);

  const handlePlayClick = () => {
    navigateToVaults();
  };

  const handleVaultSelect = (vaultId: number) => {
    navigateToLevels(vaultId);
  };

  const handleLevelSelect = (levelId: string) => {
    navigateToGame(levelId);
  };

  const handleGameOver = () => {
    setShowGameOverModal(true);
  };

  const handleGameOverClose = () => {
    setShowGameOverModal(false);
  };

  const handleRetry = () => {
    setShowGameOverModal(false);
    const { resetLevel } = useGameStore.getState();
    resetLevel();
  };

  const handleNext = () => {
    setShowGameOverModal(false);

    if (!selectedLevel || !selectedVault) return;

    const vault = VAULTS.find(v => v.id === selectedVault);
    if (!vault) return;

    const currentIndex = vault.levels.indexOf(selectedLevel);
    if (currentIndex >= 0 && currentIndex < vault.levels.length - 1) {
      const nextLevel = vault.levels[currentIndex + 1];
      navigateToGame(nextLevel);
    } else {
      // Last level in vault, go back to level selector
      goBack();
    }
  };

  const handleBackFromGame = () => {
    setShowGameOverModal(false);
    goBack();
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
  };

  const handleSettingsClose = () => {
    setShowSettingsModal(false);
  };

  const handleTutorialClose = () => {
    setShowTutorialModal(false);
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HomeScreen
              onPlayClick={handlePlayClick}
              onSettingsClick={handleSettingsClick}
              totalStars={totalStars}
            />
          </motion.div>
        )}

        {currentScreen === 'vaults' && (
          <motion.div
            key="vaults"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <VaultScreen
              onVaultSelect={handleVaultSelect}
              onBackClick={goBack}
            />
          </motion.div>
        )}

        {currentScreen === 'levels' && selectedVault && (
          <motion.div
            key="levels"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <LevelSelector
              vaultId={selectedVault}
              onLevelSelect={handleLevelSelect}
              onBackClick={goBack}
            />
          </motion.div>
        )}

        {currentScreen === 'game' && selectedLevel && (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <GameScreen
              levelId={selectedLevel}
              onBackClick={handleBackFromGame}
              onGameOver={handleGameOver}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      {selectedLevel && (
        <GameOverModal
          isOpen={showGameOverModal}
          onClose={handleGameOverClose}
          onRetry={handleRetry}
          onNext={handleNext}
          levelId={selectedLevel}
        />
      )}

      <TutorialModal
        isOpen={showTutorialModal}
        onClose={handleTutorialClose}
        isFirstTime={true}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={handleSettingsClose}
      />
    </div>
  );
}

export default App;
