"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import type { Theme } from "@/lib/theme";

/* ───────── Procedural, vein-textured medicinal leaf ───────── */
function makeVeinTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 512;
  const g = c.getContext("2d")!;
  g.fillStyle = "#ffffff";
  g.fillRect(0, 0, 256, 512);
  g.strokeStyle = "rgba(0,0,0,0.20)";
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(128, 512);
  g.lineTo(128, 10);
  g.stroke();
  g.lineWidth = 1.4;
  for (let i = 0; i < 13; i++) {
    const y = 470 - i * 34;
    for (const s of [-1, 1]) {
      g.beginPath();
      g.moveTo(128, y);
      g.quadraticCurveTo(128 + s * 50, y - 28, 128 + s * 108, y - 78);
      g.stroke();
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function makeLeafGeometry(len: number, wid: number, bend: number, fold: number, tipCurl: number) {
  const g = new THREE.PlaneGeometry(1, 1, 10, 22);
  const pos = g.attributes.position;
  const colors: number[] = [];
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const u = pos.getX(i) + 0.5; // 0..1 across
    const t = pos.getY(i) + 0.5; // 0..1 along
    const half = Math.pow(Math.sin(Math.PI * Math.pow(t, 0.72)), 0.85) * 0.5 + 0.015;
    const x = (u - 0.5) * 2 * half * wid;
    const y = t * len;
    const across = Math.abs(u - 0.5) * 2;
    const z = bend * t * t * len + fold * across * half * wid * 2 - tipCurl * Math.pow(t, 4) * len;
    pos.setXYZ(i, x, y, z);
    const shade = 0.62 + 0.38 * (1 - across * 0.7) + t * 0.08;
    colors.push(shade, shade, shade);
    uv.setXY(i, u, t);
  }
  g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  g.computeVertexNormals();
  return g;
}

interface LeafSpec {
  pos: [number, number, number];
  rot: [number, number, number];
  len: number;
  wid: number;
  hue: number; // 0..1 variant
  bend: number;
}

function Branch({
  origin,
  rotation,
  leaves,
  curve,
  palette,
  veins,
  sway,
}: {
  origin: [number, number, number];
  rotation: [number, number, number];
  leaves: LeafSpec[];
  curve: THREE.CatmullRomCurve3;
  palette: { a: THREE.Color; b: THREE.Color; stem: THREE.Color };
  veins: THREE.Texture;
  sway: number;
}) {
  const group = useRef<THREE.Group>(null);
  const stem = useMemo(() => new THREE.TubeGeometry(curve, 40, 0.022, 6, false), [curve]);
  const geos = useMemo(
    () => leaves.map((l) => makeLeafGeometry(l.len, l.wid, l.bend, 0.35, 0.18)),
    [leaves],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime * 0.35 + sway;
    group.current.rotation.z = rotation[2] + Math.sin(t) * 0.025;
    group.current.rotation.x = rotation[0] + Math.cos(t * 0.8) * 0.02;
  });

  return (
    <group ref={group} position={origin} rotation={rotation}>
      <mesh geometry={stem}>
        <meshStandardMaterial color={palette.stem} roughness={0.8} />
      </mesh>
      {leaves.map((l, i) => (
        <mesh key={i} geometry={geos[i]} position={l.pos} rotation={l.rot}>
          <meshStandardMaterial
            map={veins}
            vertexColors
            color={palette.a.clone().lerp(palette.b, l.hue)}
            side={THREE.DoubleSide}
            roughness={0.5}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

function buildBranch(seed: number, count: number, scale: number) {
  let s = seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const pts = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.25, 1.1, 0.1),
    new THREE.Vector3(0.1, 2.3, -0.05),
    new THREE.Vector3(0.5, 3.4, 0.15),
  ].map((p) => p.multiplyScalar(scale));
  const curve = new THREE.CatmullRomCurve3(pts);
  const leaves: LeafSpec[] = [];
  for (let i = 0; i < count; i++) {
    const t = 0.18 + (i / count) * 0.78;
    const p = curve.getPoint(t);
    const side = i % 2 === 0 ? 1 : -1;
    const size = (1.05 - t * 0.45) * scale;
    leaves.push({
      pos: [p.x, p.y, p.z],
      rot: [-0.25 + rnd() * 0.5, side * (0.5 + rnd() * 0.5), side * (-1.0 - rnd() * 0.45)],
      len: 1.35 * size,
      wid: 0.62 * size,
      hue: rnd(),
      bend: 0.1 + rnd() * 0.12,
    });
  }
  const tip = curve.getPoint(1);
  leaves.push({
    pos: [tip.x, tip.y, tip.z],
    rot: [-0.1, 0.15, -0.05],
    len: 1.0 * scale,
    wid: 0.5 * scale,
    hue: 0.6,
    bend: 0.14,
  });
  return { curve, leaves };
}

function Rig({
  theme,
  lite,
  progress,
}: {
  theme: Theme;
  lite: boolean;
  progress: React.RefObject<number>;
}) {
  const veins = useMemo(() => makeVeinTexture(), []);
  const pointer = useRef({ x: 0, y: 0 });
  const rig = useRef<THREE.Group>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const palette = useMemo(
    () =>
      theme === "dark"
        ? { a: new THREE.Color("#3f7a52"), b: new THREE.Color("#7fa56b"), stem: new THREE.Color("#4a5a38") }
        : { a: new THREE.Color("#2c6a45"), b: new THREE.Color("#7ea45e"), stem: new THREE.Color("#5b6a3a") },
    [theme],
  );

  const branches = useMemo(() => {
    const n = lite ? 8 : 12;
    return [
      { ...buildBranch(11, n, 1.0), origin: [-0.4, -2.6, 0] as [number, number, number], rot: [0.05, 0.2, 0.22] as [number, number, number], sway: 0 },
      { ...buildBranch(29, n - 2, 0.86), origin: [1.5, -2.9, -0.8] as [number, number, number], rot: [0.1, -0.35, -0.34] as [number, number, number], sway: 1.7 },
      ...(lite
        ? []
        : [{ ...buildBranch(53, 9, 0.7), origin: [-2.2, -2.4, -1.4] as [number, number, number], rot: [0.0, 0.5, 0.55] as [number, number, number], sway: 3.1 }]),
    ];
  }, [lite]);

  useFrame(({ camera }, dt) => {
    const p = Math.min(Math.max(progress.current ?? 0, 0), 1);
    const k = 1 - Math.pow(0.001, dt); // frame-rate independent easing
    const tx = pointer.current.x * 0.35;
    const ty = -pointer.current.y * 0.2 + p * 1.6;
    camera.position.x += (tx - camera.position.x) * k;
    camera.position.y += (ty - camera.position.y) * k;
    camera.position.z += (7.2 - p * 1.4 - camera.position.z) * k;
    camera.lookAt(0, 0.6 + p * 1.2, 0);
    if (rig.current) rig.current.rotation.y += ((p * 0.5 - rig.current.rotation.y) * k) * 0.8;
  });

  return (
    <>
      <ambientLight intensity={theme === "dark" ? 0.55 : 0.85} color={theme === "dark" ? "#b9d2c0" : "#fff6e0"} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={theme === "dark" ? 1.7 : 2.6}
        color={theme === "dark" ? "#f1d9a6" : "#fff0cc"}
      />
      <directionalLight position={[-5, 1, 2]} intensity={0.55} color={theme === "dark" ? "#6f9d86" : "#cfe3c8"} />
      <hemisphereLight args={[theme === "dark" ? "#2a4d3a" : "#e9f1d8", "#10231a", 0.5]} />
      <group ref={rig}>
        {branches.map((b, i) => (
          <Branch key={i} origin={b.origin} rotation={b.rot} leaves={b.leaves} curve={b.curve} palette={palette} veins={veins} sway={b.sway} />
        ))}
      </group>
      <Sparkles
        count={lite ? 18 : 40}
        scale={[9, 7, 4]}
        size={2.2}
        speed={0.18}
        opacity={0.55}
        color={theme === "dark" ? "#e3c98f" : "#c9a96a"}
      />
    </>
  );
}

export default function LeafScene({
  theme,
  lite,
  progress,
  active,
}: {
  theme: Theme;
  lite: boolean;
  progress: React.RefObject<number>;
  active: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={lite ? [1, 1.5] : [1, 1.75]}
      camera={{ position: [0, 0, 7.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      aria-hidden="true"
    >
      <Rig theme={theme} lite={lite} progress={progress} />
    </Canvas>
  );
}
