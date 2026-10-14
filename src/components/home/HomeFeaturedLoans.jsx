import { ArrowRight, BookOpen, Bookmark } from 'lucide-react';

const ENTRIES = [
  {
    vol: 'VOL. I',
    page: 'PAGE 01',
    chapter: 'Chapter I // Residential Sanctuary',
    rate: 'From 8.40% p.a.',
    title: 'Residential & Custom Architectural Financing',
    narrative: '“Building our home was never just about bricks and mortar; it was about designing our sanctuary.” Access competitive floating and fixed home loans structured for extended peace of mind.',
    image: '/assets/images/indian_family_home.jpg',
    imageAlt: 'Contemporary family sanctuary residence',
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
    vol: 'VOL. II',
    page: 'PAGE 02',
    chapter: 'Chapter II // Commercial Scale',
    rate: 'From 12.50% p.a.',
    title: 'Business & Commercial Expansion Credit',
    narrative: '“Scale demands velocity.” Collateral-free working capital, machinery term loans, and credit facilities tailored to accelerate operational growth and supply-chain liquidity.',
    image: '/assets/images/indian_business_owner.jpg',
    imageAlt: 'Business founders scaling enterprise operations',
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
    vol: 'VOL. III',
    page: 'PAGE 03',
    chapter: 'Chapter III // Personal Horizon',
    rate: 'From 10.49% p.a.',
    title: 'Bespoke Milestone & Lifestyle Credit',
    narrative: '“Every personal milestone deserves unhindered momentum.” Unsecured individual capital for life celebrations, medical contingencies, higher education, or living space upgrades.',
    image: '/assets/images/personal_lifestyle_loan.jpg',
    imageAlt: 'Personal lifestyle and life milestones',
    specs: [
      { label: 'Tenure Horizon', value: 'Up to 5 Years' },
      { label: 'Sanction Ceiling', value: 'Up to ₹40 Lakh' },
      { label: 'Security Deposit', value: 'Zero Collateral', highlight: true }
    ],
    primaryHref: '#/loans/loan-personal',
    primaryLabel: 'Explore Personal Credit',
    secondaryHref: '#/calculators',
    secondaryLabel: 'Calculate EMI'
  },
  {
    vol: 'VOL. IV',
    page: 'PAGE 04',
    chapter: 'Chapter IV // Asset Equity',
    rate: 'From 9.20% p.a.',
    title: 'Loan Against Property & Liquid Equity',
    narrative: '“Unlocking value from the assets you’ve already created.” High-value liquidity secured against residential, commercial, or plot real estate with prolonged amortization flexibility.',
    image: '/assets/images/property_lap_sanctuary.jpg',
    imageAlt: 'Prime architectural property equity liquidity',
    specs: [
      { label: 'Tenure Horizon', value: 'Up to 20 Years' },
      { label: 'Sanction Ceiling', value: 'Up to ₹15 Crore' },
      { label: 'Loan-to-Value (LTV)', value: 'Up to 75%', highlight: true }
    ],
    primaryHref: '#/loans/loan-lap',
    primaryLabel: 'Explore Property Equity',
    secondaryHref: '#/calculators',
    secondaryLabel: 'Calculate EMI'
  }
];

export default function HomeFeaturedLoans() {
  return (
    <section className="section sec-diary" id="featured-loans" aria-labelledby="diary-loans-heading">
      <div className="container">
        {/* Section Header styled as an editorial journal introduction */}
        <div className="section-head text-center diary-head">
          <div className="diary-eyebrow">
            <Bookmark size={14} className="gold-accent" aria-hidden="true" />
            <span>The Finora Chronicles • Life Milestone Diary</span>
          </div>
          <h2 id="diary-loans-heading" className="section-title diary-title">
            Life’s Milestones, Recorded in Capital
          </h2>
          <p className="section-subtitle diary-subtitle">
            Every meaningful journey begins as an ambition written in a journal. Explore structured institutional financing designed around each defining chapter of your life.
          </p>
        </div>

        {/* Balanced 2x2 Diary Grid */}
        <div className="diary-grid">
          {ENTRIES.map((entry) => (
            <article className="diary-entry-card" key={entry.vol}>
              {/* Hanging Satin Bookmark Ribbon */}
              <div className="diary-bookmark-ribbon" aria-hidden="true">
                <span className="ribbon-text">{entry.vol}</span>
              </div>

              {/* Card Banner Media */}
              <div className="diary-media-wrap" aria-hidden="true">
                <img
                  src={entry.image}
                  alt={entry.imageAlt}
                  className="diary-entry-img"
                  loading="lazy"
                />
                <div className="diary-img-vignette" />
                <div className="diary-page-stamp">{entry.page}</div>
              </div>

              {/* Card Body */}
              <div className="diary-body">
                <div className="diary-entry-meta">
                  <span className="diary-chapter-label">{entry.chapter}</span>
                  <span className="diary-rate-badge">{entry.rate}</span>
                </div>

                <h3 className="diary-entry-heading">{entry.title}</h3>
                
                <p className="diary-entry-narrative">{entry.narrative}</p>

                {/* 3-Column Structured Financial Specs */}
                <div className="diary-ledger-specs">
                  {entry.specs.map((spec) => (
                    <div className="diary-spec-item" key={spec.label}>
                      <span className="diary-spec-label">{spec.label}</span>
                      <strong className={`diary-spec-val ${spec.highlight ? 'highlight-gold' : ''}`}>
                        {spec.value}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="diary-card-actions">
                  <a href={entry.primaryHref} className="btn btn-gold btn-md">
                    {entry.primaryLabel} <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <a href={entry.secondaryHref} className="diary-action-link">
                    {entry.secondaryLabel} <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Diary Catalog Navigation Strip */}
        <div className="diary-ledger-strip">
          <div className="strip-info">
            <BookOpen size={20} className="gold-accent" aria-hidden="true" />
            <span>Browse the complete archive of 12 financing chapters (Education, Vehicle, Gold &amp; Professional)</span>
          </div>
          <a href="#/loans" className="btn btn-primary btn-sm">
            View Complete Archive <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
