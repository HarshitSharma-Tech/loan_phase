import { useState } from 'react';

const LOAN_TYPES = [
  { id: 'home', name: 'Home Loan', rate: 8.40, min: 1000000, max: 50000000, step: 500000, defaultAmt: 4500000, defaultTenure: 20 },
  { id: 'business', name: 'Business Loan', rate: 12.50, min: 200000, max: 7500000, step: 100000, defaultAmt: 2500000, defaultTenure: 5 },
  { id: 'personal', name: 'Personal Loan', rate: 10.49, min: 100000, max: 4000000, step: 50000, defaultAmt: 800000, defaultTenure: 4 },
  { id: 'lap', name: 'Loan Against Property', rate: 9.20, min: 2500000, max: 100000000, step: 1000000, defaultAmt: 15000000, defaultTenure: 15 }
];

export default function FintechHero({ onEnquire }) {
  const [activeType, setActiveType] = useState(LOAN_TYPES[0]);
  const [amount, setAmount] = useState(LOAN_TYPES[0].defaultAmt);
  const [tenureYears, setTenureYears] = useState(LOAN_TYPES[0].defaultTenure);

  const handleTypeChange = (type) => {
    setActiveType(type);
    setAmount(type.defaultAmt);
    setTenureYears(type.defaultTenure);
  };

  // Calculate live EMI
  const monthlyRate = activeType.rate / 1200;
  const totalMonths = tenureYears * 12;
  const emi = Math.round(
    monthlyRate === 0
      ? amount / totalMonths
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
  const totalRepayment = emi * totalMonths;
  const totalInterest = totalRepayment - amount;

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="fintech-hero-section" id="hero">
      {/* Ambient background glow and grid */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-fintech-grid-pattern" aria-hidden="true" />

      <div className="container hero-fintech-container">
        {/* Left Column: Authoritative Financial Copy */}
        <div className="hero-fintech-copy" data-reveal>
          <div className="hero-fintech-pill">
            <span className="live-indicator-dot" />
            <span className="pill-text">INSTITUTIONAL LENDING CONSORTIUM · REPO LINKED</span>
          </div>

          <h1 className="hero-fintech-headline">
            Capital Engineered <br />
            <span className="hero-gradient-text">For Ambition.</span>
          </h1>

          <p className="hero-fintech-sub">
            Finora bridges high-intent borrowers with India's premier banking consortium. Access transparent credit from ₹1 Lakh to ₹25 Crore with automated underwriting, digital sanctioning, and zero hidden charges.
          </p>

          <div className="hero-fintech-actions">
            <a
              href="#apply"
              className="btn btn-fintech-gold"
              onClick={() => onEnquire?.(activeType.name)}
            >
              Check Pre-Approved Offer <span>↗</span>
            </a>
            <a href="#calculator" className="btn btn-fintech-outline">
              Explore Amortization Studio
            </a>
          </div>

          {/* Institutional Trust Highlights */}
          <div className="hero-fintech-badges">
            <div className="badge-item">
              <span className="badge-icon">🏛️</span>
              <div>
                <strong>RBI Regulated Partners</strong>
                <small>Top Scheduled Banks & NBFCs</small>
              </div>
            </div>
            <div className="badge-item">
              <span className="badge-icon">⚡</span>
              <div>
                <strong>10-Minute Sanction</strong>
                <small>Paperless DigiLocker Verification</small>
              </div>
            </div>
            <div className="badge-item">
              <span className="badge-icon">🔒</span>
              <div>
                <strong>256-Bit Bank Security</strong>
                <small>Zero Impact on CIBIL Score</small>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Loan Command Center */}
        <div className="hero-fintech-command-wrap" data-reveal data-delay="0.1">
          <div className="hero-command-card">
            <div className="command-card-header">
              <div className="command-status-badge">
                <span className="pulse-dot" />
                <span>Live Credit Simulator</span>
              </div>
              <div className="command-benchmark-rate">
                <span>Indicative Rate</span>
                <strong>{activeType.rate}% p.a.</strong>
              </div>
            </div>

            {/* Loan Type Selector */}
            <div className="command-type-selector">
              {LOAN_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`command-type-btn ${activeType.id === t.id ? 'is-active' : ''}`}
                  onClick={() => handleTypeChange(t)}
                >
                  {t.name}
                </button>
              ))}
            </div>

            {/* Interactive Amount Slider */}
            <div className="command-slider-box">
              <div className="slider-label-row">
                <span className="slider-label">Requested Sanction Amount</span>
                <span className="slider-val-highlight">{formatINR(amount)}</span>
              </div>
              <input
                type="range"
                className="fintech-range-input"
                min={activeType.min}
                max={activeType.max}
                step={activeType.step}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <div className="slider-range-ticks">
                <span>{formatINR(activeType.min)}</span>
                <span>{formatINR(activeType.max)}</span>
              </div>
            </div>

            {/* Interactive Tenure Slider */}
            <div className="command-slider-box">
              <div className="slider-label-row">
                <span className="slider-label">Repayment Tenure Horizon</span>
                <span className="slider-val-highlight">{tenureYears} {tenureYears === 1 ? 'Year' : 'Years'}</span>
              </div>
              <input
                type="range"
                className="fintech-range-input"
                min={1}
                max={activeType.id === 'home' ? 30 : activeType.id === 'lap' ? 20 : 7}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
              />
              <div className="slider-range-ticks">
                <span>1 Year</span>
                <span>{activeType.id === 'home' ? '30 Years' : activeType.id === 'lap' ? '20 Years' : '7 Years'}</span>
              </div>
            </div>

            {/* Live Financial Outflow Grid */}
            <div className="command-output-banner">
              <div className="emi-headline-block">
                <span className="emi-label">Estimated Monthly EMI</span>
                <div className="emi-big-number">{formatINR(emi)}<small>/month</small></div>
              </div>

              <div className="command-metrics-split">
                <div className="metric-cell">
                  <small>Principal Amount</small>
                  <strong>{formatINR(amount)}</strong>
                </div>
                <div className="metric-cell">
                  <small>Total Interest</small>
                  <strong>{formatINR(totalInterest)}</strong>
                </div>
              </div>

              {/* Bureau Credit Score Indicator */}
              <div className="command-cibil-meter">
                <div className="cibil-meter-header">
                  <span>Bureau Health Benchmark</span>
                  <strong className="cibil-score-val">785 / 900 · Excellent</strong>
                </div>
                <div className="cibil-bar">
                  <div className="cibil-fill" style={{ width: '87%' }} />
                </div>
                <small className="cibil-subtext">Qualifies for institutional Tier-1 interest discount</small>
              </div>
            </div>

            {/* Card CTA */}
            <button
              type="button"
              className="btn btn-fintech-gold btn-block"
              onClick={() => onEnquire?.(activeType.name)}
            >
              Proceed to Instant Sanction for {activeType.name} <span>→</span>
            </button>
            <p className="command-footnote">
              *Illustrative estimate. Final pricing linked to verified credit profile and lender appraisal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
