import { ArrowRight, BookOpen } from 'lucide-react';

const MILESTONES = [
  {
    chapter: 'CHAPTER 01',
    category: 'Residential Sanctuary',
    rate: 'From 8.40% p.a.',
    title: 'Residential & Custom Architectural Financing',
    narrative: '“Building our home was never just about bricks and mortar; it was about designing our sanctuary.” Access competitive floating and fixed home loans structured for extended peace of mind.',
    image: '/assets/images/indian_family_home.jpg',
    imageAlt: 'Family enjoying modern sunlit architectural living sanctuary',
    specs: [
      { label: 'Tenure Horizon', value: 'Up to 30 Years' },
      { label: 'Sanction Ceiling', value: 'Up to ₹10 Crore' },
      { label: 'Prepayment Terms', value: 'Zero Penalty', highlight: true }
    ],
    primaryHref: '#/loans/loan-home',
    primaryLabel: 'Explore Home Financing',
    secondaryHref: '#/calculators',
    secondaryLabel: 'Calculate EMI'
  },
  {
    chapter: 'CHAPTER 02',
    category: 'Commercial Velocity',
    rate: 'From 12.50% p.a.',
    title: 'Business & Commercial Expansion Credit',
    narrative: '“Scale demands velocity.” Collateral-free working capital, machinery term loans, and credit facilities tailored to accelerate operational growth and supply-chain liquidity.',
    image: '/assets/images/indian_business_owner.jpg',
    imageAlt: 'Business leaders scaling corporate operations',
    specs: [
      { label: 'Tenure Horizon', value: 'Up to 7 Years' },
      { label: 'Sanction Ceiling', value: 'Up to ₹5 Crore' },
      { label: 'Sanction Turnaround', value: '48 Hours', highlight: true }
    ],
    primaryHref: '#/loans/loan-business',
    primaryLabel: 'Explore Business Credit',
    secondaryHref: '#/calculators',
    secondaryLabel: 'Calculate EMI'
  },
  {
    chapter: 'CHAPTER 03',
    category: 'Personal Horizon',
    rate: 'From 10.49% p.a.',
    title: 'Bespoke Milestone & Lifestyle Credit',
    narrative: '“Every personal ambition deserves unhindered momentum.” Unsecured individual capital for milestone acquisitions, international education, medical contingencies, or residence upgrades.',
    image: '/assets/images/personal_lifestyle_loan.jpg',
    imageAlt: 'Personal lifestyle aspirations and milestones',
    specs: [
      { label: 'Tenure Horizon', value: 'Up to 5 Years' },
      { label: 'Sanction Ceiling', value: 'Up to ₹40 Lakh' },
      { label: 'Collateral Terms', value: 'Zero Security', highlight: true }
    ],
    primaryHref: '#/loans/loan-personal',
    primaryLabel: 'Explore Personal Credit',
    secondaryHref: '#/calculators',
    secondaryLabel: 'Calculate EMI'
  },
  {
    chapter: 'CHAPTER 04',
    category: 'Asset Liquidity',
    rate: 'From 9.20% p.a.',
    title: 'Loan Against Property & Liquid Equity',
    narrative: '“Unlocking value from the assets you’ve already created.” High-value liquidity secured against residential or commercial real estate with extended amortization flexibility.',
    image: '/assets/images/property_lap_sanctuary.jpg',
    imageAlt: 'Prime architectural property equity portfolio',
    specs: [
      { label: 'Tenure Horizon', value: 'Up to 20 Years' },
      { label: 'Sanction Ceiling', value: 'Up to ₹15 Crore' },
      { label: 'Loan-to-Value', value: 'Up to 75% LTV', highlight: true }
    ],
    primaryHref: '#/loans/loan-lap',
    primaryLabel: 'Explore Property Equity',
    secondaryHref: '#/calculators',
    secondaryLabel: 'Calculate EMI'
  }
];

export default function HomeFeaturedLoans() {
  return (
    <section className="arch-milestones-section" id="featured-loans" aria-labelledby="milestones-heading">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="arch-section-header">
          <div className="arch-section-label">
            <span className="label-line" />
            <span>FINORA PORTFOLIO // DEFINING CHAPTERS</span>
          </div>

          <h2 id="milestones-heading" className="arch-section-title">
            Life’s Milestones, Made Possible.
          </h2>

          <p className="arch-section-subtitle">
            Every meaningful journey begins with an ambition. Discover structured institutional lending designed around the defining milestones of your life with clear reducing terms and lifetime flexibility.
          </p>
        </div>

        {/* 2 Balanced Rows of Framed Photo Cards */}
        <div className="arch-milestones-grid">
          {MILESTONES.map((item) => (
            <article className="arch-editorial-card" key={item.chapter}>
              {/* Photo Frame in Each Card (Refined 16:10 Aspect Ratio) */}
              <div className="arch-card-frame">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="arch-card-photo"
                  loading="lazy"
                />
                <div className="arch-photo-overlay" />
                <span className="arch-photo-badge">{item.chapter}</span>
              </div>

              {/* Card Content Spread */}
              <div className="arch-card-content">
                <div className="arch-card-meta">
                  <span className="arch-category-tag">{item.category}</span>
                  <span className="arch-rate-pill">{item.rate}</span>
                </div>

                <h3 className="arch-card-heading">{item.title}</h3>

                <p className="arch-card-narrative">{item.narrative}</p>

                {/* Structured Financial Specs Ledger */}
                <div className="arch-specs-ledger">
                  {item.specs.map((spec) => (
                    <div className="arch-spec-col" key={spec.label}>
                      <span className="arch-spec-lbl">{spec.label}</span>
                      <strong className={`arch-spec-data ${spec.highlight ? 'is-highlight' : ''}`}>
                        {spec.value}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Card Action Controls */}
                <div className="arch-card-actions">
                  <a href={item.primaryHref} className="btn btn-bronze btn-md">
                    {item.primaryLabel} <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <a href={item.secondaryHref} className="arch-link-secondary">
                    {item.secondaryLabel} <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Editorial Archive Bottom Bar */}
        <div className="arch-archive-bar">
          <div className="archive-bar-info">
            <BookOpen size={20} className="archive-icon" aria-hidden="true" />
            <span>Browse our comprehensive portfolio of 12 financing solutions including Education, Mobility &amp; Professional Credit</span>
          </div>
          <a href="#/loans" className="btn btn-outline-charcoal btn-sm">
            View Complete Archive <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
