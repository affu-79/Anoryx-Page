import { useRef, useState, useCallback } from 'react';
import styles from './HeroIntelligenceViz.module.css';

const CENTER_X = 200;
const CENTER_Y = 200;

const CORE_ICON_SIZE = 20;

/* Orbital node icons: SVG <g> for use inside main SVG, blue stroke */
const iconStroke = { fill: 'none', stroke: '#0466c8', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

/* Icons drawn in 0–24 space; CSS centers and scales via .nodeIcon */
const NODE_ICONS = {
  data: (
    <g className={styles.nodeIcon}>
      <ellipse cx="12" cy="5" rx="9" ry="3" {...iconStroke} />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" {...iconStroke} />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" {...iconStroke} />
    </g>
  ),
  agent: (
    <g className={styles.nodeIcon}>
      <circle cx="12" cy="6" r="2.5" {...iconStroke} />
      <circle cx="6" cy="18" r="2.5" {...iconStroke} />
      <circle cx="18" cy="18" r="2.5" {...iconStroke} />
      <path d="M12 9v2M8.5 16.5L12 13M15.5 16.5L12 13" {...iconStroke} />
    </g>
  ),
  exec: (
    <g className={styles.nodeIcon}>
      <polygon points="5 3 19 12 5 21 5 3" {...iconStroke} />
    </g>
  ),
  security: (
    <g className={styles.nodeIcon}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" {...iconStroke} />
    </g>
  ),
  learning: (
    <g className={styles.nodeIcon}>
      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" {...iconStroke} />
    </g>
  ),
  integration: (
    <g className={styles.nodeIcon}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" {...iconStroke} />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" {...iconStroke} />
    </g>
  ),
  signals: (
    <g className={styles.nodeIcon}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" {...iconStroke} />
    </g>
  ),
  adaptive: (
    <g className={styles.nodeIcon}>
      <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" {...iconStroke} />
      <path d="M12 6v6l4 2" {...iconStroke} />
    </g>
  ),
};

const NODES = [
  { id: 'data', label: 'Data Intelligence', x: 95, y: 95, color: 'cyan', icon: NODE_ICONS.data },
  { id: 'agent', label: 'Agent Orchestration', x: 305, y: 95, color: 'blue', icon: NODE_ICONS.agent },
  { id: 'exec', label: 'Execution Systems', x: 305, y: 295, color: 'teal', icon: NODE_ICONS.exec },
  { id: 'security', label: 'Security Layer', x: 95, y: 295, color: 'purple', icon: NODE_ICONS.security },
  { id: 'learning', label: 'Learning Engine', x: 55, y: 200, color: 'green', icon: NODE_ICONS.learning },
  { id: 'integration', label: 'Integration Layer', x: 345, y: 200, color: 'sapphire', icon: NODE_ICONS.integration },
  { id: 'signals', label: 'Signal Processing', x: 200, y: 55, color: 'blue', icon: NODE_ICONS.signals },
  { id: 'adaptive', label: 'Adaptive Core', x: 200, y: 345, color: 'teal', icon: NODE_ICONS.adaptive },
];

function HeroIntelligenceViz() {
  const containerRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (e.clientX - cx) / rect.width;
    const y = (e.clientY - cy) / rect.height;
    setParallax({
      x: Math.max(-10, Math.min(10, x * 12)),
      y: Math.max(-10, Math.min(10, y * 12)),
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
    setParallax({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.wrapper} ${hover ? styles.wrapperHover : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      {/* Layer 5 — Background intelligence field */}
      <div className={styles.bgField}>
        <div className={styles.bgGrid} />
        <div className={styles.bgParticle} style={{ '--i': 0 }} />
        <div className={styles.bgParticle} style={{ '--i': 1 }} />
        <div className={styles.bgParticle} style={{ '--i': 2 }} />
        <div className={styles.bgParticle} style={{ '--i': 3 }} />
        <div className={styles.bgParticle} style={{ '--i': 4 }} />
        <div className={styles.bgParticle} style={{ '--i': 5 }} />
      </div>

      {/* Layer 4 — Faint orbit rings */}
      <div
        className={styles.orbitRings}
        style={{
          transform: `translate(${parallax.x * 0.3}px, ${parallax.y * 0.3}px)`,
        }}
      >
        <svg className={styles.orbitSvg} viewBox="0 0 400 400">
          <circle className={styles.orbitRing} cx="200" cy="200" r="140" />
          <circle className={styles.orbitRing} cx="200" cy="200" r="165" />
          <circle className={styles.orbitRing} cx="200" cy="200" r="190" />
        </svg>
      </div>

      {/* Main SVG: beams, particles, core, nodes (parallax foreground) */}
      <svg
        className={styles.mainSvg}
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
        style={{
          transform: `translate(${parallax.x}px, ${parallax.y}px)`,
        }}
      >
        <defs>
          <linearGradient id="vizCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0466c8" />
            <stop offset="50%" stopColor="#0353a4" />
            <stop offset="100%" stopColor="#023e7d" />
          </linearGradient>
          <linearGradient id="vizCoreGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0466c8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.15" />
          </linearGradient>
          <filter id="vizCoreGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0466c8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Layer 3 — Connection beams */}
        <g className={styles.beams}>
          {NODES.map((node) => (
            <line
              key={`line-${node.id}`}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={node.x}
              y2={node.y}
              className={styles.beam}
            />
          ))}
        </g>

        {/* Signal particles along beams */}
        {NODES.map((node, i) => (
          <g
            key={`particle-${node.id}`}
            transform={`translate(${CENTER_X}, ${CENTER_Y})`}
            className={styles.particleGroup}
            style={{
              '--dx': `${node.x - CENTER_X}px`,
              '--dy': `${node.y - CENTER_Y}px`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            <circle r="2.5" fill="#7dd3fc" className={styles.particleDot} />
          </g>
        ))}

        {/* Layer 1 — Central core */}
        <g className={styles.coreGroup}>
          <circle
            className={styles.coreGlow}
            cx="200"
            cy="200"
            r="42"
            fill="url(#vizCoreGlow)"
            filter="url(#vizCoreGlowFilter)"
          />
          <circle
            className={styles.coreRingOuter}
            cx="200"
            cy="200"
            r="38"
            fill="none"
            stroke="url(#vizCoreGrad)"
            strokeWidth="1.5"
          />
          <circle
            className={styles.coreRingMid}
            cx="200"
            cy="200"
            r="30"
            fill="none"
            stroke="rgba(4, 102, 200, 0.5)"
            strokeWidth="1"
          />
          <circle
            className={styles.coreInner}
            cx="200"
            cy="200"
            r="22"
            fill="url(#vizCoreGrad)"
          />
          <circle
            className={styles.coreInnerHighlight}
            cx="200"
            cy="200"
            r="18"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />
          {/* White icon in center (intelligence core: hexagon + dot) */}
          <g transform={`translate(200, 200) scale(${CORE_ICON_SIZE / 24})`} className={styles.coreIcon}>
            <path
              d="M12 2L22 8v8l-10 6L2 16V8l10-6z"
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -12)"
            />
            <circle cx="0" cy="0" r="3" fill="rgba(255,255,255,0.95)" />
          </g>
        </g>

        {/* Layer 2 — Orbital nodes */}
        <g className={styles.nodesWrap}>
          {NODES.map((node, i) => (
            <g
              key={node.id}
              className={`${styles.nodeGroup} ${styles[`nodeColor${node.color}`]}`}
              style={{
                '--nx': `${node.x}px`,
                '--ny': `${node.y}px`,
              }}
            >
              <circle
                r="24"
                className={styles.nodeCircle}
              />
              {node.icon}
              <text className={styles.nodeLabel} x="0" y="38" textAnchor="middle">
                {node.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

export default HeroIntelligenceViz;
