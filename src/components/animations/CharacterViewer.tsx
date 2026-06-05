'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

/* ─── Colour palette ─────────────────────────────────────────────── */
const C = {
  skin:     '#f5c9a0',
  hair:     '#2a1808',   // very dark brown, almost black-brown
  frame:    '#1a1816',   // near-black glasses frame
  shirt:    '#111111',   // black tee
  jeans:    '#7aadcf',   // light denim blue
  jeansD:   '#5a8aaa',   // slightly darker — waistband
  shoeW:    '#f5f5f5',   // white sneaker upper
  shoeSole: '#dedad5',   // off-white rubber sole
};

/* ─── Inline material helper ─────────────────────────────────────── */
const M = (color: string, roughness = 0.78, metalness = 0) => (
  <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
);

/* ─── Limb: cylinder aligned between two world-space points ─────── */
function Limb({
  from, to, r = 0.065, color,
}: {
  from:  [number, number, number];
  to:    [number, number, number];
  r?:    number;
  color: string;
}) {
  const a   = new THREE.Vector3(...from);
  const b   = new THREE.Vector3(...to);
  const mid = a.clone().lerp(b, 0.5);
  const len = a.distanceTo(b);
  const q   = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    b.clone().sub(a).normalize(),
  );
  return (
    <mesh position={mid.toArray()} quaternion={q} castShadow>
      <cylinderGeometry args={[r, r, len, 8]} />
      {M(color)}
    </mesh>
  );
}

