'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?:   number;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: ScrollRevealProps) {
  const initial =
    direction === 'up'    ? { opacity: 0, y: 28 }   :
    direction === 'left'  ? { opacity: 0, x: -28 }  :
    direction === 'right' ? { opacity: 0, x: 28 }   :
                            { opacity: 0 };

  const animate =
    direction === 'up'    ? { opacity: 1, y: 0 }    :
    direction === 'left'  ? { opacity: 1, x: 0 }    :
    direction === 'right' ? { opacity: 1, x: 0 }    :
                            { opacity: 1 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
