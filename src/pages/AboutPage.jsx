import Trust from '../components/Trust';
import LocationsGrid from '../components/LocationsGrid';

export default function AboutPage({ onEnquire }) {
  return (
    <div className="page-wrapper">
      <div className="page-header-banner">
        <div className="container">
          <span className="eyebrow">Our Philosophy &amp; Standards</span>
          <h1 className="page-title">About Finora</h1>
          <p className="page-lead">
            Finora was created with a straightforward mission: to replace financial jargon and hidden charges with transparent mathematics and plain-language guidance.
          </p>
        </div>
      </div>

      <section className="section sec-white">
        <div className="container">
          <div className="section-head text-center">
            <span className="eyebrow">Our Mission</span>
            <h2 className="section-title">Bringing Your Financial Goals Within Reach</h2>
            <p className="section-subtitle">
              We connect borrowers with transparent lending options and institutional wealth solutions. Whether you are purchasing your first family home, funding global education, or expanding your enterprise, we ensure you have complete clarity before you sign any contract.
            </p>
          </div>

          <div className="about-values-grid">
            <div className="about-val-card">
              <span className="val-number">01</span>
              <h3>Mathematical Clarity</h3>
              <p>We publish our formulas openly and display the complete principal-interest trajectory behind every number.</p>
            </div>
            <div className="about-val-card">
              <span className="val-number">02</span>
              <h3>No Hidden Charges</h3>
              <p>We provide full visibility on processing fees, stamp duties, and foreclosure conditions before you commit.</p>
            </div>
            <div className="about-val-card">
              <span className="val-number">03</span>
              <h3>Independent Advisory</h3>
              <p>Our loan specialists evaluate your specific profile to identify competitive terms across partner institutions.</p>
            </div>
          </div>
        </div>
      </section>

      <Trust />
      <LocationsGrid onEnquire={onEnquire} />
    </div>
  );
}
