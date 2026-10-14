import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomeCta() {
  return (
    <section className="home-cta-section" aria-labelledby="cta-heading">
      <div className="container">
        <div className="home-cta-card">
          <div className="home-cta-content">
            <span className="cta-kicker">Take the Next Step</span>
            <h2 id="cta-heading" className="home-cta-title">
              Ready to Explore Your Financing Options?
            </h2>
            <p className="home-cta-desc">
              Whether you are planning a new home, funding higher education, or scaling your business, start with clear estimates and dedicated guidance.
            </p>

            <div className="home-cta-badges">
              <span className="cta-badge-item">
                <CheckCircle2 size={16} aria-hidden="true" /> Free online enquiry
              </span>
              <span className="cta-badge-item">
                <CheckCircle2 size={16} aria-hidden="true" /> Plain-language guidance
              </span>
              <span className="cta-badge-item">
                <CheckCircle2 size={16} aria-hidden="true" /> No impact on credit score
              </span>
            </div>
          </div>

          <div className="home-cta-actions">
            <a href="#/eligibility" className="btn btn-primary btn-lg">
              Check Eligibility <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#/loans" className="btn btn-outline-light btn-lg">
              Explore All Loans
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
