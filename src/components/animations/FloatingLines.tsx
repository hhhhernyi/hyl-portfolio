'use client';

import { useEffect, useRef } from 'react';

type WaveKey = 'top' | 'middle' | 'bottom';

export interface FloatingLinesProps {
  /** Which wave bands to render */
  enabledWaves?:   WaveKey[];
  /** Lines per band — number (uniform) or array (per-band) */
  lineCount?:      number | number[];
  /** Vertical spacing in px between lines in a band */
  lineDistance?:   number | number[];
  /** Controls wave period: ~canvas-width / (bendRadius / 100) */
  bendRadius?:     number;
  /** Wave amplitude as % of canvas height */
  bendStrength?:   number;
  /** Mouse X shifts wave phase */
  interactive?:    boolean;
  /** Each band scrolls at a different speed */
  parallax?:       boolean;
  /** Phase increment multiplier per frame */
  animationSpeed?: number;
  gradientStart?:  string;
  gradientMid?:    string;
  gradientEnd?:    string;
}

/* ─── Constants ───────────────────────────────────────────────────── */
const WAVE_Y:    Record<WaveKey, number> = { top: 0.22, middle: 0.50, bottom: 0.78 };
const PAR_MULT:  Record<WaveKey, number> = { top: 0.65, middle: 1.00, bottom: 1.35 };
const PH_SEED:   Record<WaveKey, number> = { top: 0.00, middle: 1.20, bottom: 2.40 };

/* ─── Component ───────────────────────────────────────────────────── */
export default function FloatingLines({
  enabledWaves   = ['top', 'middle', 'bottom'],
  lineCount      = 6,
  lineDistance   = 8,
  bendRadius     = 19.5,
  bendStrength   = 4.5,
  interactive    = false,
  parallax       = false,
  animationSpeed = 1,
  gradientStart  = '#3336b6',
  gradientMid    = '#7b79d2',
  gradientEnd    = '#6a6a6a',
}: FloatingLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  /* Always-current props — avoids re-running the effect on every render */
  const cfg = useRef({
    enabledWaves, lineCount, lineDistance, bendRadius, bendStrength,
    interactive, parallax, animationSpeed, gradientStart, gradientMid, gradientEnd,
  });
  cfg.current = {
    enabledWaves, lineCount, lineDistance, bendRadius, bendStrength,
    interactive, parallax, animationSpeed, gradientStart, gradientMid, gradientEnd,
  };

  /* Phase per wave key — survives renders, keeps accumulating */
  const phases = useRef<Record<WaveKey, number>>({ ...PH_SEED });
  /* Mouse X in 0–1 range */
  const mouseNorm = useRef(0.5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* Resize handler */
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* Mouse tracking */
    const onMove = (e: MouseEvent) => {
      if (!cfg.current.interactive) return;
      const r = canvas.getBoundingClientRect();
      mouseNorm.current = (e.clientX - r.left) / Math.max(r.width, 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    /* Draw loop */
    const draw = () => {
      const {
        enabledWaves: waves,
        lineCount:    lc,
        lineDistance: ld,
        bendRadius:   br,
        bendStrength: bs,
        parallax:     px,
        animationSpeed: spd,
        gradientStart: gS, gradientMid: gM, gradientEnd: gE,
        interactive: inter,
      } = cfg.current;

      const w = canvas.width;
      const h = canvas.height;

      if (!w || !h) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const phInc     = spd * 0.008;
      const mouseOff  = inter ? (mouseNorm.current - 0.5) * 0.9 : 0;
      const segW      = br * w / 100;            // half-wave period px
      const amp       = bs * h / 100;            // amplitude px
      const numSegs   = Math.ceil(w / segW) + 4; // enough segments to fill canvas

      /* Per-frame gradient (cheap, only 3 stops) */
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0,   gS);
      grad.addColorStop(0.5, gM);
      grad.addColorStop(1,   gE);

      waves.forEach((wk, wi) => {
        const count = Array.isArray(lc) ? (lc[wi] ?? lc[0] ?? 6) : lc;
        const dist  = Array.isArray(ld) ? (ld[wi] ?? ld[0] ?? 8) : ld;
        const baseY = h * WAVE_Y[wk];
        const mult  = px ? PAR_MULT[wk] : 1;
        const ph    = phases.current[wk] + mouseOff;

        for (let li = 0; li < count; li++) {
          const lineY = baseY + (li - (count - 1) / 2) * dist;
          const lPh   = ph + li * 0.38;
          const alpha = 0.28 + (li / Math.max(count - 1, 1)) * 0.32;
          const lw    = 0.75 + li * 0.12;

          /* Build sine-wave control points */
          const pts: [number, number][] = [];
          for (let k = -2; k <= numSegs; k++) {
            pts.push([k * segW, lineY + amp * Math.sin(k * Math.PI + lPh)]);
          }

          /* Draw smooth bezier through points */
          ctx.beginPath();
          ctx.moveTo(pts[0][0], pts[0][1]);
          for (let k = 0; k < pts.length - 1; k++) {
            const mx = (pts[k][0] + pts[k + 1][0]) / 2;
            const my = (pts[k][1] + pts[k + 1][1]) / 2;
            ctx.quadraticCurveTo(pts[k][0], pts[k][1], mx, my);
          }

          ctx.globalAlpha = alpha;
          ctx.strokeStyle = grad;
          ctx.lineWidth   = lw;
          ctx.lineCap     = 'round';
          ctx.stroke();
        }

        phases.current[wk] += phInc * mult;
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
    };
  }, []); // ← runs once; cfg ref keeps props current

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        zIndex: 0, display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}
