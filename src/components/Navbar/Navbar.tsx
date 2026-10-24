
import './Navbar.css';

const links = [
  { label: 'home', href: '#home' },
  { label: 'about', href: '#about' },
  { label: 'projects', href: '#projects' },
  { label: 'skills', href: '#skills' },
  { label: 'contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <header className="site-navbar">
      <a href="#home" className="site-logo">
        ✦ jana.exe<span className="logo-cursor">_</span>
      </a>

      <nav aria-label="Main navigation" className="site-nav-links">
        {links.map((link, index) => (
          <a key={link.href} href={link.href}>
            <span>[0{index + 1}]</span> {link.label}
          </a>
        ))}
      </nav>

      <div className="site-system-status">
        <span>user: jana</span>
        <span>status: online <b>■</b></span>
      </div>
    </header>
  );
}
