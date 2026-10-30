import { useEffect, useRef, useState } from 'react';
import type { GameBuild } from '../../data/portfolio';

type GamePlayerProps = { title: string; build?: GameBuild };
type Status = 'idle' | 'document' | 'initializing' | 'ready' | 'error';

function gameError(message: string) {
 if (/EncodingError|unable to decode audio|decoding.*failed|decodeAudioData|Loading FSB failed/i.test(message)) {
  return 'The browser could not decode the game audio. If you are using an editor preview, copy this page URL into Chrome or Edge and try again. If it also fails there, the Unity audio assets need investigation and a new export. Original error: ' + message;
 }
 return message;
}

export default function GamePlayer({ title, build }: GamePlayerProps) {
 const container = useRef<HTMLDivElement>(null);
 const frame = useRef<HTMLIFrameElement>(null);
 const playButton = useRef<HTMLButtonElement>(null);
 const [playing, setPlaying] = useState(false);
 const [status, setStatus] = useState<Status>('idle');
 const [progress, setProgress] = useState(0);
 const [error, setError] = useState('');
 const [fullscreenError, setFullscreenError] = useState('');
 useEffect(() => {
  if (!playing || !build) return;
  const origin = new URL(build.url, window.location.href).origin;
  const receive = (event: MessageEvent) => {
   if (event.origin !== origin || event.source !== frame.current?.contentWindow ||
       event.data?.source !== 'jana-unity') return;
   if (event.data.type === 'progress' && Number.isFinite(event.data.progress)) {
    setProgress(Math.round(Math.max(0, Math.min(1, event.data.progress)) * 100));
    setStatus(current => current === 'error' || current === 'ready' ? current : 'initializing');
   } else if (event.data.type === 'ready') {
    setStatus(current => current === 'error' ? current : 'ready');
    // Keep input focus inside the game unless the visitor has moved elsewhere.
    if (document.activeElement === playButton.current || document.activeElement === frame.current) {
     frame.current?.focus();
    }
   } else if (event.data.type === 'error') {
    setStatus('error');
    setError(gameError(typeof event.data.message === 'string' ? event.data.message : 'Unity could not initialize.'));
   }
  };
  window.addEventListener('message', receive);
  return () => window.removeEventListener('message', receive);
 }, [playing, build]);
 async function fullscreen() {
  try {
   if (!document.fullscreenEnabled || !container.current?.requestFullscreen) {
    setFullscreenError('Fullscreen is unavailable here. Use Open game in new tab, then maximize that window.');
    return;
   }
   await container.current.requestFullscreen();
   frame.current?.focus();
   setFullscreenError('');
  } catch {
   setFullscreenError('Fullscreen could not open. Continue here or open the game in a new tab.');
  }
 }
 function start() {
  setError('');
  setFullscreenError('');
  setProgress(0);
  setStatus('document');
  setPlaying(true);
 }
 function close() {
  if (document.fullscreenElement === container.current) void document.exitFullscreen().catch(() => {});
  setPlaying(false);
  setStatus('idle');
  setError('');
  setFullscreenError('');
  playButton.current?.focus();
 }
 return <section className="game-section" aria-labelledby="game-heading">
  <h2 id="game-heading">// play_game</h2>
  <p>Play {title} in your browser. The game downloads about 100 MB when you press Play.</p>
  <p className="game-desktop-note">Desktop play with a keyboard and mouse is recommended. Touch controls are not confirmed. For editor previews, open this portfolio in Chrome or Edge; embedded previews may not support the game audio.</p>
  <div className="game-player" ref={container}>
   {build && playing ? <>
    <iframe ref={frame} title={`${title} — Play Game`} src={build.url}
     allow="fullscreen; autoplay; gamepad" allowFullScreen
     onLoad={() => setStatus(current => current === 'document' ? 'initializing' : current)}
     onError={() => { setStatus('error'); setError('The game document could not load. Close the player and try again.'); }} />
    {status !== 'ready' && <p className="game-loading" role="status">
     {status === 'error' ? 'The game reported an error. See details below.' :
      status === 'document' ? 'Opening game document…' : `Initializing Unity… ${progress}%`}
    </p>}
    <button className="game-close-overlay hero-button" onClick={close}>[ close player ]</button>
   </> : <div className="game-placeholder">
    <h3>{title} / Unity WebGL</h3>
    <p>{build ? 'Ready when you are.' : 'Build not connected yet.'}</p>
    <button ref={playButton} className="hero-button hero-button-primary" disabled={!build} onClick={start}>
     [ PLAY {title.toUpperCase()} ]
    </button>
   </div>}
  </div>
  {playing && <div className="game-actions">
   <button className="hero-button" onClick={fullscreen}>[ fullscreen ]</button>
   <button className="hero-button" onClick={close}>[ close player ]</button>
   <a className="hero-button" href={build?.url} target="_blank" rel="noopener noreferrer">[ open game in new tab ]</a>
  </div>}
  {status === 'ready' && <p role="status">Unity initialized. Click inside the game to focus keyboard and mouse input.</p>}
    {error && <div role="alert" className="game-error">
   <p>{error}</p>
   <p>For an editor preview, open this URL in your desktop browser: <code>{window.location.href}</code></p>
   {build && <a href={build.url} target="_blank" rel="noopener noreferrer">[ open standalone game ]</a>}
  </div>}
  {fullscreenError && <p role="status">{fullscreenError}</p>}
  {playing && status !== 'ready' && status !== 'error' &&
   <p className="game-load-help">First launch may take a while. If loading stalls, close and retry, or open the game in a new tab to inspect its error messages.</p>}
  <details className="game-controls"><summary>Controls / instructions</summary>
   {build?.controls.length ? <ul>{build.controls.map(control => <li key={control}>{control}</li>)}</ul> :
    <p>Use the in-game instructions for movement and combat. Exact key bindings have not been confirmed.</p>}
  </details>
 </section>;
}