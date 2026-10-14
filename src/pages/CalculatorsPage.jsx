import LoanCalculator from '../components/LoanCalculator';

export default function CalculatorsPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header-banner">
        <div className="container">
          <span className="eyebrow">Financial Planning Studio</span>
          <h1 className="page-title">EMI &amp; Amortization Calculator</h1>
          <p className="page-lead">
            Simulate your exact monthly commitment. Adjust loan amount, interest rate, and tenure with real-time principal versus interest visualizations and full yearly schedules.
          </p>
        </div>
      </div>

      <LoanCalculator showHeader={false} />

      <section className="section sec-ivory" aria-labelledby="calc-cta-heading">
        <div className="container text-center">
          <span className="eyebrow">Next Steps</span>
          <h2 id="calc-cta-heading" className="section-title">Happy with your calculated numbers?</h2>
          <p className="section-subtitle">
            Find out how much you may be eligible to borrow based on your monthly income and obligations.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#/eligibility" className="btn btn-primary btn-md">
              Check Your Eligibility
            </a>
            <a href="#/contact" className="btn btn-secondary btn-md">
              Submit an Enquiry
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
