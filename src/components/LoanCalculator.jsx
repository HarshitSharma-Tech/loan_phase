import { useMemo, useState } from 'react';
import RangeField from './RangeField';
import { calcEmi, clamp, formatCompactINR, formatINR, yearlySchedule } from '../lib/finance';

const PRESETS = [
  { label: '₹30L • 20Y', amount: 3000000, rate: 8.5, years: 20 },
  { label: '₹50L • 20Y', amount: 5000000, rate: 8.5, years: 20 },
  { label: '₹75L • 25Y', amount: 7500000, rate: 8.5, years: 25 },
  { label: '₹1.5 Cr • 30Y', amount: 15000000, rate: 8.35, years: 30 }
];

export default function LoanCalculator({ showHeader = true }) {
  const [amount, setAmount] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const P = clamp(Number(amount) || 0, 100000, 100000000);
  const R = clamp(Number(rate) || 0, 1, 30);
  const Y = clamp(Number(years) || 0, 1, 30);

  const { emi, total, interest, principalPct, rows } = useMemo(() => {
    const e = calcEmi(P, R, Y);
    const t = e * Math.round(Y * 12);
    return {
      emi: e,
      total: t,
      interest: Math.max(t - P, 0),
      principalPct: t > 0 ? (P / t) * 100 : 100,
      rows: yearlySchedule(P, R, Y)
    };
  }, [P, R, Y]);

  const C = 2 * Math.PI * 70;
  const maxYear = Math.max(...rows.map((r) => r.principal + r.interest), 1);

  const applyPreset = (preset) => {
    setAmount(preset.amount);
    setRate(preset.rate);
    setYears(preset.years);
  };

  return (
    <section className="section sec-light" id="calculator" aria-labelledby="calc-title">
      <div className="container">
        {showHeader && (
          <div className="section-head" data-reveal>
            <span className="eyebrow">Interactive Financial Cockpit</span>
            <h2 id="calc-title">Precision EMI & Amortization Calculator</h2>
            <p>
              Simulate your exact monthly commitment. Adjust loan amount, interest rate, and tenure with real-time principal versus interest visualizations.
            </p>
          </div>
        )}

        {/* Quick Presets Bar */}
        <div className="calc-presets-bar" data-reveal>
          <span className="preset-label">Quick Scenarios:</span>
          {PRESETS.map((p) => (
            <button
              type="button"
              key={p.label}
              className={`preset-chip ${amount === p.amount && years === p.years ? 'active' : ''}`}
              onClick={() => applyPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="calc-grid" data-reveal>
          <form className="calc-panel glass" onSubmit={(e) => e.preventDefault()} aria-label="EMI calculator inputs">
            <RangeField
              label="Loan amount"
              prefix="₹"
              value={amount}
              onChange={setAmount}
              min={100000}
              max={100000000}
              step={50000}
              hint={['₹1 Lakh', '₹10 Cr']}
            />
            <RangeField
              label="Interest rate (p.a.)"
              suffix="%"
              value={rate}
              onChange={setRate}
              min={1}
              max={30}
              step={0.05}
              hint={['1%', '30%']}
            />
            <RangeField
              label="Tenure"
              suffix="yrs"
              value={years}
              onChange={setYears}
              min={1}
              max={30}
              step={1}
              hint={['1 year', '30 years']}
            />
            <p className="fineprint">
              *Calculated on a reducing-balance method. Indicative figures; final terms determined at credit assessment.
            </p>
          </form>

          <div className="calc-results">
            <div className="emi-hero glass" role="status" aria-live="polite">
              <span className="label">Estimated Monthly EMI</span>
              <strong className="emi-value">{formatINR(emi)}</strong>
              <div className="emi-split">
                <div>
                  <span className="label">Total Principal</span>
                  <b>{formatINR(P)}</b>
                </div>
                <div>
                  <span className="label">Total Interest</span>
                  <b className="text-gold">{formatINR(interest)}</b>
                </div>
                <div>
                  <span className="label">Total Repayment</span>
                  <b>{formatINR(total)}</b>
                </div>
              </div>
            </div>

            <div className="viz glass">
              <figure className="donut-wrap">
                <svg
                  viewBox="0 0 180 180"
                  className="donut"
                  role="img"
                  aria-label={`Principal ${principalPct.toFixed(0)}%, interest ${(100 - principalPct).toFixed(0)}%`}
                >
                  <circle cx="90" cy="90" r="70" className="donut-int" />
                  <circle
                    cx="90"
                    cy="90"
                    r="70"
                    className="donut-pri"
                    strokeDasharray={`${(C * principalPct) / 100} ${C}`}
                    transform="rotate(-90 90 90)"
                  />
                  <text x="90" y="86" textAnchor="middle" className="donut-t1">
                    {principalPct.toFixed(0)}%
                  </text>
                  <text x="90" y="106" textAnchor="middle" className="donut-t2">
                    principal
                  </text>
                </svg>
                <figcaption className="legend">
                  <span>
                    <i className="dot pri" /> Principal <b>{formatCompactINR(P)}</b>
                  </span>
                  <span>
                    <i className="dot int" /> Interest <b>{formatCompactINR(interest)}</b>
                  </span>
                </figcaption>
              </figure>

              <div className="bars-wrap">
                <h3 className="viz-title">Annual Principal vs Interest Trajectory</h3>
                <div className="bars" aria-hidden="true">
                  {rows.map((r) => (
                    <div
                      className="bar"
                      key={r.year}
                      title={`Year ${r.year}: Principal ${formatINR(r.principal)}, Interest ${formatINR(r.interest)}`}
                    >
                      <span className="bar-int" style={{ height: `${(r.interest / maxYear) * 100}%` }} />
                      <span className="bar-pri" style={{ height: `${(r.principal / maxYear) * 100}%` }} />
                    </div>
                  ))}
                </div>
                <div className="bars-axis" aria-hidden="true">
                  <span>Year 1</span>
                  <span>Year {rows.length}</span>
                </div>
                <details className="table-details">
                  <summary>View Complete Amortization Table</summary>
                  <div className="table-scroll">
                    <table>
                      <caption className="sr-only">Yearly repayment breakdown</caption>
                      <thead>
                        <tr>
                          <th scope="col">Year</th>
                          <th scope="col">Principal</th>
                          <th scope="col">Interest</th>
                          <th scope="col">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r) => (
                          <tr key={r.year}>
                            <th scope="row">{r.year}</th>
                            <td>{formatINR(r.principal)}</td>
                            <td>{formatINR(r.interest)}</td>
                            <td>{formatINR(r.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
