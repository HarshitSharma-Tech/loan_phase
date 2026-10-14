export default function LocationsGrid({ onEnquire }) {
  const CITIES = [
    { name: 'Delhi NCR', hubs: 'Connaught Place, CyberHub Gurgaon, Noida Sec 62', popular: 'Home & Business Loans' },
    { name: 'Mumbai MMR', hubs: 'BKC, Nariman Point, Andheri East, Thane West', popular: 'Loan Against Property & Jumbo Loans' },
    { name: 'Bengaluru', hubs: 'Indiranagar, Koramangala, Whitefield, Electronic City', popular: 'Tech Salaried & Startup Loans' },
    { name: 'Hyderabad', hubs: 'HITEC City, Jubilee Hills, Gachibowli, Banjara Hills', popular: 'Commercial LAP & Home Loans' },
    { name: 'Chennai', hubs: 'OMR, Anna Nagar, T. Nagar, Guindy Industrial Hub', popular: 'Manufacturing MSME & Auto Loans' },
    { name: 'Pune', hubs: 'Kalyani Nagar, Hinjewadi Phase 1, Baner, Shivajinagar', popular: 'Doctor Loans & Professional Credit' },
    { name: 'Ahmedabad', hubs: 'SG Highway, Prahlad Nagar, GIFT City, Sanand', popular: 'Business Expansion & Gold Loans' },
    { name: 'Kolkata', hubs: 'Salt Lake Sector V, Park Street, New Town, Rajarhat', popular: 'Personal & Home Financing' }
  ];

  return (
    <section className="section sec-warm" id="locations" aria-labelledby="locations-title">
      <div className="container">
        <div className="section-head text-center" data-reveal>
          <span className="eyebrow">Nationwide Lending Presence</span>
          <h2 id="locations-title" className="section-title-refined">
            Explore Loans Across India's Premier Metros
          </h2>
          <p className="section-subtitle-refined">
            Finora combines 100% digital verification with high-touch on-ground assistance. Our regional credit underwriters and relationship managers provide rapid doorstep documentation in all major hubs.
          </p>
        </div>

        <div className="location-cards-grid" data-reveal>
          {CITIES.map((city) => (
            <div key={city.name} className="location-city-card">
              <div className="location-city-header">
                <span className="location-pin">📍</span>
                <h3 className="location-city-name">{city.name}</h3>
              </div>
              <p className="location-hubs-text">{city.hubs}</p>
              <div className="location-popular-tag">
                <span className="popular-label">Popular in {city.name}:</span>
                <strong className="popular-val">{city.popular}</strong>
              </div>
              <button
                type="button"
                className="location-enquire-btn"
                onClick={() => onEnquire?.(`Enquiry from ${city.name}`)}
              >
                Connect with {city.name} Desk <span>↗</span>
              </button>
            </div>
          ))}
        </div>

        <div className="location-doorstep-strip" data-reveal>
          <div className="doorstep-icon">🚗</div>
          <div className="doorstep-text">
            <strong>Need Doorstep Legal or Property Verification?</strong>
            <span>Our certified field associates visit your residence or corporate office across 45+ Tier 1 and Tier 2 cities in India at zero additional charge.</span>
          </div>
          <a href="#apply" className="btn btn-outline btn-sm">Schedule Visit</a>
        </div>
      </div>
    </section>
  );
}
