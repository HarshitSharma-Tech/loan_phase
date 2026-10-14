import React from 'react';

const LENDER_ITEMS = [
  { bank: 'HDFC Bank', rate: '8.50% p.a.', tag: 'Home Loans' },
  { bank: 'State Bank of India', rate: '8.40% p.a.', tag: 'Concessional Women Rates' },
  { bank: 'ICICI Bank', rate: '8.60% p.a.', tag: 'Instant Pre-Approval' },
  { bank: 'Axis Bank', rate: '8.55% p.a.', tag: 'Balance Transfer' },
  { bank: 'Kotak Mahindra', rate: '8.65% p.a.', tag: 'Rapid Disbursal' },
  { bank: 'Bank of Baroda', rate: '8.45% p.a.', tag: 'Zero Prepayment Fees' },
  { bank: 'Punjab National Bank', rate: '8.40% p.a.', tag: 'Up to 30 Yrs Tenure' },
];

const TENET_ITEMS = [
  '🏛️ 100% RBI-Regulated Lending Partners',
  '🔒 Bank-Grade 256-bit Encrypted KYC',
  '📄 Transparent APR • Zero Hidden Charges Guarantee',
  '⚡ In-Principle Digital Sanction in 10 Minutes',
  '🔄 Reducing-Balance EMI Repayment Structure',
  '🛡️ Zero Foreclosure Charges on Floating Rate Loans',
  '🤝 Dedicated Senior Finora Relationship Advisory',
  '💼 Tax Benefits under Section 24(b) & 80C'
];

export default function InfiniteMarquees() {
  return (
    <section className="marquee-section" aria-label="Partner Banks and Lending Principles">
      {/* Row 1: Moving Left (Partner Institutions & Competitive Rates) */}
      <div className="marquee-track-wrap left-wrap" role="region" aria-label="Partner Bank Rates">
        <div className="marquee-track track-left">
          {[...LENDER_ITEMS, ...LENDER_ITEMS].map((item, idx) => (
            <div className="marquee-pill lender-pill" key={`lender-${idx}`}>
              <span className="lender-name">{item.bank}</span>
              <span className="lender-rate">{item.rate}</span>
              <span className="lender-tag">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Moving Right (Financial Planning Tenets & Standards) */}
      <div className="marquee-track-wrap right-wrap" role="region" aria-label="Finora Lending Standards">
        <div className="marquee-track track-right">
          {[...TENET_ITEMS, ...TENET_ITEMS].map((text, idx) => (
            <div className="marquee-pill tenet-pill" key={`tenet-${idx}`}>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
