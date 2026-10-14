import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Building2, Home, Car, Compass } from 'lucide-react';

const ARCH_VISTAS = [
  {
    id: 'sanctuary',
    title: 'Architectural Sanctuaries',
    subtitle: 'Residential & Custom Estate Financing',
    rate: 'From 8.40% p.a.',
    tenure: 'Up to 30 Years',
    image: '/assets/hero-sequence/hero_stage_1.jpg',
    tagline: 'Private villas & custom residential architecture',
    icon: Home
  },
  {
    id: 'capital',
    title: 'Institutional Capital',
    subtitle: 'Commercial Scale & Enterprise Liquidity',
    rate: 'From 12.50% p.a.',
    tenure: 'Up to 7 Years',
    image: '/assets/hero-sequence/hero_stage_0.jpg',
    tagline: 'Corporate headquarters & enterprise expansion',
    icon: Building2
  },
  {
    id: 'mobility',
    title: 'Executive Mobility',
    subtitle: 'Asset Expansion & Bespoke Credit',
    rate: 'From 9.20% p.a.',
    tenure: '10-Min Sanction',
    image: '/assets/hero-sequence/hero_stage_2.jpg',
    tagline: 'Luxury automotive & personal capital milestones',
    icon: Car
  },
  {
    id: 'horizon',
    title: 'Skyward Horizons',
    subtitle: 'Multi-Generational Wealth & Liquid Equity',
    rate: 'From 9.20% p.a.',
    tenure: 'Up to 20 Years',
    image: '/assets/hero-sequence/hero_stage_3.jpg',
    tagline: 'Prime real estate equity & long-horizon advisory',
    icon: Compass
  }
];

export default function HomeHero() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Subtle auto-advance every 7 seconds if user does not interact
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ARCH_VISTAS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const activeVista = ARCH_VISTAS[activeIdx];

  return (
    <section className="arch-hero-split" aria-labelledby="hero-heading">
      <div className="container arch-hero-grid">
        {/* Left Editorial Composition */}
        <div className="arch-hero-content">
          <div className="arch-hero-kicker">
            <span className="kicker-dot" />
            <span>RBI-REGULATED PARTNERS • ARN-14820 • EST. 2014</span>
          </div>

          <h1 id="hero-heading" className="arch-hero-title">
            Your Next Chapter <br />
            <span className="serif-italic-bronze">Begins Here.</span>
          </h1>

          <p className="arch-hero-lead">
            Structured borrowing and bespoke private capital designed around the landmark acquisitions, architectural residences, and enterprise milestones that define your life.
          </p>

          <div className="arch-hero-ctas">
            <a href="#/loans" className="btn btn-bronze btn-lg">
              Explore Loan Options <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#/about" className="btn btn-outline-charcoal btn-lg">
              Discover Finora
            </a>
          </div>

          <div className="arch-hero-trust-bar">
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" aria-hidden="true" />
              <span>Transparent reducing calculations</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" aria-hidden="true" />
              <span>Clear terms upfront</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" aria-hidden="true" />
              <span>Non-binding enquiries</span>
            </div>
          </div>
        </div>

        {/* Right Immersive Architectural Imagery */}
        <div className="arch-hero-visual-frame">
          <div className="arch-hero-portal">
            {ARCH_VISTAS.map((vista, idx) => (
              <img
                key={vista.id}
                src={vista.image}
                alt={vista.title}
                className={`arch-portal-img ${idx === activeIdx ? 'is-active' : ''}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            ))}
            
            <div className="arch-portal-overlay" />

            {/* Architectural Floating Specification Badge */}
            <div className="arch-portal-badge">
              <div className="badge-header">
                <span className="badge-category">{activeVista.subtitle}</span>
                <span className="badge-rate">{activeVista.rate}</span>
              </div>
              <h3 className="badge-title">{activeVista.title}</h3>
              <p className="badge-desc">{activeVista.tagline}</p>
            </div>
          </div>

          {/* Architectural Selector Strip */}
          <div className="arch-vista-nav" role="tablist" aria-label="Architectural Portfolio Vista">
            {ARCH_VISTAS.map((vista, idx) => {
              const Icon = vista.icon;
              return (
                <button
                  key={vista.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIdx}
                  className={`vista-tab ${idx === activeIdx ? 'is-active' : ''}`}
                  onClick={() => setActiveIdx(idx)}
                >
                  <Icon size={14} className="vista-tab-icon" aria-hidden="true" />
                  <span className="vista-tab-label">{vista.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
