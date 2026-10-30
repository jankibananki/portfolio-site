import useSectionReveal from './hooks/useSectionReveal';
import { useCallback, useEffect, useRef, useState } from 'react';
import BootSequence from './components/BootSequence/BootSequence';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import Navbar from './components/Navbar/Navbar';
import Hero from './sections/Hero/Hero';
import { HomeSections, ProjectDetail } from './sections/Portfolio';
import { projects } from './data/portfolio';
import './App.css';

type AppPhase = 'boot' | 'welcome' | 'portfolio';
function initialPhase(): AppPhase {
 try { return sessionStorage.getItem('jana-booted') === 'true' ? 'portfolio' : 'boot'; }
 catch { return 'boot'; }
}
export default function App() {
 const [year] = useState(() => new Date().getFullYear());
 const [phase, setPhase] = useState<AppPhase>(initialPhase);
 const [route, setRoute] = useState(() => window.location.hash);
 const finishBoot = useCallback(() => setPhase('welcome'), []);
 const finishWelcome = useCallback(() => {
  try { sessionStorage.setItem('jana-booted', 'true'); } catch {  }
  setPhase('portfolio');
 }, []);
 useEffect(() => {
  const changeRoute = () => setRoute(window.location.hash);
  window.addEventListener('hashchange', changeRoute);
  return () => window.removeEventListener('hashchange', changeRoute);
 }, []);
 useEffect(() => {
  if (phase === 'portfolio') return;
  const skip = (event: KeyboardEvent) => {
   if (event.key === 'Escape') {
    if (phase === 'boot') finishBoot(); else finishWelcome();
   }
  };
  window.addEventListener('keydown', skip);
  return () => window.removeEventListener('keydown', skip);
 }, [phase, finishBoot, finishWelcome]);
 const mainRef = useRef<HTMLElement>(null);
 const isProjectRoute = route.startsWith('#/');
 useSectionReveal(mainRef, phase === 'portfolio' && !isProjectRoute);
 const project = projects.find(item => route === `#/projects/${item.slug}`);
 useEffect(() => {
  if (phase !== 'portfolio') return;
  document.title = project ? `${project.title} — JANA.EXE` : 'JANA.EXE — Jana Marković';
  if (isProjectRoute) {
   window.scrollTo({ top:0, behavior:'instant' });
   document.getElementById('project-title')?.focus({ preventScroll:true });
  } else if (!route) {
   window.scrollTo({ top:0, behavior:'instant' });
  } else {
   document.getElementById(route.slice(1))?.scrollIntoView();
  }
 }, [route, phase, project, isProjectRoute]);
 if (phase === 'boot') return <BootSequence onComplete={finishBoot} />;
 if (phase === 'welcome') return <WelcomeScreen onComplete={finishWelcome} />;
 return <>
  <a className="skip-content" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Skip to content</a>
  <Navbar />
  <main ref={mainRef} id="main-content" className="portfolio-main" tabIndex={-1}>
   {project ? <ProjectDetail key={project.slug} project={project} /> : isProjectRoute ? <div className="not-found content-section"><h1 id="project-title" tabIndex={-1}>404 / file not found</h1><p>This project path does not exist.</p><a href="#projects">← back to project gallery</a></div> : <><Hero /><HomeSections /></>}
  </main>
  <footer className="site-footer"><span>© {year} Jana Marković / jana.exe</span><a href="#home">back to top ↑</a></footer>
 </>;
}