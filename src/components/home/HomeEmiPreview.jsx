import { useMemo, useState } from 'react';
import { calcEmi, formatINR, clamp } from '../../lib/finance';
import { ArrowRight, Calculator } from 'lucide-react';

export default function HomeEmiPreview() {
  const [amount, setAmount] = useState(3000000);
  const [rate, setRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const P = clamp(Number(amount) || 0, 100000, 50000000);
  const R = clamp(Number(rate) || 0, 5, 25);
  const Y = clamp(Number(tenureYears) || 0, 1, 30);

  const emi = useMemo(() => calcEmi(P, R, Y), [P, R, Y]);
  const totalMonths = Y * 12;
  const totalPayment = emi * totalMonths;
  const totalInterest = Math.max(totalPayment - P, 0);

  return (
    <section className="section sec-ivory" id="calculator-preview" aria-labelledby="calc-preview-heading">
      <div className="container">
        <div className="section-head text-center">
          <div className="arch-section-label justify-center">
            <span className="label-line" />
            <span>FINANCIAL INTELLIGENCE // EMI CALCULATOR</span>
          </div>
          <h2 id="calc-preview-heading" className="arch-section-title">
            Estimate Your Monthly Commitment
          </h2>
          <p className="arch-section-subtitle">
            Instant, transparent estimation using standard reducing-balance calculations before submitting an enquiry.
          </p>
        </div>

        <div className="emi-preview-card">
          <div className="emi-preview-controls">
            {/* Amount Slider */}
            <div className="preview-field">
              <div className="preview-field-head">
                <label htmlFor="preview-amount">Loan Amount</label>
                <span className="preview-field-val">{formatINR(P)}</span>
              </div>
              <input
                id="preview-amount"
                type="range"
                min={100000}
                max={20000000}
                step={50000}
                value={P}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="preview-slider"
                style={{ '--fill': `${((P - 100000) / (20000000 - 100000)) * 100}%` }}
                aria-label="Loan Amount Slider"
              />
              <div className="preview-field-range">
                <span>₹1 Lakh</span>
                <span>₹2 Crore</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="preview-field">
              <div className="preview-field-head">
                <label htmlFor="preview-rate">Interest Rate (p.a.)</label>
                <span className="preview-field-val">{R.toFixed(2)}%</span>
              </div>
              <input
                id="preview-rate"
                type="range"
                min={6}
                max={18}
                step={0.1}
                value={R}
                onChange={(e) => setRate(Number(e.target.value))}
                className="preview-slider"
                style={{ '--fill': `${((R - 6) / (18 - 6)) * 100}%` }}
                aria-label="Interest Rate Slider"
              />
              <div className="preview-field-range">
                <span>6%</span>
                <span>18%</span>
              </div>
            </div>

            {/* Tenure Slider */}
            <div className="preview-field">
              <div className="preview-field-head">
                <label htmlFor="preview-tenure">Tenure</label>
                <span className="preview-field-val">{Y} {Y === 1 ? 'Year' : 'Years'}</span>
              </div>
              <input
                id="preview-tenure"
                type="range"
                min={1}
                max={30}
                step={1}
                value={Y}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="preview-slider"
                style={{ '--fill': `${((Y - 1) / (30 - 1)) * 100}%` }}
                aria-label="Tenure Slider"
              />
              <div className="preview-field-range">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>

          {/* EMI Result Summary Box */}
          <div className="emi-preview-summary">
            <span className="summary-label">Estimated Monthly EMI</span>
            <div className="summary-emi-val">{formatINR(emi)}<small>/month</small></div>

            <div className="summary-split-grid">
              <div className="summary-split-item">
                <small>Principal Amount</small>
                <strong>{formatINR(P)}</strong>
              </div>
              <div className="summary-split-item">
                <small>Total Interest</small>
                <strong>{formatINR(totalInterest)}</strong>
              </div>
              <div className="summary-split-item">
                <small>Total Repayment</small>
                <strong>{formatINR(totalPayment)}</strong>
              </div>
            </div>

            <p className="summary-fineprint">
              *Calculated on a reducing-balance basis for illustrative purposes. Final terms are assigned by the lender.
            </p>

            <a href="#/calculators" className="btn btn-primary btn-block">
              <Calculator size={18} aria-hidden="true" />
              View Full Calculator &amp; Amortization Schedule <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
