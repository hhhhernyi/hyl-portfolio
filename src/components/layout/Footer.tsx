'use client';

import { GitHubIcon, LinkedInIcon } from '@/components/shared/SocialIcons';
import { CONTACT } from '@/data/contact';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--clr-border)',
        padding: '24px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: 'var(--clr-muted)',
            fontFamily: 'var(--font-geist-mono)',
            margin: 0,
          }}
        >
          © {year}{' '}
          <span style={{ color: 'var(--clr-accent)' }}>{CONTACT.name}</span>
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: 'var(--clr-muted)', transition: 'color 0.2s', display: 'flex' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--clr-accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--clr-muted)')}
          >
            <GitHubIcon size={17} />
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: 'var(--clr-muted)', transition: 'color 0.2s', display: 'flex' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--clr-accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--clr-muted)')}
          >
            <LinkedInIcon size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
