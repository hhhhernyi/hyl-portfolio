'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import PlatformBadge from './PlatformBadge';
import TechBadge from './TechBadge';
import { type Project } from '@/data/projects';

const categoryLabel: Record<Project['category'], string> = {
  app:    'App',
  game:   'Game',
  client: 'Client Website',
};

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="glass"
        style={{
          padding: '20px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          transition: 'box-shadow 0.3s',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = 'var(--clr-glow)')}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
      >
        {/* Top glow line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, var(--clr-accent), var(--clr-secondary))',
          opacity: 0.6,
        }} />

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
          <PlatformBadge platform={project.platform} />
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', fontFamily: 'var(--font-geist-mono)',
            color: 'var(--clr-muted)',
          }}>
            {categoryLabel[project.category]}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 17, fontWeight: 700, color: 'var(--clr-text)',
          letterSpacing: '-0.01em', margin: 0, lineHeight: 1.2,
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 13, color: 'var(--clr-mid)', lineHeight: 1.65, flex: 1, margin: 0,
        }}>
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map((tag) => (
            <TechBadge key={tag} label={tag} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ borderTop: '1px solid var(--clr-border)', paddingTop: 12 }}>
          {project.comingSoon ? (
            <span style={{
              fontSize: 12, fontWeight: 600, color: 'var(--clr-muted)',
              fontFamily: 'var(--font-geist-mono)',
              background: 'rgba(255,255,255,0.05)',
              padding: '4px 10px', borderRadius: 4,
              border: '1px solid var(--clr-border)',
            }}>
              🚧 Coming Soon
            </span>
          ) : (
            <a
              href={project.url!}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 12, fontWeight: 700, color: 'var(--clr-accent)',
                textDecoration: 'none', letterSpacing: '0.02em',
                fontFamily: 'var(--font-geist-mono)',
                transition: 'gap 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = '10px')}
              onMouseLeave={(e) => (e.currentTarget.style.gap = '6px')}
            >
              View Project <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
