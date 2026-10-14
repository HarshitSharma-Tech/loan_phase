import LoanProductCatalog from '../components/LoanProductCatalog';
import LoansByPurpose from '../components/LoansByPurpose';
import LoansByProfile from '../components/LoansByProfile';
import RateComparisonTable from '../components/RateComparisonTable';

export default function LoansPage({ onEnquire }) {
  return (
    <div className="page-wrapper">
      <div className="page-header-banner">
        <div className="container">
          <span className="eyebrow">Structured Credit Portfolio</span>
          <h1 className="page-title">Explore All Loan Products</h1>
          <p className="page-lead">
            Compare transparent interest rates, tenure horizons, and borrowing limits across 12 tailored loan solutions.
          </p>
        </div>
      </div>

      <LoanProductCatalog onEnquire={onEnquire} showHeader={false} />
      <LoansByPurpose onEnquire={onEnquire} />
      <LoansByProfile onEnquire={onEnquire} />
      <RateComparisonTable onEnquire={onEnquire} />
    </div>
  );
}
