import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/env';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 72;
const FRAME_PREFIX = '/assets/hero-sequence/frame_';
const POSTER_END = '/assets/hero-sequence/frame_071.webp';

const CHAPTERS = [
  {
    id: 'concept',
    tag: '01 / ARCHITECTURAL DRAFT',
    title: 'Every landmark home begins with a line.',
    accent: 'with a line.',
    desc: 'From initial drafting sketches to institutional capital structures. Finora finances the spaces where life and legacy unfold.',
    rate: 'From 8.35% p.a.',
    pill: 'Concept',
    progressTarget: 0.05
  },
  {
    id: 'structure',
    tag: '02 / STRUCTURAL REALIZATION',
    title: 'Stepping through the threshold of certainty.',
    accent: 'of certainty.',
    desc: '10-minute digital in-principle approval. Zero foreclosure charges on floating rates with RBI-regulated lending partners.',
    rate: '10-Min Sanction',
    pill: 'Threshold',
    progressTarget: 0.50
  },
  {
    id: 'sanctuary',
    tag: '03 / LIVING SANCTUARY',
    title: 'Your dreams. Within reach.',
    accent: 'Within reach.',
    desc: 'Sunlit double-height architecture and family serenity. Bespoke home loans with flexible repayment tenures up to 30 years.',
    rate: 'Up to ₹10 Crore',
    pill: 'Sanctuary',
    progressTarget: 0.95
  }
];

