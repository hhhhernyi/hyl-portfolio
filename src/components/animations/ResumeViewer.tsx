'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Paper & canvas dimensions ─────────────────────────────────── */
const PW    = 2.10;                       // paper width  (world units)
const PH    = 2.97;                       // paper height (A4 ratio)
const SEG_X = 22;                         // horizontal subdivisions
const SEG_Y = 30;                         // vertical subdivisions
const CW    = 900;                        // canvas px width
const CH    = Math.round(CW * PH / PW);  // ≈ 1271 px
const PAP   = '#fdfcf7';                  // warm paper white
const L     = 48;                         // left/right margin px
const CX    = CW - L * 2;                // usable content width px

/* ─── Canvas helpers ─────────────────────────────────────────────── */
function wrap(
  ctx: CanvasRenderingContext2D,
  text: string, x: number, y: number,
  maxW: number, lh: number,
): number {
  const words = text.split(' ');
  let line = '';
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (ctx.measureText(t).width > maxW && line) {
      ctx.fillText(line, x, y); y += lh; line = w;
    } else { line = t; }
  }
  if (line) { ctx.fillText(line, x, y); y += lh; }
  return y;
}

function secHead(ctx: CanvasRenderingContext2D, label: string, y: number): number {
  ctx.font = 'bold 13px Arial, sans-serif';
  ctx.fillStyle = '#111'; ctx.textAlign = 'left';
  ctx.fillText(label, L, y);
  ctx.strokeStyle = '#ccc'; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(L, y + 4); ctx.lineTo(CW - L, y + 4); ctx.stroke();
  return y + 19;
}

function jobBlock(
  ctx: CanvasRenderingContext2D,
  role: string, company: string, period: string,
  bullets: string[], y: number,
): number {
  ctx.font = 'bold 11px Arial, sans-serif';
  ctx.fillStyle = '#111'; ctx.textAlign = 'left';
  ctx.fillText(role, L, y);
  ctx.font = '9.5px Arial, sans-serif';
  ctx.fillStyle = '#888'; ctx.textAlign = 'right';
  ctx.fillText(period, CW - L, y);
  y += 14;
  ctx.font = 'italic 10px Arial, sans-serif';
  ctx.fillStyle = '#555'; ctx.textAlign = 'left';
  ctx.fillText(company, L, y); y += 14;
  ctx.font = '10px Arial, sans-serif'; ctx.fillStyle = '#333';
  for (const b of bullets) {
    ctx.fillText('•', L, y);
    y = wrap(ctx, b, L + 13, y, CX - 13, 13);
    y += 1;
  }
  return y;
}

function projBlock(
  ctx: CanvasRenderingContext2D,
  title: string, tech: string, desc: string, y: number,
): number {
  ctx.font = 'bold 10.5px Arial, sans-serif';
  ctx.fillStyle = '#111'; ctx.textAlign = 'left';
  ctx.fillText(title, L, y); y += 13;
  ctx.font = 'italic 9.5px Arial, sans-serif';
  ctx.fillStyle = '#666'; ctx.fillText(tech, L, y); y += 13;
  ctx.font = '10px Arial, sans-serif'; ctx.fillStyle = '#333';
  y = wrap(ctx, desc, L, y, CX, 13);
  return y;
}

