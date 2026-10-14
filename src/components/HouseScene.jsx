import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { prefersReducedMotion } from '../lib/env';

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const BLUE = 0x0843ce;
const GOLD = 0xff9c00;
const LINE_BLUE = 0x8fb4ff;

/** Modern two-storey house described as simple architectural volumes. */
const PIECES = [
  { size: [6.4, 0.16, 3.8], pos: [0, -0.08, 0], scatter: [0, -2.6, 0], type: 'base' },
  { size: [3.8, 1.5, 2.8], pos: [-1.0, 0.75, 0], scatter: [-3.2, 0.4, -1.5], type: 'glass' },
  { size: [1.9, 1.2, 2.6], pos: [1.85, 0.6, 0.1], scatter: [3.4, 0.2, 0.8], type: 'glass' },
  { size: [4.2, 0.12, 3.1], pos: [-1.0, 1.56, 0], scatter: [-2.4, 2.6, 1.2], type: 'slab' },
  { size: [2.6, 1.2, 2.4], pos: [-0.3, 2.22, -0.1], scatter: [1.6, 3.4, -1.4], type: 'glass' },
  { size: [3.0, 0.12, 2.8], pos: [-0.3, 2.88, -0.1], scatter: [-1.2, 4.2, 0.6], type: 'slab' },
  { size: [2.2, 0.1, 2.9], pos: [1.85, 1.25, 0.1], scatter: [3.0, 2.6, 1.4], type: 'slab' },
  { size: [0.5, 1.0, 0.06], pos: [-1.9, 0.5, 1.43], scatter: [-1.4, 0.2, 3.2], type: 'door' },
  { size: [1.4, 0.9, 0.06], pos: [-0.35, 0.8, 1.43], scatter: [0.4, 0.6, 3.4], type: 'window' },
  { size: [1.8, 0.8, 0.06], pos: [-0.3, 2.2, 1.13], scatter: [0.2, 3.0, 3.2], type: 'window' },
  { size: [1.0, 0.7, 0.06], pos: [1.85, 0.65, 1.43], scatter: [2.2, 0.4, 3.4], type: 'window' }
];

function makeGlowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,156,0,0.55)');
  grad.addColorStop(0.45, 'rgba(255,156,0,0.12)');
  grad.addColorStop(1, 'rgba(255,156,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

/**
 * Transparent blue-glass house with orange illumination.
 * `progressRef.current` (0..1) drives assembly (0–0.7 of the range) and exit (0.82–1).
 */
export default function HouseScene({ progressRef, onFail }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    const reduced = prefersReducedMotion();

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      onFail?.();
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
    camera.position.set(6.4, 3.6, 12.6);
    camera.lookAt(0.2, 1.2, 0);

    scene.add(new THREE.AmbientLight(0x9db9ff, 0.7));
    const key = new THREE.DirectionalLight(0x9fc0ff, 1.5);
    key.position.set(-4, 7, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(GOLD, 0.8);
    rim.position.set(5, 2, -5);
    scene.add(rim);
    const warm = new THREE.PointLight(GOLD, 0, 9, 1.6);
    warm.position.set(0, 1.4, 0.6);
    scene.add(warm);

    const house = new THREE.Group();
    scene.add(house);

    const disposables = [];
    const pieces = PIECES.map((p, i) => {
      const geo = new THREE.BoxGeometry(...p.size);
      const edgeGeo = new THREE.EdgesGeometry(geo);
      const isWarm = p.type === 'window' || p.type === 'door';
      const baseOpacity = p.type === 'base' ? 0.12 : isWarm ? 0.42 : p.type === 'slab' ? 0.34 : 0.22;
      const mat = new THREE.MeshStandardMaterial({
        color: isWarm ? GOLD : BLUE,
        emissive: isWarm ? GOLD : BLUE,
        emissiveIntensity: isWarm ? 0 : 0.12,
        roughness: 0.18,
        metalness: 0.05,
        transparent: true,
        opacity: 0,
        depthWrite: false
      });
      const lineMat = new THREE.LineBasicMaterial({
        color: isWarm ? 0xffc766 : LINE_BLUE,
        transparent: true,
        opacity: 0
      });
      const mesh = new THREE.Mesh(geo, mat);
      const lines = new THREE.LineSegments(edgeGeo, lineMat);
      const g = new THREE.Group();
      g.add(mesh, lines);
      g.position.set(...p.pos);
      house.add(g);
      disposables.push(geo, edgeGeo, mat, lineMat);
      return {
        ...p,
        g,
        mat,
        lineMat,
        edgeGeo,
        baseOpacity,
        isWarm,
        vertexCount: edgeGeo.attributes.position.count,
        start: i * 0.055
      };
    });
    house.position.y = -0.6;

    // Ground ring + warm glow
    const ringGeo = new THREE.RingGeometry(4.6, 4.63, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: LINE_BLUE, transparent: true, opacity: 0, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.64;
    scene.add(ring);
    const glowTex = makeGlowTexture();
    const glowMat = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), glowMat);
    glow.rotation.x = -Math.PI / 2;
    glow.position.y = -0.63;
    scene.add(glow);
    disposables.push(ringGeo, ringMat, glowTex, glowMat, glow.geometry);

    // Floating motes
    const moteCount = 48;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(moteCount * 3);
    for (let i = 0; i < moteCount; i++) {
      motePos[i * 3] = (Math.random() - 0.5) * 11;
      motePos[i * 3 + 1] = Math.random() * 5;
      motePos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
    const moteMat = new THREE.PointsMaterial({ color: GOLD, size: 0.045, transparent: true, opacity: 0, depthWrite: false });
    const motes = new THREE.Points(moteGeo, moteMat);
    scene.add(motes);
    disposables.push(moteGeo, moteMat);

    // Sizing
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = w / h;
      camera.position.z = w / h < 1 ? 17 : 12.6;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Pointer response
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
    };
    if (!reduced) {
      mount.addEventListener('pointermove', onMove);
      mount.addEventListener('pointerleave', onLeave);
    }

    // Only render while on screen
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    let current = 0;
    let raf = 0;
    const t0 = performance.now();
    let last = t0;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = (now - t0) / 1000;
      if (!visible) return;

      const target = clamp01(progressRef.current || 0);
      current += (target - current) * Math.min(1, dt * 6);
      const a = clamp01(current / 0.7);
      const exit = easeInOut(clamp01((current - 0.82) / 0.18));
      const fade = 1 - exit;

      pieces.forEach((p) => {
        const lp = clamp01((a - p.start) / 0.35);
        const gp = clamp01((a - p.start - 0.18) / 0.35);
        const e = easeOut(clamp01(lp * 0.65 + gp * 0.35));
        p.g.position.set(
          p.pos[0] + p.scatter[0] * (1 - e),
          p.pos[1] + p.scatter[1] * (1 - e),
          p.pos[2] + p.scatter[2] * (1 - e)
        );
        const drawn = Math.floor((lp * p.vertexCount) / 2) * 2;
        p.edgeGeo.setDrawRange(0, drawn);
        p.lineMat.opacity = (0.25 + 0.75 * lp) * fade;
        p.mat.opacity = easeOut(gp) * p.baseOpacity * fade;
        if (p.isWarm) {
          const flicker = reduced ? 0 : Math.sin(t * 1.7 + p.start * 20) * 0.08;
          p.mat.emissiveIntensity = easeOut(gp) * (0.95 + flicker);
        }
      });

      const lit = easeOut(clamp01((a - 0.55) / 0.45));
      warm.intensity = lit * 3.2 * fade;
      ringMat.opacity = easeOut(clamp01(a * 1.4)) * 0.35 * fade;
      glowMat.opacity = lit * 0.9 * fade;
      moteMat.opacity = easeOut(clamp01(a * 1.2)) * 0.8 * fade;

      // Ambient motion + pointer parallax
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 3);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 3);
      const idle = reduced ? 0 : 1;
      house.position.y = -0.6 + Math.sin(t * 0.8) * 0.07 * idle + exit * 0.8;
      house.rotation.y = -0.85 + a * 0.45 + pointer.x * 0.22 + exit * 0.5 + Math.sin(t * 0.25) * 0.05 * idle;
      house.rotation.x = pointer.y * 0.06;
      const s = 1 + exit * 0.45;
      house.scale.setScalar(s);
      motes.rotation.y = t * 0.03 * idle;

      renderer.render(scene, camera);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mount.removeEventListener('pointermove', onMove);
      mount.removeEventListener('pointerleave', onLeave);
      disposables.forEach((d) => d.dispose?.());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progressRef, onFail]);

  return <div ref={mountRef} className="house-canvas" />;
}
