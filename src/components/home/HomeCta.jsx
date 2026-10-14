import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomeCta() {
  return (
    <section className="home-cta-section" aria-labelledby="cta-heading">
      <div className="container">
        <div className="home-cta-card">
          <div className="home-cta-content">
            <div className="arch-section-label">
              <span className="label-line" />
              <span>YOUR NEXT CHAPTER // PREMIER FINANCIAL ADVISORY</span>
            </div>
            <h2 id="cta-heading" className="home-cta-title">
              Ready to Design Your Financial Future?
            </h2>
            <p className="home-cta-desc">
              Whether you are acquiring an architectural residence, scaling an enterprise, or unlocking asset equity, start with transparent calculations and bespoke advisory.
            </p>

            <div className="home-cta-badges">
              <span className="cta-badge-item">
                <CheckCircle2 size={16} aria-hidden="true" /> Free, non-binding online enquiry
              </span>
              <span className="cta-badge-item">
                <CheckCircle2 size={16} aria-hidden="true" /> Dedicated relationship advisory
              </span>
              <span className="cta-badge-item">
                <CheckCircle2 size={16} aria-hidden="true" /> Zero impact on bureau credit score
              </span>
            </div>
          </div>

          <div className="home-cta-actions">
            <a href="#/eligibility" className="btn btn-bronze btn-lg">
              Check Eligibility <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#/loans" className="btn btn-outline-ivory btn-lg">
              Explore All Loans
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
