import Faq from '../components/Faq';
import GuidesLibrary from '../components/GuidesLibrary';

export default function FaqPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header-banner">
        <div className="container">
          <span className="eyebrow">Clarity &amp; Strategy</span>
          <h1 className="page-title">Frequently Asked Questions &amp; Guides</h1>
          <p className="page-lead">
            Straightforward answers to your questions on loan math, credit scores, processing charges, and prepayment terms, backed by practical borrower guides.
          </p>
        </div>
      </div>

      <Faq />
      <GuidesLibrary />
    </div>
  );
}
