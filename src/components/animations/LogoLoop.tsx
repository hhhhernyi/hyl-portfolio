'use client';

import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiVuedotjs,
  SiTailwindcss, SiFramer, SiNodedotjs, SiPython, SiMongodb,
  SiFirebase, SiSupabase, SiGit, SiExpress,
} from 'react-icons/si';
import { TbBrandGoogleBigQuery } from 'react-icons/tb';
import { FaJava } from 'react-icons/fa';
import type { IconType } from 'react-icons';

interface Tech {
  Icon: IconType;
  label: string;
  color: string;
}

const row1: Tech[] = [
  { Icon: SiJavascript,  label: 'JavaScript',    color: '#F7DF1E' },
  { Icon: SiTypescript,  label: 'TypeScript',    color: '#3178C6' },
  { Icon: SiReact,       label: 'React',         color: '#61DAFB' },
  { Icon: SiNextdotjs,   label: 'Next.js',       color: 'currentColor' },
  { Icon: SiVuedotjs,    label: 'Vue.js',        color: '#4FC08D' },
  { Icon: SiTailwindcss, label: 'Tailwind CSS',  color: '#06B6D4' },
  { Icon: SiFramer,      label: 'Framer Motion', color: '#0055FF' },
  { Icon: SiNodedotjs,   label: 'Node.js',       color: '#339933' },
];

const row2: Tech[] = [
  { Icon: SiPython,               label: 'Python',     color: '#3776AB' },
  { Icon: SiMongodb,              label: 'MongoDB',    color: '#47A248' },
  { Icon: SiFirebase,             label: 'Firebase',   color: '#FFCA28' },
  { Icon: SiSupabase,             label: 'Supabase',   color: '#3ECF8E' },
  { Icon: TbBrandGoogleBigQuery,  label: 'BigQuery',   color: '#4285F4' },
  { Icon: SiGit,                  label: 'Git',        color: '#F05032' },
  { Icon: FaJava,                 label: 'Java',       color: '#ED8B00' },
  { Icon: SiExpress,              label: 'Express.js', color: 'currentColor' },
];

function TechPill({ Icon, label, color }: Tech) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        borderRadius: 99,
        border: '1px solid var(--clr-border)',
        background: 'var(--clr-card)',
        backdropFilter: 'blur(8px)',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      <Icon size={18} color={color} style={{ flexShrink: 0 }} />
      <span
        style={{
          fontFamily: 'var(--font-geist-mono)',
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--clr-mid)',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ScrollRow({ items, direction }: { items: Tech[]; direction: 'left' | 'right' }) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  const animName = direction === 'left' ? 'logoScrollLeft' : 'logoScrollRight';
  const duration = direction === 'left' ? '30s' : '35s';

  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          gap: 12,
          width: 'max-content',
          animation: `${animName} ${duration} linear infinite`,
        }}
      >
        {doubled.map((tech, i) => (
          <TechPill key={`${tech.label}-${i}`} {...tech} />
        ))}
      </div>
    </div>
  );
}

export default function LogoLoop() {
  return (
    <div
      data-logo-loop
      style={{
        padding: '28px 0',
        borderTop: '1px solid var(--clr-border)',
        borderBottom: '1px solid var(--clr-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        // Fade edges
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        overflow: 'hidden',
      }}
    >
      <ScrollRow items={row1} direction="left" />
      <ScrollRow items={row2} direction="right" />
    </div>
  );
}
