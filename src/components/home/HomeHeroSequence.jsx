import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calculator, Sparkles } from 'lucide-react';
import { prefersReducedMotion } from '../../lib/env';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 80;
const FRAME_PREFIX = '/assets/hero-sequence/frame_';
const POSTER_START = '/assets/hero-sequence/poster_start.webp';

const STAGES = [
  {
    id: 'future',
    badge: '• RBI-REGULATED PARTNERS • ARN-14820 • EST. 2014',
    tag: 'Institutional Wealth & Lending',
    serifLine1: 'Your financial future,',
    italicAccent: 'within reach.',
    desc: 'Structured borrowing and bespoke private capital designed around the landmark acquisitions, architectural residences, and enterprise milestones that define your life.',
    hasCtas: true,
    trustLine: 'Transparent reducing calculations • Clear terms upfront • Non-binding enquiries',
    progressTarget: 0.05
  },
  {
    id: 'dream',
    badge: '• BESPOKE RESIDENTIAL FINANCING • RATES FROM 8.40% P.A.',
    tag: 'Architectural Sanctuaries',
    serifLine1: 'Life’s milestones,',
    italicAccent: 'made possible.',
    desc: 'Step into the residence you have always envisioned with low-interest, institutional home loans structured for extended peace of mind and family security.',
    hasCtas: false,
    exploreText: 'Explore Home Loans',
    exploreHref: '#/loans',
    trustLine: 'Zero prepayment penalty • Flexible tenures up to 30 years',
    progressTarget: 0.38
  },
  {
    id: 'ambition',
    badge: '• EXECUTIVE MOBILITY & ASSET EXPANSION • 10-MIN SANCTION',
    tag: 'Executive Mobility',
    serifLine1: 'Make your ambitions',
    italicAccent: 'possible.',
    desc: 'Accelerate your milestone investments, luxury mobility, and enterprise scaling with dedicated private capital advisory and 10-minute digital sanction.',
    hasCtas: false,
    exploreText: 'Check Your Eligibility',
    exploreHref: '#/eligibility',
    trustLine: 'Instant in-principle sanction • RBI compliant lending partners',
    progressTarget: 0.68
  },
  {
    id: 'next-move',
    badge: '• PRIVATE WEALTH CAPITAL • 100% TRANSPARENT ENQUIRY',
    tag: 'Skyward Horizons',
    serifLine1: 'Your next move',
    italicAccent: 'starts here.',
    desc: 'Structured borrowing designed around your lifetime goals, wealth compounding, and multi-generational security with zero hidden fees.',
    hasCtas: false,
    singleCta: true,
    exploreText: 'Explore All Loan Options',
    exploreHref: '#/loans',
    trustLine: 'Free online enquiry • Dedicated relationship advisory',
    progressTarget: 0.95
  }
];

