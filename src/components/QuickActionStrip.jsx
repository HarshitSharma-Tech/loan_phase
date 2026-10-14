export default function QuickActionStrip() {
  const actions = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="16" y1="14" x2="16" y2="18" />
          <path d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01" />
        </svg>
      ),
      label: 'Calculate Your EMI',
      desc: 'Simulate precise monthly outflow & interest',
      href: '#calculator',
      badge: 'Interactive'
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      label: 'Check Loan Eligibility',
      desc: 'Discover your pre-approved borrowing limits',
      href: '#eligibility',
      badge: 'Instant'
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="19" y1="5" x2="5" y2="19" />
          <circle cx="6.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
        </svg>
      ),
      label: 'Compare Interest Rates',
      desc: 'Transparent bench rates from 8.40% p.a.',
      href: '#rates',
      badge: 'Live Matrix'
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      ),
      label: 'Explore Investments',
      desc: 'Fixed deposits, recurring & wealth yields',
      href: '#investment',
      badge: 'Up to 8.5% p.a.'
    }
  ];

  return (
    <section className="quick-strip-section" aria-label="Quick financial navigation">
      <div className="container">
        <div className="quick-strip-card" data-reveal>
          {actions.map((item) => (
            <a key={item.label} href={item.href} className="quick-strip-item">
              <div className="quick-strip-icon-box">
                {item.icon}
              </div>
              <div className="quick-strip-text">
                <div className="quick-strip-header">
                  <span className="quick-strip-title">{item.label}</span>
                  <span className="quick-strip-badge">{item.badge}</span>
                </div>
                <p className="quick-strip-desc">{item.desc}</p>
              </div>
              <span className="quick-strip-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
