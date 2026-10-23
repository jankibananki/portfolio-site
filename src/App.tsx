
import { useCallback, useEffect, useState } from 'react';

import BootSequence from './components/BootSequence/BootSequence';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';

type AppPhase = 'boot' | 'welcome' | 'portfolio';

function App() {
  const [phase, setPhase] = useState<AppPhase>(() => {
    return sessionStorage.getItem('jana-booted') === 'true'
      ? 'portfolio'
      : 'boot';
  });

  const finishBoot = useCallback(() => {
    setPhase('welcome');
  }, []);

  const finishWelcome = useCallback(() => {
    sessionStorage.setItem('jana-booted', 'true');
    setPhase('portfolio');
  }, []);

  useEffect(() => {
    if (phase !== 'boot') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        finishBoot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [phase, finishBoot]);

  if (phase === 'boot') {
    return <BootSequence onComplete={finishBoot} />;
  }

  if (phase === 'welcome') {
    return <WelcomeScreen onComplete={finishWelcome} />;
  }

  return (
    <main className="portfolio-placeholder">
      <p className="portfolio-status">
        &gt; SYSTEM INITIALIZED SUCCESSFULLY
      </p>

      <h1>Welcome to JANA.EXE</h1>

      <p>
        Portfolio loading complete.
      </p>
    </main>
  );
}

export default App;
