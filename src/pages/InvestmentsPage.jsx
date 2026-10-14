import InvestmentSection from '../components/InvestmentSection';

export default function InvestmentsPage({ onEnquire }) {
  return (
    <div className="page-wrapper">
      <div className="page-header-banner">
        <div className="container">
          <span className="eyebrow">Wealth Architecture</span>
          <h1 className="page-title">Savings &amp; Investment Solutions</h1>
          <p className="page-lead">
            Plan beyond borrowing. Build generational security through high-yield fixed deposits, government savings instruments, and disciplined wealth solutions.
          </p>
        </div>
      </div>

      <InvestmentSection onEnquire={onEnquire} />
    </div>
  );
}
