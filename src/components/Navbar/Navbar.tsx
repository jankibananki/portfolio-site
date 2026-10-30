import './Navbar.css';
const links = ['home', 'projects', 'about', 'skills', 'certifications', 'contact'];
export default function Navbar() {
 return <header className="site-navbar">
  <a href="#home" className="site-logo" aria-label="Jana.exe home">✦ jana.exe<span className="cursor" aria-hidden="true">_</span></a>
  <nav aria-label="Main navigation" className="site-nav-links">
   {links.map((label, index) => <a key={label} href={`#${label}`}><span aria-hidden="true">[0{index + 1}]</span> {label}</a>)}
  </nav>
 </header>;
}