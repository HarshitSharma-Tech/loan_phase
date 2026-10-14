import ApplySection from '../components/ApplySection';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export default function ContactPage({ form, setForm }) {
  return (
    <div className="page-wrapper">
      <div className="page-header-banner">
        <div className="container">
          <span className="eyebrow">Connect With Us</span>
          <h1 className="page-title">Contact &amp; Loan Enquiry Desk</h1>
          <p className="page-lead">
            Speak directly with a senior loan specialist or submit your enquiry online for personalized guidance.
          </p>
        </div>
      </div>

      <section className="section sec-white">
        <div className="container">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <div className="contact-icon-box" aria-hidden="true">
                <Phone size={24} />
              </div>
              <h3>Telephone Support</h3>
              <p>Speak directly with our credit advisory team.</p>
              <a href="tel:+911149208000" className="contact-link">+91 (011) 4920-8000</a>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon-box" aria-hidden="true">
                <Mail size={24} />
              </div>
              <h3>Email Inquiries</h3>
              <p>Send documentation queries or general questions.</p>
              <a href="mailto:support@finorainvest.com" className="contact-link">support@finorainvest.com</a>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon-box" aria-hidden="true">
                <Clock size={24} />
              </div>
              <h3>Operating Hours</h3>
              <p>Monday to Saturday</p>
              <span className="contact-highlight">9:00 AM – 7:00 PM IST</span>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon-box" aria-hidden="true">
                <MapPin size={24} />
              </div>
              <h3>Corporate Office</h3>
              <p>Barakhamba Road, Connaught Place</p>
              <span className="contact-highlight">New Delhi 110001, India</span>
            </div>
          </div>
        </div>
      </section>

      <ApplySection form={form} setForm={setForm} />
    </div>
  );
}
