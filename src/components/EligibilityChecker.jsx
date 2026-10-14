import { useMemo, useState } from 'react';
import RangeField from './RangeField';
import { clamp, formatINR, principalFromEmi } from '../lib/finance';

const BENEFITS = [
  { t: 'Clear numbers up front', d: 'Work out EMI, total interest and total payable before you apply.' },
  { t: 'Goal-based options', d: 'Pick the loan category that matches what you are trying to achieve.' },
  { t: 'One simple enquiry', d: 'Tell us what you need once, so the right conversation can begin.' },
  { t: 'Informed decisions', d: 'Understand the factors lenders may look at before you start.' }
];

const FACTORS = [
  'Income and employment or business profile',
  'Existing monthly obligations',
  'Credit history',
  'Loan amount and tenure',
  'Lender policy'
];

export default function EligibilityChecker({ showHeader = true }) {
  const [income, setIncome] = useState(75000);
  const [existing, setExisting] = useState(10000);
  const [share, setShare] = useState(40);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(15);

  const inc = clamp(Number(income) || 0, 10000, 1000000);
  const ex = clamp(Number(existing) || 0, 0, 500000);
  const sh = clamp(Number(share) || 0, 20, 70);
  const rt = clamp(Number(rate) || 0, 1, 30);
  const yr = clamp(Number(years) || 0, 1, 30);

  const { room, principal } = useMemo(() => {
    const r = Math.max((inc * sh) / 100 - ex, 0);
    return { room: r, principal: principalFromEmi(r, rt, yr) };
  }, [inc, ex, sh, rt, yr]);

  return (
    <section className="section sec-sand" id="eligibility" aria-labelledby="elig-title">
      <div className="container">
        {showHeader && (
          <div className="section-head" data-reveal>
            <p className="eyebrow dark">Benefits &amp; eligibility</p>
            <h2 id="elig-title">Understand your loan eligibility.</h2>
            <p>
              Eligibility may depend on income, existing obligations, credit history, employment or business profile,
              loan amount and lender policy.
            </p>
          </div>
        )}

        <ul className="benefit-grid">
          {BENEFITS.map((b, i) => (
            <li key={b.t} className="benefit" data-reveal data-delay={i * 0.07}>
              <span className="benefit-n" aria-hidden="true">0{i + 1}</span>
              <h3>{b.t}</h3>
              <p>{b.d}</p>
            </li>
          ))}
        </ul>

        <div className="elig-grid" data-reveal>
          <div className="elig-factors">
            <h3>What lenders may consider</h3>
            <ul>
              {FACTORS.map((f) => (<li key={f}>{f}</li>))}
            </ul>
            <p className="fineprint">These are general factors, not a guarantee of approval.</p>
          </div>

          <div className="elig-tool glass-light">
            <div className="tool-head">
              <h3>Indicative borrowing estimator</h3>
              <span className="badge-demo">Demo estimate</span>
            </div>
            <form onSubmit={(e) => e.preventDefault()} aria-label="Eligibility estimator inputs">
              <RangeField label="Monthly net income" prefix="₹" value={income} onChange={setIncome} min={10000} max={1000000} step={5000} hint={['₹10,000', '₹10,00,000']} />
              <RangeField label="Existing monthly EMIs" prefix="₹" value={existing} onChange={setExisting} min={0} max={500000} step={1000} hint={['None', '₹5,00,000']} />
              <RangeField label="Share of income for all EMIs" suffix="%" value={share} onChange={setShare} min={20} max={70} step={1} hint={['20%', '70%']} />
              <RangeField label="Assumed rate (your own figure)" suffix="%" value={rate} onChange={setRate} min={1} max={30} step={0.05} hint={['1%', '30%']} />
              <RangeField label="Tenure" suffix="yrs" value={years} onChange={setYears} min={1} max={30} step={1} hint={['1 year', '30 years']} />
            </form>
            <div className="elig-result" role="status" aria-live="polite">
              <span className="label">Indicative loan amount you could service</span>
              <strong>{formatINR(principal)}</strong>
              <span className="label">Room for new EMI: <b>{formatINR(room)}</b> / month</span>
            </div>
            <p className="fineprint">
              A simple affordability calculation using your own inputs. It does not check your credit, is not an approval
              and does not reflect any lender's policy.
            </p>
            <a className="btn btn-blue" href="#apply">Start an eligibility enquiry</a>
          </div>
        </div>
      </div>
    </section>
  );
}
