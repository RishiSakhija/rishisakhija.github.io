export interface ContactLink {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
  status?: 'active' | 'coming-soon';
}

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    href: 'mailto:rishisakhija7@gmail.com',
    icon: 'mail',
    external: false,
    status: 'active',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/RishiSakhija',
    icon: 'github',
    external: true,
    status: 'active',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rishisakhija',
    icon: 'linkedin',
    external: true,
    status: 'active',
  },
];

// Resume download - commented slot for future use
// export const resumeDownload = {
//   label: 'Download Resume',
//   href: '/resume.pdf',
// };