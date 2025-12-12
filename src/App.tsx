import { useEffect } from 'react';
import { initializeCapacitor } from './services/CapacitorService';

function App() {
  useEffect(() => {
    // Initialize Capacitor plugins on mount
    initializeCapacitor();
  }, []);

  return (
    <div className="container">
      <div>
        <h1 className="title">
          NUM<span>6</span>ER L<img className="logo" src="/img/padlocknew.svg" alt="Lock" />CKS
        </h1>
      </div>
      <div id="challenge">
        <h3 className="heading">Choose a challenge:</h3>
        <div className="icon">
          <div id="campaign" className="square">
            <img className="centre" src="/img/player.svg" alt="One Player" />
            <span className="bottom">One Player</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
