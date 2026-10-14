import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { detectSceneMode } from '../lib/env';

export default function InteractiveGlassHouse() {
  const [sceneMode] = useState(detectSceneMode);
  const canvasRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);

  useEffect(() => {
    if (sceneMode === 'fallback') return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(7.5, 5.0, 14.0);
    camera.lookAt(0, 1.8, 0);

    // Ambient and warm lights
    const ambient = new THREE.AmbientLight(0x0c2759, 1.6);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0x8eb2ff, 1.8);
    dirLight.position.set(10, 15, 12);
    scene.add(dirLight);

    // Warm Interior Orange Illumination (#FF9C00)
    const orangeInteriorLight = new THREE.PointLight(0xff9c00, 4.2, 28, 1.2);
    orangeInteriorLight.position.set(0.5, 2.5, 0.5);
    scene.add(orangeInteriorLight);

    const terraceLight = new THREE.PointLight(0xffb84d, 2.5, 20);
    terraceLight.position.set(-2.5, 4.2, 2.0);
    scene.add(terraceLight);

    // Glass House Root Group
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);

    // Blue Transparent Glass Material
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x0843ce,
      emissive: 0x08285f,
      emissiveIntensity: 0.25,
      roughness: 0.12,
      metalness: 0.35,
      transparent: true,
      opacity: 0.38
    });

    // Warm Amber Illuminated Room Cores
    const warmCoreMat = new THREE.MeshStandardMaterial({
      color: 0xffa31a,
      emissive: 0xff9c00,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      transparent: true,
      opacity: 0.75
    });

    // Dark architectural structural slabs
    const slabMat = new THREE.MeshStandardMaterial({
      color: 0x071b40,
      roughness: 0.3,
      metalness: 0.8
    });

    // Wireframe edge material
    const edgeBlue = new THREE.LineBasicMaterial({ color: 0x3a72ef, transparent: true, opacity: 0.85 });
    const edgeGold = new THREE.LineBasicMaterial({ color: 0xff9c00, transparent: true, opacity: 0.95 });

    // Ground Platform with pool cutout
    const platform = new THREE.Mesh(new THREE.BoxGeometry(14, 0.5, 11), slabMat);
    platform.position.y = -0.25;
    houseGroup.add(platform);

    // Infinity Reflecting Pool with blue water sheen
    const pool = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 0.2, 4.0),
      new THREE.MeshStandardMaterial({ color: 0x0843ce, roughness: 0.05, metalness: 0.95 })
    );
    pool.position.set(3.5, 0.02, 2.5);
    houseGroup.add(pool);

    // Ground Floor Glass Living Pavilion
    const gfGeo = new THREE.BoxGeometry(6.8, 2.6, 5.4);
    const gfMesh = new THREE.Mesh(gfGeo, glassMat);
    gfMesh.position.set(-1.0, 1.3, 0);
    const gfEdges = new THREE.LineSegments(new THREE.EdgesGeometry(gfGeo), edgeBlue);
    gfMesh.add(gfEdges);
    houseGroup.add(gfMesh);

    // Living Room Warm Glowing Core
    const gfCore = new THREE.Mesh(new THREE.BoxGeometry(4.5, 1.8, 3.2), warmCoreMat);
    gfCore.position.set(-1.0, 1.1, 0);
    houseGroup.add(gfCore);

    // Mid Cantilever Concrete Slab
    const midSlab = new THREE.Mesh(new THREE.BoxGeometry(8.5, 0.3, 7.2), slabMat);
    midSlab.position.set(0.2, 2.75, 0.5);
    houseGroup.add(midSlab);

    // First Floor Master Glass Suite (Dramatic Cantilever)
    const ffGeo = new THREE.BoxGeometry(6.4, 2.4, 4.8);
    const ffMesh = new THREE.Mesh(ffGeo, glassMat);
    ffMesh.position.set(0.8, 4.1, 0.8);
    const ffEdges = new THREE.LineSegments(new THREE.EdgesGeometry(ffGeo), edgeGold);
    ffMesh.add(ffEdges);
    houseGroup.add(ffMesh);

    // First Floor Warm Glowing Core
    const ffCore = new THREE.Mesh(new THREE.BoxGeometry(4.2, 1.6, 2.8), warmCoreMat);
    ffCore.position.set(0.8, 3.9, 0.8);
    houseGroup.add(ffCore);

    // Floating Roof Overhang
    const roof = new THREE.Mesh(new THREE.BoxGeometry(8.8, 0.28, 6.8), slabMat);
    roof.position.set(0.8, 5.45, 0.8);
    houseGroup.add(roof);

    // Slender Architectural Steel Columns
    const colMat = new THREE.MeshStandardMaterial({ color: 0xff9c00, metalness: 0.9, roughness: 0.1 });
    const col1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.6, 12), colMat);
    col1.position.set(3.4, 1.3, 3.2);
    const col2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.6, 12), colMat);
    col2.position.set(3.4, 1.3, -2.2);
    houseGroup.add(col1, col2);

    // Floating ambient golden particles
    const partGeo = new THREE.BufferGeometry();
    const partCount = 120;
    const partPos = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount * 3; i += 3) {
      partPos[i] = (Math.random() - 0.5) * 18;
      partPos[i + 1] = Math.random() * 8 + 0.5;
      partPos[i + 2] = (Math.random() - 0.5) * 16;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    const partMat = new THREE.PointsMaterial({ color: 0xffb84d, size: 0.15, transparent: true, opacity: 0.8 });
    const particles = new THREE.Points(partGeo, partMat);
    houseGroup.add(particles);

    // Pointer Parallax & Rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const resize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);

    let rafId = 0;
    let clock = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      clock += 0.01;

      // Subtle base auto-rotation + pointer parallax
      targetRotY = clock * 0.25 + mouseX * 0.45;
      targetRotX = mouseY * 0.25;

      houseGroup.rotation.y += (targetRotY - houseGroup.rotation.y) * 0.05;
      houseGroup.rotation.x += (targetRotX - houseGroup.rotation.x) * 0.05;

      // Subtle breathing pulse on warm cores
      const pulse = 1 + Math.sin(clock * 2) * 0.08;
      orangeInteriorLight.intensity = 4.2 * pulse;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', resize);
      renderer.dispose();
    };
  }, [sceneMode]);

  return (
    <section className="section sec-light centrepiece-section" id="centrepiece" aria-labelledby="glasshouse-title">
      <div className="container centrepiece-grid">
        <div className="centrepiece-info" data-reveal>
          <span className="eyebrow">Architectural Centrepiece</span>
          <h2 id="glasshouse-title">
            Financing Built Around <span className="text-gold">Your Vision.</span>
          </h2>
          <p>
            Experience our interactive 3D architectural showcase. Rotate the glass-house to explore verified loan features, energy-efficient home concessions, and structural disbursals.
          </p>

          <div className="centrepiece-hotspots-nav">
            <button
              type="button"
              className={`hotspot-btn ${activeHotspot === 'penthouse' ? 'active' : ''}`}
              onClick={() => setActiveHotspot(activeHotspot === 'penthouse' ? null : 'penthouse')}
            >
              <span className="dot gold" /> Master Penthouse Suite
            </button>
            <button
              type="button"
              className={`hotspot-btn ${activeHotspot === 'terrace' ? 'active' : ''}`}
              onClick={() => setActiveHotspot(activeHotspot === 'terrace' ? null : 'terrace')}
            >
              <span className="dot blue" /> Cantilever Pool & Terrace
            </button>
            <button
              type="button"
              className={`hotspot-btn ${activeHotspot === 'green' ? 'active' : ''}`}
              onClick={() => setActiveHotspot(activeHotspot === 'green' ? null : 'green')}
            >
              <span className="dot gold" /> Solar & Green Architecture
            </button>
          </div>

          {activeHotspot && (
            <div className="hotspot-detail-card glass" role="region" aria-live="polite">
              {activeHotspot === 'penthouse' && (
                <>
                  <h4>🏡 Master Penthouse Suite Financing</h4>
                  <p>Eligible for high-value home borrowing up to ₹10 Crore with competitive 8.35% p.a. interest and 30-year structured tenures.</p>
                  <a className="link-btn text-gold" href="#calculator">Calculate Penthouse EMI →</a>
                </>
              )}
              {activeHotspot === 'terrace' && (
                <>
                  <h4>🏊 Luxury Terrace & Renovation Loans</h4>
                  <p>Flexible top-up financing for home extensions, landscaping, and private terrace amenities at minimal documentation.</p>
                  <a className="link-btn text-gold" href="#eligibility">Check Top-Up Limit →</a>
                </>
              )}
              {activeHotspot === 'green' && (
                <>
                  <h4>🌿 Green Home Subsidy & Concessions</h4>
                  <p>0.25% interest rate discount for IGBC/GRIHA certified eco-friendly villas and solar-powered residential projects.</p>
                  <a className="link-btn text-gold" href="#apply">Apply for Green Subsidy →</a>
                </>
              )}
            </div>
          )}

          <div className="centrepiece-metrics">
            <div>
              <strong>8.35%</strong>
              <small>Starting Interest Rate</small>
            </div>
            <div>
              <strong>30 Yrs</strong>
              <small>Maximum Flexible Tenure</small>
            </div>
            <div>
              <strong>₹10 Cr</strong>
              <small>Max Sanction Limit</small>
            </div>
          </div>
        </div>

        {/* 3D Glass House Visual Viewport */}
        <div className="centrepiece-viewport" data-reveal>
          <div className="glasshouse-stage">
            {sceneMode === 'fallback' ? (
              <div className="glasshouse-fallback">
                <img src="/assets/images/indian_family_home.jpg" alt="Luxury residential home" className="fallback-img" />
                <p className="fallback-caption">Interactive 3D model available on WebGL-enabled desktop screens.</p>
              </div>
            ) : (
              <canvas ref={canvasRef} className="glasshouse-canvas" aria-label="Interactive 3D glass house architectural model" />
            )}
            <div className="stage-hint" aria-hidden="true">
              <span>✦ Move cursor to tilt & explore in 3D</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
