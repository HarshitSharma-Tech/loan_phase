import { useEffect, useState } from 'react';

/**
 * Minimal hash router (no dependency).
 *   #/loans            -> loans page, top
 *   #/loans/rates      -> loans page, scrolled to #rates
 *   #rates             -> legacy in-page anchor, resolved to the page that owns it
 */
export const PAGES = [
  'home', 'loans', 'calculators', 'eligibility', 'about',
  'investments', 'faq', 'contact', 'privacy', 'terms', 'grievance'
];

// Which page owns each legacy section id, so old "#calculator"-style links keep working.
const ANCHOR_PAGE = {
  top: 'home',
  loans: 'loans',
  purpose: 'loans',
  applicants: 'loans',
  rates: 'loans',
  calculator: 'calculators',
  eligibility: 'eligibility',
  process: 'eligibility',
  investment: 'investments',
  trust: 'about',
  faq: 'faq',
  guides: 'faq',
  apply: 'contact',
  locations: 'contact',
  disclaimer: 'terms'
};

export const PAGE_TITLES = {
  home: 'Finora | Loans, EMI Calculator & Eligibility',
  loans: 'Loan Products | Finora',
  calculators: 'EMI Calculator | Finora',
  eligibility: 'Check Eligibility | Finora',
  about: 'About Us | Finora',
  investments: 'Savings & Investments | Finora',
  faq: 'FAQs & Guides | Finora',
  contact: 'Contact | Finora',
  privacy: 'Privacy Policy | Finora',
  terms: 'Terms & Disclosures | Finora',
  grievance: 'Grievance Redressal | Finora'
};

function resolve(hash, currentPage) {
  const raw = decodeURIComponent((hash || '').replace(/^#/, ''));
  if (!raw) return { page: 'home', anchor: '' };
  if (raw.startsWith('/')) {
    const [, page = '', anchor = ''] = raw.split('/');
    if (!page) return { page: 'home', anchor };
    return { page: PAGES.includes(page) ? page : 'home', anchor };
  }
  if (raw === 'main') return { page: currentPage, anchor: 'main' };
  return { page: ANCHOR_PAGE[raw] || currentPage, anchor: raw };
}

export function useRoute() {
  const [route, setRoute] = useState(() => ({
    ...resolve(typeof window !== 'undefined' ? window.location.hash : '', 'home'),
    n: 0
  }));

  useEffect(() => {
    const onHash = () =>
      setRoute((r) => ({ ...resolve(window.location.hash, r.page), n: r.n + 1 }));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return route;
}

export function navigate(path) {
  if (window.location.hash === path) {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  } else {
    window.location.hash = path;
  }
}
