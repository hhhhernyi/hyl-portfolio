'use client';

import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SiWhatsapp } from 'react-icons/si';
import { GitHubIcon, LinkedInIcon } from '@/components/shared/SocialIcons';
import Aurora from '@/components/animations/Aurora';
import FloatingLines from '@/components/animations/FloatingLines';
import SplitText from '@/components/animations/SplitText';
import { CONTACT } from '@/data/contact';

const subtitles = [
  'Software Engineer',
  'UI Enthusiast',
  'Builder of Random Ideas',
];

export default function Hero() {
  const [subIdx, setSubIdx]   = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme }     = useTheme();

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setSubIdx((i) => (i + 1) % subtitles.length);
        setVisible(true);
      }, 400);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const isDark = resolvedTheme === 'dark';

  return (
    <section
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--clr-bg)',
      }}
    >
      {/* ── Backgrounds (theme-aware) ── */}
      {mounted && isDark && (
        <FloatingLines
          enabledWaves={['middle', 'bottom', 'top']}
          lineCount={6}
          lineDistance={8}
          bendRadius={19.5}
          bendStrength={4.5}
          interactive
          parallax
          animationSpeed={1}
          gradientStart="#3336b6"
          gradientMid="#7b79d2"
          gradientEnd="#6a6a6a"
        />
      )}
      {(!mounted || !isDark) && <Aurora />}

      {/* Grid overlay (light mode only) */}
      {mounted && !isDark && (
        <div
          className="grid-overlay"
          style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
        />
      )}

      {/* Content — two-column on wide screens, centred on mobile */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1280, margin: '0 auto', padding: '100px 24px 80px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 64,
        }}
      >
        {/* ── Left: text content ── */}
        <div
          className="hero-text-col"
          style={{
            flex: '1 1 0', minWidth: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          }}
        >
          {/* Terminal label */}
          <div
            className="hero-badge"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              marginBottom: 28,
              background: 'var(--clr-accent-subtle)',
              border: '1px solid color-mix(in srgb, var(--clr-accent) 25%, transparent)',
              borderRadius: 99, padding: '5px 14px',
            }}
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: 'var(--clr-accent)',
              boxShadow: '0 0 6px var(--clr-accent)', flexShrink: 0,
              animation: 'pulseGlow 2s ease-in-out infinite',
            }} />
            <span style={{
              fontFamily: 'var(--font-geist-mono)', fontSize: 11, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--clr-accent)',
            }}>
              Est. 2024 · Singapore
            </span>
          </div>

          {/* Main heading */}
          <h1 style={{
            fontSize: 'clamp(48px, 9vw, 100px)',
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: '-0.035em',
            marginBottom: 28,
            color: 'var(--clr-text)',
          }}>
            <SplitText text="Hern Yi" className="block" delay={0.1} />
            <SplitText text="Lee." className="block neon-text" delay={0.4} />
          </h1>

          {/* Rotating subtitle */}
          <div style={{ height: 32, marginBottom: 36, overflow: 'hidden', width: '100%' }}>
            <p
              style={{
                fontSize: 'clamp(15px, 2.5vw, 22px)',
                fontFamily: 'var(--font-geist-mono)',
                fontWeight: 500,
                color: 'var(--clr-mid)',
                margin: 0,
                animation: visible ? 'fadeSlide 3.2s ease forwards' : 'none',
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.3s',
              }}
            >
              <span style={{ color: 'var(--clr-accent)' }}>// </span>
              {subtitles[subIdx]}
            </p>
          </div>

          {/* CTA buttons */}
          <div
            className="hero-ctas"
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}
          >
            <a
              href="#projects"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', borderRadius: 8, fontSize: 14, fontWeight: 700,
                background: 'var(--clr-accent)', color: '#050a14',
                textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              View My Work <ArrowDown size={15} />
            </a>
            <a
              href={CONTACT.resume}
              download
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '13px 28px', borderRadius: 8, fontSize: 14, fontWeight: 600,
                border: '1.5px solid var(--clr-border)',
                color: 'var(--clr-text)', textDecoration: 'none',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--clr-accent)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--clr-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Download Resume
            </a>
          </div>

          {/* Social icon links — GitHub · LinkedIn · WhatsApp */}
          <div
            className="hero-socials"
            style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
          >
            {[
              { href: CONTACT.github,   label: 'GitHub',   Icon: ({ size }: { size: number }) => <GitHubIcon size={size} />   },
              { href: CONTACT.linkedin, label: 'LinkedIn', Icon: ({ size }: { size: number }) => <LinkedInIcon size={size} /> },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 13, color: 'var(--clr-muted)', textDecoration: 'none',
                  fontFamily: 'var(--font-geist-mono)', transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--clr-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--clr-muted)')}
              >
                <Icon size={16} /> {label}
              </a>
            ))}

            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 13, color: 'var(--clr-muted)', textDecoration: 'none',
                fontFamily: 'var(--font-geist-mono)', transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#25d366')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--clr-muted)')}
            >
              <SiWhatsapp size={16} color="inherit" /> WhatsApp
            </a>
          </div>
        </div>

      </div>

      <style>{`
        /* Mobile: centre all text */
        @media (max-width: 899px) {
          .hero-text-col {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-text-col .hero-ctas    { justify-content: center !important; }
          .hero-text-col .hero-socials { justify-content: center !important; }
          .hero-text-col .hero-badge   { align-self: center !important; }
        }
      `}</style>
    </section>
  );
}
