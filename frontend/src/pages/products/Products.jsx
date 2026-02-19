import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Products.module.css';
import pii1 from '../../assets/pii1.jpg';
import pii2 from '../../assets/pii2.jpg';
import pii4 from '../../assets/pii4.jpg';
import rendly1 from '../../assets/rendly1.jpg';
import rendly2 from '../../assets/rendly2.jpg';
import rendly3 from '../../assets/rendly3.jpg';

export default function Products() {
  const sectionRefs = useRef([]);
  const [inView, setInView] = useState({});
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        const t = setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        return () => clearTimeout(t);
      }
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const observers = sectionRefs.current
      .filter(Boolean)
      .map((el) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setInView((prev) => ({ ...prev, [entry.target.dataset.section]: true }));
              }
            });
          },
          { rootMargin: '-5% 0px -5% 0px', threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
      });
    return () => observers.forEach((o) => o?.disconnect?.());
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageStrip}>
        {/* Section 1 — Products Hero */}
        <section
          className={`${styles.hero} ${styles.sectionStripe} ${inView.hero ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[0] = el)}
          data-section="hero"
        >
          <div className={styles.heroBg} />
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Enterprise Intelligence Products Built for Autonomous Infrastructure</h1>
              <p className={styles.heroSub}>
                Anoryx Tech Solutions develops foundational intelligence infrastructure products designed to enable autonomous system execution, privacy protection, and intelligent workflow automation. These products address fundamental limitations in traditional software systems by enabling continuous intelligence-driven operation at the infrastructure level.
              </p>
              <div className={styles.heroCTAs}>
                <a href="#pii-sentinel" className={styles.btnPrimary}>Explore PII Sentinel</a>
                <a href="#rendly" className={styles.btnPrimary}>Explore Rendly</a>
                <a href="#b4labs" className={styles.btnPrimary}>Explore B4Labs</a>
              </div>
            </div>
            <div className={styles.heroMock}>
              <div className={styles.heroMockCard}>
                <div className={styles.heroMockHeader}>
                  <span className={styles.heroMockDots}><i /><i /><i /></span>
                  <span>Intelligence System</span>
                </div>
                <div className={styles.intelDiagram}>
                  <div className={styles.intelLayer}>
                    <span className={styles.intelNode}>Data</span>
                    <span className={styles.intelNode}>Ingest</span>
                    <span className={styles.intelNode}>Schema</span>
                  </div>
                  <svg className={styles.intelConnector} viewBox="0 0 40 12" preserveAspectRatio="none"><path d="M20 0v4c0 2 4 4 8 4h4M20 0v4c0 2-4 4-8 4H8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeOpacity="0.4"/></svg>
                  <div className={styles.intelLayer}>
                    <span className={`${styles.intelNode} ${styles.intelNodePrimary}`}>Process</span>
                    <span className={`${styles.intelNode} ${styles.intelNodePrimary}`}>Analyze</span>
                  </div>
                  <svg className={styles.intelConnector} viewBox="0 0 40 12" preserveAspectRatio="none"><path d="M20 0v4c0 2 4 4 8 4h4M20 0v4c0 2-4 4-8 4H8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeOpacity="0.4"/></svg>
                  <div className={styles.intelLayer}>
                    <span className={styles.intelNode}>Agents</span>
                    <span className={styles.intelNode}>Orchestrate</span>
                    <span className={styles.intelNode}>Execute</span>
                  </div>
                  <svg className={styles.intelConnector} viewBox="0 0 40 12" preserveAspectRatio="none"><path d="M20 0v4c0 2 4 4 8 4h4M20 0v4c0 2-4 4-8 4H8" stroke="currentColor" strokeWidth="1.2" fill="none" strokeOpacity="0.4"/></svg>
                  <div className={styles.intelLayer}>
                    <span className={styles.intelNode}>Output</span>
                    <span className={styles.intelNode}>API</span>
                  </div>
                </div>
                <div className={styles.heroMockBar}><span style={{ width: '72%' }} /></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — Products Overview */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${inView.overview ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[1] = el)}
          data-section="overview"
        >
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>Product Ecosystem</h2>
            <p className={styles.sectionLead}>
              Three products form the Anoryx intelligence infrastructure ecosystem: PII Sentinel for privacy and compliance, Rendly for digital identity and professional ecosystems, and B4Labs as the research and innovation engine. Together they address enterprise AI infrastructure, privacy-first execution, and autonomous workflow systems.
            </p>
            <div className={styles.overviewCards}>
              <Link to="#pii-sentinel" className={styles.overviewCard}>
                <span className={styles.overviewIcon} aria-hidden><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></span>
                <h3 className={styles.overviewCardTitle}>PII Sentinel</h3>
                <p className={styles.overviewCardDesc}>AI-powered privacy and protection platform for detecting, monitoring, and securing PII across enterprise systems. Privacy infrastructure for regulated industries.</p>
                <span className={styles.overviewCardLink}>View product →</span>
              </Link>
              <Link to="#rendly" className={styles.overviewCard}>
                <span className={styles.overviewIcon} aria-hidden><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg></span>
                <h3 className={styles.overviewCardTitle}>Rendly</h3>
                <p className={styles.overviewCardDesc}>Digital identity and professional ecosystem platform—collaboration, discovery, and opportunity matching for the global digital workforce.</p>
                <span className={styles.overviewCardLink}>View product →</span>
              </Link>
              <Link to="#b4labs" className={styles.overviewCard}>
                <span className={styles.overviewIcon} aria-hidden><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg></span>
                <h3 className={styles.overviewCardTitle}>B4Labs</h3>
                <p className={styles.overviewCardDesc}>Intelligence infrastructure research and development platform—autonomous agents, multi-agent workflows, and experimental systems.</p>
                <span className={styles.overviewCardLink}>View platform →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 3 — PII Sentinel Full */}
        <section
          id="pii-sentinel"
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.productSection} ${inView.pii ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[2] = el)}
          data-section="pii"
        >
          <div className={styles.container}>
            <h2 className={styles.productMainTitle}>PII Sentinel</h2>
            <p className={styles.productTagline}>Privacy-First Intelligence Infrastructure Platform</p>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>What is PII Sentinel</h3>
              <p>PII Sentinel is a privacy-first intelligence infrastructure platform designed to detect, analyze, and protect sensitive data across enterprise systems. It uses agentic workflows, intelligence-based analysis, and automated enforcement to deliver continuous privacy protection at scale. Privacy infrastructure is critical globally as regulations tighten and data volumes grow—enterprises need infrastructure-level solutions, not point tools.</p>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Problem PII Sentinel Solves</h3>
              <p>Sensitive data exposure risk is pervasive: unstructured data flows, legacy systems, and hybrid clouds create blind spots. Manual privacy management does not scale and cannot keep pace with real-time data movement. Compliance and risk exposure multiply when organizations lack continuous visibility and automated enforcement. Existing solutions often fail because they rely on rule-based DLP and static policies—they lack the intelligence, adaptability, and automation required for modern data ecosystems.</p>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>How PII Sentinel Solves It</h3>
              <p>PII Sentinel is built on agent-driven workflows, intelligence-based detection using NLP and LLM capabilities, and automated protection execution. The architecture implements a real-time intelligence pipeline with context-aware data classification, secure data processing, and compliance mapping—delivering infrastructure-level privacy rather than bolt-on tools.</p>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Product Interface and System Images</h3>
              <div className={`${styles.imageRow} ${styles.imageRowLarge}`}>
                <div className={styles.imageContainer}>
                  <img src={pii1} alt="PII Sentinel dashboard view" className={styles.productImage} />
                  <span className={styles.imageCaption}>Dashboard view</span>
                </div>
                <div className={styles.imageContainer}>
                  <img src={pii2} alt="PII Sentinel detection interface" className={styles.productImage} />
                  <span className={styles.imageCaption}>Detection interface</span>
                </div>
                <div className={styles.imageContainer}>
                  <img src={pii4} alt="PII Sentinel detailed analysis report" className={styles.productImage} />
                  <span className={styles.imageCaption}>Detailed analysis report</span>
                </div>
              </div>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Enterprise Value and Impact</h3>
              <p>Enterprises gain automated protection across data flows, reduced compliance and breach risk, and scalable privacy infrastructure that grows with the organization. PII Sentinel supports FinTech, healthcare, SaaS, and government digital systems with intelligent PII detection, data leak monitoring, and compliance automation.</p>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Market Position and Opportunity</h3>
              <p>PII Sentinel fits in the privacy infrastructure and enterprise AI security market. It supports enterprises adopting AI while meeting global regulatory requirements (e.g. GDPR, DPDP). The market opportunity spans enterprises handling sensitive customer data globally—TAM in privacy and data protection continues to expand as regulation and data volumes increase.</p>
            </div>

            <div className={styles.mvpDemoBlock}>
              <h3 className={styles.mvpDemoTitle}>MVP Demo Video</h3>
              <p className={styles.mvpDemoText}>Watch the PII Sentinel MVP demo to see privacy-first intelligence infrastructure in action—detection, analysis, and automated protection workflows.</p>
              <Link to="/solutions#pii-sentinel-video" state={{ autoExpandVideo: true }} className={styles.mvpDemoBtn}>Watch MVP Demo Video</Link>
            </div>
          </div>
        </section>

        {/* Section 4 — Rendly Full */}
        <section
          id="rendly"
          className={`${styles.section} ${styles.sectionStripe} ${styles.productSection} ${inView.rendly ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[3] = el)}
          data-section="rendly"
        >
          <div className={styles.container}>
            <h2 className={styles.productMainTitle}>Rendly</h2>
            <p className={styles.productTagline}>Digital Identity and Professional Ecosystem Platform</p>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>What is Rendly</h3>
              <p>Rendly is a digital identity and professional ecosystem platform designed to redefine how individuals connect, collaborate, and grow in the digital world. It enables autonomous workflow execution and intelligent coordination through scalable backend systems, identity and trust architecture, and AI-driven matching—serving students, professionals, creators, and the global digital workforce.</p>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Problem Rendly Solves</h3>
              <p>Manual workflow coordination and human operational bottlenecks limit scale. Fragmented professional identity and shallow networking platforms fail to deliver meaningful collaboration. The gap in the current market is the lack of agent-native workflow infrastructure and deep identity ecosystems that combine professional growth with opportunity discovery.</p>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>How Rendly Solves It</h3>
              <p>Rendly is built on agent orchestration infrastructure, workflow intelligence execution, and backend automation. The platform delivers a digital identity ecosystem, collaboration and discovery tools, and reputation and opportunity matching—creating a new category of agent-native workflow and identity infrastructure.</p>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Product Interface and Visuals</h3>
              <div className={`${styles.imageRow} ${styles.imageRowLarge}`}>
                <div className={styles.imageContainer}>
                  <img src={rendly1} alt="Rendly logo" className={styles.productImage} />
                  <span className={styles.imageCaption}>Rendly logo</span>
                </div>
                <div className={styles.imageContainer}>
                  <img src={rendly2} alt="Rendly authentication and signup page" className={styles.productImage} />
                  <span className={styles.imageCaption}>Authentication and signup</span>
                </div>
                <div className={styles.imageContainer}>
                  <img src={rendly3} alt="Rendly dashboard" className={styles.productImage} />
                  <span className={styles.imageCaption}>Dashboard</span>
                </div>
              </div>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Market Creation and Category Innovation</h3>
              <p>Rendly contributes to the agent-native workflow infrastructure category—where systems execute workflows autonomously through coordinated agent execution. This category is growing globally as enterprises seek intelligent coordination and task execution at scale beyond traditional workflow tools.</p>
            </div>
          </div>
        </section>

        {/* Section 5 — B4Labs Full */}
        <section
          id="b4labs"
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${styles.productSection} ${inView.b4labs ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[4] = el)}
          data-section="b4labs"
        >
          <div className={styles.container}>
            <h2 className={styles.productMainTitle}>B4Labs</h2>
            <p className={styles.productTagline}>Intelligence Infrastructure Research and Development Platform</p>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>What is B4Labs</h3>
              <p>B4Labs is Anoryx’s intelligence infrastructure research and development platform. It serves as the innovation and research engine, focusing on experimental technologies and future-facing systems—AI research and experimentation, autonomous agent systems, multi-agent workflows, LLM-based automation, and prototype development.</p>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Why B4Labs Exists</h3>
              <p>The current ecosystem lacks dedicated experimentation platforms for infrastructure-level intelligence research. B4Labs exists to fill that gap: it produces internal AI frameworks, proof-of-concepts, and research-driven system architectures that support existing Anoryx products and generate future product opportunities.</p>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>How B4Labs Drives Innovation</h3>
              <p>Through platform experimentation, architecture development, and infrastructure research, B4Labs validates new capabilities before they become product features. Proof-of-concept work is completed; advanced development and expansion are in progress—positioning Anoryx at the forefront of intelligence infrastructure innovation.</p>
            </div>

            <div className={styles.subsection}>
              <div className={styles.inProgressBlock}>
                <span className={styles.inProgressIcon} aria-hidden>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </span>
                <h3 className={styles.inProgressTitle}>In development</h3>
                <p className={styles.inProgressText}>B4Labs is currently in proof-of-concept and active development. Research systems, architecture experiments, and prototype visuals will be shared here as they become available. Stay tuned for updates.</p>
              </div>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Market Impact and Category Creation</h3>
              <p>B4Labs contributes to the new intelligence infrastructure ecosystem globally by advancing autonomous agents, multi-agent workflows, and LLM-based automation. Its outputs strengthen Anoryx’s IP and long-term defensibility while enabling new market categories.</p>
            </div>
          </div>
        </section>

        {/* Section 6 — Technology and Architecture Foundation */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${inView.tech ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[5] = el)}
          data-section="tech"
        >
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>Technology and Architecture Foundation</h2>
            <p className={styles.sectionLead}>
              All Anoryx products share a common technology foundation: modular backend architecture, agent orchestration systems, and intelligence infrastructure. The stack emphasizes research-first development, system-level design, scalability, security, and maintainability—using AI/ML, LLMs, autonomous agents, privacy engineering, and cloud-native architecture.
            </p>
            <div className={styles.archContainer}>
              <div className={styles.sharedArch}>
                {/* Layer 1: Input */}
                <div className={styles.archLayer}>
                  <span className={styles.archNode}>Data</span>
                  <span className={styles.archNode}>Ingest</span>
                  <span className={styles.archNode}>Schema</span>
                </div>
                <svg className={styles.archConnectorV} viewBox="0 0 20 24" preserveAspectRatio="none" aria-hidden><path d="M10 0v24" stroke="currentColor" strokeWidth="1.2" fill="none" strokeDasharray="4 2" opacity="0.5"/><path d="M4 12h12M10 8v8M7 11l3-3 3 3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/></svg>
                {/* Layer 2: Foundation */}
                <div className={styles.archFoundation}>
                  <span className={styles.archFoundationLabel}>Shared technology foundation</span>
                </div>
                {/* Connector: foundation to three pillars */}
                <div className={styles.archConnectorSplit}>
                  <span className={styles.archConnectorLine} />
                  <span className={styles.archConnectorLine} />
                  <span className={styles.archConnectorLine} />
                </div>
                {/* Layer 3: Three pillars */}
                <div className={styles.archPillars}>
                  <div className={styles.archPillar}>
                    <div className={styles.archPillarTitle}>Modular backend</div>
                    <div className={styles.archPillarNodes}>
                      <span className={styles.archPillarNode}>APIs & services</span>
                      <span className={styles.archPillarNode}>Cloud-native</span>
                      <span className={styles.archPillarNode}>Scalable runtime</span>
                    </div>
                  </div>
                  <div className={styles.archPillar}>
                    <div className={styles.archPillarTitle}>Agent orchestration</div>
                    <div className={styles.archPillarNodes}>
                      <span className={styles.archPillarNode}>Multi-agent</span>
                      <span className={styles.archPillarNode}>Workflows</span>
                      <span className={styles.archPillarNode}>Autonomous execution</span>
                    </div>
                  </div>
                  <div className={styles.archPillar}>
                    <div className={styles.archPillarTitle}>Intelligence infrastructure</div>
                    <div className={styles.archPillarNodes}>
                      <span className={styles.archPillarNode}>AI/ML & LLMs</span>
                      <span className={styles.archPillarNode}>Privacy engineering</span>
                      <span className={styles.archPillarNode}>System-level design</span>
                    </div>
                  </div>
                </div>
                {/* Layer 4: Output pipeline */}
                <svg className={styles.archConnectorV} viewBox="0 0 20 24" preserveAspectRatio="none" aria-hidden><path d="M10 0v24" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4"/></svg>
                <div className={styles.archPipeline}>
                  <span className={styles.archPipelineNode}>Data</span>
                  <svg className={styles.archPipelineArrow} viewBox="0 0 24 12" aria-hidden><path d="M0 6h18m-3-3l3 3-3 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className={styles.archPipelineNode}>Process</span>
                  <svg className={styles.archPipelineArrow} viewBox="0 0 24 12" aria-hidden><path d="M0 6h18m-3-3l3 3-3 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className={styles.archPipelineNode}>Execute</span>
                </div>
              </div>
              <span className={styles.imageCaption}>Shared architecture visual</span>
            </div>
          </div>
        </section>

        {/* Section 7 — Market Positioning */}
        <section
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${inView.market ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[6] = el)}
          data-section="market"
        >
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>Market Positioning</h2>
            <p className={styles.sectionLead}>
              Anoryx products fit in the global infrastructure ecosystem across three vectors: <strong>enterprise AI infrastructure</strong> (intelligent automation, agent systems), <strong>privacy infrastructure</strong> (PII Sentinel, compliance, data protection), and <strong>agentic workflow infrastructure</strong> (Rendly, B4Labs, autonomous execution). The market opportunity spans enterprises, regulated industries, and platform companies that need intelligence, trust, and autonomy at scale.
            </p>
          </div>
        </section>

        {/* Section 8 — Enterprise Value */}
        <section
          className={`${styles.section} ${styles.sectionStripe} ${inView.value ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[7] = el)}
          data-section="value"
        >
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>Enterprise Value</h2>
            <div className={styles.valueGrid}>
              <div className={styles.valueCard}>
                <span className={`${styles.valueIcon} ${styles.valueIconAutomation}`} aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                </span>
                <h4>Automation</h4>
                <p>Intelligence-driven automation reduces manual operations and enables continuous execution.</p>
              </div>
              <div className={styles.valueCard}>
                <span className={`${styles.valueIcon} ${styles.valueIconScale}`} aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="14" height="14" rx="2" /><polyline points="5 12 8 9 12 11 16 6" /><path d="M14 4l3 3 2-2" /></svg>
                </span>
                <h4>Scalability</h4>
                <p>Modular, cloud-native architecture scales with enterprise and global demands.</p>
              </div>
              <div className={styles.valueCard}>
                <span className={`${styles.valueIcon} ${styles.valueIconSecurity}`} aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </span>
                <h4>Security</h4>
                <p>Privacy-first design and secure data pipelines protect sensitive infrastructure.</p>
              </div>
              <div className={styles.valueCard}>
                <span className={`${styles.valueIcon} ${styles.valueIconBrain}`} aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>
                </span>
                <h4>Intelligence infrastructure</h4>
                <p>Foundational layer for autonomous systems, not just point solutions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9 — Product Roadmap */}
        <section
          className={`${styles.sectionAlt} ${styles.sectionStripe} ${inView.roadmap ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[8] = el)}
          data-section="roadmap"
        >
          <div className={styles.container}>
            <h2 className={styles.sectionHeading}>Product Roadmap</h2>
            <div className={styles.timelineWrap}>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <strong>PII Sentinel</strong> — Enterprise-grade development completed; post-development and enterprise readiness. Next: pilot deployments, scaling.
                </div>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <strong>Rendly</strong> — Active development; core systems and features in progress. Next: beta, early users, platform stability.
                </div>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <strong>B4Labs</strong> — Proof-of-concept completed; advanced development and expansion. Next: production-ready frameworks, integration across products.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10 — Enterprise CTA */}
        <section
          className={`${styles.ctaSection} ${inView.cta ? styles.inView : ''}`}
          ref={(el) => (sectionRefs.current[9] = el)}
          data-section="cta"
        >
          <div className={styles.container}>
            <h2 className={styles.ctaHeading}>Deploy Intelligence Infrastructure in Your Enterprise</h2>
            <p className={styles.ctaSub}>
              Request access to Anoryx products or speak with our team about enterprise deployment and platform access.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/contact" className={styles.ctaBtnPrimary}>Request Enterprise Access</Link>
              <Link to="/contact" className={styles.ctaBtnSecondary}>Contact Anoryx</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
