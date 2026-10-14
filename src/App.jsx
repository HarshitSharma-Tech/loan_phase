import { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Footer from './components/Footer';
import { useRoute, navigate, PAGE_TITLES } from './lib/router';

gsap.registerPlugin(ScrollTrigger);

// Pages
import HomePage from './pages/HomePage';
import LoansPage from './pages/LoansPage';
import CalculatorsPage from './pages/CalculatorsPage';
import EligibilityPage from './pages/EligibilityPage';
import AboutPage from './pages/AboutPage';
import InvestmentsPage from './pages/InvestmentsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';

export default function App() {
  const route = useRoute();
  const lenisRef = useRef(null);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    loanType: 'Home Loan',
    amountRequired: '5000000',
    city: '',
    consent: false
  });

  // Initialize Lenis Buttery Smooth Scroll Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      infinite: false
    });
    lenisRef.current = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Feed Lenis into GSAP requestAnimationFrame ticker
    const tickHandler = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickHandler);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const enquire = (loanType) => {
    setForm((f) => ({ ...f, loanType: loanType || f.loanType }));
    navigate('#/contact/apply');
  };

  // Update document title based on current page
  useEffect(() => {
    document.title = PAGE_TITLES[route.page] || 'Finora | Your Financial Future, Within Reach';
  }, [route.page]);

  // Silky smooth scroll handling: if anchor specified, scroll to it; otherwise scroll to top
  useEffect(() => {
    if (route.anchor) {
      const el = document.getElementById(route.anchor);
      if (el) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el, { offset: -76, duration: 1.2 });
        } else {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        }
        return;
      }
    }
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [route.page, route.anchor, route.n]);

  const renderPage = () => {
    switch (route.page) {
      case 'loans':
        return <LoansPage onEnquire={enquire} />;
      case 'calculators':
        return <CalculatorsPage onEnquire={enquire} />;
      case 'eligibility':
        return <EligibilityPage onEnquire={enquire} />;
      case 'about':
        return <AboutPage onEnquire={enquire} />;
      case 'investments':
        return <InvestmentsPage onEnquire={enquire} />;
      case 'faq':
        return <FaqPage onEnquire={enquire} />;
      case 'contact':
        return <ContactPage form={form} setForm={setForm} />;
      case 'privacy':
        return <LegalPage type="privacy" />;
      case 'terms':
        return <LegalPage type="terms" />;
      case 'grievance':
        return <LegalPage type="grievance" />;
      case 'home':
      default:
        return <HomePage onEnquire={enquire} />;
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header page={route.page} />
      <main id="main">
        {renderPage()}
      </main>
      <Footer />
    </>
  );
}
