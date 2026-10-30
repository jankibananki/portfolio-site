import type { CSSProperties } from 'react';
import { portrait } from './portrait';
import './Hero.css';


export default function Hero() {
 return <section className="hero-section" id="home" aria-labelledby="intro-title">
  <div className="hero-ascii">
   <span className="hero-ascii-label" aria-hidden="true">&gt; identity / rendered in characters</span>
   <div className="hero-portrait-area" role="img" aria-label="ASCII portrait of Jana">
    <pre className="hero-portrait" aria-hidden="true" style={{ '--portrait-columns': portrait.columns, '--portrait-rows': portrait.rows } as CSSProperties}>{portrait.text}</pre>
   </div>
   <div className="hero-ascii-footer"><span>LESKOVAC, SRB</span><span>✦</span><span>CS STUDENT</span></div>
  </div>
  <div className="hero-information">
   <span className="eyebrow">// welcome.exe</span>
   <h1 id="intro-title">Hi, I'm<br /><strong>Jana.</strong><span className="cursor" aria-hidden="true">_</span></h1>
   <p className="hero-description">Computer Science student exploring the space between logic and imagination. I build software, experiment with AI &amp; machine learning, and bring little worlds to life through games.</p>
   <p className="hero-interests">software development / AI &amp; ML<br />cybersecurity / game development<br />art &amp; creative technology</p>
   <div className="hero-buttons">
    <a href="#projects" className="hero-button hero-button-primary">[ view projects ]</a>
    <a href="#about" className="hero-button">[ about me ]</a>
   </div>
  </div>
 </section>;
}