export default function HeroSequence() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const triggerRef = useRef(null);

  const [activePhase, setActivePhase] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameNum, setCurrentFrameNum] = useState(0);
  const [reduced] = useState(prefersReducedMotion);

  // Preload frames progressively
  useEffect(() => {
    if (reduced) return undefined;

    const frames = new Array(TOTAL_FRAMES);

    const img0 = new Image();
    img0.src = `${FRAME_PREFIX}000.webp`;
    img0.onload = () => {
      frames[0] = img0;

      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        const num = String(i).padStart(3, '0');
        img.src = `${FRAME_PREFIX}${num}.webp`;
        img.onload = () => {
          frames[i] = img;
        };
      }
    };

    framesRef.current = frames;

    return () => {
      framesRef.current = [];
    };
  }, [reduced]);

  // Full-bleed Canvas drawing & ScrollTrigger setup
  useEffect(() => {
    if (reduced) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let animId = 0;
    let targetIndex = 0;
    let currentIndex = 0;
    let lastReportedPhase = 0;
    let lastReportedFrame = 0;

    const render = () => {
      currentIndex += (targetIndex - currentIndex) * 0.18;
      const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentIndex)));

      if (idx !== lastReportedFrame) {
        lastReportedFrame = idx;
        setCurrentFrameNum(idx);
      }

      const frame = framesRef.current[idx] || framesRef.current[0];
      if (frame && frame.complete && frame.naturalWidth > 0) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = window.innerWidth;
        const h = window.innerHeight;

        if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
          canvas.width = Math.round(w * dpr);
          canvas.height = Math.round(h * dpr);
        }

        ctx.save();
        ctx.scale(dpr, dpr);

        // Aspect fill to cover the entire hero section seamlessly
        const imgW = frame.naturalWidth;
        const imgH = frame.naturalHeight;
        const scale = Math.max(w / imgW, h / imgH);
        const x = (w - imgW * scale) * 0.5;
        const y = (h - imgH * scale) * 0.5;

        ctx.drawImage(frame, x, y, imgW * scale, imgH * scale);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Pinning scroll trigger for sequence
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=180%',
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        targetIndex = p * (TOTAL_FRAMES - 1);
        setScrollProgress(p);

        let phase = 0;
        if (p >= 0.65) {
          phase = 2;
        } else if (p >= 0.32) {
          phase = 1;
        }

        if (phase !== lastReportedPhase) {
          lastReportedPhase = phase;
          setActivePhase(phase);
        }
      }
    });

    triggerRef.current = trigger;

    return () => {
      cancelAnimationFrame(animId);
      trigger.kill();
    };
  }, [reduced]);

  const jumpToChapter = useCallback((progressValue) => {
    if (!triggerRef.current) return;
    const start = triggerRef.current.start;
    const end = triggerRef.current.end;
    const targetScroll = start + (end - start) * progressValue;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, []);

  const currentChapter = CHAPTERS[activePhase] || CHAPTERS[0];

  return (
    <section ref={containerRef} className="hero-fullscreen-section" id="top" aria-label="Finora Dream Home Showcase">
      {/* 1. Fullscreen Video Canvas covering the ENTIRE Hero Section */}
      <div className="hero-full-canvas-wrap" aria-hidden="true">
        {reduced ? (
          <img src={POSTER_END} alt="Dream Home" className="hero-full-poster" />
        ) : (
          <canvas ref={canvasRef} className="hero-full-canvas" />
        )}
      </div>

      {/* 2. Soft Architectural Scrim (Warm, light, non-blue, subtle so the video shines) */}
      <div className="hero-architectural-scrim" aria-hidden="true" />

      {/* 3. Subtle Film Grain */}
      <div className="hero-natural-grain" aria-hidden="true" />

      {/* 4. Telemetry Corner Markers (Refined, architectural) */}
      <div className="hero-telemetry-bar" aria-hidden="true">
        <div className="telemetry-pill">
          <span className="dot-pulse" />
          <span>FINORA ARCHITECTURAL RESIDENTIAL SERIES</span>
        </div>
        <div className="telemetry-counter">
          <span>FRAME</span>
          <strong>{String(currentFrameNum).padStart(3, '0')}</strong>
          <span className="dim">/ 071</span>
        </div>
      </div>

      {/* 5. Elegant, Simple, Non-Bold Editorial Content (Morphs on zoom/scroll) */}
      <div className="container hero-full-content">
        <div className="hero-editorial-panel">
          <div className="hero-eyebrow-tag" key={`tag-${activePhase}`}>
            <span>{currentChapter.tag}</span>
            <span className="tag-sep">•</span>
            <span className="tag-rate">{currentChapter.rate}</span>
          </div>

          <div className="hero-heading-box" key={`head-${activePhase}`}>
            <h1 className="hero-editorial-heading" id="hero-title">
              {currentChapter.title}
            </h1>
            <p className="hero-editorial-paragraph">
              {currentChapter.desc}
            </p>
          </div>

          <div className="hero-cta-group">
            <a className="btn btn-primary-gold" href="#eligibility">
              Check Your Eligibility
            </a>
            <a className="btn btn-minimal-outline" href="#calculator">
              Calculate EMI
            </a>
          </div>

          {/* Simple Trust Pills */}
          <div className="hero-trust-row" aria-hidden="true">
            <span className="trust-item">RBI Regulated NBFCs</span>
            <span className="trust-dot">•</span>
            <span className="trust-item">10-Min Sanction</span>
            <span className="trust-dot">•</span>
            <span className="trust-item">Zero Foreclosure Penalty</span>
          </div>
        </div>
      </div>

      {/* 6. Minimalist Interactive Scrub Controller at the bottom */}
      <div className="hero-bottom-scrubber">
        <div className="container scrubber-inner">
          <div className="scrubber-chapters" role="tablist" aria-label="Transformation Stages">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                role="tab"
                aria-selected={activePhase === idx}
                className={`scrubber-step-btn ${activePhase === idx ? 'is-active' : ''}`}
                onClick={() => jumpToChapter(ch.progressTarget)}
              >
                <span className="step-num">0{idx + 1}</span>
                <span className="step-title">{ch.pill}</span>
              </button>
            ))}
          </div>

          <div
            className="scrubber-track-bar"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const p = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              jumpToChapter(p);
            }}
            role="slider"
            aria-label="Video zoom progress"
            aria-valuenow={Math.round(scrollProgress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
          >
            <div className="scrubber-track-fill" style={{ width: `${Math.round(scrollProgress * 100)}%` }} />
            <div className="scrubber-track-thumb" style={{ left: `${Math.round(scrollProgress * 100)}%` }} />
          </div>

          <div className="scrubber-hint">
            <span>Scroll with mouse wheel to zoom into home</span>
            <span className="scrubber-pct">{Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