/* ─── Full-page texture (all resume content on one side) ─────────── */
function buildPage(): THREE.CanvasTexture {
  const cv = document.createElement('canvas');
  cv.width = CW; cv.height = CH;
  const ctx = cv.getContext('2d')!;
  ctx.fillStyle = PAP; ctx.fillRect(0, 0, CW, CH);
  let y = 50;

  /* Name */
  ctx.font = 'bold 24px Georgia, serif';
  ctx.fillStyle = '#111'; ctx.textAlign = 'center';
  ctx.fillText('LEE HERN YI', CW / 2, y); y += 31;

  /* Contact */
  ctx.font = '10px Arial, sans-serif';
  ctx.fillStyle = '#777'; ctx.textAlign = 'center';
  ctx.fillText('Singaporean  ·  +65 9827 5085  ·  Hyileenet@gmail.com', CW / 2, y); y += 14;
  ctx.fillText('LinkedIn  ·  GitHub  ·  Portfolio', CW / 2, y); y += 13;
  ctx.strokeStyle = '#ccc'; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(L, y + 3); ctx.lineTo(CW - L, y + 3); ctx.stroke();
  y += 16;

  /* Summary */
  y = secHead(ctx, 'SUMMARY', y);
  ctx.font = '10px Arial, sans-serif'; ctx.fillStyle = '#333'; ctx.textAlign = 'left';
  y = wrap(ctx,
    'Full-stack Software Engineer experienced in building web and mobile applications with JavaScript/TypeScript, React, and React Native. Brings an engineering background and a passion for prototyping, problem-solving, and continuous learning. Seeking opportunities to contribute to meaningful work in collaborative teams.',
    L, y, CX, 14);
  y += 10;

  /* Technical Skills */
  y = secHead(ctx, 'TECHNICAL SKILLS', y);
  const skills: [string, string][] = [
    ['Languages:',       'JavaScript, TypeScript, Java, Python, SQL, HTML, CSS'],
    ['Frontend:',        'React, React Native, Vue.js, TailwindCSS'],
    ['Backend:',         'Node.js, Express.js, Java (Struts framework), JSP, RESTful APIs'],
    ['Databases:',       'MongoDB (Mongoose), PL/SQL, Firebase, Supabase, BigQuery'],
    ['Tools & Methods:', 'Git, Unit Testing (Mocha, Chai), Selenium, Tableau, Agile/Scrum'],
  ];
  for (const [lbl, val] of skills) {
    ctx.font = 'bold 10px Arial, sans-serif'; ctx.fillStyle = '#111'; ctx.textAlign = 'left';
    ctx.fillText(lbl, L, y);
    const lw = ctx.measureText(lbl).width + 5;
    ctx.font = '10px Arial, sans-serif'; ctx.fillStyle = '#333';
    ctx.fillText(val, L + lw, y); y += 14;
  }
  y += 10;

  /* Work Experience */
  y = secHead(ctx, 'WORK EXPERIENCE', y);

  y = jobBlock(ctx, 'Software Engineer 1', 'Millipede Pte Ltd', 'Jan 2026 – Present', [
    'Developed and shipped production mobile app features using React Native and TypeScript, and enhanced React-based web admin portals.',
    'Performed QA including backward compatibility and regression testing, and wrote unit tests to ensure feature reliability.',
    'Managed app deployments to TestFlight, Apple App Store, and Google Play Store.',
    'Built automated scripts to maintain and clean Firebase and BigQuery databases, improving data integrity.',
  ], y); y += 9;

  y = jobBlock(ctx,
    'Software Engineer',
    'VisionPower Semiconductor Manufacturing Company (VSMC)',
    'Jul 2025 – Jan 2026', [
    'Designed and shipped a web application that automated the manual e-invoice editing process for the finance team, resulting in >90% time savings across the entire department.',
    'Developed RESTful API endpoints in Java for an AS/RS warehouse project, enabling integration between warehouse hardware and ERP systems.',
    'Maintained and enhanced multiple ERP applications using Java, JSP, Struts framework and PL/SQL, improving app performance and user experience.',
    'Co-built a Python + Selenium web automation tool to download attendance reports, eliminating repetitive manual work for HR operations.',
  ], y); y += 9;

  y = jobBlock(ctx, 'Demand Planner', 'Halliburton Far East Singapore', 'May 2024 – Dec 2024', [
    'Applied data analysis and advanced Excel techniques to optimize inventory management, reducing stranded inventory by over $800,000.',
    'Collaborated with procurement and operations teams to improve demand forecasting accuracy by 50%.',
    'Managed multi-location materials planning using SAP, ensuring alignment with production schedules.',
  ], y); y += 9;

  y = jobBlock(ctx, 'Senior / Analog Layout Engineer', 'Marvell Asia Pte Ltd', 'Jul 2022 – May 2024', [
    'Led a cross-functional team of 15 engineers across Singapore and Taiwan to deliver a 55nm PMIC project on schedule.',
    'Coordinated with USA stakeholders and the India-based design team to manage timelines and drive process improvements.',
    'Developed training materials and onboarding documentation to upskill entry-level engineers, improving team ramp-up time.',
  ], y); y += 11;

  /* Projects */
  y = secHead(ctx, 'PROJECTS', y);
  y = projBlock(ctx,
    'Barber Booking Management System', 'Vue.js, JavaScript, Express.js, MongoDB',
    'Full-stack booking management app for a local barber with role-based access control and an automated email service.',
    y); y += 9;
  y = projBlock(ctx,
    'Height Tracking Dashboard', 'React, TypeScript, Express.js, Supabase',
    'Personal project to record and visualize height trends over time on an interactive dashboard.',
    y); y += 11;

  /* Education */
  y = secHead(ctx, 'EDUCATION & CERTIFICATIONS', y);
  const edu: [string, string, string][] = [
    ['Software Engineering Immersive',                    'General Assembly',   'Mar 2025'],
    ['Bachelor of Electrical and Electronic Engineering', 'NTU',                'Aug 2018 – May 2022'],
    ['Data Science and AI Bootcamp',                      'Vertical Institute', 'Oct 2024'],
    ['Data Analytics Bootcamp',                           'Vertical Institute', 'Nov 2023'],
    ['Foundational C# with Microsoft',                    'Microsoft',          'Nov 2024'],
    ['Python for Data Science, AI & Development',         'Coursera (IBM)',      'Mar 2024'],
  ];
  for (const [cred, inst, date] of edu) {
    ctx.font = 'bold 10px Arial, sans-serif'; ctx.fillStyle = '#111'; ctx.textAlign = 'left';
    ctx.fillText(cred, L, y);
    ctx.font = '9.5px Arial, sans-serif'; ctx.fillStyle = '#888'; ctx.textAlign = 'right';
    ctx.fillText(date, CW - L, y); y += 13;
    ctx.font = '9.5px Arial, sans-serif'; ctx.fillStyle = '#666'; ctx.textAlign = 'left';
    ctx.fillText(inst, L + 10, y); y += 13;
  }

  return new THREE.CanvasTexture(cv);
}

