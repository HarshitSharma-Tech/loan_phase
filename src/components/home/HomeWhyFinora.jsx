import { Calculator, ShieldCheck, FileCheck, Eye } from 'lucide-react';

const REASONS = [
  {
    icon: Calculator,
    title: 'Plain Numbers Upfront',
    desc: 'Our calculators use standard, published reducing-balance formulas and display the full principal and interest breakdown.'
  },
  {
    icon: Eye,
    title: 'Estimates Are Clear',
    desc: 'Any illustrative or estimated figure is labelled explicitly, so you always know what is indicative and what is contractual.'
  },
  {
    icon: FileCheck,
    title: 'No Obligation to Enquire',
    desc: 'Submit your requirements once to compare loan options without paying brokerage fees or committing to an offer.'
  },
  {
    icon: ShieldCheck,
    title: 'You Review Every Term',
    desc: 'Loan approval, interest rates, and final terms remain decisions made by lenders. You review the complete sanction letter before accepting.'
  }
];

export default function HomeWhyFinora() {
  return (
    <section className="section sec-stone" id="why-finora" aria-labelledby="why-finora-heading">
      <div className="container">
        <div className="section-head text-center">
          <div className="arch-section-label justify-center">
            <span className="label-line" />
            <span>INSTITUTIONAL INTEGRITY // CLIENT ADVOCACY</span>
          </div>
          <h2 id="why-finora-heading" className="arch-section-title">
            Why Discerning Borrowers Choose Finora
          </h2>
          <p className="arch-section-subtitle">
            What you should expect from a premier financial advisory: transparent reducing-balance formulas, zero hidden charges, and sovereign data privacy.
          </p>
        </div>

        <div className="why-finora-grid">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="why-card">
                <div className="why-icon-wrap" aria-hidden="true">
                  <Icon size={24} className="why-icon" />
                </div>
                <span className="why-number" aria-hidden="true">0{i + 1}</span>
                <h3 className="why-title">{r.title}</h3>
                <p className="why-desc">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
