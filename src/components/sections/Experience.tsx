'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TechBadge from '@/components/shared/TechBadge';
import { experiences } from '@/data/experience';

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: '100px 24px',
        background: 'color-mix(in srgb, var(--clr-bg) 95%, var(--clr-accent) 5%)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Section header */}
        <ScrollReveal>
          <p style={{
            fontFamily: 'var(--font-geist-mono)', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--clr-accent)', marginBottom: 12,
          }}>
            // work_experience
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
            color: 'var(--clr-text)', letterSpacing: '-0.03em', marginBottom: 60,
          }}>
            Where I&apos;ve worked.
          </h2>
        </ScrollReveal>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 32 }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 7, top: 0, bottom: 0, width: 2,
            background: 'linear-gradient(to bottom, var(--clr-accent), transparent)',
            opacity: 0.3,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{ position: 'relative' }}
              >
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute', left: -25, top: 6,
                  width: 12, height: 12, borderRadius: '50%',
                  background: 'var(--clr-accent)',
                  border: '2px solid var(--clr-bg)',
                  boxShadow: '0 0 8px color-mix(in srgb, var(--clr-accent) 60%, transparent)',
                }} />

                {/* Card */}
                <div
                  className="glass"
                  style={{ padding: '24px 28px' }}
                >
                  {/* Period */}
                  <p style={{
                    fontFamily: 'var(--font-geist-mono)', fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--clr-accent)', marginBottom: 10,
                  }}>
                    {exp.period}
                  </p>

                  {/* Role + Company */}
                  <h3 style={{
                    fontSize: 18, fontWeight: 700, color: 'var(--clr-text)',
                    letterSpacing: '-0.01em', marginBottom: 4,
                  }}>
                    {exp.role}
                  </h3>
                  <p style={{
                    fontSize: 14, fontWeight: 600, color: 'var(--clr-mid)',
                    marginBottom: 16,
                  }}>
                    {exp.company}
                  </p>

                  {/* Description */}
                  <ul style={{
                    paddingLeft: 0, listStyle: 'none', margin: 0,
                    display: 'flex', flexDirection: 'column', gap: 8,
                    marginBottom: 18,
                  }}>
                    {exp.description.map((point, pi) => (
                      <li key={pi} style={{
                        display: 'flex', gap: 10, fontSize: 13,
                        color: 'var(--clr-mid)', lineHeight: 1.65,
                      }}>
                        <span style={{ color: 'var(--clr-accent)', flexShrink: 0, marginTop: 1 }}>▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {exp.tags.map((tag) => (
                      <TechBadge key={tag} label={tag} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
