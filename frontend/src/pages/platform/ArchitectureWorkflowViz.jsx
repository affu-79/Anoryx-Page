import { useState, useRef, useCallback } from 'react';
import styles from './ArchitectureWorkflowViz.module.css';

/* Coordinate system: viewBox 0 0 720 520. Center = (360, 260).
   All positions relative to this center. Core is exactly at center. */
const W = 720;
const H = 520;
const CX = 360;
const CY = 260;

const CORE_SIZE = 180;
const AXIS_Y = CY;

const MAIN_NODES = [
  { id: 'signal', label: 'Enterprise Signal Ingestion', cx: 100, cy: AXIS_Y, w: 140, h: 64, desc: 'Ingest signals from enterprise systems, data sources, APIs, and operational environments.' },
  { id: 'data', label: 'Enterprise Data Fabric', cx: 220, cy: AXIS_Y, w: 160, h: 70, desc: 'Transforms raw enterprise signals into structured intelligence-ready format.' },
  { id: 'core', label: 'Anoryx Intelligence Core', cx: CX, cy: CY, w: CORE_SIZE, h: CORE_SIZE, desc: 'Processes signals, reasons autonomously, and generates execution decisions.', isCore: true },
  { id: 'agent', label: 'Agent Orchestration Engine', cx: 460, cy: AXIS_Y, w: 170, h: 70, desc: 'Coordinates autonomous agents to execute decisions.' },
  { id: 'exec', label: 'Execution Infrastructure', cx: 560, cy: AXIS_Y, w: 180, h: 70, desc: 'Executes decisions across enterprise systems and infrastructure.' },
  { id: 'learning', label: 'Continuous Learning Engine', cx: 640, cy: AXIS_Y, w: 160, h: 64, desc: 'Learns from execution outcomes and improves intelligence over time.' },
];

const BRANCH_NODES = [
  { id: 'context', label: 'Context Engine', cx: CX, cy: 100, w: 120, h: 50, parent: 'core' },
  { id: 'risk', label: 'Risk Analysis', cx: CX - 90, cy: 400, w: 120, h: 50, parent: 'core' },
  { id: 'validation', label: 'Decision Validation', cx: CX, cy: 400, w: 120, h: 50, parent: 'core' },
  { id: 'task', label: 'Task Distribution', cx: 460, cy: 420, w: 120, h: 50, parent: 'agent' },
  { id: 'integrations', label: 'Enterprise Integrations', cx: 560, cy: 100, w: 120, h: 50, parent: 'exec' },
];

