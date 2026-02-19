/**
 * Anoryx Solutions — Enterprise Intelligence Solutions (Light Theme).
 * Authentic product and capability content; premium enterprise layout.
 */

import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Solutions.module.css';

const PII_SENTINEL_YOUTUBE_ID = 'c5985A2xU6Q';
const PII_SENTINEL_THUMBNAIL = `https://img.youtube.com/vi/${PII_SENTINEL_YOUTUBE_ID}/maxresdefault.jpg`;
const PII_SENTINEL_THUMBNAIL_FALLBACK = `https://img.youtube.com/vi/${PII_SENTINEL_YOUTUBE_ID}/hqdefault.jpg`;

const icon = (d, w = 24, h = 24) => (
  <svg width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{d}</svg>
);

const CAPABILITY_CARDS = [
  {
    title: 'Privacy-First AI Systems',
    body: 'Anoryx builds intelligence systems designed to operate in environments handling sensitive personal and enterprise data. These systems integrate real-time detection, classification, and automated response mechanisms to ensure privacy protection while maintaining operational intelligence capabilities.',
    icon: 'shield',
  },
  {
    title: 'Enterprise Agentic Workflow Automation',
    body: 'Agent-driven workflow systems that execute operational tasks autonomously. Anoryx integrates agent orchestration frameworks with backend services to automate decision workflows, data handling, and execution pipelines without manual intervention.',
    icon: 'workflow',
  },
  {
    title: 'Custom Intelligence Backend Development',
    body: 'Custom backend intelligence systems built as execution infrastructure for intelligent applications. Modular microservice architectures, scalable execution pipelines, and intelligence-integrated logic enable reliable operation in enterprise environments.',
    icon: 'backend',
  },
  {
    title: 'Autonomous Decision Infrastructure',
    body: 'Infrastructure that enables software systems to make and execute decisions autonomously. Combines structured execution logic with intelligence models for automated decision workflows and operational execution.',
    icon: 'decision',
  },
  {
    title: 'Enterprise Intelligence Platform Engineering',
    body: 'End-to-end intelligence platform design and implementation. From data fabric and cognitive engines to agent orchestration and execution layers, engineered for scalability and enterprise integration.',
    icon: 'platform',
  },
  {
    title: 'Domain-Specific Intelligence Systems',
    body: 'Intelligence systems optimized for specific verticals and operational domains. Integrate structured logic, execution mechanisms, and domain workflows for intelligent automation with reliability and security.',
    icon: 'domain',
  },
];

function CapabilityIcon({ name }) {
  const props = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'shield':
      return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case 'workflow':
      return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><path d="M10 6h4M6 14v-4M18 10h-4" /></svg>;
    case 'backend':
      return <svg {...props}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg>;
    case 'decision':
      return <svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.34 6.34l2.83 2.83M14.83 14.83l2.83 2.83M6.34 17.66l2.83-2.83M14.83 9.17l2.83-2.83" /><circle cx="12" cy="12" r="3" /></svg>;
    case 'platform':
      return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6M9 13h4M9 17h2" /></svg>;
    case 'domain':
      return <svg {...props}><circle cx="12" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M12 8v2M8.5 16.5L12 13M15.5 16.5L12 13" /></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="3" /></svg>;
  }
}

