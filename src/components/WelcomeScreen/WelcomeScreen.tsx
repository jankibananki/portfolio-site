
import { useEffect, useState } from 'react';
import './WelcomeScreen.css';

type WelcomeScreenProps = {
  onComplete: () => void;
};

const text = 'JANA.EXE';

export default function WelcomeScreen({
  onComplete,
}: WelcomeScreenProps) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timers: number[] = [];

    // Ispisivanje teksta slovo po slovo
    for (let i = 1; i <= text.length; i++) {
      timers.push(
        window.setTimeout(() => {
          setVisibleCharacters(i);
        }, i * 170)
      );
    }

    // Sačekaj 2 sekunde nakon ispisivanja
    const typingDuration = text.length * 170;

    timers.push(
      window.setTimeout(() => {
        setIsLeaving(true);
      }, typingDuration + 2000)
    );

    // Sačekaj završetak fade-out animacije
    timers.push(
      window.setTimeout(() => {
        onComplete();
      }, typingDuration + 2600)
    );

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`welcome-screen ${
        isLeaving ? 'welcome-screen--leaving' : ''
      }`}
    >
      <h1 className="welcome-title">
        {text.slice(0, visibleCharacters)}
        <span className="welcome-cursor">_</span>
      </h1>
    </div>
  );
}