function ArchitectureWorkflowViz() {
  const [tooltip, setTooltip] = useState(null);
  const containerRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: x * 8, y: y * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  return (
    <div ref={containerRef} className={styles.animationContainer} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className={styles.aspectWrapper}>
        <div className={styles.canvasWrap} style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}>
          <svg
            className={styles.svg}
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="archLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E6BFF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="archCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B3D91" />
                <stop offset="50%" stopColor="#1E6BFF" />
                <stop offset="100%" stopColor="#14B8A6" />
              </linearGradient>
              <radialGradient id="archCoreGlowBg" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(30, 107, 255, 0.15)" />
                <stop offset="100%" stopColor="rgba(30, 107, 255, 0)" />
              </radialGradient>
              <filter id="archGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Background grid layer — fixed inside viewBox */}
            <g className={styles.gridLayer}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((i) => (
                <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={H} stroke="rgba(30, 107, 255, 0.06)" strokeWidth="0.5" />
              ))}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
                <line key={`h${i}`} x1={0} y1={i * 40} x2={W} y2={i * 40} stroke="rgba(30, 107, 255, 0.06)" strokeWidth="0.5" />
              ))}
            </g>

            {/* Radial glow behind core */}
            <ellipse cx={CX} cy={CY} rx={140} ry={140} fill="url(#archCoreGlowBg)" />

            {/* Connection lines: center to center along pipeline */}
            <path className={styles.connLine} d={`M 100 ${AXIS_Y} L 220 ${AXIS_Y}`} />
            <path className={styles.connLine} d={`M 220 ${AXIS_Y} L ${CX} ${CY}`} />
            <path className={styles.connLine} d={`M ${CX} ${CY} L 460 ${AXIS_Y}`} />
            <path className={styles.connLine} d={`M 460 ${AXIS_Y} L 560 ${AXIS_Y}`} />
            <path className={styles.connLine} d={`M 560 ${AXIS_Y} L 640 ${AXIS_Y}`} />

            {/* Feedback loop: Learning center back to Core center (curved) */}
            <path className={styles.feedbackLine} d={`M 640 ${AXIS_Y} Q ${W - 20} ${380} ${CX} ${CY + 90} L ${CX} ${CY}`} />

            {/* Branch connections: core center to branch centers */}
            <line className={styles.connLineSecondary} x1={CX} y1={CY} x2={CX} y2={100} />
            <line className={styles.connLineSecondary} x1={CX} y1={CY} x2={CX} y2={400} />
            <line className={styles.connLineSecondary} x1={CX} y1={CY} x2={CX - 90} y2={400} />
            <line className={styles.connLineSecondary} x1={460} y1={AXIS_Y} x2={460} y2={420} />
            <line className={styles.connLineSecondary} x1={560} y1={AXIS_Y} x2={560} y2={100} />

            {/* Main pipeline nodes — position by center, draw rect at (cx - w/2, cy - h/2) */}
            {MAIN_NODES.map((n) => {
              const x = n.cx - n.w / 2;
              const y = n.cy - n.h / 2;
              if (n.isCore) {
                return (
                  <g key={n.id}>
                    <ellipse cx={n.cx} cy={n.cy} rx={n.w / 2} ry={n.h / 2} className={styles.coreRingOuter} />
                    <ellipse cx={n.cx} cy={n.cy} rx={n.w / 2 - 20} ry={n.h / 2 - 20} className={styles.coreRingInner} />
                    <ellipse cx={n.cx} cy={n.cy} rx={n.w / 2 - 40} ry={n.h / 2 - 40} fill="url(#archCoreGrad)" filter="url(#archGlow)" />
                    <text x={n.cx} y={n.cy + 5} textAnchor="middle" className={styles.coreLabel}>Intelligence Core</text>
                    <rect x={x} y={y} width={n.w} height={n.h} fill="transparent" className={styles.nodeHit} onMouseEnter={() => setTooltip({ ...n })} onMouseLeave={() => setTooltip(null)} />
                  </g>
                );
              }
              return (
                <g key={n.id}>
                  <rect x={x} y={y} width={n.w} height={n.h} rx="8" className={styles.nodeRect} />
                  <text x={n.cx} y={n.cy - 4} textAnchor="middle" className={styles.nodeLabel}>{n.label}</text>
                  <rect x={x} y={y} width={n.w} height={n.h} fill="transparent" className={styles.nodeHit} onMouseEnter={() => setTooltip({ ...n })} onMouseLeave={() => setTooltip(null)} />
                </g>
              );
            })}

            {/* Branch nodes */}
            {BRANCH_NODES.map((n) => {
              const x = n.cx - n.w / 2;
              const y = n.cy - n.h / 2;
              return (
                <g key={n.id}>
                  <rect x={x} y={y} width={n.w} height={n.h} rx="6" className={styles.branchRect} />
                  <text x={n.cx} y={n.cy + 4} textAnchor="middle" className={styles.branchLabel}>{n.label}</text>
                  <rect x={x} y={y} width={n.w} height={n.h} fill="transparent" className={styles.nodeHit} onMouseEnter={() => setTooltip({ ...n })} onMouseLeave={() => setTooltip(null)} />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {tooltip && (
        <div className={styles.tooltip}>
          <strong>{tooltip.label}</strong>
          {tooltip.desc && <span>{tooltip.desc}</span>}
        </div>
      )}
    </div>
  );
}

export default ArchitectureWorkflowViz;
