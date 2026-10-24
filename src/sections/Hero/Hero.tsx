
import './Hero.css';

import './Hero.css';
import portraitAscii from '../../assets/ascii/portrait.txt?raw';

// Uklanjamo eventualne Markdown oznake
const lines = portraitAscii
  .replace(/\r/g, '')
  .split('\n')
  .filter(line => !line.trim().startsWith('```'));

// Pronalazimo redove koji sadrze ASCII karaktere
const nonEmptyLines = lines.filter(line => line.trim().length > 0);

// Najmanje uvucen red odredjuje levu granicu crteza
const minIndent = nonEmptyLines.length
  ? Math.min(
      ...nonEmptyLines.map(line => line.length - line.trimStart().length)
    )
  : 0;

// Uklanjamo suvisne razmake bez kvarenja crteza

const cleanAscii = lines
  .map(line => line.slice(minIndent).trimEnd())
  .join('\n')
  .replace(/^\n+|\n+$/g, '');

const asciiRows = cleanAscii.split('\n');
const maxWidth = Math.max(...asciiRows.map(row => row.length));

console.log('ASCII dimensions:', maxWidth, 'columns');


export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-ascii">
        <span className="hero-ascii-label">
          &gt; initializing identity...
        </span>

        <div className="hero-portrait-area">
          <pre className="hero-portrait" aria-hidden="true">
            {cleanAscii}
          </pre>
        </div>

        <div className="hero-ascii-footer">
          <span>LESKOVAC, SRB</span>
          <span>CS STUDENT</span>
        </div>
      </div>

      <div className="hero-information">
        <span className="hero-file">
          // welcome.exe
        </span>

        <h1>
          Hi, I'm
          <br />
          <strong>Jana.</strong>
          <span className="hero-cursor">_</span>
        </h1>

        <p className="hero-description">
          Computer Science student, developer and a person
          who loves turning ideas into things — from AI models
          and games to tools that make life a little brighter.
        </p>

        <div className="hero-interests">
          <span>→ game development</span>
          <span>→ artificial intelligence</span>
          <span>→ cybersecurity</span>
          <span>→ software development</span>
          <span>→ and more...</span>
        </div>

        <div className="hero-buttons">
          <a href="#projects" className="hero-button hero-button-primary">
            [ view projects ]
          </a>

          <a href="#about" className="hero-button">
            [ about me ]
          </a>
        </div>
      </div>
    </section>
  );
}
