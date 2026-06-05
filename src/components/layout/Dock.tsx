'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, FolderOpen, Mail, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface DockItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

const MAGNIFICATION = 1.7;
const BASE_SIZE = 44;          // icon button px
const INFLUENCE_RANGE = 100;   // px from center of item

function DockIcon({
  item,
  mouseX,
}: {
  item: DockItem;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState(false);

  // Distance from this icon's centre to the cursor
  const distance = useMotionValue(Infinity);

  const scale = useSpring(
    useTransform(distance, [-INFLUENCE_RANGE, 0, INFLUENCE_RANGE], [1, MAGNIFICATION, 1]),
    { stiffness: 300, damping: 22 }
  );

  const handleMouseMove = () => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    distance.set(mouseX.get() - center);
  };

  const Tag = item.href ? 'a' : 'button';
  const extraProps = item.href
    ? { href: item.href }
    : { type: 'button' as const, onClick: item.onClick };

  return (
    <div
      ref={ref}
      style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => { setTooltip(false); distance.set(Infinity); }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.12 }}
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: 8,
              padding: '4px 10px',
              borderRadius: 8,
              background: 'var(--clr-bg)',
              border: '1px solid var(--clr-border)',
              backdropFilter: 'blur(12px)',
              fontSize: 11,
              fontWeight: 700,
              fontFamily: 'var(--font-geist-mono)',
              color: 'var(--clr-text)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            {item.label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon button */}
      <motion.div style={{ scale }}>
        <Tag
          {...(extraProps as any)}
          aria-label={item.label}
          style={{
            width: BASE_SIZE,
            height: BASE_SIZE,
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--clr-muted)',
            textDecoration: 'none',
            transition: 'color 0.2s, background 0.2s',
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--clr-accent)';
            (e.currentTarget as HTMLElement).style.background = 'var(--clr-accent-subtle)';
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
            (e.currentTarget as HTMLElement).style.color = 'var(--clr-muted)';
            (e.currentTarget as HTMLElement).style.background = 'transparent';
          }}
        >
          {item.icon}
        </Tag>
      </motion.div>
    </div>
  );
}

export default function Dock() {
  const { theme, setTheme } = useTheme();
  const mouseX = useMotionValue(Infinity);

  const items: DockItem[] = [
    { icon: <Home size={20} />,       label: 'Home',        href: '#' },
    { icon: <User size={20} />,       label: 'About',       href: '#about' },
    { icon: <Briefcase size={20} />,  label: 'Experience',  href: '#experience' },
    { icon: <FolderOpen size={20} />, label: 'Projects',    href: '#projects' },
    { icon: <Mail size={20} />,       label: 'Contact',     href: '#contact' },
  ];

  const themeItem: DockItem = {
    icon: theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />,
    label: theme === 'dark' ? 'Light mode' : 'Dark mode',
    onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  };

  return (
    <>
      {/* Desktop only */}
      <style>{`
        @media (max-width: 767px) { .portfolio-dock { display: none !important; } }
      `}</style>

      <div
        className="portfolio-dock"
        style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 60,
        }}
      >
        <motion.div
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '8px 12px',
            borderRadius: 20,
            background: 'color-mix(in srgb, var(--clr-bg) 80%, transparent)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--clr-border)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
          }}
        >
          {items.map((item) => (
            <DockIcon key={item.label} item={item} mouseX={mouseX} />
          ))}

          {/* Divider */}
          <div style={{
            width: 1, height: 28,
            background: 'var(--clr-border)',
            margin: '0 4px',
          }} />

          <DockIcon item={themeItem} mouseX={mouseX} />
        </motion.div>
      </div>
    </>
  );
}
