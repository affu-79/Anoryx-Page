import s from './SignalMatrix.module.css';

/* ── Node data ──────────────────────────────────────────── */
const NODES = [
  {
    id: 1, cls: 'node1',
    title: 'Enterprise Data Intelligence',
    micro: 'Unified enterprise signal ingestion',
    tips: ['Multi-source data fusion engine', 'Real-time stream orchestration'],
    icon: (
      <svg viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: 2, cls: 'node2',
    title: 'Cognitive Intelligence Engine',
    micro: 'Context-aware reasoning + prediction',
    tips: ['Hybrid LLM + graph reasoning', 'Predictive decision synthesis'],
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: 3, cls: 'node3',
    title: 'Autonomous Decision Mesh',
    micro: 'Self-coordinating execution agents',
    tips: ['Multi-agent execution coordination', 'Cross-system decision enforcement'],
    icon: (
      <svg viewBox="0 0 24 24">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <line x1="12" y1="22" x2="12" y2="15.5" />
        <line x1="22" y1="8.5" x2="15.5" y2="12" />
        <line x1="2" y1="8.5" x2="8.5" y2="12" />
      </svg>
    ),
  },
  {
    id: 4, cls: 'node4',
    title: 'Enterprise Action Systems',
    micro: 'Direct system execution automation',
    tips: ['ERP / CRM / DevOps integration', 'Autonomous workflow execution'],
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6M1 12h6m6 0h6" />
        <path d="M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24" />
      </svg>
    ),
  },
  {
    id: 5, cls: 'node5',
    title: 'Adaptive Learning Loop',
    micro: 'Continuous intelligence optimization',
    tips: ['Execution feedback integration', 'Autonomous capability growth'],
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M21.5 2v6h-6M2.5 22v-6h6" />
        <path d="M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
      </svg>
    ),
  },
];

/* Bezier beams from center (360,360) outward to 5 node positions.
   Hub viewBox 720x720 (1:1 square). Upper-semicircle layout (180°). */
const BEAMS = [
  { id: 1, d: 'M360,360 C280,280 160,140 70,50' },       // → upper-left (node1) ~135°
  { id: 2, d: 'M360,360 C440,280 560,140 650,50' },       // → upper-right (node2) ~45°
  { id: 3, d: 'M360,360 C360,240 360,80 360,-40' },       // → top-center (node3) ~90°
  { id: 4, d: 'M360,360 C240,360 60,360 -60,360' },       // → far-left (node4) ~180°
  { id: 5, d: 'M360,360 C480,360 660,360 880,360' },      // → far-right (node5) ~0°
];

/* Gradient color pairs per beam */
const GRAD_COLORS = [
  ['#14b8a6', '#2dd4bf'],
  ['#8b5cf6', '#a78bfa'],
  ['#f59e0b', '#fbbf24'],
  ['#f97316', '#fb923c'],
  ['#ec4899', '#f472b6'],
];

export default function SignalMatrix() {
  return (
    <div className={s.section}>
      {/* Desktop / tablet: mind map */}
      <div className={s.desktopLayout}>
      <div className={s.grid}>

        {/* LEFT: Energy Hub Visual */}
        <div className={s.hubCol}>
          <div className={s.hub}>

            {/* SVG beams with gradient strokes + energy pulses */}
            <svg className={s.beams} viewBox="0 0 720 720" preserveAspectRatio="xMidYMid meet">
              <defs>
                {GRAD_COLORS.map(([a, b], i) => (
                  <linearGradient key={i} id={`grad${i + 1}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={a} stopOpacity="0.7" />
                    <stop offset="100%" stopColor={b} stopOpacity="0.3" />
                  </linearGradient>
                ))}
              </defs>
              {BEAMS.map((b) => (
                <g key={b.id}>
                  <path className={`${s.beam} ${s[`beam${b.id}`]}`} d={b.d} />
                  <path className={`${s.pulse} ${s[`pulse${b.id}`]}`} d={b.d} />
                </g>
              ))}
            </svg>

            {/* Core node */}
            <div className={s.core}>
              <div className={s.coreWave} />
              <div className={`${s.coreRing} ${s.ring3}`} />
              <div className={`${s.coreRing} ${s.ring2}`} />
              <div className={`${s.coreRing} ${s.ring1}`} />
              <div className={s.rotatingRing} />
              <div className={s.coreSurface}>
                <div className={s.coreIcon}>
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span className={s.coreLabel}>Anoryx</span>
                <span className={s.coreName}>Intelligence Core</span>
              </div>
            </div>

            {/* Signal nodes */}
            {NODES.map((n) => (
              <div key={n.id} className={`${s.signalNode} ${s[n.cls]}`}>
                <div className={s.nodeIcon}>
                  {n.icon}
                  <span className={s.nodePulse} />
                </div>
                <div className={s.nodeBody}>
                  <span className={s.nodeTitle}>{n.title}</span>
                  <span className={s.nodeMicro}>{n.micro}</span>
                </div>
                <div className={s.tooltip}>
                  <div className={s.tooltipTitle}>{n.title}</div>
                  <ul className={s.tooltipList}>
                    {n.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Text column */}
        <div className={s.textCol}>
          <span className={s.label}>Platform Architecture</span>
          <h2 className={s.title}>Enterprise Intelligence Operating Fabric</h2>
          <p className={s.subtitle}>
            A real-time intelligence fabric that senses enterprise signals,
            orchestrates autonomous reasoning, and executes decisions across systems.
          </p>
        </div>

      </div>
      </div>

      {/* Mobile only: card stack instead of mind map */}
      <div className={s.mobileLayout}>
        <div className={s.mobileHeader}>
          <span className={s.mobileLabel}>Platform Architecture</span>
          <h2 className={s.mobileTitle}>Enterprise Intelligence Fabric</h2>
          <p className={s.mobileSubtitle}>
            A real-time intelligence fabric that senses enterprise signals,
            orchestrates autonomous reasoning, and executes decisions across systems.
          </p>
        </div>
        <div className={s.mobileCoreCard}>
          <div className={s.mobileCoreIconWrap}>
            <div className={s.mobileCorePulseRing} aria-hidden="true" />
            <div className={s.mobileCoreIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
          <span className={s.mobileCoreLabel}>Anoryx</span>
          <span className={s.mobileCoreName}>Intelligence Core</span>
          <span className={s.mobileCoreTagline}>Unified AI · Data · Execution</span>
        </div>
        <div className={s.mobileNodeList}>
          {NODES.map((n) => (
            <div key={n.id} className={s.mobileNodeCard}>
              <div className={s.mobileNodeIcon}>{n.icon}</div>
              <div className={s.mobileNodeContent}>
                <span className={s.mobileNodeTitle}>{n.title}</span>
                <span className={s.mobileNodeMicro}>{n.micro}</span>
                {n.tips?.length > 0 && (
                  <ul className={s.mobileNodeTips}>
                    {n.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
