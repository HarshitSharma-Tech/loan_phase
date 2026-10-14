import React, { useState } from 'react';
import { calcEmi, formatINR } from '../lib/finance';

export default function AsymmetricBentoGrid({ onEnquire }) {
  // Mini interactive calculator state inside the bento preview card
  const [miniAmount, setMiniAmount] = useState(5000000); // 50 Lakhs
  const [miniTenure, setMiniTenure] = useState(20); // 20 years
  const miniRate = 8.5;

  const miniEmi = Math.round(calcEmi(miniAmount, miniRate, miniTenure));

  return (
    <section className="section sec-light bento-section" id="loans" aria-labelledby="bento-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow dark">Curated Financing</span>
          <h2 id="bento-title">Financing Shaped for Every Milestone.</h2>
          <p>
            Explore our tailored credit solutions designed with competitive institutional interest rates, flexible tenures, and complete digital transparency.
          </p>
        </div>

        <div className="bento-grid">
          {/* Card 1: Large Home Loan Feature (Spans 2 cols, 2 rows) */}
          <article className="bento-card bento-hero-card" data-reveal>
            <div className="bento-img-wrap" aria-hidden="true">
              <img
                src="/assets/images/indian_family_home.jpg"
                alt="Modern luxury Indian home"
                className="bento-img"
                loading="lazy"
              />
              <div className="bento-img-overlay" />
            </div>
            <div className="bento-card-content">
              <div className="bento-tag-row">
                <span className="bento-pill pill-gold">Flagship Feature</span>
                <span className="bento-pill pill-glass">From 8.35% p.a.</span>
              </div>
              <h3>Luxury Home Financing & Construction</h3>
              <p>
                From ready-to-move penthouses to custom architectural construction. Benefit from tenures up to 30 years and 0.5% concession on woman co-borrower applications.
              </p>
              <div className="bento-meta-list">
                <div><span>Max Sanction:</span> <strong>₹10 Crore</strong></div>
                <div><span>Processing:</span> <strong>100% Digital E-KYC</strong></div>
                <div><span>Prepayment:</span> <strong>Zero Penalty</strong></div>
              </div>
              <div className="bento-actions">
                <button
                  type="button"
                  className="btn btn-gold btn-sm"
                  onClick={() => onEnquire?.('Home Loan')}
                >
                  Apply for Home Loan
                </button>
                <a className="link-btn text-white" href="#calculator">
                  Calculate EMI →
                </a>
              </div>
            </div>
          </article>

          {/* Card 2: Instant Personal Loan */}
          <article className="bento-card bento-card-blue" data-reveal>
            <div className="bento-header-icon">⚡</div>
            <div className="bento-tag-row">
              <span className="bento-pill pill-sand">Instant Disbursal</span>
            </div>
            <h3>Digital Personal Loans</h3>
            <p>
              Unsecured personal credit up to ₹40 Lakhs. Disbursed directly into your salary account in as fast as 24 hours with zero branch visits.
            </p>
            <div className="bento-stat">
              <strong>10.25%</strong>
              <small>Starting Interest Rate</small>
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-sm btn-block"
              onClick={() => onEnquire?.('Personal Loan')}
            >
              Check Personal Eligibility
            </button>
          </article>

          {/* Card 3: Education & Global Study Loans */}
          <article className="bento-card bento-card-sand" data-reveal>
            <div className="bento-header-icon">🎓</div>
            <div className="bento-tag-row">
              <span className="bento-pill pill-blue">Education</span>
            </div>
            <h3>Global University & Career Loans</h3>
            <p>
              Cover 100% of international tuition, living expenses, and travel with comfortable moratorium repayment terms.
            </p>
            <div className="bento-stat">
              <strong>Up to ₹1.5 Cr</strong>
              <small>With Tax Benefits u/s 80E</small>
            </div>
            <button
              type="button"
              className="btn btn-blue btn-sm btn-block"
              onClick={() => onEnquire?.('Education Loan')}
            >
              Explore Education Credit
            </button>
          </article>

          {/* Card 4: Interactive Mini EMI Preview */}
          <article className="bento-card bento-card-interactive" data-reveal>
            <div className="bento-tag-row">
              <span className="bento-pill pill-gold">Interactive Preview</span>
            </div>
            <h3>Quick EMI Estimator</h3>
            <p>Slide to preview monthly commitment at indicative 8.5% rate:</p>

            <div className="mini-calc-sliders">
              <div className="mini-slider-row">
                <label>Amount: <strong>{formatINR(miniAmount)}</strong></label>
                <input
                  type="range"
                  min="1000000"
                  max="20000000"
                  step="500000"
                  value={miniAmount}
                  onChange={(e) => setMiniAmount(Number(e.target.value))}
                  aria-label="Loan amount slider"
                />
              </div>
              <div className="mini-slider-row">
                <label>Tenure: <strong>{miniTenure} Years</strong></label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={miniTenure}
                  onChange={(e) => setMiniTenure(Number(e.target.value))}
                  aria-label="Tenure slider"
                />
              </div>
            </div>

            <div className="mini-emi-output">
              <span className="label">Estimated Monthly EMI</span>
              <strong className="mini-emi-num">{formatINR(miniEmi)}</strong>
            </div>

            <a className="btn btn-blue btn-sm btn-block" href="#calculator">
              Open Full Amortization Schedule →
            </a>
          </article>

          {/* Card 5: Financial Planning & Balance Transfer */}
          <article className="bento-card bento-card-light" data-reveal>
            <div className="bento-header-icon">🔄</div>
            <div className="bento-tag-row">
              <span className="bento-pill pill-sand">Strategic Planning</span>
            </div>
            <h3>Home Loan Balance Transfer</h3>
            <p>
              Switch your existing high-cost home loan to Finora. Save lakhs in interest with our competitive rates and flexible top-up options.
            </p>
            <div className="bento-stat">
              <strong>Save ₹6.5L+</strong>
              <small>Average Borrower Interest Savings</small>
            </div>
            <button
              type="button"
              className="btn btn-blue btn-sm btn-block"
              onClick={() => onEnquire?.('Balance Transfer')}
            >
              Calculate Transfer Savings
            </button>
          </article>

          {/* Card 6: 1-Click Eligibility Path */}
          <article className="bento-card bento-card-cta" data-reveal>
            <div className="bento-tag-row">
              <span className="bento-pill pill-gold">Instant Evaluation</span>
            </div>
            <h3>Check Your Pre-Approved Borrowing Power</h3>
            <p>
              Takes only 60 seconds with zero paperwork and zero impact on your CIBIL credit score.
            </p>
            <a className="btn btn-gold btn-block" href="#eligibility">
              Check Eligibility Now ⚡
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
