import { useState } from 'react';

const GUIDES = [
  {
    id: 'emi-mechanics',
    tag: 'Financial Mechanics',
    title: 'How Does an EMI Actually Work?',
    readTime: '4 min read',
    summary: 'Deconstructing the reducing balance formula. Discover how early EMIs consist mostly of interest, and how making small annual prepayments can shave years off your mortgage.',
    keyTakeaway: 'Prepaying just 1 extra EMI every year can reduce a 20-year loan tenure by over 4 years.',
    steps: [
      'Monthly Reducing Balance: Interest is recalculated each month only on remaining unpaid principal.',
      'Amortization Curve: In early years, up to 70% of your EMI goes towards interest servicing.',
      'Strategic Prepayment: Directing bonus income into principal prepayments creates exponential interest savings.'
    ]
  },
  {
    id: 'cibil-score',
    tag: 'Credit Health',
    title: 'The 750+ CIBIL Blueprint: Unlocking Preferred Rates',
    readTime: '5 min read',
    summary: 'Why lenders treat credit scores like personal trust ratings. Master credit utilization ratios, repayment discipline, and error rectification on your credit bureau report.',
    keyTakeaway: 'A score above 750 can unlock up to 0.75% lower interest rates—saving lakhs on large home loans.',
    steps: [
      'Credit Utilization: Never exceed 30% of your total credit card limits to avoid risk flags.',
      'Mix of Credit: Maintain a balanced portfolio of secured (home/auto) and unsecured facilities.',
      'Check Bureau Errors: Regularly dispute outdated defaults or mismatched PAN entries on TransUnion CIBIL.'
    ]
  },
  {
    id: 'docs-checklist',
    tag: 'Application Readiness',
    title: 'Complete Document Checklist for Express Sanctions',
    readTime: '3 min read',
    summary: 'Everything you need organized before applying. How digital KYC, DigiLocker, and Account Aggregator consent can fast-track sanction to less than 24 hours.',
    keyTakeaway: 'Submitting clean, un-password-protected PDFs with matching PAN names cuts processing time by 80%.',
    steps: [
      'Identity & Address: Aadhaar, PAN, Voter ID, or Passport linked to current mobile OTP.',
      'Income Records: Last 3 months payslips + Form 16 (Salaried) or 3-year audited ITRs (Business).',
      'Banking Evidence: 6 to 12 months primary operative account statements via Account Aggregator.'
    ]
  },
  {
    id: 'fixed-vs-floating',
    tag: 'Strategic Borrowing',
    title: 'Fixed vs Floating Rates: Choosing the Right Home Loan',
    readTime: '4 min read',
    summary: 'Navigate macroeconomic rate cycles. Understand repo-linked lending rates (RLLR), interest rate reset dates, and when fixing rates provides genuine security.',
    keyTakeaway: 'Floating rates carry zero prepayment penalties per RBI guidelines, making them ideal for agile pre-payers.',
    steps: [
      'Repo Rate Linkage: Floating rates adjust transparently whenever RBI revises benchmark policy repo rates.',
      'Prepayment Freedom: Unlike fixed-rate corporate debt, retail floating loans have no foreclosure lock-ins.',
      'Hybrid Options: Lock in fixed predictability for the initial 2–3 years, then transition to floating.'
    ]
  }
];

export default function GuidesLibrary() {
  const [activeGuide, setActiveGuide] = useState(GUIDES[0]);

  return (
    <section className="section sec-travertine" id="guides" aria-labelledby="guides-title">
      <div className="container">
        <div className="section-head text-center" data-reveal>
          <span className="eyebrow">Financial Literacy & Advisory</span>
          <h2 id="guides-title" className="section-title-refined">
            The Finora Knowledge & Strategy Library
          </h2>
          <p className="section-subtitle-refined">
            Equip yourself with institutional insight. Read practical guides on EMI math, credit score optimization, and mortgage architecture before committing to a loan contract.
          </p>
        </div>

        <div className="guides-interactive-layout" data-reveal>
          {/* Guide Selector Cards */}
          <div className="guides-list-col">
            {GUIDES.map((g) => (
              <div
                key={g.id}
                role="button"
                tabIndex={0}
                className={`guide-nav-card ${activeGuide.id === g.id ? 'is-active-guide' : ''}`}
                onClick={() => setActiveGuide(g)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveGuide(g);
                  }
                }}
              >
                <div className="guide-nav-meta">
                  <span className="guide-tag">{g.tag}</span>
                  <span className="guide-time">{g.readTime}</span>
                </div>
                <h3 className="guide-nav-title">{g.title}</h3>
                <p className="guide-nav-summary">{g.summary}</p>
                <span className="guide-nav-arrow" aria-hidden="true">Read Strategy →</span>
              </div>
            ))}
          </div>

          {/* Active Guide Deep Dive Card */}
          <div className="guide-expanded-view">
            <div className="guide-expanded-card">
              <div className="expanded-badge-row">
                <span className="guide-tag-highlight">{activeGuide.tag}</span>
                <span className="guide-read-indicator">⏱ {activeGuide.readTime}</span>
              </div>

              <h3 className="expanded-title">{activeGuide.title}</h3>
              <p className="expanded-intro">{activeGuide.summary}</p>

              <div className="expanded-takeaway-box">
                <div className="takeaway-icon">💡</div>
                <div>
                  <strong>Strategic Rule of Thumb</strong>
                  <p>{activeGuide.keyTakeaway}</p>
                </div>
              </div>

              <h4 className="expanded-steps-heading">Key Implementation Steps</h4>
              <ol className="expanded-steps-list">
                {activeGuide.steps.map((st) => (
                  <li key={st}>{st}</li>
                ))}
              </ol>

              <div className="expanded-action-row">
                <a href="#calculator" className="btn btn-gold btn-sm">
                  Test on EMI Calculator ↗
                </a>
                <a href="#eligibility" className="btn btn-outline btn-sm">
                  Verify Eligibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
