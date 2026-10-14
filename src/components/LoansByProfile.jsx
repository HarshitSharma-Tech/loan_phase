import { useState } from 'react';

const PROFILES = [
  {
    id: 'salaried',
    name: 'Salaried Employees',
    icon: '💼',
    tagline: 'MNC, Corporate & Government Professionals',
    minIncome: '₹25,000 / month',
    tenure: 'Up to 30 Years (Home) / 5 Years (Personal)',
    maxBorrowing: 'Up to ₹75 Lakh Personal / ₹10 Crore Home',
    docs: [
      'Latest 3 months salary slips with breakdown',
      '6 months salary account bank statement',
      'PAN card & Aadhaar (DigiLocker enabled)',
      'Form 16 / Latest ITR proof'
    ],
    perks: ['Preferential interest rate tiers for Category-A corporates', 'Pre-approved express sanctions within hours', 'Zero physical branch visits required']
  },
  {
    id: 'self-employed',
    name: 'Self-Employed Professionals',
    icon: '🧑‍💻',
    tagline: 'Architects, Chartered Accountants, Legal Counsel & Consultants',
    minIncome: '₹5 Lakh annual net profit',
    tenure: 'Up to 20 Years (LAP/Home) / 5 Years (Unsecured)',
    maxBorrowing: 'Up to ₹1.5 Crore Professional Credit',
    docs: [
      'Professional qualification degree / COP certificate',
      'Last 2 years audited ITR with computation of income',
      '12 months primary operative bank statements',
      'KYC documents & office premise address proof'
    ],
    perks: ['Customized debt service ratios reflecting professional stability', 'Flexible OD / Drop-line overdraft facilities', 'Collateral-free sanctions up to ₹50 Lakh']
  },
  {
    id: 'business-owners',
    name: 'Business Owners & Directors',
    icon: '🏬',
    tagline: 'Private Limited, LLPs, Partnerships & Manufacturing Firms',
    minIncome: '₹40 Lakh annual audited turnover',
    tenure: 'Up to 7 Years (Unsecured) / 20 Years (Secured)',
    maxBorrowing: 'Up to ₹25 Crore Working Capital & LAP',
    docs: [
      'Audited balance sheets, P&L for past 2–3 financial years',
      '12 months GST returns (GSTR-3B & GSTR-1)',
      '12 months current bank account banking records',
      'Company incorporation certificate, MOA/AOA, GST certificate'
    ],
    perks: ['Cash flow-based underwriting without heavy collateral constraints', 'Letter of credit & bank guarantee syndication', 'Multi-lender consortium comparison']
  },
  {
    id: 'doctors',
    name: 'Doctors & Healthcare Specialists',
    icon: '🩺',
    tagline: 'Surgeons, Clinicians, Diagnostic Centers & Dental Specialists',
    minIncome: 'Practicing vintage > 2 years',
    tenure: 'Up to 15 Years',
    maxBorrowing: 'Up to ₹5 Crore Customized Doctor Credit',
    docs: [
      'Medical registration certificate (MCI / State Medical Council)',
      'Clinic registration certificate (if operating private practice)',
      '6 months primary bank statement',
      'Basic KYC documentation'
    ],
    perks: ['Zero balance sheet requirement for loans up to ₹50 Lakh', 'Equipment leasing & medical technology import finance', 'Uncapped top-up facility for hospital expansion']
  },
  {
    id: 'msme',
    name: 'Small Businesses & MSMEs',
    icon: '🏪',
    tagline: 'Traders, Retailers, Distributors & Service Providers',
    minIncome: 'Active business vintage > 18 months',
    tenure: 'Up to 5 Years',
    maxBorrowing: 'Up to ₹50 Lakh Collateral-Free Credit',
    docs: [
      'Udyam registration certificate / Trade license',
      'GST returns for last 12 months',
      '6 months operative bank statement',
      'Identity & establishment proof'
    ],
    perks: ['Government CGTMSE scheme backed collateral-free lending', 'Digital daily/weekly micro-repayment compatibility', 'Quick sanction in under 48 hours']
  }
];

export default function LoansByProfile({ onEnquire }) {
  const [selected, setSelected] = useState(PROFILES[0]);

  return (
    <section className="section sec-warm" id="applicants" aria-labelledby="profile-title">
      <div className="container">
        <div className="section-head text-center" data-reveal>
          <span className="eyebrow">Tailored Underwriting Framework</span>
          <h2 id="profile-title" className="section-title-refined">
            Financing Built Around Your Working Life
          </h2>
          <p className="section-subtitle-refined">
            Lending criteria should reflect how you earn. We match your specific vocational profile with lending institutions that value your income model.
          </p>
        </div>

        {/* Profile Selector Buttons */}
        <div className="profile-selector-row" data-reveal>
          {PROFILES.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`profile-pill ${selected.id === p.id ? 'is-selected' : ''}`}
              onClick={() => setSelected(p)}
            >
              <span className="profile-pill-icon">{p.icon}</span>
              <span className="profile-pill-name">{p.name}</span>
            </button>
          ))}
        </div>

        {/* Detailed Profile Blueprint Card */}
        <div className="profile-detail-card" data-reveal>
          <div className="profile-card-header">
            <div>
              <div className="profile-badge-row">
                <span className="profile-icon-large">{selected.icon}</span>
                <div>
                  <h3 className="profile-card-title">{selected.name}</h3>
                  <p className="profile-card-tagline">{selected.tagline}</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-gold btn-sm"
              onClick={() => onEnquire?.(selected.name)}
            >
              Check {selected.name} Eligibility <span>→</span>
            </button>
          </div>

          <div className="profile-specs-grid">
            <div className="profile-spec-item">
              <span className="spec-label">Income Eligibility</span>
              <strong className="spec-val">{selected.minIncome}</strong>
            </div>
            <div className="profile-spec-item">
              <span className="spec-label">Tenure Flexibility</span>
              <strong className="spec-val">{selected.tenure}</strong>
            </div>
            <div className="profile-spec-item">
              <span className="spec-label">Borrowing Potential</span>
              <strong className="spec-val">{selected.maxBorrowing}</strong>
            </div>
          </div>

          <div className="profile-columns-grid">
            <div className="profile-col">
              <h4 className="profile-col-title">Streamlined Documentation</h4>
              <ul className="profile-checklist">
                {selected.docs.map((doc) => (
                  <li key={doc}>
                    <span className="profile-doc-icon">📄</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="profile-col">
              <h4 className="profile-col-title">Privileged Program Highlights</h4>
              <ul className="profile-checklist">
                {selected.perks.map((perk) => (
                  <li key={perk}>
                    <span className="profile-perk-icon">★</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
