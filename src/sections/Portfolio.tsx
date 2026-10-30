import Certifications from './Certifications';
import { contacts, projects, skillGroups } from '../data/portfolio';
import type { Project } from '../data/portfolio';
import GamePlayer from '../components/GamePlayer/GamePlayer';

function Tags({ items }: { items: string[] }) {
 return <ul className="tags" aria-label="Technologies">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}
function Screenshots({ project }: { project: Project }) {
 return project.screenshots.length ? <div className="screenshots">{project.screenshots.map(shot => <figure key={shot.src}><img src={shot.src} alt={shot.alt} loading="lazy" />{shot.caption && <figcaption>{shot.caption}</figcaption>}</figure>)}</div> :
  <div className="screenshot-placeholder"><span aria-hidden="true">[ image pending ]</span><p>Real project screenshots will be added here.</p></div>;
}
export function HomeSections() {
 return <>
  <section id="projects" className="content-section" aria-labelledby="projects-heading">
   <div className="section-heading"><h2 id="projects-heading">// featured_projects</h2><span>selected work / 01—03</span></div>
   <p className="section-intro">Different ideas. Different tools. The same curiosity.</p>
   <div className="project-grid">{projects.map(project => <article className="project-card" key={project.slug}>
    <a className="project-preview" href={`#/projects/${project.slug}`} aria-label={`Explore ${project.title}`}>
     {project.screenshots[0] ? <img src={project.screenshots[0].src} alt={project.screenshots[0].alt} loading="lazy" /> : <><span aria-hidden="true">[ screenshot pending ]</span><small>reserved for actual project imagery</small></>}
    </a>
    <div className="project-copy"><span className="eyebrow">{project.category}</span><h3><a href={`#/projects/${project.slug}`}>{project.title}</a></h3><p>{project.description}</p><Tags items={project.technologies} /><a className="project-link" href={`#/projects/${project.slug}`}>explore project <span aria-hidden="true">↗</span><span className="sr-only">: {project.title}</span></a></div>
   </article>)}</div>
  </section>
  <section id="about" className="content-section about-section" aria-labelledby="about-heading">
   <div><span className="eyebrow">a person behind the terminal</span><h2 id="about-heading">// about_me.txt</h2><p className="about-name">Jana Marković<span aria-hidden="true"> ✦</span></p><span className="eyebrow">Niš, Serbia / Computer Science</span></div>
   <div className="about-copy"><p>Hi, I'm Jana, a Computer Science student at the Faculty of Electronic Engineering, University of Niš, Serbia.</p><p>I'm curious about how things work—and what happens when you build something a little unusual. My interests move between AI and machine learning, cybersecurity, software development, game development, art, and creative coding.</p><p>I'm ambitious, creative, and always excited to learn something new. Away from the keyboard, I have five dogs. So there's usually a little chaos behind the code.</p><p className="personal-note">+ curiosity<br />+ imagination<br />+ five very good dogs</p></div>
  </section>
  <section id="skills" className="content-section" aria-labelledby="skills-heading">
   <div className="section-heading"><h2 id="skills-heading">// skills.exe</h2><span>tools &amp; things I'm exploring</span></div>
   <div className="skills-grid">{skillGroups.map(group => <div className="skill-group" key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
  </section>
  <Certifications />
  <section id="contact" className="content-section contact-section" aria-labelledby="contact-heading">
   <span className="eyebrow">&gt; open a new conversation</span>
   <h2 id="contact-heading">// establish_connection<span className="cursor" aria-hidden="true">_</span></h2>
   <p>Have an interesting idea, a project, or something wonderfully unusual in mind?</p>
   <ul className="contact-links">{contacts.map(contact => <li key={contact.label}>{contact.href ? <a href={contact.href}>{contact.label} ↗</a> : <span>{contact.label}<small>link coming soon</small></span>}</li>)}</ul>
  </section>
 </>;
}
export function ProjectDetail({ project }: { project: Project }) {
 return <article className="project-detail content-section">
  <a className="back-link" href="#projects">← back to project gallery</a>
  <header className="detail-header"><span className="eyebrow">{project.category}</span><h1 tabIndex={-1} id="project-title">{project.title}<span className="cursor" aria-hidden="true">_</span></h1><p>{project.overview}</p><Tags items={project.technologies} /></header>
  <section className="detail-features" aria-labelledby="features-heading"><h2 id="features-heading">// features</h2><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section>
  {project.slug === 'gravebloom' && <GamePlayer title={project.title} build={project.game} />}
  {project.slug !== 'gravebloom' && <section className="detail-screenshots" aria-labelledby="screenshots-heading"><h2 id="screenshots-heading">// screenshots</h2><Screenshots project={project} /></section>}
  {(project.github || project.demo) && <div className="hero-buttons">{project.github && <a className="hero-button" href={project.github}>[ GitHub ↗ ]</a>}{project.demo && <a className="hero-button" href={project.demo}>[ live demo ↗ ]</a>}</div>}
  <a className="back-link" href="#projects">← back to project gallery</a>
 </article>;
}