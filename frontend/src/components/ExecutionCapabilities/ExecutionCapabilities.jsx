import styles from './ExecutionCapabilities.module.css';

const EXECUTION_DOMAINS = [
  {
    id: 1,
    title: 'Autonomous Decision Execution',
    description: 'Continuously evaluates enterprise conditions and executes optimal decisions without human intervention.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Cross-System Workflow Orchestration',
    description: 'Coordinates actions across cloud systems, internal infrastructure, and enterprise platforms.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="8" height="8" rx="1" />
        <rect x="14" y="3" width="8" height="8" rx="1" />
        <rect x="2" y="13" width="8" height="8" rx="1" />
        <rect x="14" y="13" width="8" height="8" rx="1" />
        <path d="M10 7h4M10 17h4M7 10v4M17 10v4" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Predictive Operational Intelligence',
    description: 'Anticipates operational states and initiates corrective or optimizing actions before issues occur.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Enterprise Data Signal Processing',
    description: 'Transforms fragmented enterprise data into actionable real-time intelligence.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Continuous System Optimization',
    description: 'Improves execution performance continuously using feedback and operational learning.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21.5 2v6h-6M2.5 22v-6h6" />
        <path d="M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Secure Autonomous Execution',
    description: 'Executes enterprise operations safely within governance, compliance, and security constraints.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function ExecutionCapabilities() {
  return (
    <section className={styles.section} aria-labelledby="execution-heading">
      <div className={styles.container}>
        {/* Part 1 — Section Header */}
        <header className={styles.header}>
          <span className={styles.label}>Execution Capabilities</span>
          <h2 id="execution-heading" className={styles.title}>
            Real-World Autonomous Enterprise Execution
          </h2>
          <p className={styles.description}>
            Anoryx intelligence systems actively sense enterprise signals, make decisions, and execute actions across infrastructure, enabling fully autonomous enterprise operations.
          </p>
        </header>

        {/* Part 2 — Execution Capability System Grid */}
        <div className={styles.grid}>
          {EXECUTION_DOMAINS.map((domain) => (
            <article
              key={domain.id}
              className={styles.block}
            >
              <div className={styles.signalIndicator} aria-hidden="true" />
              <div className={styles.blockIcon}>{domain.icon}</div>
              <h3 className={styles.blockTitle}>{domain.title}</h3>
              <p className={styles.blockDescription}>{domain.description}</p>
            </article>
          ))}
        </div>

        {/* Part 3 — Subtle execution signal presence (micro reinforcement) */}
        <div className={styles.footerSignal} aria-hidden="true" />
      </div>
    </section>
  );
}
