import { useRef } from 'react';
import { prefersReducedMotion } from '../lib/env';

const Icon = ({ name }) => {
  const common = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  switch (name) {
    case 'home': return <svg {...common}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></svg>;
    case 'building': return <svg {...common}><rect x="4" y="3" width="10" height="18" /><path d="M14 9h6v12h-6" /><path d="M8 7h2M8 11h2M8 15h2" /></svg>;
    case 'user': return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></svg>;
    case 'briefcase': return <svg {...common}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" /></svg>;
    case 'car': return <svg {...common}><path d="M5 16l1.5-5a2 2 0 011.9-1.4h7.2a2 2 0 011.9 1.4L19 16" /><rect x="3" y="16" width="18" height="4" rx="1" /><circle cx="7.5" cy="18" r=".6" /><circle cx="16.5" cy="18" r=".6" /></svg>;
    default: return <svg {...common}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>;
  }
};

const CATEGORIES = [
  { icon: 'home', name: 'Home Loan', blurb: 'Financing to buy, build or improve a home.' },
  { icon: 'building', name: 'Loan Against Property', blurb: 'Borrow against residential or commercial property you own.' },
  { icon: 'user', name: 'Personal Loan', blurb: 'Funds for planned expenses such as travel, education or medical needs.' },
  { icon: 'briefcase', name: 'Business Loan', blurb: 'Working-capital and growth financing for business owners.' },
  { icon: 'car', name: 'Vehicle Loan', blurb: 'Financing to bring home a car or two-wheeler.' },
  { icon: 'chart', name: 'Loan Against Mutual Funds', blurb: 'Liquidity against eligible mutual fund units, subject to lender policy.' }
];

function TiltCard({ cat, onEnquire }) {
  const ref = useRef(null);
  const motion = useRef(!prefersReducedMotion());

  const move = (e) => {
    if (!motion.current || e.pointerType === 'touch') return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
    el.style.setProperty('--rx', `${(0.5 - y) * 10}deg`);
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
  };
  const leave = () => {
    const el = ref.current;
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--rx', '0deg');
  };

  return (
    <article ref={ref} className="cat-card" onPointerMove={move} onPointerLeave={leave}>
      <div className="cat-glare" aria-hidden="true" />
      <div className="cat-icon"><Icon name={cat.icon} /></div>
      <h3>{cat.name}</h3>
      <p>{cat.blurb}</p>
      <div className="cat-actions">
        <button type="button" className="link-btn" onClick={() => onEnquire(cat.name)}>
          Enquire <span aria-hidden="true">→</span><span className="sr-only"> about {cat.name}</span>
        </button>
        <a className="link-btn muted" href="#calculator">Estimate EMI</a>
      </div>
    </article>
  );
}

export default function LoanCategories({ onEnquire }) {
  return (
    <section className="section sec-light" id="loans" aria-labelledby="loans-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow dark">Loan categories</p>
          <h2 id="loans-title">Financing shaped around what you want to achieve.</h2>
          <p>Choose a category to start an enquiry. Product availability, pricing, fees and eligibility are confirmed at application.</p>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((c, i) => (
            <div key={c.name} data-reveal data-delay={i * 0.06}>
              <TiltCard cat={c} onEnquire={onEnquire} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
