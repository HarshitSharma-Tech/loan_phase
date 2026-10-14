import { useEffect, useState } from 'react';

const LINKS = [
  ['Home', '#/', 'home'],
  ['Loan Products', '#/loans', 'loans'],
  ['Calculators', '#/calculators', 'calculators'],
  ['About Us', '#/about', 'about'],
  ['Contact', '#/contact', 'contact']
];

export default function Header({ page }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const [prevPage, setPrevPage] = useState(page);
  if (prevPage !== page) {
    setPrevPage(page);
    setOpen(false);
  }

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="#/" aria-label="Finora — Financing A Brighter Tomorrow">
          <img
            src="/finora-logo-dark.png"
            alt="Finora"
            className="brand-logo"
            width="136"
            height="46"
          />
        </a>

        <nav id="primary-nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Primary">
          <ul className="nav-list">
            {LINKS.map(([label, href, key]) => (
              <li key={key}>
                <a href={href} className="nav-link" aria-current={page === key ? 'page' : undefined}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a className="btn btn-primary btn-sm nav-cta" href="#/loans">
            Explore Loan Options
          </a>
        </nav>

        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