/* ─── Character meshes ───────────────────────────────────────────── */
function Character() {
  return (
    <group>

      {/* ══ HAIR — combback ══
          Clean forehead, hair swept toward the back.
          A scaled-sphere ridge runs front-to-back along the crown. */}

      {/* Main cap — shifted back so the forehead is clean */}
      <mesh position={[0, 2.21, -0.06]} castShadow>
        <sphereGeometry args={[0.265, 16, 16]} />
        {M(C.hair, 0.88)}
      </mesh>
      {/* Comb ridge — elongated front-to-back, slightly raised */}
      <mesh position={[0, 2.36, -0.03]} scale={[0.55, 0.60, 1.6]}>
        <sphereGeometry args={[0.10, 12, 12]} />
        {M(C.hair, 0.88)}
      </mesh>
      {/* Back fullness — extra volume where the hair pools at the back */}
      <mesh position={[0, 2.23, -0.17]}>
        <sphereGeometry args={[0.095, 10, 10]} />
        {M(C.hair, 0.88)}
      </mesh>

      {/* ══ HEAD ══ */}
      <mesh position={[0, 2.06, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        {M(C.skin, 0.8)}
      </mesh>
      {/* Ears */}
      {([-0.22, 0.22] as const).map((x, i) => (
        <mesh key={i} position={[x, 2.06, 0]}>
          <sphereGeometry args={[0.048, 8, 8]} />
          {M(C.skin, 0.8)}
        </mesh>
      ))}

      {/* ══ EYES — sit on the face surface, visible through the glasses ══ */}
      {/* Eye whites */}
      {([-0.128, 0.128] as const).map((x, i) => (
        <mesh key={i} position={[x, 2.065, 0.183]}>
          <boxGeometry args={[0.065, 0.045, 0.012]} />
          <meshStandardMaterial color="#f0ece4" roughness={0.8} />
        </mesh>
      ))}
      {/* Pupils */}
      {([-0.128, 0.128] as const).map((x, i) => (
        <mesh key={i} position={[x, 2.060, 0.191]}>
          <sphereGeometry args={[0.019, 8, 8]} />
          <meshStandardMaterial color="#1a1208" roughness={0.6} />
        </mesh>
      ))}

      {/* ══ BOXY GLASSES ══ */}
      {/* Left lens — semi-transparent so eyes show through */}
      <mesh position={[-0.128, 2.06, 0.228]}>
        <boxGeometry args={[0.133, 0.107, 0.016]} />
        <meshStandardMaterial color="#7aabb8" transparent opacity={0.18} roughness={0.05} depthWrite={false} />
      </mesh>
      {/* Right lens */}
      <mesh position={[ 0.128, 2.06, 0.228]}>
        <boxGeometry args={[0.133, 0.107, 0.016]} />
        <meshStandardMaterial color="#7aabb8" transparent opacity={0.18} roughness={0.05} depthWrite={false} />
      </mesh>
      {/* Bridge */}
      <mesh position={[0, 2.06, 0.228]}>
        <boxGeometry args={[0.048, 0.018, 0.016]} />
        {M(C.frame, 0.45)}
      </mesh>
      {/* Left arm (to ear) */}
      <mesh position={[-0.224, 2.06, 0.065]}>
        <boxGeometry args={[0.013, 0.013, 0.35]} />
        {M(C.frame, 0.45)}
      </mesh>
      {/* Right arm */}
      <mesh position={[ 0.224, 2.06, 0.065]}>
        <boxGeometry args={[0.013, 0.013, 0.35]} />
        {M(C.frame, 0.45)}
      </mesh>

      {/* ══ NECK ══ */}
      <mesh position={[0, 1.83, 0]} castShadow>
        <cylinderGeometry args={[0.068, 0.078, 0.16, 8]} />
        {M(C.skin, 0.8)}
      </mesh>

      {/* ══ TORSO — black tee, slightly rounded ══ */}
      <mesh position={[0, 1.475, 0]} castShadow scale={[1, 1, 0.52]}>
        <capsuleGeometry args={[0.255, 0.38, 4, 12]} />
        {M(C.shirt, 0.85)}
      </mesh>

      {/* ══ ARMS ══ */}
      {/* Upper arms — slightly angled away from torso */}
      <Limb from={[-0.29, 1.67, 0]} to={[-0.37, 1.34, 0]} r={0.070} color={C.skin} />
      <Limb from={[ 0.29, 1.67, 0]} to={[ 0.37, 1.34, 0]} r={0.070} color={C.skin} />
      {/* Lower arms */}
      <Limb from={[-0.37, 1.31, 0]} to={[-0.41, 1.01, 0]} r={0.062} color={C.skin} />
      <Limb from={[ 0.37, 1.31, 0]} to={[ 0.41, 1.01, 0]} r={0.062} color={C.skin} />
      {/* Hands */}
      <mesh position={[-0.42, 0.94, 0]} castShadow>
        <sphereGeometry args={[0.064, 8, 8]} />
        {M(C.skin, 0.8)}
      </mesh>
      <mesh position={[ 0.42, 0.94, 0]} castShadow>
        <sphereGeometry args={[0.064, 8, 8]} />
        {M(C.skin, 0.8)}
      </mesh>

      {/* ══ WAISTBAND ══ */}
      <mesh position={[0, 1.115, 0]} castShadow>
        <boxGeometry args={[0.50, 0.075, 0.22]} />
        {M(C.jeansD, 0.85)}
      </mesh>

      {/* ══ UPPER LEGS — wide-fit jeans, capsule for roundness ══ */}
      <mesh position={[-0.135, 0.845, 0]} castShadow>
        <capsuleGeometry args={[0.100, 0.28, 4, 10]} />
        {M(C.jeans, 0.9)}
      </mesh>
      <mesh position={[ 0.135, 0.845, 0]} castShadow>
        <capsuleGeometry args={[0.100, 0.28, 4, 10]} />
        {M(C.jeans, 0.9)}
      </mesh>

      {/* ══ LOWER LEGS — wide-fit jeans ══ */}
      <mesh position={[-0.135, 0.38, 0]} castShadow>
        <capsuleGeometry args={[0.093, 0.26, 4, 10]} />
        {M(C.jeans, 0.9)}
      </mesh>
      <mesh position={[ 0.135, 0.38, 0]} castShadow>
        <capsuleGeometry args={[0.093, 0.26, 4, 10]} />
        {M(C.jeans, 0.9)}
      </mesh>

      {/* ══ SHOES — white sneakers ══ */}
      {/* Rubber soles */}
      <mesh position={[-0.135, 0.032, 0.018]}>
        <boxGeometry args={[0.205, 0.058, 0.33]} />
        {M(C.shoeSole, 0.9)}
      </mesh>
      <mesh position={[ 0.135, 0.032, 0.018]}>
        <boxGeometry args={[0.205, 0.058, 0.33]} />
        {M(C.shoeSole, 0.9)}
      </mesh>
      {/* White uppers */}
      <mesh position={[-0.135, 0.106, 0.008]} castShadow>
        <boxGeometry args={[0.190, 0.100, 0.285]} />
        {M(C.shoeW, 0.72)}
      </mesh>
      <mesh position={[ 0.135, 0.106, 0.008]} castShadow>
        <boxGeometry args={[0.190, 0.100, 0.285]} />
        {M(C.shoeW, 0.72)}
      </mesh>
      {/* Rounded toe caps — sphere at the front of each upper */}
      <mesh position={[-0.135, 0.098, 0.151]}>
        <sphereGeometry args={[0.055, 10, 10]} />
        {M(C.shoeW, 0.72)}
      </mesh>
      <mesh position={[ 0.135, 0.098, 0.151]}>
        <sphereGeometry args={[0.055, 10, 10]} />
        {M(C.shoeW, 0.72)}
      </mesh>

    </group>
  );
}

/* ─── Glowing platform ───────────────────────────────────────────── */
function Platform() {
  const rimRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (rimRef.current) {
      rimRef.current.emissiveIntensity =
        0.42 + Math.sin(clock.elapsedTime * 1.8) * 0.2;
    }
  });

  return (
    <group position={[0, -0.03, 0]}>
      {/* Base disc */}
      <mesh receiveShadow>
        <cylinderGeometry args={[1.15, 1.15, 0.07, 64]} />
        <meshStandardMaterial color="#07111e" roughness={0.25} metalness={0.8} />
      </mesh>
      {/* Pulsing accent rim */}
      <mesh>
        <cylinderGeometry args={[1.18, 1.04, 0.022, 64]} />
        <meshStandardMaterial
          ref={rimRef}
          color="#19aaff"
          emissive={new THREE.Color(0.05, 0.55, 1.0)}
          emissiveIntensity={0.42}
          roughness={0.12}
          metalness={0.65}
        />
      </mesh>
      {/* Soft ground shadow */}
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.6, 64]} />
        <meshBasicMaterial color="#000" transparent opacity={0.22} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ─── Hanging light bulb ─────────────────────────────────────────── */
