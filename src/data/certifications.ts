export type Certification = {
  id: string;
  title: string;
  issuer?: string;
  category: 'Networking' | 'Programming' | 'Systems' | 'DevOps';
  completionStatus: 'not-confirmed' | 'in-progress' | 'completed';
  completionYear?: number;
  details?: string;
  credentialUrl?: string;
};

export const completionLabels: Record<Certification['completionStatus'], string> = {
  'not-confirmed': 'Completion not confirmed',
  'in-progress': 'In progress',
  completed: 'Completed',
};

// Titles and completion dates supplied by Jana.
// Add only confirmed issuers and real credential URLs. A URL is not a verification status.
export const certifications: Certification[] = [
  {
    id: 'ccna-1',
    title: 'CCNA 1 — Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    category: 'Networking',
    completionStatus: 'completed',
    completionYear: 2025,
  },
  {
    id: 'ccna-2',
    title: 'CCNA 2 — Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco Networking Academy',
    category: 'Networking',
    completionStatus: 'completed',
    completionYear: 2025,
  },
  {
    id: 'ccna-3',
    title: 'CCNA 3 — Enterprise Networking, Security, and Automation',
    issuer: 'Cisco Networking Academy',
    category: 'Networking',
    completionStatus: 'completed',
    completionYear: 2025,
  },
  {
    id: 'python-essentials',
    title: 'Python Essentials',
    issuer: 'Cisco Networking Academy',
    category: 'Programming',
    completionStatus: 'completed',
    completionYear: 2025,
    details: 'Exact course title and level are awaiting confirmation.',
  },
  {
    id: 'linux-essentials',
    title: 'Linux Essentials',
    issuer: 'Cisco Networking Academy',
    category: 'Systems',
    completionStatus: 'completed',
    completionYear: 2025,
  },
  {
    id: 'red-hat-do188',
    title: 'Red Hat OpenShift Development I: Introduction to Containers with Podman',
    issuer: 'Red Hat',
    category: 'DevOps',
    completionStatus: 'completed',
    completionYear: 2026,
    details: 'Course DO188, Version 4.18.',
  },
];