import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/env';

gsap.registerPlugin(ScrollTrigger);

const POSTER = '/assets/images/indian_family_home.jpg';
const HEADLINE = ['Your', 'Dreams.', 'Within', 'Reach.'];

export default function Hero() {
  const heroRef = useRef(null);
  const [reduced] = useState(prefersReducedMotion);
  const [videoOk, setVideoOk] = useState(true);

  useEffect(() => {
    if (reduced) return undefined;
    const v = heroRef.current?.querySelector('video');
    if (!v) return undefined;
    // Pause when tab hidden or hero offscreen to save battery.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(heroRef.current);
    return () => io.disconnect();
  }, [reduced]);

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.to('.hero-media', {
        yPercent: 14,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('.hero-content', {
        yPercent: -10,
        opacity: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: '15% top', end: 'bottom top', scrub: true }
      });
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={heroRef} className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        {reduced || !videoOk ? (
          <img src={POSTER} alt="" className="hero-poster" />
        ) : (
          <video
            className="hero-video"
            poster={POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoOk(false)}
          >
            <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
            <source src="/assets/videos/finora-hero.mp4" type="video/mp4" />
          </video>
        )}
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="container hero-content">
        <p className="eyebrow hero-fade" style={{ '--d': '0.1s' }}>Finora Loans</p>
        <h1 id="hero-title" aria-label="Your Dreams. Within Reach.">
          {HEADLINE.map((w, i) => (
            <span className="word" key={w} aria-hidden="true">
              <span style={{ '--d': `${0.25 + i * 0.12}s` }}>{w}</span>
            </span>
          ))}
        </h1>
        <p className="hero-sub hero-fade" style={{ '--d': '0.85s' }}>
          Explore financing options designed around your goals.
        </p>
        <div className="hero-actions hero-fade" style={{ '--d': '1s' }}>
          <a className="btn btn-gold btn-lg" href="#eligibility">Check Your Eligibility</a>
          <a className="btn btn-ghost btn-lg" href="#calculator">Calculate Your EMI</a>
        </div>
      </div>

      <a className="scroll-cue" href="#story" aria-label="Scroll to explore">
        <span /> Scroll
      </a>
    </section>
  );
}
