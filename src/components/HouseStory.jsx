import { lazy, Suspense, useCallback, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { detectSceneMode } from '../lib/env';

gsap.registerPlugin(ScrollTrigger);

const HouseScene = lazy(() => import('./HouseScene'));

const CAPTIONS = [
  { k: '01', t: 'Imagine it', d: 'Every home begins as an idea. Start by exploring what you want to finance.' },
  { k: '02', t: 'Plan it', d: 'See what a monthly EMI could look like with our calculator before you apply.' },
  { k: '03', t: 'Move toward it', d: 'Share your requirement and take the next step toward your goal.' }
];

function FallbackHouse() {
  return (
    <svg className="house-svg" viewBox="0 0 320 200" role="img" aria-label="Line illustration of a modern two-storey house">
      <g fill="none" stroke="#8fb4ff" strokeWidth="1.6" strokeLinejoin="round" pathLength="1">
        <path pathLength="1" d="M10 180h300" />
        <path pathLength="1" d="M30 180V100h130v80" />
        <path pathLength="1" d="M24 100h142" />
        <path pathLength="1" d="M60 100V48h92v52" />
        <path pathLength="1" d="M54 48h104" />
        <path pathLength="1" d="M160 180v-60h110v60" />
        <path pathLength="1" d="M154 120h122" />
      </g>
      <g fill="rgba(255,156,0,.28)" stroke="#ffc766" strokeWidth="1.4">
        <rect pathLength="1" x="48" y="118" width="70" height="40" />
        <rect pathLength="1" x="74" y="62" width="64" height="26" />
        <rect pathLength="1" x="188" y="132" width="50" height="28" />
        <rect pathLength="1" x="124" y="130" width="22" height="50" />
      </g>
    </svg>
  );
}

export default function HouseStory() {
  const sectionRef = useRef(null);
  const veilRef = useRef(null);
  const progressRef = useRef(0);
  const [mode, setMode] = useState(detectSceneMode);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const handleFail = useCallback(() => setMode('fallback'), []);

  useLayoutEffect(() => {
    if (mode !== 'webgl') return undefined;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=240%',
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          progressRef.current = p;
          const idx = p < 0.3 ? 0 : p < 0.62 ? 1 : 2;
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
          }
          if (veilRef.current) {
            veilRef.current.style.opacity = String(Math.max(0, (p - 0.88) / 0.12));
          }
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [mode]);

  return (
    <section ref={sectionRef} className={`house-story ${mode}`} id="story" aria-labelledby="story-title">
      <div className="house-stage">
        <div className="house-copy">
          <p className="eyebrow">Your journey</p>
          <h2 id="story-title">From a line on a plan to a place you call home.</h2>
          <ol className="caption-list">
            {CAPTIONS.map((c, i) => (
              <li key={c.k} className={mode === 'webgl' && i !== active ? 'is-dim' : 'is-on'}>
                <span className="caption-k">{c.k}</span>
                <div>
                  <strong>{c.t}</strong>
                  <p>{c.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <a className="btn btn-gold" href="#calculator">Calculate Your EMI</a>
        </div>

        <div className="house-visual">
          {mode === 'webgl' ? (
            <Suspense fallback={null}>
              <HouseScene progressRef={progressRef} onFail={handleFail} />
            </Suspense>
          ) : (
            <div className="house-fallback">
              <FallbackHouse />
              <span className="fallback-note">Lightweight illustration shown on this device</span>
            </div>
          )}
        </div>
      </div>
      <div ref={veilRef} className="house-veil" aria-hidden="true" />
    </section>
  );
}
