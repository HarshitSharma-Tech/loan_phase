const PILLARS = [
  { t: 'Show the working', d: 'Our calculators use a standard, published formula and show the totals behind every figure.' },
  { t: 'Estimates are labelled', d: 'Anything that is indicative or illustrative says so, right next to the number.' },
  { t: 'No approval promises', d: 'Approval, pricing and terms are decisions made by the lender after assessment.' },
  { t: 'Demo features are flagged', d: 'Where a feature is a demonstration, we tell you, so you always know what is real.' }
];

export default function Trust() {
  return (
    <section className="section sec-light" id="trust" aria-labelledby="trust-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Trust &amp; transparency</p>
          <h2 id="trust-title">Plain numbers. Plain language.</h2>
          <p>What you should expect from any loan journey — and how this experience is designed to respect it.</p>
        </div>

        <ul className="pillar-grid">
          {PILLARS.map((p, i) => (
            <li key={p.t} className="pillar glass" data-reveal data-delay={i * 0.07}>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ul>

        <div className="trust-row" data-reveal>
          <div className="formula glass">
            <span className="label">How EMI is calculated</span>
            <code>EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)</code>
            <p>P = loan amount, r = monthly interest rate (annual rate ÷ 12), n = number of monthly instalments.</p>
          </div>
          <div className="legal-placeholder">
            <span className="label">Regulatory &amp; licensing information</span>
            <p>
              Placeholder — add the registered entity name, registration / licence details, grievance officer and
              customer-care contact before launch. No regulatory claims are made on this page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
