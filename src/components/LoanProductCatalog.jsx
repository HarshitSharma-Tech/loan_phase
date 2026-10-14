import { useState } from 'react';

const LOAN_PRODUCTS = [
  {
    id: 'personal',
    name: 'Personal Loan',
    category: 'personal',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    rate: 'From 10.49% p.a.',
    maxAmount: 'Up to ₹40 Lakh',
    tenure: 'Up to 5 Years',
    desc: 'Unsecured personal financing for planned vacations, weddings, technology upgrades or urgent family priorities.',
    features: ['Zero collateral required', 'Minimal digital paperwork', 'Flexible repayment terms']
  },
  {
    id: 'insta-personal',
    name: 'Insta Personal Loan',
    category: 'personal',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    rate: 'From 11.25% p.a.',
    maxAmount: 'Up to ₹10 Lakh',
    tenure: 'Up to 3 Years',
    desc: 'Pre-approved digital lending for immediate cash flow needs with automated underwriting and same-day transfer.',
    features: ['Sanction in 10 minutes', '100% paperless verification', 'Instant bank account credit']
  },
  {
    id: 'business',
    name: 'Business Loan',
    category: 'business',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    rate: 'From 12.50% p.a.',
    maxAmount: 'Up to ₹75 Lakh',
    tenure: 'Up to 7 Years',
    desc: 'Growth capital, inventory financing, and working capital lines to scale your enterprise without giving up equity.',
    features: ['Collateral-free options', 'Custom repayment structures', 'GST-based simplified sanction']
  },
  {
    id: 'home',
    name: 'Home Loan',
    category: 'property',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    rate: 'From 8.40% p.a.',
    maxAmount: 'Up to ₹10 Crore',
    tenure: 'Up to 30 Years',
    desc: 'Turn architectural blueprints into reality. Attractive floating and fixed rate financing for residences and luxury villas.',
    features: ['PMAY interest subsidy eligible', 'Low processing fees', 'Doorstep legal verification']
  },
  {
    id: 'lap',
    name: 'Loan Against Property (LAP)',
    category: 'property',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    rate: 'From 9.20% p.a.',
    maxAmount: 'Up to ₹25 Crore',
    tenure: 'Up to 20 Years',
    desc: 'Unlock substantial capital by mortgaging your existing residential, commercial or industrial property.',
    features: ['High loan-to-value (up to 75%)', 'Lower EMIs over extended tenure', 'Dual-use: personal or business']
  },
  {
    id: 'gold',
    name: 'Gold Loan',
    category: 'secured',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1" />
        <path d="M12 6v2m0 8v2" />
      </svg>
    ),
    rate: 'From 8.95% p.a.',
    maxAmount: 'Up to ₹1.5 Crore',
    tenure: 'Up to 3 Years',
    desc: 'Instant liquidity against gold jewellery with insured vault storage, fair market valuation and bullet repayment flexibility.',
    features: ['Highest per-gram value', 'Vault insurance included', 'No income proof mandated']
  },
  {
    id: 'education',
    name: 'Education Loan',
    category: 'personal',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    rate: 'From 9.50% p.a.',
    maxAmount: 'Up to ₹1.5 Crore',
    tenure: 'Up to 15 Years',
    desc: 'Finance tuition, accommodation, and living costs at premier universities across USA, UK, Canada, Europe, and India.',
    features: ['Moratorium period during study', 'Section 80E tax benefits', 'Co-signer flexible norms']
  },
  {
    id: 'vehicle',
    name: 'Car & Two-Wheeler Loans',
    category: 'secured',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11 2 11.5 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
    rate: 'From 8.75% p.a.',
    maxAmount: 'Up to ₹1 Crore',
    tenure: 'Up to 7 Years',
    desc: 'Own your dream automobile or electric vehicle with up to 100% on-road funding and prompt dealership tie-ups.',
    features: ['Up to 100% on-road finance', 'EV special interest discount', 'Express showroom delivery']
  },
  {
    id: 'medical',
    name: 'Medical Emergency Loan',
    category: 'personal',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    rate: 'From 10.80% p.a.',
    maxAmount: 'Up to ₹25 Lakh',
    tenure: 'Up to 4 Years',
    desc: 'Instant financial cushion for unexpected surgeries, specialised treatments, or medical equipment requirements.',
    features: ['Same-day direct sanction', 'Direct hospital settlement option', 'Zero prepayment penalty']
  },
  {
    id: 'securities',
    name: 'Loan Against Securities (LAS)',
    category: 'secured',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    rate: 'From 9.00% p.a.',
    maxAmount: 'Up to ₹5 Crore',
    tenure: 'Revolving Line',
    desc: 'Leverage mutual funds, listed equities, and sovereign bonds for liquidity without selling your wealth investments.',
    features: ['Pay interest only on drawn amount', 'Retain full dividend & bonus rights', '100% digital lien pledge']
  },
  {
    id: 'debt-consolidation',
    name: 'Debt Consolidation Loan',
    category: 'personal',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    rate: 'From 10.99% p.a.',
    maxAmount: 'Up to ₹35 Lakh',
    tenure: 'Up to 6 Years',
    desc: 'Replace multiple high-interest credit card bills and personal loans with a single, lower-rate monthly EMI.',
    features: ['Reduce monthly payout by up to 40%', 'Single easy repayment schedule', 'Safeguards credit score rating']
  },
  {
    id: 'easy-emi',
    name: 'Easy EMI Consumer Loan',
    category: 'personal',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    rate: 'From 0% Promotional',
    maxAmount: 'Up to ₹5 Lakh',
    tenure: 'Up to 24 Months',
    desc: 'Split lifestyle appliances, electronics, luxury home furnishings, and travel bookings into zero or low-cost EMIs.',
    features: ['Instant point-of-sale approval', 'No down payment schemes', 'Wide merchant ecosystem']
  }
];

