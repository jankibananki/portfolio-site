export type Screenshot = { src: string; alt: string; caption?: string };
export type GameBuild = { url: string; controls: string[] };
export type Project = {
 slug: string; title: string; category: string; description: string; overview: string;
 technologies: string[]; features: string[]; screenshots: Screenshot[];
 github?: string; demo?: string; game?: GameBuild;
};
// Add only real screenshots and confirmed repository/demo URLs.
export const projects: Project[] = [
 {
  slug: 'gravebloom', title: 'Gravebloom', category: '01 / GAME DEVELOPMENT',
  description: 'A witch, a strange forest, and a little magic. A 2D top-down fantasy adventure.',
  overview: 'Gravebloom is a 2D top-down fantasy adventure developed in Unity with C#. Follow a witch protagonist through different forest environments, fight enemies with magical combat, and face a boss encounter.',
  technologies: ['Unity', 'C#', '2D Game Development'],
  features: ['Witch protagonist and top-down exploration', 'Magical combat and enemy encounters', 'Different forest environments', 'Boss encounter'],
  screenshots: [{ src: '/projects/gravebloom-logo.png', alt: 'Gravebloom logo with a witch hat, flowers, and a skull' }],
  github: 'https://github.com/jankibananki/hci-gravebloom-top-down-2D-pixel-art-game',
  game: { url: '/games/gravebloom/index.html', controls: [] },
 },
 {
  slug: 'chloromnesis', title: 'Chloromnesis', category: '02 / MACHINE LEARNING',
  description: 'Recognizing disease in tomato leaves through computer vision and machine learning.',
  overview: 'Chloromnesis explores how computer vision can recognize diseases in tomato leaves. The project uses Python, PyTorch, and Torchvision with a MobileNetV3 model.',
  technologies: ['Python', 'PyTorch', 'Torchvision', 'MobileNetV3'],
  features: ['Tomato leaf disease recognition', 'Computer vision with MobileNetV3', 'PyTorch and Torchvision implementation'],
  screenshots: [],
 },
 {
  slug: 'candidate-selection', title: 'Candidate Selection System', category: '03 / SOFTWARE DEVELOPMENT',
  description: 'A desktop application for organizing recruitment and candidate selection.',
  overview: 'A desktop recruitment management application built with C# and Windows Forms. NHibernate connects the application to an Oracle database.',
  technologies: ['C#', 'Windows Forms', 'NHibernate', 'Oracle Database'],
  features: ['Desktop recruitment management', 'Windows Forms interface', 'Persistence using NHibernate and Oracle Database'],
  screenshots: [],
 },
];
export const skillGroups = [
 { title: 'Languages', items: ['C#', 'Python', 'JavaScript', 'TypeScript', 'SQL'] },
 { title: 'Frameworks & tools', items: ['.NET', 'React', 'Unity', 'PyTorch', 'Torchvision', 'NHibernate'] },
 { title: 'Systems & platforms', items: ['Oracle Database', 'Windows Forms', 'Vite'] },
 { title: 'Areas of interest', items: ['AI / ML', 'Cybersecurity', 'Game development', 'Software engineering', 'Creative coding'] },
];
// Empty values render as plain text, not dead links.
export const contacts: { label: string; href?: string }[] = [
 { label: 'GitHub', href: 'https://github.com/jankibananki' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jana-markovi%C4%87-870232263/' }, { label: 'markovicjana@elfak.rs', href: 'mailto:markovicjana@elfak.rs' },
];