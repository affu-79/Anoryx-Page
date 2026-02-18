import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CategorySection.module.css';

const products = [
  {
    name: 'PII SENTINEL',
    productHash: 'pii-sentinel',
    nameClass: 'productNameBlue',
    subtitle: 'Privacy & Security Infrastructure',
    description:
      'Protect sensitive data and automate compliance with AI-powered PII detection built for enterprise scale.',
    iconClass: 'iconBlue',
    cardClass: 'cardBlue',
    accentClass: 'accentBarBlue',
    btnClass: 'btnBlue',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    name: 'B4LABS',
    productHash: 'b4labs',
    nameClass: 'productNamePurple',
    subtitle: 'Autonomous AI Systems',
    description:
      'Build intelligent workflows with autonomous agents that automate decisions and transform operations.',
    iconClass: 'iconPurple',
    cardClass: 'cardPurple',
    accentClass: 'accentBarPurple',
    btnClass: 'btnPurple',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    name: 'RENDLY',
    productHash: 'rendly',
    nameClass: 'productNameOrange',
    subtitle: 'Digital Platform Ecosystem',
    description:
      'Connect professionals and opportunities through AI-driven identity, skills, and networking intelligence.',
    iconClass: 'iconOrange',
    cardClass: 'cardOrange',
    accentClass: 'accentBarOrange',
    btnClass: 'btnOrange',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="19" r="3" />
        <circle cx="19" cy="19" r="3" />
        <path d="M12 8v4M8.5 16.5L10 14M15.5 16.5L14 14" />
      </svg>
    ),
  },
];

export default function CategorySection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [floatReady, setFloatReady] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
          setTimeout(() => setFloatReady(true), 1000);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.categorySection} ref={sectionRef}>
      <div className={styles.dotGrid} />
      <div className={styles.container}>
        <span className={`${styles.label} ${isVisible ? styles.visible : ''}`}>
          WHAT WE BUILD
        </span>

        <h2 className={`${styles.tagline} ${isVisible ? styles.visible : ''}`}>
          The Intelligence Layer for Modern Enterprises
        </h2>

        <p className={`${styles.subcopy} ${isVisible ? styles.visible : ''}`}>
          We build AI-powered autonomous systems, enterprise-grade privacy
          infrastructure, and intelligent digital platforms that help
          organizations automate operations, protect sensitive data, and scale
          with confidence.
        </p>

        <div className={styles.cardsGrid}>
          {products.map((p) => (
            <div
              key={p.name}
              className={`${styles.card} ${styles[p.cardClass]} ${isVisible ? styles.visible : ''} ${floatReady ? styles.floatReady : ''}`}
            >
              {/* Gradient accent bar */}
              <div className={`${styles.accentBar} ${styles[p.accentClass]}`} />

              {/* Card body */}
              <div className={styles.cardBody}>
                <div className={`${styles.iconWrapper} ${styles[p.iconClass]}`}>
                  {p.icon}
                </div>

                <p className={`${styles.productName} ${styles[p.nameClass]}`}>
                  {p.name}
                </p>

                <h3 className={styles.cardSubtitle}>{p.subtitle}</h3>

                <p className={styles.cardDescription}>{p.description}</p>

                <Link to={`/products#${p.productHash}`} className={`${styles.cardButton} ${styles[p.btnClass]}`}>
                  Explore Product
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
