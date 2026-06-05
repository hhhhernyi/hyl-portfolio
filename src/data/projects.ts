export type ProjectCategory = 'app' | 'game' | 'client';
export type ProjectPlatform = 'web' | 'mobile' | 'both';

export interface Project {
  id:          string;
  title:       string;
  category:    ProjectCategory;
  platform:    ProjectPlatform;
  description: string;
  url:         string | null;
  tags:        string[];
  comingSoon?: boolean;
}

export const projects: Project[] = [
  // ── Apps ──────────────────────────────────────────────────────
  {
    id:          'family-height',
    title:       'Family Height Dashboard',
    category:    'app',
    platform:    'web',
    description: 'An interactive dashboard for tracking and visualising the heights of family members over time.',
    url:         'https://fam-height.netlify.app/',
    tags:        ['React', 'Data Viz', 'Dashboard'],
  },
  {
    id:          'cut-style-perm',
    title:       'Cut Style Perm',
    category:    'app',
    platform:    'web',
    description: 'A full-stack barber booking application built as a capstone project. Clients can browse services, pick a slot, and confirm appointments.',
    url:         'https://cut-style-perm.netlify.app/',
    tags:        ['Full Stack', 'Booking', 'Express', 'React'],
  },
  {
    id:          'eatadakimasu',
    title:       'Eatadakimasu',
    category:    'app',
    platform:    'mobile',
    description: 'A mobile app — currently in development. Stay tuned.',
    url:         null,
    tags:        ['Mobile', 'React Native'],          // TODO: update tags when ready
    comingSoon:  true,
  },
  // ── Games ─────────────────────────────────────────────────────
  {
    id:          'club-link',
    title:       'Club Link',
    category:    'game',
    platform:    'web',
    description: 'A daily soccer guessing game where players connect footballers through shared club histories. Think Wordle, but for football fans.',
    url:         'https://club-link-v3.netlify.app/',
    tags:        ['React', 'Firebase', 'Supabase', 'Game'],
  },
  // ── Client Websites ───────────────────────────────────────────
  {
    id:          'taima',
    title:       'Tai Ma Website',
    category:    'client',
    platform:    'web',
    description: 'A modern, static marketing site for Tai Ma Sewing Machine Pte Ltd — a 45+ year Singapore machinery company. Built with Next.js and a navy/gold brand palette.',
    url:         'https://taima.com.sg',
    tags:        ['Next.js', 'TypeScript', 'Tailwind', 'Static'],
  },
  {
    id:          'smtas',
    title:       'SMTAS Website',
    category:    'client',
    platform:    'web',
    description: 'A complete Next.js rebuild of the Singapore Sewing Machine Trade Association website, featuring member directories, news, and committee listings.',
    url:         'https://smtas.org.sg',
    tags:        ['Next.js', 'TypeScript', 'Non-profit'],
  },
];