export default function Solutions() {
  const sectionRefs = useRef([]);
  const [piiVideoPlaying, setPiiVideoPlaying] = useState(false);
  const [videoFullscreen, setVideoFullscreen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (hash === 'pii-sentinel-video') {
      const el = document.getElementById(hash);
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        return () => clearTimeout(t);
      }
    }
  }, [location.pathname, location.hash]);

  /* When coming from Products "Watch MVP Demo Video": show section, then zoom video to fullscreen and autoplay */
  useEffect(() => {
    const hash = location.hash?.slice(1);
    const autoExpand = location.state?.autoExpandVideo;
    if (!autoExpand || hash !== 'pii-sentinel-video') return;
    const scrollEl = document.getElementById('pii-sentinel-video');
    if (!scrollEl) return;
    const scrollDone = setTimeout(() => {
      setVideoFullscreen(true);
      setPiiVideoPlaying(true);
      navigate(location.pathname + '#' + (hash || ''), { replace: true, state: {} });
    }, 900);
    return () => clearTimeout(scrollDone);
  }, [location.pathname, location.hash, location.state?.autoExpandVideo, navigate]);

  useEffect(() => {
    const observers = [];
    sectionRefs.current.forEach((el) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) el.classList.add(styles.inView); },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageStrip}>
      {/* Section 1 — Hero */}
      <section className={`${styles.hero} ${styles.sectionStripe}`} ref={(el) => (sectionRefs.current[0] = el)}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Enterprise Intelligence Solutions Built for Autonomous Systems and Privacy-Critical Environments
            </h1>
            <p className={styles.heroSub}>
              Anoryx Tech Solutions develops intelligence infrastructure, agentic workflow systems, and privacy-first enterprise AI platforms. Our solutions are engineered to enable organizations to build autonomous operational capabilities, protect sensitive data, and deploy scalable intelligence systems through modular backend architectures and agent-driven execution frameworks.
            </p>
            <div className={styles.heroCTAs}>
              <Link to="/products" className={styles.btnPrimary}>Explore Products</Link>
              <Link to="/solutions/industry-applications" className={styles.btnSecondary}>View Industry Applications</Link>
            </div>
          </div>
          <div className={styles.heroMock}>
            {/* Second mock: on top, offset 25px left + 25px down, different content & bg */}
            <div className={styles.dashboardMockSecond}>
              <div className={styles.mockHeader}>
                <span className={styles.mockDots}><i /><i /><i /></span>
                <span className={styles.mockTitle}>Workflow Execution</span>
              </div>
              <div className={styles.mockTabs}>
                <span className={styles.mockTabActive}>Runs</span>
                <span>History</span>
                <span>Settings</span>
              </div>
              <div className={styles.mockBody}>
                <div className={styles.mockStatRow}>
                  <div className={styles.mockStat}><strong>24</strong> Completed</div>
                  <div className={styles.mockStat}><strong>3</strong> In progress</div>
                </div>
                <div className={styles.mockPipeline}>
                  <div className={styles.mockPipelineLabel}>Queue depth</div>
                  <div className={styles.mockPipelineBar}><span style={{ width: '45%' }} /></div>
                </div>
                <div className={styles.mockList}>
                  <div className={styles.mockListItem}><span className={styles.mockBadge}>Success</span> Export — analytics</div>
                  <div className={styles.mockListItem}><span className={styles.mockBadge}>Pending</span> PII audit — staging</div>
                </div>
              </div>
            </div>
            {/* First mock: Intelligence Control, no right border, blur on right */}
            <div className={styles.dashboardMock}>
              <div className={styles.mockBlurEdge} aria-hidden />
              <div className={styles.mockHeader}>
                <span className={styles.mockDots}><i /><i /><i /></span>
                <span className={styles.mockTitle}>Intelligence Control</span>
              </div>
              <div className={styles.mockTabs}>
                <span className={styles.mockTabActive}>Dashboard</span>
                <span>Workflows</span>
                <span>Agents</span>
              </div>
              <div className={styles.mockBody}>
                <div className={styles.mockStatRow}>
                  <div className={styles.mockStat}><strong>12</strong> Active agents</div>
                  <div className={styles.mockStat}><strong>48</strong> Workflows</div>
                </div>
                <div className={styles.mockPipeline}>
                  <div className={styles.mockPipelineLabel}>Execution pipeline</div>
                  <div className={styles.mockPipelineBar}><span style={{ width: '72%' }} /></div>
                </div>
                <div className={styles.mockList}>
                  <div className={styles.mockListItem}><span className={styles.mockBadge}>Running</span> PII Scan — prod</div>
                  <div className={styles.mockListItem}><span className={styles.mockBadge}>Done</span> Data sync — warehouse</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Core capabilities grid */}
      <section className={`${styles.section} ${styles.sectionStripe}`} ref={(el) => (sectionRefs.current[1] = el)}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Core Enterprise Solution Capabilities</h2>
          <p className={styles.sectionLead}>What Anoryx delivers to enterprises: intelligence infrastructure, agentic systems, and privacy-first platforms.</p>
          <div className={styles.capGrid}>
            {CAPABILITY_CARDS.map((card, i) => (
              <div key={i} className={styles.capCard}>
                <span className={styles.capIcon}><CapabilityIcon name={card.icon} /></span>
                <h3 className={styles.capTitle}>{card.title}</h3>
                <p className={styles.capBody}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — PII Sentinel MVP Demo (premium) */}
      <section id="pii-sentinel-video" className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.piiSection}`} ref={(el) => (sectionRefs.current[2] = el)}>
        <div className={styles.container}>
          <div className={styles.piiTitleRow}>
            <span className={styles.piiSectionIcon} aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </span>
            <h2 className={styles.piiSectionTitle}>PII Sentinel — Privacy Intelligence Infrastructure in Action</h2>
          </div>
          <div className={styles.videoOuterWrap}>
            <div className={styles.videoWrapPremium}>
              <div className={styles.videoCard}>
                <div className={styles.videoAspect}>
                  {piiVideoPlaying && !videoFullscreen ? (
                    <iframe
                      title="PII Sentinel MVP Demo"
                      src={`https://www.youtube.com/embed/${PII_SENTINEL_YOUTUBE_ID}?autoplay=1&loop=1&playlist=${PII_SENTINEL_YOUTUBE_ID}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className={styles.videoIframe}
                    />
                  ) : (
                    <button
                      type="button"
                      className={styles.videoThumbnailWrap}
                      onClick={() => setPiiVideoPlaying(true)}
                      aria-label="Play PII Sentinel demo video"
                    >
                      <img
                        src={PII_SENTINEL_THUMBNAIL}
                        alt=""
                        className={styles.videoThumbnail}
                        onError={(e) => { e.target.onerror = null; e.target.src = PII_SENTINEL_THUMBNAIL_FALLBACK; }}
                      />
                      <span className={styles.videoPlayBtn} aria-hidden>
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                      </span>
                      <span className={styles.videoThumbnailOverlay} aria-hidden />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {videoFullscreen &&
            createPortal(
              <div className={styles.videoFullscreenWrap} role="dialog" aria-modal="true" aria-label="PII Sentinel demo video fullscreen">
                <button
                  type="button"
                  className={styles.videoFullscreenClose}
                  onClick={() => setVideoFullscreen(false)}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    setVideoFullscreen(false);
                  }}
                  aria-label="Close fullscreen video"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
                {/* Tap-to-close layer: catches touches on tablet/mobile so they close fullscreen instead of opening YouTube */}
                <div
                  className={styles.videoFullscreenTapClose}
                  onClick={() => setVideoFullscreen(false)}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    setVideoFullscreen(false);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Close fullscreen video"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setVideoFullscreen(false); } }}
                />
                <div className={styles.videoWrapPremium}>
                  <div className={`${styles.videoCard} ${styles.videoCardFullscreen}`}>
                    <div className={styles.videoAspect}>
                      <iframe
                        title="PII Sentinel MVP Demo"
                        src={`https://www.youtube.com/embed/${PII_SENTINEL_YOUTUBE_ID}?autoplay=1&loop=1&playlist=${PII_SENTINEL_YOUTUBE_ID}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={styles.videoIframe}
                      />
                    </div>
                  </div>
                </div>
              </div>,
              document.body
            )}
          <p className={styles.videoDesc}>
            PII Sentinel is Anoryx's privacy-first intelligence platform designed to detect, analyze, and protect sensitive data across enterprise environments. The system uses agent-driven workflows and real-time analysis to identify personal identifiable information and automatically enforce protection mechanisms. Built using modular microservices and agent orchestration frameworks, PII Sentinel enables enterprises to deploy privacy-aware intelligence infrastructure without disrupting operational workflows.
          </p>
          <div className={styles.videoCtaWrap}>
            <Link to="/products#pii-sentinel" className={styles.btnPrimary}>View Full Product Details</Link>
          </div>
        </div>
      </section>

      {/* Section 4 — Products */}
      <section className={`${styles.section} ${styles.sectionStripe}`} ref={(el) => (sectionRefs.current[3] = el)}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Anoryx Products</h2>
          <div className={styles.productGrid}>
            <div className={styles.productCard}>
              <span className={styles.productIcon} aria-hidden>{icon(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />)}</span>
              <h3 className={styles.productName}>PII Sentinel</h3>
              <p className={styles.productDesc}>
                PII Sentinel is a privacy-first intelligence system developed by Anoryx Tech Solutions to address the growing challenge of sensitive data exposure in modern digital systems. The platform continuously monitors enterprise data flows, identifies personal identifiable information using intelligence models, and executes automated protection workflows through agent-based orchestration. Its modular architecture allows integration into enterprise infrastructure without requiring system redesign, making it suitable for SaaS platforms, enterprise backends, and AI-native systems.
              </p>
              <Link to="/products#pii-sentinel" className={styles.productLink}>Learn More</Link>
            </div>
            <div className={styles.productCard}>
              <span className={styles.productIcon} aria-hidden>{icon(<><circle cx="12" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M12 8v2M8.5 16.5L12 13M15.5 16.5L12 13" /></>)}</span>
              <h3 className={styles.productName}>Rendly</h3>
              <p className={styles.productDesc}>
                Rendly is an intelligent workflow and coordination platform designed to augment human productivity through agent-driven automation and intelligence orchestration. Rendly enables systems to execute workflows autonomously by integrating agent logic, backend services, and decision systems. It is built using modular microservices and intelligence execution infrastructure, allowing scalable deployment across enterprise environments where operational automation and intelligent coordination are required.
              </p>
              <Link to="/products" className={styles.productLink}>Explore Rendly</Link>
            </div>
            <div className={styles.productCard}>
              <span className={styles.productIcon} aria-hidden>{icon(<><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></>)}</span>
              <h3 className={styles.productName}>B4Labs</h3>
              <p className={styles.productDesc}>
                B4Labs is Anoryx's internal research and development platform focused on building next-generation intelligence infrastructure, agent orchestration frameworks, and autonomous execution systems. It serves as the foundation for experimentation, architecture validation, and development of intelligence components used across Anoryx products. B4Labs enables rapid development and testing of intelligence systems that later evolve into production-grade enterprise platforms.
              </p>
              <Link to="/products" className={styles.productLink}>View Research Platform</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Agentic Workflow Systems (premium) */}
      <section className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.workflowSection}`} ref={(el) => (sectionRefs.current[4] = el)}>
        <div className={styles.container}>
          <div className={styles.workflowSectionContent}>
            <div className={styles.workflowTitleRow}>
              <span className={styles.workflowSectionIcon} aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><path d="M10 6h4M6 14v-4M18 10h-4" /></svg>
              </span>
              <h2 className={styles.workflowSectionTitle}>Agentic Workflow Systems and Autonomous Execution Infrastructure</h2>
            </div>
            <p className={styles.workflowSectionLead}>
              Anoryx develops agent-based systems that enable software infrastructure to operate autonomously—using agent orchestration frameworks, modular backend services, and intelligence execution pipelines to perform tasks without manual intervention.
            </p>
            <ul className={styles.workflowBulletList}>
              <li><span className={styles.workflowBulletIcon} aria-hidden><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span><span><strong>PII Sentinel</strong> — privacy detection and response workflows</span></li>
              <li><span className={styles.workflowBulletIcon} aria-hidden><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span><span><strong>Rendly</strong> — intelligent coordination and task execution</span></li>
              <li><span className={styles.workflowBulletIcon} aria-hidden><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span><span><strong>Enterprise backend</strong> — scalable, agent-driven operations</span></li>
            </ul>
            <p className={styles.workflowSectionBody}>
              Structured execution logic combined with intelligence models automates decision workflows, data handling, and operational execution.
            </p>
          </div>
          {/* Full-width row: Pipeline + Where it runs (shift top) */}
          <div className={styles.workflowVizFull}>
            <div className={styles.workflowMock}>
              <div className={styles.workflowMockHeader}>
                <span className={styles.workflowMockHeaderLine} />
                Agent Execution Pipeline
              </div>
              <div className={styles.workflowSteps}>
                <div className={styles.workflowStep}>
                  <span className={styles.stepIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg></span>
                  <span>Ingest</span>
                </div>
                <div className={styles.workflowLine} />
                <div className={styles.workflowStep}>
                  <span className={styles.stepIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg></span>
                  <span>Process</span>
                </div>
                <div className={styles.workflowLine} />
                <div className={styles.workflowStep}>
                  <span className={styles.stepIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg></span>
                  <span>Decide</span>
                </div>
                <div className={styles.workflowLine} />
                <div className={styles.workflowStep}>
                  <span className={styles.stepIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
                  <span>Execute</span>
                </div>
              </div>
            </div>
            <div className={styles.workflowMiniMock}>
              <div className={styles.miniMockTitle}>Where it runs</div>
              <div className={styles.workflowMiniRow}>
                <span className={styles.workflowMiniPill}>PII Sentinel</span>
                <span className={styles.workflowMiniPill}>Rendly</span>
              </div>
              <div className={styles.miniMockBar}><span style={{ width: '70%' }} /></div>
              <div className={styles.miniMockLabel}>Agent coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 — Custom Intelligence Backend */}
      <section className={`${styles.section} ${styles.sectionStripe} ${styles.sectionBackend}`} ref={(el) => (sectionRefs.current[5] = el)}>
        <div className={styles.container}>
          <div className={styles.backendSectionLayout}>
            <div className={styles.backendSectionContent}>
              <h2 className={styles.backendSectionTitle}>Custom Intelligence Backend and Enterprise System Engineering</h2>
              <p className={styles.backendSectionLead}>
                Anoryx builds custom backend intelligence systems designed to serve as execution infrastructure for intelligent applications. These systems use modular microservice architectures, scalable execution pipelines, and intelligence-integrated backend logic to enable reliable operation in enterprise environments.
              </p>
              <ul className={styles.bulletListPremium}>
                <li><span className={styles.bulletIcon} aria-hidden /><span>Modular backend architecture</span></li>
                <li><span className={styles.bulletIcon} aria-hidden /><span>Microservice systems</span></li>
                <li><span className={styles.bulletIcon} aria-hidden /><span>Execution infrastructure</span></li>
                <li><span className={styles.bulletIcon} aria-hidden /><span>Enterprise scalability</span></li>
              </ul>
            </div>
            <div className={styles.backendSectionViz}>
              <div className={styles.backendMock}>
                <div className={styles.backendMockHeader}>
                  <span className={styles.backendMockHeaderLine} />
                  Backend Architecture
                </div>
                <div className={styles.backendBlocks}>
                  <div className={styles.backendBlock}>API Gateway</div>
                  <div className={styles.backendBlock}>Orchestration</div>
                  <div className={`${styles.backendBlock} ${styles.backendBlockHighlight}`}>Intelligence Core</div>
                  <div className={styles.backendBlock}>Data Layer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 — Domain-Specific Intelligence (premium) */}
      <section className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.premiumSection}`} ref={(el) => (sectionRefs.current[6] = el)}>
        <div className={styles.container}>
          <div className={styles.premiumLayout}>
            <div className={styles.premiumContent}>
              <div className={styles.premiumTitleRow}>
                <span className={styles.premiumIcon} aria-hidden><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M12 8v2M8.5 16.5L12 13M15.5 16.5L12 13" /></svg></span>
                <h2 className={styles.premiumTitle}>Domain-Specific Intelligence and SLM Systems</h2>
              </div>
              <p className={styles.premiumLead}>
                Anoryx develops domain-specific intelligence systems optimized for enterprise environments. These systems integrate structured logic, intelligence execution mechanisms, and domain-specific operational workflows to enable intelligent automation while maintaining reliability and security.
              </p>
              <ul className={styles.premiumList}>
                <li><span className={styles.premiumListIcon} aria-hidden><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span>Models tuned for privacy detection, workflow classification, and decision support</li>
                <li><span className={styles.premiumListIcon} aria-hidden><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span>Controlled rollout, auditability, and identity integration</li>
                <li><span className={styles.premiumListIcon} aria-hidden><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg></span>On-premises, hybrid, and API-driven consumption</li>
              </ul>
              <p className={styles.premiumBody}>
                Enterprise deployment includes on-premises and hybrid options. APIs and event interfaces enable domain intelligence to be consumed by existing applications without replacing core systems.
              </p>
            </div>
            <div className={styles.premiumMock}>
              <div className={styles.miniMock}>
                <div className={styles.miniMockTitle}>Domain deployment</div>
                <div className={styles.miniMockRow}><span className={styles.miniMockPill}>On-prem</span><span className={styles.miniMockPill}>Hybrid</span></div>
                <div className={styles.miniMockBar}><span style={{ width: '75%' }} /></div>
                <div className={styles.miniMockLabel}>API readiness</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 — Industry Impact (premium) */}
      <section className={`${styles.section} ${styles.sectionStripe} ${styles.premiumSection}`} ref={(el) => (sectionRefs.current[7] = el)}>
        <div className={styles.container}>
          <div className={styles.premiumLayout}>
            <div className={styles.premiumContent}>
              <div className={styles.premiumTitleRow}>
                <span className={styles.premiumIcon} aria-hidden><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M5.64 17.66l2.83-2.83M15.53 6.34l2.83-2.83" /><circle cx="12" cy="12" r="2.5" /></svg></span>
                <h2 className={styles.premiumTitle}>Industry Impact and Enterprise Transformation</h2>
              </div>
              <p className={styles.premiumLead}>
                Anoryx solutions enable organizations to transition from manual operational models to intelligence-driven execution environments—improving efficiency, reducing overhead, and scaling infrastructure.
              </p>
              <div className={styles.premiumCards}>
                <div className={styles.premiumCard}><span className={styles.premiumCardIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg></span><span>Phased adoption & measurable outcomes</span></div>
                <div className={styles.premiumCard}><span className={styles.premiumCardIcon} aria-hidden><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></span><span>Financial, Healthcare, SaaS, Hybrid</span></div>
              </div>
              <p className={styles.premiumBody}>
                Transformation starts with high-impact workflows (privacy monitoring, approval pipelines) then expands to agentic automation. Industries with strong fit include financial services, healthcare (HIPAA-aligned), and multi-cloud enterprises.
              </p>
            </div>
            <div className={styles.premiumMock}>
              <div className={styles.miniMock}>
                <div className={styles.miniMockTitle}>Impact metrics</div>
                <div className={styles.miniMockStat}><strong>↓</strong> Manual overhead</div>
                <div className={styles.miniMockStat}><strong>↑</strong> Throughput</div>
                <div className={styles.miniMockBar}><span style={{ width: '88%' }} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9 — Technology Foundation (premium) */}
      <section className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.premiumSection}`} ref={(el) => (sectionRefs.current[8] = el)}>
        <div className={styles.container}>
          <div className={styles.premiumLayout}>
            <div className={styles.premiumContent}>
              <div className={styles.premiumTitleRow}>
                <span className={styles.premiumIcon} aria-hidden><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg></span>
                <h2 className={styles.premiumTitle}>Technology Foundation and Infrastructure</h2>
              </div>
              <p className={styles.premiumLead}>
                Built on microservices architecture, distributed backend systems, agent orchestration, and enterprise integration. Security, scale, and long-term maintenance are built in.
              </p>
              <div className={styles.premiumPillGrid}>
                <div className={styles.premiumPill}><span className={styles.pillIcon} aria-hidden><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2L2 7l10 5 10-5-10-5z" /></svg></span> Microservices</div>
                <div className={styles.premiumPill}><span className={styles.pillIcon} aria-hidden><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2L2 7l10 5 10-5-10-5z" /></svg></span> Distributed systems</div>
                <div className={styles.premiumPill}><span className={styles.pillIcon} aria-hidden><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2L2 7l10 5 10-5-10-5z" /></svg></span> Agent orchestration</div>
                <div className={styles.premiumPill}><span className={styles.pillIcon} aria-hidden><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2L2 7l10 5 10-5-10-5z" /></svg></span> Enterprise integration</div>
              </div>
              <p className={styles.premiumBody}>
                Encryption in transit and at rest, role-based access, and compliance frameworks. Deployment: cloud-hosted, on-premises, and hybrid for data residency and governance.
              </p>
            </div>
            <div className={styles.premiumMock}>
              <div className={styles.miniMock}>
                <div className={styles.miniMockTitle}>Stack</div>
                <div className={styles.miniMockStack}>
                  <div className={styles.miniMockStackItem}>API</div>
                  <div className={styles.miniMockStackItem}>Orchestration</div>
                  <div className={styles.miniMockStackItem}>Intelligence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10 — Enterprise Engagement (premium) */}
      <section className={`${styles.section} ${styles.sectionStripe} ${styles.premiumSection}`} ref={(el) => (sectionRefs.current[9] = el)}>
        <div className={styles.container}>
          <div className={styles.premiumLayout}>
            <div className={styles.premiumContent}>
              <div className={styles.premiumTitleRow}>
                <span className={styles.premiumIcon} aria-hidden><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg></span>
                <h2 className={styles.premiumTitle}>Enterprise Engagement and Deployment</h2>
              </div>
              <p className={styles.premiumLead}>
                Anoryx works with enterprises to design, develop, and deploy intelligence infrastructure tailored to operational requirements—scalability, reliability, and long-term integration.
              </p>
              <div className={styles.premiumSteps}>
                <div className={styles.premiumStep}><span className={styles.stepNum}>1</span> Discovery & architecture</div>
                <div className={styles.premiumStep}><span className={styles.stepNum}>2</span> Phased implementation & pilots</div>
                <div className={styles.premiumStep}><span className={styles.stepNum}>3</span> Support, APIs, observability</div>
              </div>
              <p className={styles.premiumBody}>
                Deployment is supported with documentation, runbooks, and optional managed services. Clear APIs, observability, and upgrade paths keep investments viable as technology evolves.
              </p>
            </div>
            <div className={styles.premiumMock}>
              <div className={styles.miniMock}>
                <div className={styles.miniMockTitle}>Engagement</div>
                <div className={styles.miniMockRow}><span className={styles.miniMockTag}>PII Sentinel</span><span className={styles.miniMockTag}>Rendly</span></div>
                <div className={styles.miniMockLabel}>Pilot → Rollout</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>
      {/* Section 11 — CTA (no stripe lines) */}
      <section className={styles.ctaSection} ref={(el) => (sectionRefs.current[10] = el)}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Build Intelligence Infrastructure for Your Enterprise</h2>
          <div className={styles.ctaButtons}>
            <a href="mailto:contact@anoryx.com" className={styles.btnPrimary}>Contact Anoryx</a>
            <Link to="/products" className={styles.btnSecondary}>Explore Products</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
