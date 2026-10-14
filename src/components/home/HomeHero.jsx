import { ArrowRight, Calculator } from 'lucide-react';

export default function HomeHero() {
  return (
    <section className="home-hero" aria-labelledby="hero-heading">
      <div className="container home-hero-container">
        <div className="home-hero-content">
          <span className="hero-kicker">Finora Financial Services</span>
          <h1 id="hero-heading" className="home-hero-title">
            Your Financial Goals, <br className="hero-br" />
            <span className="text-midnight">Within Reach.</span>
          </h1>
          <p className="home-hero-lead">
            Explore financing options designed to help you take the next step with confidence. From homeownership to business expansion, access clear terms and transparent calculations.
          </p>

          <div className="home-hero-actions">
            <a href="#/loans" className="btn btn-primary btn-lg">
              Explore Loan Options <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#/calculators" className="btn btn-secondary btn-lg">
              <Calculator size={18} aria-hidden="true" /> Calculate Your EMI
            </a>
          </div>

          <div className="hero-trust-row">
            <div className="hero-trust-item">
              <span className="trust-dot" />
              <span>Standard Reducing-Balance Calculations</span>
            </div>
            <div className="hero-trust-item">
              <span className="trust-dot" />
              <span>Transparent Terms &amp; Zero Hidden Charges</span>
            </div>
            <div className="hero-trust-item">
              <span className="trust-dot" />
              <span>Free, Non-Binding Online Enquiries</span>
            </div>
          </div>
        </div>

        <div className="home-hero-visual">
          <div className="hero-image-card">
            <img
              src="/assets/images/indian_family_home.jpg"
              alt="Happy homeowners on balcony celebrating their new home"
              className="hero-main-img"
              loading="eager"
            />
            <div className="hero-card-badge">
              <span className="badge-gold-line" />
              <div>
                <strong>Home Loans from 8.40% p.a.</strong>
                <small>Flexible repayment tenures up to 30 years</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