const TABS = [
  { id: 'all', label: 'All Financing (12)' },
  { id: 'personal', label: 'Personal & Lifestyle' },
  { id: 'property', label: 'Home & Real Estate' },
  { id: 'business', label: 'Business & Growth' },
  { id: 'secured', label: 'Secured & Wealth' }
];

export default function LoanProductCatalog({ onEnquire, showHeader = true }) {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? LOAN_PRODUCTS
    : LOAN_PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section className="section sec-warm" id="loans" aria-labelledby="catalog-title">
      <div className="container">
        {showHeader && (
          <div className="section-head text-center" data-reveal>
            <span className="eyebrow">Institutional Lending Portfolio</span>
            <h2 id="catalog-title" className="section-title-refined">
              Financing Shaped Around What Comes Next
            </h2>
            <p className="section-subtitle-refined">
              Explore our comprehensive suite of 12 structured loan solutions. Compare competitive interest rates, transparent terms, and flexible repayment tenures tailored to your financial goals.
            </p>
          </div>
        )}

        {/* Tab Filters */}
        <div className="catalog-tabs-container" data-reveal>
          <div className="catalog-tabs" role="tablist" aria-label="Loan Categories">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={activeTab === tab.id}
                className={`catalog-tab-btn ${activeTab === tab.id ? 'is-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="catalog-grid">
          {filtered.map((item, index) => (
            <article key={item.id} className="catalog-card" data-reveal data-delay={index * 0.04}>
              <div className="catalog-card-header">
                <div className="catalog-icon-box">{item.icon}</div>
                <div className="catalog-rate-badge">{item.rate}</div>
              </div>

              <h3 className="catalog-card-title">{item.name}</h3>
              <p className="catalog-card-desc">{item.desc}</p>

              <div className="catalog-metrics-row">
                <div className="catalog-metric">
                  <span className="catalog-metric-label">Max Limit</span>
                  <strong className="catalog-metric-val">{item.maxAmount}</strong>
                </div>
                <div className="catalog-metric">
                  <span className="catalog-metric-label">Tenure</span>
                  <strong className="catalog-metric-val">{item.tenure}</strong>
                </div>
              </div>

              <ul className="catalog-feature-list" aria-label="Key features">
                {item.features.map((feat) => (
                  <li key={feat}>
                    <span className="catalog-feature-check">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="catalog-card-actions">
                <button
                  type="button"
                  className="btn btn-gold btn-sm w-full"
                  onClick={() => onEnquire?.(item.name)}
                >
                  Apply for {item.name} <span>→</span>
                </button>
                <a href="#calculator" className="catalog-calc-link">
                  Calculate EMI
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Advisory Callout */}
        <div className="catalog-advisory-bar" data-reveal>
          <div className="advisory-text">
            <strong>Need bespoke structured credit above ₹25 Crore?</strong>
            <span>Our private capital desk assists large commercial borrowers and corporate directors with tailored debt syndication.</span>
          </div>
          <a href="#apply" className="btn btn-outline btn-sm">Speak with Senior Advisor ↗</a>
        </div>
      </div>
    </section>
  );
}
