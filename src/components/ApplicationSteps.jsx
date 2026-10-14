import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/env';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { t: 'Plan', d: 'Use the EMI calculator and eligibility estimator to get a feel for your numbers.' },
  { t: 'Enquire', d: 'Share your requirement through the enquiry form.' },
  { t: 'Verify', d: 'Provide identity, income and property or business documents as requested.' },
  { t: 'Review', d: 'The lender assesses your application. Read every term in your offer before accepting.' }
];

export default function ApplicationSteps() {
  const ref = useRef(null);
  const [count, setCount] = useState(() => (prefersReducedMotion() ? STEPS.length : 1));
  const countRef = useRef(count);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      ref.current.style.setProperty('--p', '1');
      return undefined;
    }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 70%',
        end: 'bottom 65%',
        onUpdate: (self) => {
          const p = self.progress;
          ref.current.style.setProperty('--p', p.toFixed(3));
          const n = Math.min(STEPS.length, 1 + Math.floor(p * STEPS.length * 0.999 + 0.0001));
          if (n !== countRef.current) {
            countRef.current = n;
            setCount(n);
          }
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section sec-light" id="process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow dark">How it works</p>
          <h2 id="process-title">Four clear steps from idea to decision.</h2>
        </div>
        <ol ref={ref} className="steps" style={{ '--p': 0 }}>
          <span className="steps-track" aria-hidden="true"><span className="steps-fill" /></span>
          {STEPS.map((s, i) => (
            <li key={s.t} className={`step ${i < count ? 'is-active' : ''}`} aria-current={i === count - 1 ? 'step' : undefined}>
              <span className="step-dot" aria-hidden="true">{i + 1}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
