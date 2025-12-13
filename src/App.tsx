import { useEffect } from 'react';
import { initializeCapacitor } from './services/CapacitorService';
import { GameBoard } from './components/Game/GameBoard';
import { MovesSlider } from './components/Game/MovesSlider';
import { useGameStore } from './store/gameStore';
import './App.css';

function App() {
  const { moves, stars, currentLevel } = useGameStore();

  useEffect(() => {
    // Initialize Capacitor plugins on mount
    initializeCapacitor();
  }, []);

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">
          NUM<span className="highlight">6</span>ER L
          <img className="logo" src="/img/padlocknew.svg" alt="Lock" />
          CKS
        </h1>
      </div>

      <div className="game-wrapper">
        <GameBoard levelId={currentLevel || 'level1'} />
      </div>

      <div className="controls-wrapper">
        <MovesSlider
          moves={moves}
          stars={stars}
          levelId={currentLevel || 'level1'}
        />
      </div>
    </div>
  );
}

export default App;
