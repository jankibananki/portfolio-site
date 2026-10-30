import { useEffect, useState } from 'react';
import './WelcomeScreen.css';
type WelcomeScreenProps = { onComplete: () => void };
const text = 'JANA.EXE';
export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
 const [visibleCharacters, setVisibleCharacters] = useState(0);
 const [isLeaving, setIsLeaving] = useState(false);
 useEffect(() => {
  const timers: number[] = [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const interval = reducedMotion ? 0 : 170;
  for (let i = 1; i <= text.length; i++) {
   timers.push(window.setTimeout(() => setVisibleCharacters(i), i * interval));
  }
  const typingDuration = text.length * interval;
  timers.push(window.setTimeout(() => setIsLeaving(true), typingDuration + 2000));
  timers.push(window.setTimeout(onComplete, typingDuration + (reducedMotion ? 2000 : 2600)));
  return () => timers.forEach(window.clearTimeout);
 }, [onComplete]);
 return <div className={`welcome-screen ${isLeaving ? 'welcome-screen--leaving' : ''}`}>
  <h1 className="welcome-title" aria-label="JANA.EXE"><span aria-hidden="true">{text.slice(0, visibleCharacters)}<span className="welcome-cursor">_</span></span></h1>
  <button className="welcome-skip" onClick={onComplete}>SKIP [ESC]</button>
 </div>;
}