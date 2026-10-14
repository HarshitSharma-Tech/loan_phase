const YEAR = new Date().getFullYear();

const COLUMNS = [
  {
    title: 'Loan Products',
    links: [
      ['Home Loan', '#/loans/loan-home'],
      ['Loan Against Property', '#/loans/loan-lap'],
      ['Personal Loan', '#/loans/loan-personal'],
      ['Business Loan', '#/loans/loan-business'],
      ['Education Loan', '#/loans/loan-education'],
      ['All loan products', '#/loans']
    ]
  },
  {
    title: 'Tools & Rates',
    links: [
      ['EMI Calculator', '#/calculators'],
      ['Eligibility Estimator', '#/eligibility'],
      ['Interest Rates & Fees', '#/loans/rates'],
      ['How It Works', '#/eligibility/process'],
      ['Guides', '#/faq/guides']
    ]
  },
  {
    title: 'Company',
    links: [
      ['About Us', '#/about'],
      ['Savings & Investments', '#/investments'],
      ['FAQs', '#/faq'],
      ['Contact', '#/contact'],
      ['Loan Enquiry', '#/contact/apply']
    ]
  }
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="footer-brand-link" href="#/" aria-label="Finora — Financing A Brighter Tomorrow">
            <img
              src="/finora-logo.png"
              alt="Finora"
              className="brand-logo-footer"
              width="142"
              height="44"
            />
          </a>
          <p className="footer-tagline">Simple finance. Clear next steps.</p>
          <address className="footer-contact">
            <span>Client desk</span>
            <a href="tel:+911149208000">+91 (011) 4920-8000</a>
            <a href="mailto:support@finorainvest.com">support@finorainvest.com</a>
            <small>Mon–Sat, 9am–7pm IST</small>
          </address>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} className="footer-col" aria-label={col.title}>
            <h2 className="footer-heading">{col.title}</h2>
            <ul>
              {col.links.map(([label, href]) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container footer-legal">
        <p className="footer-disclosure">
          <strong>Important:</strong> Finora provides loan information, calculators and an enquiry service.
          Loan approval, interest rates, fees and all other terms are decided by the lender after its own assessment.
          Figures on this website are indicative estimates, not an offer or a sanction. Please read every term before you accept a loan.
        </p>
        <div className="footer-meta">
          <span>© {YEAR} Finora. All rights reserved.</span>
          <ul className="footer-legal-links">
            <li><a href="#/privacy">Privacy Policy</a></li>
            <li><a href="#/terms">Terms &amp; Disclosures</a></li>
            <li><a href="#/grievance">Grievance Redressal</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
