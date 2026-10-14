export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Math.round(Number.isFinite(n) ? n : 0));

export const formatCompactINR = (n) => {
  const v = Math.abs(n);
  if (v >= 10000000) return `₹${(n / 10000000).toFixed(2).replace(/\.?0+$/, '')} Cr`;
  if (v >= 100000) return `₹${(n / 100000).toFixed(2).replace(/\.?0+$/, '')} Lakh`;
  return formatINR(n);
};

/** Standard reducing-balance EMI. */
export function calcEmi(principal, annualRatePct, years) {
  const n = Math.round(years * 12);
  if (principal <= 0 || n <= 0) return 0;
  const r = annualRatePct / 1200;
  if (r === 0) return principal / n;
  const f = Math.pow(1 + r, n);
  return (principal * r * f) / (f - 1);
}

/** Principal that a given EMI can service (present value of the annuity). */
export function principalFromEmi(emi, annualRatePct, years) {
  const n = Math.round(years * 12);
  if (emi <= 0 || n <= 0) return 0;
  const r = annualRatePct / 1200;
  if (r === 0) return emi * n;
  const f = Math.pow(1 + r, n);
  return (emi * (f - 1)) / (r * f);
}

/** Year-by-year split of principal vs interest plus closing balance. */
export function yearlySchedule(principal, annualRatePct, years) {
  const n = Math.round(years * 12);
  const emi = calcEmi(principal, annualRatePct, years);
  const r = annualRatePct / 1200;
  let balance = principal;
  const rows = [];
  for (let y = 1; y <= Math.ceil(n / 12); y++) {
    let interest = 0;
    let princ = 0;
    for (let m = 0; m < 12 && (y - 1) * 12 + m < n; m++) {
      const i = balance * r;
      const p = Math.min(emi - i, balance);
      interest += i;
      princ += p;
      balance -= p;
    }
    rows.push({ year: y, principal: princ, interest, balance: Math.max(balance, 0) });
  }
  return rows;
}
