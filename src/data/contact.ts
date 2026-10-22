export interface ContactLink {
  label: string;
  href: string;
  icon: string;
  status: 'active' | 'coming-soon';
}

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    href: 'mailto:rishisakhija7@gmail.com',
    icon: 'mail',
    status: 'active',
  },
  {
    label: 'GitHub',
    href: '#',
    icon: 'github',
    status: 'coming-soon',
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: 'linkedin',
    status: 'coming-soon',
  },
];

// Resume download - commented slot for future use
// export const resumeDownload = {
//   label: 'Download Resume',
//   href: '/resume.pdf',
// };