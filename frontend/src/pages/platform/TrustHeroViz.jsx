import styles from './TrustHeroViz.module.css';

export default function TrustHeroViz() {
  return (
    <div className={styles.wrap} aria-hidden>
      <div className={styles.aura} />
      <svg className={styles.svg} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="trustShieldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(30, 107, 255, 0.15)" />
            <stop offset="70%" stopColor="rgba(30, 107, 255, 0.04)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(30, 107, 255, 0.5)" />
            <stop offset="100%" stopColor="rgba(30, 107, 255, 0.15)" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="145" fill="url(#trustShieldGlow)" className={styles.glow} />
        {/* Dotted full oval rings first — complete ovals rotating; pentagon sits inside them */}
        <ellipse cx="200" cy="200" rx="128" ry="98" fill="none" stroke="rgba(30, 107, 255, 0.3)" strokeWidth="1" strokeDasharray="3 9" className={styles.dotOval1} />
        <ellipse cx="200" cy="200" rx="136" ry="104" fill="none" stroke="rgba(30, 107, 255, 0.26)" strokeWidth="1" strokeDasharray="2 10" className={styles.dotOval2} />
        <ellipse cx="200" cy="200" rx="144" ry="110" fill="none" stroke="rgba(120, 160, 255, 0.24)" strokeWidth="1" strokeDasharray="3 8" className={styles.dotOval3} />
        <ellipse cx="200" cy="200" rx="152" ry="116" fill="none" stroke="rgba(140, 180, 255, 0.2)" strokeWidth="1" strokeDasharray="2 11" className={styles.dotOval4} />
        {/* Solid oval rings — clear oval, different directions + phase */}
        <ellipse cx="200" cy="200" rx="58" ry="44" fill="none" stroke="rgba(30, 107, 255, 0.44)" strokeWidth="1.2" className={styles.solidRing1} style={{ '--phase': '0deg' }} />
        <ellipse cx="200" cy="200" rx="74" ry="56" fill="none" stroke="rgba(30, 107, 255, 0.4)" strokeWidth="1.2" className={styles.solidRing2} style={{ '--phase': '72deg' }} />
        <ellipse cx="200" cy="200" rx="90" ry="68" fill="none" stroke="rgba(30, 107, 255, 0.36)" strokeWidth="1" className={styles.solidRing3} style={{ '--phase': '144deg' }} />
        <ellipse cx="200" cy="200" rx="106" ry="80" fill="none" stroke="rgba(30, 107, 255, 0.32)" strokeWidth="1" className={styles.solidRing4} style={{ '--phase': '216deg' }} />
        <ellipse cx="200" cy="200" rx="122" ry="92" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" className={styles.solidRing5} style={{ '--phase': '288deg' }} />
        <path d="M200 120 L240 180 L220 260 L180 260 L160 180 Z" fill="none" stroke="rgba(30, 107, 255, 0.4)" strokeWidth="2" className={styles.shield} />
        <path d="M200 135 L230 180 L215 248 L185 248 L170 180 Z" fill="rgba(30, 107, 255, 0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {/* Lock/keyhole inside pentagon — rounded top + key slot below (slightly bigger than previous circle) */}
        <path d="M 200 187 A 8 8 0 0 1 200 203 L 196 203 L 196 213 L 204 213 L 204 203 L 200 203 A 8 8 0 0 1 200 187 Z" fill="rgba(30, 107, 255, 0.28)" stroke="rgba(200, 220, 255, 0.95)" strokeWidth="1.5" className={styles.lockKeyhole} />
        {/* Validation pulse arcs */}
        <path d="M200 100 Q260 200 200 300 Q140 200 200 100" fill="none" stroke="rgba(30, 107, 255, 0.12)" strokeWidth="1" strokeDasharray="6 8" className={styles.pulse1} />
        <path d="M200 95 Q270 200 200 305 Q130 200 200 95" fill="none" stroke="rgba(30, 107, 255, 0.08)" strokeWidth="1" strokeDasharray="8 10" className={styles.pulse2} />
      </svg>
      <div className={styles.particles} aria-hidden>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={styles.dot} style={{ '--i': i }} />
        ))}
      </div>
    </div>
  );
}
