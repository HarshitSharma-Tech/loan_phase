import { useState } from 'react';

const LOAN_TYPES = [
  'Home Loan',
  'Loan Against Property',
  'Personal Loan',
  'Business Loan',
  'Vehicle Loan',
  'Loan Against Mutual Funds'
];

export default function ApplySection({ form, setForm }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => {
    setSubmitted(false);
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const validate = () => {
    const err = {};
    if (form.fullName.trim().length < 2) err.fullName = 'Please enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Please enter a valid email address.';
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s|-/g, ''))) err.phone = 'Enter a 10-digit Indian mobile number.';
    if (!(Number(form.amountRequired) >= 10000)) err.amountRequired = 'Enter an amount of at least ₹10,000.';
    if (!form.consent) err.consent = 'Please confirm to continue.';
    return err;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) setSubmitted(true);
  };

  const field = (id, label, props = {}) => (
    <div className="f-row">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={form[id]}
        onChange={set(id)}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `${id}-err` : undefined}
        {...props}
      />
      {errors[id] && <span id={`${id}-err`} className="f-err" role="alert">{errors[id]}</span>}
    </div>
  );

  return (
    <section className="section sec-cta" id="apply" aria-labelledby="apply-title">
      <div className="cta-glow" aria-hidden="true" />
      <div className="container cta-grid">
        <div className="cta-copy" data-reveal>
          <p className="eyebrow">Take the next step</p>
          <h2 id="apply-title">Ready to bring your plans closer?</h2>
          <p>Tell us what you need and a loan specialist can guide you through the next steps.</p>
          <ul className="cta-points">
            <li>Free to enquire</li>
            <li>Plain-language guidance</li>
            <li>You review all terms before you accept</li>
          </ul>
        </div>

        <form className="apply-form glass-light" onSubmit={onSubmit} noValidate aria-label="Loan enquiry form" data-reveal>
          <div className="tool-head">
            <h3>Loan enquiry</h3>
            <span className="badge-demo">Demo form</span>
          </div>

          {field('fullName', 'Full name', { autoComplete: 'name', placeholder: 'As on your PAN' })}
          {field('email', 'Email', { type: 'email', autoComplete: 'email', placeholder: 'name@example.com' })}
          {field('phone', 'Mobile number', { type: 'tel', inputMode: 'numeric', autoComplete: 'tel-national', placeholder: '10-digit mobile number' })}

          <div className="f-two">
            <div className="f-row">
              <label htmlFor="loanType">Loan type</label>
              <select id="loanType" value={form.loanType} onChange={set('loanType')}>
                {LOAN_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            {field('amountRequired', 'Amount required (₹)', { type: 'number', inputMode: 'numeric', min: 10000, step: 10000 })}
          </div>
          {field('city', 'City', { autoComplete: 'address-level2', placeholder: 'Your city' })}

          <label className="check">
            <input type="checkbox" checked={form.consent} onChange={(e) => { setSubmitted(false); setForm((f) => ({ ...f, consent: e.target.checked })); }} aria-invalid={!!errors.consent} />
            <span>I agree to be contacted about this enquiry.</span>
          </label>
          {errors.consent && <span className="f-err" role="alert">{errors.consent}</span>}

          <button type="submit" className="btn btn-gold btn-block">Submit Enquiry</button>

          <div className="f-status" role="status" aria-live="polite">
            {submitted && (
              <p className="f-ok">
                Thanks, {form.fullName.trim().split(' ')[0]}. This is a demo build, so your details were <b>not</b> sent anywhere.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
