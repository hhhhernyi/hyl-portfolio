'use client';

import dynamic from 'next/dynamic';
import ScrollReveal from '@/components/animations/ScrollReveal';
import LogoLoop from '@/components/animations/LogoLoop';
import { CONTACT } from '@/data/contact';

/* Three.js — SSR-disabled (WebGL / document APIs are client-only) */
const ResumeViewer = dynamic(
  () => import('@/components/animations/ResumeViewer'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        width: '100%', aspectRatio: '210 / 297', maxWidth: 420, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--clr-muted)', fontFamily: 'var(--font-geist-mono)', fontSize: 12,
      }}>
        loading…
      </div>
    ),
  }
);

const bio = [
  "I'm a Software Engineer based in Singapore, passionate about crafting visually compelling interfaces and turning random ideas into polished products.",
  "Whether it's a slick UI component, a data-driven dashboard, or a web-based game — I care deeply about the experience and the details that make software feel alive.",
  "When I'm not coding, I'm probably thinking about what to build next.",
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '100px 24px 60px',
        background: 'var(--clr-bg)',
        position: 'relative',
      }}
    >
      {/* Subtle divider at top */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 1, height: 80,
        background: 'linear-gradient(to bottom, transparent, var(--clr-accent), transparent)',
        opacity: 0.4,
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Section label */}
        <ScrollReveal>
          <p style={{
            fontFamily: 'var(--font-geist-mono)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--clr-accent)', marginBottom: 12,
          }}>
            // about_me
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
            color: 'var(--clr-text)', letterSpacing: '-0.03em', marginBottom: 56,
          }}>
            Who I am.
          </h2>
        </ScrollReveal>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 64,
          alignItems: 'center',
          marginBottom: 64,
        }}>

          {/* Left: Bio */}
          <ScrollReveal direction="left">
            <div>
              {bio.map((para, i) => (
                <p key={i} style={{
                  fontSize: 16, color: 'var(--clr-mid)', lineHeight: 1.8, marginBottom: 18,
                }}>
                  {para}
                </p>
              ))}

              {/* Quick facts */}
              <div style={{
                marginTop: 32, padding: '20px 24px', borderRadius: 10,
                background: 'var(--clr-card)',
                border: '1px solid var(--clr-border)',
              }}>
                {[
                  { label: 'Location', value: CONTACT.location },
                  { label: 'Focus',    value: 'Frontend · Full Stack' },
                  { label: 'Status',   value: 'Open to opportunities' },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid var(--clr-border)',
                  }}>
                    <span style={{
                      fontSize: 12, fontWeight: 600, color: 'var(--clr-muted)',
                      fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.06em',
                    }}>
                      {label}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--clr-text)' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right: 3D resume */}
          <ScrollReveal direction="right" delay={0.1}>
            <div>
              <p style={{
                fontFamily: 'var(--font-geist-mono)', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'var(--clr-muted)', marginBottom: 16, textAlign: 'center',
              }}>
                // resume
              </p>
              <ResumeViewer />
              <p style={{
                fontFamily: 'var(--font-geist-mono)', fontSize: 11,
                color: 'var(--clr-muted)', textAlign: 'center', marginTop: 10,
              }}>
                drag to flip · page 2 on back
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Full-width Logo Loop strip */}
        <ScrollReveal>
          <LogoLoop />
        </ScrollReveal>
      </div>
    </section>
  );
}
