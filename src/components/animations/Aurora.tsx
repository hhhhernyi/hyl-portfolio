'use client';

import { useEffect, useRef } from 'react';

export default function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const isDark = () => document.documentElement.classList.contains('dark');

    const draw = () => {
      t += 0.004;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const dark = isDark();
      const blobs = [
        {
          x: 0.18 + 0.08 * Math.sin(t * 0.7),
          y: 0.45 + 0.06 * Math.cos(t * 0.5),
          rx: 0.55, ry: 0.7,
          color: dark ? 'rgba(0,212,255,0.14)' : 'rgba(2,132,199,0.1)',
        },
        {
          x: 0.75 + 0.07 * Math.cos(t * 0.6),
          y: 0.35 + 0.08 * Math.sin(t * 0.4),
          rx: 0.45, ry: 0.6,
          color: dark ? 'rgba(0,102,255,0.1)' : 'rgba(0,102,255,0.07)',
        },
        {
          x: 0.5 + 0.1 * Math.sin(t * 0.9),
          y: 0.7 + 0.05 * Math.cos(t * 0.8),
          rx: 0.38, ry: 0.45,
          color: dark ? 'rgba(0,212,255,0.07)' : 'rgba(2,132,199,0.06)',
        },
      ];

      for (const b of blobs) {
        ctx.save();
        ctx.scale(1, b.ry / b.rx);
        const grad = ctx.createRadialGradient(
          b.x * w, (b.y * h) * (b.rx / b.ry), 0,
          b.x * w, (b.y * h) * (b.rx / b.ry), b.rx * w
        );
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h * (b.rx / b.ry));
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