/* ─── Wind-deformation formula ───────────────────────────────────── */
function windZ(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 1.6 + t * 0.80) * 0.055 +
    Math.sin(y * 1.3 + t * 0.55) * 0.045 +
    Math.sin(x * 0.9 + y * 1.1 + t * 1.15) * 0.030 +
    Math.sin(x * 2.4 + t * 1.40) * 0.012
  );
}

/* ─── Flowy paper mesh ───────────────────────────────────────────── */
function Paper() {
  const groupRef = useRef<THREE.Group>(null);
  const frontRef = useRef<THREE.Mesh>(null);
  const backRef  = useRef<THREE.Mesh>(null);
  const pageTex  = useMemo(() => buildPage(), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    /* Gentle float */
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.65) * 0.04;
    }

    /* Deform front face */
    if (frontRef.current) {
      const pos = frontRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        pos.setZ(i, windZ(pos.getX(i), pos.getY(i), t));
      }
      pos.needsUpdate = true;
      frontRef.current.geometry.computeVertexNormals();
    }

    /* Deform back face — local X is mirrored (π rotation), negate to match world wave */
    if (backRef.current) {
      const pos = backRef.current.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        pos.setZ(i, -windZ(-pos.getX(i), pos.getY(i), t));
      }
      pos.needsUpdate = true;
      backRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <group ref={groupRef}>
      {/* Front — resume texture */}
      <mesh ref={frontRef} position={[0, 0, 0.001]}>
        <planeGeometry args={[PW, PH, SEG_X, SEG_Y]} />
        <meshStandardMaterial map={pageTex} roughness={0.88} side={THREE.FrontSide} />
      </mesh>

      {/* Back — blank paper (rotated π so it faces -Z) */}
      <mesh ref={backRef} position={[0, 0, -0.001]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[PW, PH, SEG_X, SEG_Y]} />
        <meshStandardMaterial color={PAP} roughness={0.92} side={THREE.FrontSide} />
      </mesh>
    </group>
  );
}

/* ─── Scene ─────────────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 5]}  intensity={0.95} />
      <directionalLight position={[-3, 2, -2]} intensity={0.20} />
      <Paper />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.82}
      />
    </>
  );
}

/* ─── Export ─────────────────────────────────────────────────────── */
export default function ResumeViewer() {
  return (
    <div style={{ width: '100%', maxWidth: 420, aspectRatio: `${PW} / ${PH}`, margin: '0 auto' }}>
      <Canvas camera={{ position: [0, 0, 4.2], fov: 44 }} gl={{ antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