export default function HomeHeroSequence() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const triggerRef = useRef(null);
  const targetIndexRef = useRef(0);

  const [activeStage, setActiveStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reduced] = useState(prefersReducedMotion);

  // Pre-generate subtle ambient starlight sparkle coordinates
  const sparkles = useMemo(() => [
    { top: '18%', left: '8%', delay: '0s', duration: '3.6s', scale: 0.9 },
    { top: '28%', left: '42%', delay: '1.2s', duration: '4.2s', scale: 1.1 },
    { top: '15%', left: '68%', delay: '0.6s', duration: '3.8s', scale: 0.8 },
    { top: '35%', left: '88%', delay: '2.1s', duration: '4.5s', scale: 1.0 },
    { top: '65%', left: '12%', delay: '1.8s', duration: '3.9s', scale: 0.7 },
    { top: '78%', left: '46%', delay: '0.4s', duration: '4.4s', scale: 1.2 },
    { top: '55%', left: '76%', delay: '2.5s', duration: '3.5s', scale: 0.85 },
    { top: '82%', left: '92%', delay: '1.5s', duration: '4.0s', scale: 0.95 },
    { top: '48%', left: '30%', delay: '0.9s', duration: '4.8s', scale: 0.75 },
    { top: '22%', left: '94%', delay: '2.8s', duration: '3.7s', scale: 1.05 }
  ], []);

  // Preload sequence frames progressively
  useEffect(() => {
    if (reduced) return undefined;

    const frames = new Array(TOTAL_FRAMES);

    const img1 = new Image();
    img1.src = `${FRAME_PREFIX}001.webp`;
    img1.onload = () => {
      frames[0] = img1;

      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const num = String(i).padStart(3, '0');
        img.src = `${FRAME_PREFIX}${num}.webp`;
        img.onload = () => {
          frames[i - 1] = img;
        };
      }
    };

    framesRef.current = frames;

    return () => {
      framesRef.current = [];
    };
  }, [reduced]);

  // Canvas drawing & GSAP ScrollTrigger timeline
  useEffect(() => {
    if (reduced) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let animId = 0;
    let currentIndex = 0;
    let lastReportedStage = 0;

    const render = () => {
      currentIndex += (targetIndexRef.current - currentIndex) * 0.18;
      const floorIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(currentIndex)));
      const ceilIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.ceil(currentIndex)));
      const frac = currentIndex - floorIdx;

      const frameA = framesRef.current[floorIdx] || framesRef.current[0];
      const frameB = framesRef.current[ceilIdx] || frameA;

      if (frameA && frameA.complete && frameA.naturalWidth > 0) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = window.innerWidth;
        const h = window.innerHeight;

        if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
          canvas.width = Math.round(w * dpr);
          canvas.height = Math.round(h * dpr);
        }

        ctx.save();
        ctx.scale(dpr, dpr);

        const imgW = frameA.naturalWidth;
        const imgH = frameA.naturalHeight;
        const scale = Math.max(w / imgW, h / imgH);
        const x = (w - imgW * scale) * 0.5;
        const y = (h - imgH * scale) * 0.5;

        // Draw primary frame
        ctx.drawImage(frameA, x, y, imgW * scale, imgH * scale);

        // Smooth sub-frame blend for continuous analog transition
        if (frameB && frameB !== frameA && frameB.complete && frameB.naturalWidth > 0 && frac > 0.02) {
          ctx.globalAlpha = frac;
          ctx.drawImage(frameB, x, y, imgW * scale, imgH * scale);
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Pinning scroll trigger for cinematic sequence with smooth scrub
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=190%',
      pin: true,
      scrub: 0.45,
      onUpdate: (self) => {
        const p = self.progress;
        targetIndexRef.current = p * (TOTAL_FRAMES - 1);
        setScrollProgress(p);

        let stage = 0;
        if (p >= 0.78) {
          stage = 3;
        } else if (p >= 0.50) {
          stage = 2;
        } else if (p >= 0.22) {
          stage = 1;
        }

        if (stage !== lastReportedStage) {
          lastReportedStage = stage;
          setActiveStage(stage);
        }
      }
    });

    triggerRef.current = trigger;

    return () => {
      cancelAnimationFrame(animId);
      trigger.kill();
    };
  }, [reduced]);

  const jumpToStage = useCallback((progressValue) => {
    targetIndexRef.current = progressValue * (TOTAL_FRAMES - 1);
    setScrollProgress(progressValue);

    let stage = 0;
    if (progressValue >= 0.78) stage = 3;
    else if (progressValue >= 0.50) stage = 2;
    else if (progressValue >= 0.22) stage = 1;
    setActiveStage(stage);

    if (triggerRef.current) {
      const start = triggerRef.current.start;
      const end = triggerRef.current.end;
      const targetScroll = start + (end - start) * progressValue;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }, []);

  const current = STAGES[activeStage] || STAGES[0];

  return (
    <section ref={containerRef} className="hero-editorial-section" id="hero-experience" aria-label="Finora Luxury Experience">
      {/* 1. Fullscreen Canvas Video Frame Scrubber */}
      <div className="hero-canvas-viewport" aria-hidden="true">
        {reduced ? (
          <img src={POSTER_START} alt="Finora Architecture" className="hero-poster-fallback" />
        ) : (
          <canvas ref={canvasRef} className="hero-full-canvas" />
        )}
      </div>

      {/* 2. Atmospheric Rich Gradient Bleed (Ensures Serif Typography is Pin-Sharp) */}
      <div className="hero-directional-wash" aria-hidden="true" />

      {/* 3. Drifting Ambient Starlight Particles */}
      <div className="hero-sparkles-layer" aria-hidden="true">
        {sparkles.map((s, i) => (
          <span
            key={i}
            className="hero-sparkle-mote"
            style={{
              top: s.top,
              left: s.left,
              animationDelay: s.delay,
              animationDuration: s.duration,
              transform: `scale(${s.scale})`
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* 4. Luxury Editorial Narrative Composition (No Opaque White Box) */}
      <div className="container hero-narrative-container">
        <div className="hero-narrative-zone" key={`narrative-${activeStage}`}>
          {/* Stately Pill Badge (AMFI-Registered Style) */}
          <div className="hero-luxe-pill-badge">
            <span className="badge-glow-dot" aria-hidden="true" />
            <span className="badge-text">{current.badge}</span>
          </div>

          {/* High-Contrast Editorial Heading (Grand Serif + Shimmering Italic) */}
          <h1 className="hero-cinema-title">
            <span className="hero-title-serif">{current.serifLine1}</span>
            <span className="hero-title-accent">{current.italicAccent}</span>
          </h1>

          {/* Refined Atmospheric Lead Description */}
          <p className="hero-cinema-lead">{current.desc}</p>

          {/* Luxury Action Buttons */}
          {current.singleCta ? (
            <div className="hero-cinema-actions">
              <a href={current.exploreHref} className="btn btn-emerald-pill btn-md">
                {current.exploreText} <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          ) : current.hasCtas ? (
            <div className="hero-cinema-actions">
              <a href="#/loans" className="btn btn-emerald-pill btn-md">
                Explore Loan Options <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="#/calculators" className="btn btn-glass-pill btn-md">
                <Calculator size={16} aria-hidden="true" /> Calculate Your EMI
              </a>
            </div>
          ) : (
            <div className="hero-cinema-actions">
              <a href={current.exploreHref} className="btn btn-emerald-pill btn-md">
                <span>{current.exploreText}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          )}

          {/* Editorial Trust Line */}
          {current.trustLine && (
            <div className="hero-cinema-trust">
              <Sparkles size={14} className="trust-sparkle-icon" aria-hidden="true" />
              <span>{current.trustLine}</span>
            </div>
          )}
        </div>
      </div>

      {/* 5. Understated Editorial Progression Nav (Stage names with active glow) */}
      <div className="hero-editorial-progress-bar" aria-label="Scroll narrative progression">
        <div className="container progress-bar-inner">
          <div className="progress-stages-nav">
            {STAGES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                className={`progress-marker ${activeStage === idx ? 'is-active' : ''}`}
                onClick={() => jumpToStage(s.progressTarget)}
                aria-label={`Jump to stage: ${s.tag}`}
              >
                <span className="marker-dot" />
                <span className="marker-name">{s.tag}</span>
              </button>
            ))}
          </div>

          <div
            className="progress-hairline-track"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const p = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              jumpToStage(p);
            }}
            role="slider"
            aria-label="Story progression"
            aria-valuenow={Math.round(scrollProgress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
          >
            <div className="progress-hairline-fill" style={{ width: `${Math.round(scrollProgress * 100)}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
