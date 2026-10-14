export default function LoansByPurpose({ onEnquire }) {
  const purposes = [
    {
      id: 'wedding',
      title: 'Wedding & Celebrations',
      loanType: 'Personal Loan',
      img: '/assets/images/indian_wedding_loan.jpg',
      alt: 'Indian couple celebrating a joyous wedding moment with warm smiles',
      subtitle: 'Create timeless milestone memories without financial compromise',
      desc: 'Fund banquets, bespoke jewellery, destination arrangements, and photography with flexible repayment terms.',
      tag: 'Sanction in 24h'
    },
    {
      id: 'renovation',
      title: 'Home Architecture & Renovation',
      loanType: 'Home Loan',
      img: '/assets/images/indian_family_home.jpg',
      alt: 'Happy Indian family in modern architectural sunlit living room',
      subtitle: 'Transform living spaces into an architectural sanctuary',
      desc: 'Extend rooms, modernize modular kitchens, upgrade interior aesthetics, or build rooftop solariums with low-interest top-ups.',
      tag: 'From 8.40% p.a.'
    },
    {
      id: 'business-expansion',
      title: 'Commercial Business Growth',
      loanType: 'Business Loan',
      img: '/assets/images/indian_business_owner.jpg',
      alt: 'Confident Indian entrepreneur overseeing a modern technology enterprise',
      subtitle: 'Scale operations, procure machinery & expand footprint',
      desc: 'Infuse collateral-free working capital into inventory, open new outlets, or automate supply chain infrastructure.',
      tag: 'Up to ₹75 Lakh'
    },
    {
      id: 'education',
      title: 'Global Education & Ivy Ambitions',
      loanType: 'Education Loan',
      img: '/assets/images/education_global_loan.jpg',
      alt: 'Indian student holding notebooks at a prestigious university courtyard',
      subtitle: 'Unlock world-class universities across UK, US, Canada & India',
      desc: '100% comprehensive coverage of tuition, visa proof of funds, living expenses, and equipment with flexible post-study moratoriums.',
      tag: 'Moratorium Benefit'
    },
    {
      id: 'medical',
      title: 'Medical & Specialized Care',
      loanType: 'Medical Loan',
      img: '/assets/images/doctor_medical_loan.jpg',
      alt: 'Compassionate Indian doctor in modern state-of-the-art clinic',
      subtitle: 'Instant financial peace of mind during health emergencies',
      desc: 'Immediate cashless hospital sanctions for elective surgeries, oncological therapies, organ transplants, and critical medical care.',
      tag: 'Zero Foreclosure Fee'
    },
    {
      id: 'commercial-property',
      title: 'Property Equity & Commercial LAP',
      loanType: 'Loan Against Property',
      img: '/assets/images/property_lap_sanctuary.jpg',
      alt: 'Indian corporate leaders in front of modern travertine glass facade',
      subtitle: 'Monetize high-value real estate equity for massive liquidity',
      desc: 'Access multi-crore capital lines backed by residential or prime commercial real estate with long 20-year repayment windows.',
      tag: 'Up to ₹25 Crore'
    }
  ];

  return (
    <section className="section sec-travertine" id="purpose" aria-labelledby="purpose-title">
      <div className="container">
        <div className="section-head text-center" data-reveal>
          <span className="eyebrow">Life Milestones & Aspirations</span>
          <h2 id="purpose-title" className="section-title-refined">
            Financing Built for What You Are Planning
          </h2>
          <p className="section-subtitle-refined">
            Every major journey requires capital clarity. Whether celebrating family milestones, upgrading your home, or expanding a business empire, explore loans purpose-built for your moment.
          </p>
        </div>

        <div className="purpose-grid">
          {purposes.map((p, idx) => (
            <article key={p.id} className="purpose-card" data-reveal data-delay={idx * 0.05}>
              <div className="purpose-image-wrap">
                <img
                  src={p.img}
                  alt={p.alt}
                  className="purpose-image"
                  loading="lazy"
                />
                <div className="purpose-image-overlay" />
                <span className="purpose-badge">{p.tag}</span>
              </div>

              <div className="purpose-content">
                <span className="purpose-loan-category">{p.loanType}</span>
                <h3 className="purpose-card-title">{p.title}</h3>
                <p className="purpose-card-subtitle">{p.subtitle}</p>
                <p className="purpose-card-desc">{p.desc}</p>

                <div className="purpose-footer">
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => onEnquire?.(p.loanType)}
                  >
                    Enquire for this Need <span>→</span>
                  </button>
                  <a href="#calculator" className="purpose-link-subtle">
                    Estimate Outflow
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
