import { useRef, useEffect } from 'react';
import styles from './PlatformArchitecture.module.css';
import SignalMatrix from './SignalMatrix';

export default function PlatformArchitecture() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    // No parallax/lag: keep section static on all screen sizes (removes floating effect on desktop)
    section.style.transform = '';
  }, []);
  // Ribbon 1 content: simple icon + text (Purple ribbon - enterprise themes)
  const ribbon1Items = [
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      text: '100% Privacy-First'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      text: 'Autonomous Agents'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      text: 'Enterprise-Grade'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      text: '5+ Industries Served'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M6 3h12l4 6-10 13L2 9z" />
        </svg>
      ),
      text: '3 Intelligent Products'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      text: 'AI Privacy Tech'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      text: 'Secure by Default'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      text: 'Compliance Ready'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      text: 'Real-Time Intelligence'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      text: 'Data Sovereignty'
    }
  ];

  // Ribbon 2 content: simple icon + text (Green ribbon - tech themes)
  const ribbon2Items = [
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      text: 'Global Scale Ready'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a4 4 0 0 0-8 0v2" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      text: 'Deep Tech Company'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      text: 'Multi-Product Innovation'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      text: 'Privacy by Design'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      text: 'Trusted Infrastructure'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      text: 'AI + Security + Platforms'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      text: 'Scalable Architecture'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a4 4 0 0 0-8 0v2" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      text: 'Unified APIs'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      ),
      text: 'Edge to Cloud'
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      text: 'Zero Trust Security'
    }
  ];

  const renderRibbonItem = (item, index) => (
    <div key={index} className={styles.ribbonItem}>
      <span className={styles.ribbonIcon}>{item.icon}</span>
      <span className={styles.ribbonSeparator}>•</span>
      <span className={styles.ribbonText}>{item.text}</span>
    </div>
  );

  return (
    <section ref={sectionRef} className={styles.platformSection}>
      <div className={styles.ribbonContainer}>
        {/* Ribbon 1 — two copies on desktop; mobile/tablet show only first (single line scroll) */}
        <div className={styles.ribbon1}>
          <div className={styles.ribbonTrack1}>
            {[0, 1].map((loopIndex) => (
              <div key={loopIndex} className={`${styles.ribbonContentSet} ${loopIndex === 1 ? styles.ribbonContentSetDuplicate : ''}`}>
                {ribbon1Items.map((item, index) => renderRibbonItem(item, `r1-${loopIndex}-${index}`))}
              </div>
            ))}
          </div>
        </div>

        {/* White opaque fill between ribbons */}
        <div className={styles.ribbonGap} aria-hidden="true" />

        {/* Ribbon 2 — two copies on desktop; mobile/tablet show only first (single line scroll) */}
        <div className={styles.ribbon2}>
          <div className={styles.ribbonTrack2}>
            {[0, 1].map((loopIndex) => (
              <div key={loopIndex} className={`${styles.ribbonContentSet} ${loopIndex === 1 ? styles.ribbonContentSetDuplicate : ''}`}>
                {ribbon2Items.map((item, index) => renderRibbonItem(item, `r2-${loopIndex}-${index}`))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform architecture content */}
      <div className={styles.platformContent}>
        <SignalMatrix />
      </div>
    </section>
  );
}
