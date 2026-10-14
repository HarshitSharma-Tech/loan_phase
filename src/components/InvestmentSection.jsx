import { useState } from 'react';

const INVESTMENTS = [
  {
    id: 'fd',
    title: 'Fixed Deposits (FD)',
    badge: 'Guaranteed Returns',
    rate: 'Up to 8.50% p.a.',
    tenure: '7 Days to 10 Years',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M7 15h0M2 9.5h20" />
      </svg>
    ),
    desc: 'Park surplus funds with AAA-rated partner banks and NBFCs with fixed compounding interest and senior citizen yield premiums.',
    bullets: [
      '+0.50% p.a. additional interest for Senior Citizens',
      'Flexible payout options: Monthly, Quarterly or at Maturity',
      'Instant loan up to 90% against your active FD'
    ]
  },
  {
    id: 'rd',
    title: 'Recurring Deposits (RD)',
    badge: 'Disciplined Habit',
    rate: 'Up to 8.10% p.a.',
    tenure: '6 Months to 10 Years',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    desc: 'Systematically allocate monthly savings to accumulate substantial capital for down payments, vacations, or child milestones.',
    bullets: [
      'Start with as little as ₹1,000 monthly contribution',
      'Automated standing instruction via UPI or Net Banking',
      'Compound quarterly returns on every installment'
    ]
  },
  {
    id: 'schemes',
    title: 'Government Saving Schemes',
    badge: 'Sovereign Guarantee',
    rate: 'Up to 8.20% p.a.',
    tenure: '5 to 15 Years',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    desc: 'Highest safety benchmark backed by the Government of India, including PPF, Sukanya Samriddhi Yojana, and Senior Citizen Savings Scheme.',
    bullets: [
      'Triple tax exemption (EEE) on select instruments',
      '100% sovereign protection of capital',
      'Regulated under statutory Central Govt frameworks'
    ]
  },
  {
    id: 'mutual-funds',
    title: 'Mutual Funds & Wealth Advisory',
    badge: 'Market Capital Growth',
    rate: 'Benchmarked Yields',
    tenure: 'Flexible / Horizon-led',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    desc: 'Scientifically curated portfolios across Large-Cap, Mid-Cap, Hybrid and Liquid debt funds tailored to beat long-term inflation.',
    bullets: [
      'Systematic Investment Plans (SIP) starting ₹500/month',
      'Portfolio risk profiling & automated rebalancing',
      'Paperless direct plan investing with zero distributor commissions'
    ]
  }
];

export default function InvestmentSection({ onEnquire }) {
  const [selectedProduct, setSelectedProduct] = useState(INVESTMENTS[0]);

  return (
    <section className="section sec-travertine" id="investment" aria-labelledby="investment-title">
      <div className="container">
        {/* Banner with Penthouse Wealth Image */}
        <div className="investment-hero-banner" data-reveal>
          <div className="investment-hero-image-wrap">
            <img
              src="/assets/images/investments_wealth_growth.jpg"
              alt="Sophisticated private wealth investor overlooking architectural penthouse skyline"
              className="investment-hero-img"
              loading="lazy"
            />
            <div className="investment-hero-gradient" />
          </div>
          <div className="investment-hero-text">
            <span className="eyebrow">Wealth Architecture & Preservation</span>
            <h2 id="investment-title" className="investment-hero-title">
              Plan Beyond Borrowing. Multiply Your Capital.
            </h2>
            <p className="investment-hero-desc">
              Finora provides an integrated financial sanctuary. Alongside borrowing solutions, build generational security through high-yield fixed deposits, government savings instruments, and disciplined wealth portfolios.
            </p>
            <div className="investment-hero-stats">
              <div className="inv-stat">
                <strong>₹1,450+ Cr</strong>
                <span>Assets Under Advisory</span>
              </div>
              <div className="inv-stat">
                <strong>8.50% p.a.</strong>
                <span>Peak FD Rate Yield</span>
              </div>
              <div className="inv-stat">
                <strong>AAA Rated</strong>
                <span>Institutional Security</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Investment Pillar Cards */}
        <div className="investment-cards-grid">
          {INVESTMENTS.map((inv, i) => (
            <article
              key={inv.id}
              className={`investment-card ${selectedProduct.id === inv.id ? 'is-active-inv' : ''}`}
              data-reveal
              data-delay={i * 0.05}
              onClick={() => setSelectedProduct(inv)}
            >
              <div className="inv-card-top">
                <div className="inv-icon-box">{inv.icon}</div>
                <span className="inv-badge">{inv.badge}</span>
              </div>

              <h3 className="inv-card-title">{inv.title}</h3>
              <div className="inv-rate-pill">
                <span className="inv-rate-text">{inv.rate}</span>
                <span className="inv-tenure-text">{inv.tenure}</span>
              </div>

              <p className="inv-card-desc">{inv.desc}</p>

              <ul className="inv-bullet-list">
                {inv.bullets.map((b) => (
                  <li key={b}>
                    <span className="inv-bullet-check">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="inv-card-footer">
                <button
                  type="button"
                  className="btn btn-outline btn-sm w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnquire?.(`Investment: ${inv.title}`);
                  }}
                >
                  Start Saving with {inv.title.split(' ')[0]} <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Regulatory Disclosure */}
        <p className="investment-disclaimer-note" data-reveal>
          <strong>Investor Notice:</strong> Fixed Deposits with banks are insured by DICGC up to ₹5 Lakh per depositor. Mutual fund investments are subject to market risks; read all scheme-related documents carefully before investing. Historical yields are indicative and do not guarantee future returns.
        </p>
      </div>
    </section>
  );
}
