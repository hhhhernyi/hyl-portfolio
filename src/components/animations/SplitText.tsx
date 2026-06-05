'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;       // seconds
  stagger?: number;     // seconds between chars
}

export default function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const chars = container.querySelectorAll<HTMLElement>('.split-char');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          stagger,
          duration: 0.55,
          delay,
          ease: 'power3.out',
        }
      );
    }, container);

    return () => ctx.revert();
  }, [delay, stagger]);

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="split-char inline-block"
          aria-hidden="true"
          style={{ opacity: 0 }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
}
