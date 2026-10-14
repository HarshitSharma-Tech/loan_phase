export default function RateComparisonTable({ onEnquire }) {
  const rates = [
    {
      product: 'Home Loan',
      rates: '8.40% – 9.75% p.a.',
      type: 'Floating / Semi-Fixed',
      fee: '0.25% to 0.50% (capped at ₹10,000)',
      tenure: 'Up to 30 Years',
      notes: 'Linked to RBI Repo Rate (EBLR). Zero prepayment penalty on floating rate loans for individual borrowers.',
      cta: 'Home Loan'
    },
    {
      product: 'Loan Against Property (LAP)',
      rates: '9.20% – 11.50% p.a.',
      type: 'Floating',
      fee: '0.50% to 1.00% of sanctioned limit',
      tenure: 'Up to 20 Years',
      notes: 'Available for self-occupied residential, commercial & leased industrial properties up to 75% market valuation.',
      cta: 'Loan Against Property'
    },
    {
      product: 'Personal Loan',
      rates: '10.49% – 18.00% p.a.',
      type: 'Fixed Monthly Reducing',
      fee: '1.00% to 2.50% + GST',
      tenure: '12 to 60 Months',
      notes: 'No collateral required. Rates tailored to applicant employer category, CIBIL score (750+), and net monthly income.',
      cta: 'Personal Loan'
    },
    {
      product: 'Business Loan',
      rates: '12.50% – 21.00% p.a.',
      type: 'Monthly Reducing / OD',
      fee: '1.50% to 2.50% + GST',
      tenure: '12 to 84 Months',
      notes: 'Underwritten on bank statement cashflows and GST filings. Overdraft and dropping line options available.',
      cta: 'Business Loan'
    },
    {
      product: 'Gold Loan',
      rates: '8.95% – 14.00% p.a.',
      type: 'Bullet / Regular EMI',
      fee: '0.25% or flat ₹500',
      tenure: '3 to 36 Months',
      notes: 'Loan to Value (LTV) up to 75% of hallmarked gold valuation per RBI norms. Bullet interest repayment available.',
      cta: 'Gold Loan'
    },
    {
      product: 'Education Loan',
      rates: '9.50% – 12.75% p.a.',
      type: 'Floating',
      fee: '0.50% (Nil for premier Indian institutions)',
      tenure: 'Up to 15 Years',
      notes: 'Repayment holiday (moratorium) during study tenure + 6 to 12 months grace period. Section 80E tax deduction.',
      cta: 'Education Loan'
    },
    {
      product: 'Car & Two-Wheeler Loans',
      rates: '8.75% – 12.00% p.a.',
      type: 'Fixed',
      fee: '0.50% to 1.00%',
      tenure: 'Up to 7 Years',
      notes: 'Financing up to 100% of on-road vehicle invoice. Special concession for electric vehicles (EVs).',
      cta: 'Vehicle Loan'
    }
  ];

  return (
    <section className="section sec-warm" id="rates" aria-labelledby="rates-title">
      <div className="container">
        <div className="section-head text-center" data-reveal>
          <span className="eyebrow">Radical Cost Transparency</span>
          <h2 id="rates-title" className="section-title-refined">
            Transparent Interest Rates & Charges Matrix
          </h2>
          <p className="section-subtitle-refined">
            Evaluate the total annualised cost of borrowing upfront. We present complete transparency on benchmark interest rates, processing fees, and foreclosure conditions across all partner lenders.
          </p>
        </div>

        <div className="rate-table-card" data-reveal>
          <div className="rate-table-scrollable">
            <table className="comparison-table" aria-label="Interest Rates Comparison Table">
              <thead>
                <tr>
                  <th scope="col">Financing Product</th>
                  <th scope="col">Indicative Rate Range</th>
                  <th scope="col">Processing Charges</th>
                  <th scope="col">Tenure Horizon</th>
                  <th scope="col">Underwriting & Prepayment Notes</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((row) => (
                  <tr key={row.product}>
                    <td className="table-product-cell">
                      <strong>{row.product}</strong>
                      <span className="table-rate-type">{row.type}</span>
                    </td>
                    <td className="table-rate-cell">
                      <span className="rate-highlight">{row.rates}</span>
                    </td>
                    <td className="table-fee-cell">{row.fee}</td>
                    <td className="table-tenure-cell">{row.tenure}</td>
                    <td className="table-notes-cell">{row.notes}</td>
                    <td className="table-action-cell">
                      <button
                        type="button"
                        className="btn btn-outline btn-xs"
                        onClick={() => onEnquire?.(row.cta)}
                      >
                        Apply <span>→</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rate-table-footer-note">
            <div className="footer-note-item">
              <span className="note-dot" />
              <span><strong>RBI Compliance Notice:</strong> Floating rate loans sanctioned to individual borrowers are exempt from foreclosure or prepayment penalties as per Reserve Bank of India directives.</span>
            </div>
            <div className="footer-note-item">
              <span className="note-dot" />
              <span>Actual interest rates and loan sanctions are determined by lending partners based on individual credit appraisal, CIBIL score, income stability, and property collateral valuation.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
