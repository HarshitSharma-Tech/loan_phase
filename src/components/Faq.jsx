import { useId, useState } from 'react';

const FAQS = [
  {
    q: 'How do I estimate my monthly EMI accurately?',
    a: 'Move the interactive sliders on our EMI calculator to select your principal amount, annual interest rate, and repayment tenure. The result is calculated instantly via the standard reducing-balance amortization formula: EMI = [P × r × (1+r)ⁿ] / [(1+r)ⁿ - 1]. You can also review the complete year-by-year amortization breakdown to see how your principal balance declines.'
  },
  {
    q: 'What key parameters affect my loan eligibility and sanction limit?',
    a: 'Lenders evaluate your net monthly income, existing active debt obligations (Fixed Obligation to Income Ratio or FOIR), CIBIL credit score (ideally 750+), employment stability (minimum 6 months in current firm or 2 years business vintage), and age criteria. Secured loans such as Home Loans and LAP additionally require title search, approved building plans, and independent property valuation.'
  },
  {
    q: 'Does using Finora’s calculators or eligibility checker impact my credit score?',
    a: 'Absolutely not. All calculators, DTI estimators, and interactive previews run entirely client-side inside your browser session. No bureau enquiry (hard pull) is triggered, so your TransUnion CIBIL, Experian, or CRIF High Mark credit scores remain completely unaffected.'
  },
  {
    q: 'What charges and fees should I check beyond the headline interest rate?',
    a: 'Always request the Annual Percentage Rate (APR). Review upfront loan processing fees (typically 0.25% to 2%), stamp duty charges, legal & technical verification valuation fees for property loans, documentation charges, penal interest on late payments, and GST (18%) applicable on financial service fees.'
  },
  {
    q: 'Can I prepay or foreclose my loan early without penalty?',
    a: 'Under Reserve Bank of India (RBI) guidelines, floating-rate term loans granted to individual borrowers (such as home loans and LAP) cannot carry any foreclosure or prepayment penalties. Fixed-rate personal or business loans may attract a nominal charge (typically 2% to 4% on outstanding principal) if closed before completion of the minimum lock-in period.'
  },
  {
    q: 'Are investment returns on Fixed Deposits and Mutual Funds guaranteed?',
    a: 'Bank Fixed Deposits enjoy statutory deposit insurance through the DICGC (a wholly-owned subsidiary of RBI) covering up to ₹5,00,000 per depositor per bank. Sovereign saving schemes (like PPF) are guaranteed by the Government of India. Mutual fund investments fluctuate based on market movements and are subject to market risks; past performance is purely indicative.'
  },
  {
    q: 'How quickly are funds disbursed into my account after approval?',
    a: 'Digital Insta Personal Loans can be approved and disbursed within 10 to 60 minutes after paperless KYC and automated bank mandate authentication. Standard Personal and Business Loans generally disburse within 24 to 48 hours. Home Loans and LAP involve property legal title inspection and typically disburse in 5 to 7 working days.'
  },
  {
    q: 'What happens when I submit an application enquiry on Finora?',
    a: 'Your submitted request is immediately reviewed by our credit matching algorithm to identify the top 3 partner institutions offering you the lowest interest rate and optimal loan-to-value ratio. A dedicated financial specialist then reaches out via phone or email to assist with verification and doorstep documentation at zero brokerage cost.'
  }
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  const base = useId();

  return (
    <section className="section sec-travertine" id="faq" aria-labelledby="faq-title">
      <div className="container narrow">
        <div className="section-head text-center" data-reveal>
          <span className="eyebrow">Clarity & Confidence</span>
          <h2 id="faq-title" className="section-title-refined">
            Frequently Asked Questions
          </h2>
          <p className="section-subtitle-refined">
            Straightforward answers to the most important financing, credit assessment, and wealth preservation questions before you sign an agreement.
          </p>
        </div>
        <div className="faq-list" data-reveal>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`${base}-b${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${base}-p${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`${base}-p${i}`} role="region" aria-labelledby={`${base}-b${i}`} className="faq-panel">
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
