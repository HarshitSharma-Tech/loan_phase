import EligibilityChecker from '../components/EligibilityChecker';
import ApplicationSteps from '../components/ApplicationSteps';

export default function EligibilityPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header-banner">
        <div className="container">
          <span className="eyebrow">Borrowing Assessment</span>
          <h1 className="page-title">Loan Eligibility &amp; Criteria</h1>
          <p className="page-lead">
            Understand the key parameters lenders evaluate, estimate your borrowing headroom based on monthly income, and discover the 4-step journey to a decision.
          </p>
        </div>
      </div>

      <EligibilityChecker showHeader={false} />
      <ApplicationSteps />

      <section className="section sec-white text-center" aria-labelledby="elig-cta-title">
        <div className="container">
          <h2 id="elig-cta-title" className="section-title">Ready to take the next step?</h2>
          <p className="section-subtitle">
            Share your requirement with us once, and a dedicated loan specialist will review the best available options for you.
          </p>
          <div style={{ marginTop: '24px' }}>
            <a href="#/contact" className="btn btn-primary btn-md">
              Start Your Free Enquiry
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