function Bulb({ isDark }: { isDark: boolean }) {
  const bulbMatRef = useRef<THREE.MeshStandardMaterial>(null);

  /* Warm pulse on the glass in dark mode */
  useFrame(({ clock }) => {
    if (!isDark || !bulbMatRef.current) return;
    bulbMatRef.current.emissiveIntensity =
      2.2 + Math.sin(clock.elapsedTime * 0.9) * 0.15;
  });

  return (
    <group position={[0, 0.7, 0]}>
      {/* Ceiling anchor */}
      <mesh position={[0, 3.88, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.06, 12]} />
        <meshStandardMaterial color="#888" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Cord / wire */}
      <mesh position={[0, 3.4, 0]}>
        <cylinderGeometry args={[0.007, 0.007, 0.84, 4]} />
        <meshStandardMaterial color={isDark ? '#bbb' : '#777'} roughness={1} />
      </mesh>

      {/* Screw socket (metal) */}
      <mesh position={[0, 2.94, 0]}>
        <cylinderGeometry args={[0.056, 0.056, 0.13, 12]} />
        <meshStandardMaterial color="#bbb" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Glass bulb */}
      <mesh position={[0, 2.72, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          ref={bulbMatRef}
          color={isDark ? '#fff4c2' : '#d8d8d8'}
          emissive={isDark ? new THREE.Color(1.0, 0.82, 0.3) : new THREE.Color(0, 0, 0)}
          emissiveIntensity={isDark ? 2.2 : 0}
          transparent
          opacity={isDark ? 0.95 : 0.5}
          roughness={0.04}
          metalness={0}
        />
      </mesh>

      {/* Filament — tiny orange wire inside glass */}
      <mesh position={[0, 2.72, 0]}>
        <cylinderGeometry args={[0.007, 0.007, 0.1, 4]} />
        <meshBasicMaterial color={isDark ? '#ff9900' : '#666'} />
      </mesh>

      {/* Warm point light emanating from bulb (dark mode only) */}
      <pointLight
        position={[0, 2.72, 0]}
        color="#ffe4a0"
        intensity={isDark ? 16 : 0}
        distance={7}
        decay={1.8}
        castShadow={false}
      />
    </group>
  );
}

/* ─── Full scene ─────────────────────────────────────────────────── */
function Scene() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== 'light';

  return (
    <>
      {/* Ambient: low in dark mode so the bulb reads as the key light */}
      <ambientLight intensity={isDark ? 0.22 : 0.65} />

      {/* Light mode: normal directional setup */}
      {!isDark && (
        <>
          <directionalLight position={[3, 6, 4]}  intensity={1.1} castShadow shadow-mapSize={[1024, 1024]} />
          <directionalLight position={[-3, 3, -2]} intensity={0.28} />
        </>
      )}

      {/* Dark mode: faint fill so deep shadows aren't pure black */}
      {isDark && (
        <directionalLight position={[-2, 3, 3]} intensity={0.08} />
      )}

      {/* Platform accent glow */}
      <pointLight
        position={[0, 0.5, 0]}
        color="#19aaff"
        intensity={isDark ? 0.9 : 0.4}
        distance={3.5}
        decay={2}
      />

      <Bulb isDark={isDark} />
      <Character />
      <Platform />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.2}
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.52}
        target={[0, 1.1, 0]}
      />
    </>
  );
}

/* ─── Exported component ─────────────────────────────────────────── */
export default function CharacterViewer() {
  return (
    <div style={{ width: '100%', maxWidth: 420, aspectRatio: '4/5', margin: '0 auto' }}>
      <Canvas
        camera={{ position: [0, 1.4, 4.5], fov: 44 }}
        shadows
        gl={{ antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
