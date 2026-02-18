import { useRef, useEffect } from 'react';
import styles from './NeuralIntelligenceViz.module.css';

const CX = 200;
const CY = 200;
const PARTICLE_COUNT = 24;

function NeuralIntelligenceViz() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 400;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      angle: (i / PARTICLE_COUNT) * Math.PI * 2,
      radius: 80 + Math.random() * 100,
      speed: 0.012 + Math.random() * 0.008,
      inward: Math.random() > 0.5,
      size: 1.2 + Math.random() * 0.8,
      pulsePhase: Math.random() * Math.PI * 2,
    }));
    particlesRef.current = particles;

    let frame = 0;
    function loop() {
      frame++;
      ctx.clearRect(0, 0, size, size);
      particles.forEach((p) => {
        p.angle += p.speed * (p.inward ? -1 : 1);
        const r = p.radius + Math.sin(frame * 0.02 + p.pulsePhase) * 8;
        const x = centerX + Math.cos(p.angle) * r;
        const y = centerY + Math.sin(p.angle) * r;
        const alpha = 0.25 + 0.2 * Math.sin(frame * 0.03 + p.pulsePhase);
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 107, 255, ${alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(loop);
    }
    const id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={styles.wrap} aria-hidden>
      <div className={styles.aura} />
      <div className={styles.surface} />
      <div className={styles.surface2} />
      <svg className={styles.svg} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(30, 107, 255, 0.5)" />
            <stop offset="50%" stopColor="rgba(30, 107, 255, 0.15)" />
            <stop offset="100%" stopColor="rgba(30, 107, 255, 0)" />
          </radialGradient>
          <radialGradient id="coreFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E6BFF" />
            <stop offset="100%" stopColor="#0B3D91" />
          </radialGradient>
          <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(30, 107, 255, 0.4)" />
            <stop offset="100%" stopColor="rgba(30, 107, 255, 0.1)" />
          </linearGradient>
        </defs>
        <circle cx={CX} cy={CY} r="120" fill="url(#coreGlow)" className={styles.glow} />
        <ellipse cx={CX} cy={CY} rx="95" ry="95" fill="none" stroke="url(#pulseGrad)" strokeWidth="1.5" className={styles.ringOuter} />
        <ellipse cx={CX} cy={CY} rx="68" ry="68" fill="none" stroke="rgba(30, 107, 255, 0.25)" strokeWidth="1" className={styles.ringInner} />
        <circle cx={CX} cy={CY} r="42" fill="url(#coreFill)" className={styles.kernel} />
        <circle cx={CX} cy={CY} r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        {/* Modern white icon — intelligence core symbol centered in kernel */}
        <g className={styles.coreIcon} transform={`translate(${CX}, ${CY})`}>
          <circle cx="0" cy="0" r="6" fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="1.6" />
          <line x1="0" y1="0" x2="0" y2="-10" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="0" y1="0" x2="7.07" y2="-7.07" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="0" y1="0" x2="10" y2="0" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="0" y1="0" x2="7.07" y2="7.07" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="0" y1="0" x2="-7.07" y2="7.07" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="0" y1="0" x2="-10" y2="0" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="0" y1="0" x2="-7.07" y2="-7.07" stroke="rgba(255,255,255,0.9)" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      </svg>
      <canvas ref={canvasRef} className={styles.particles} width={400} height={400} />
      <div className={styles.pulseLine} />
    </div>
  );
}

export default NeuralIntelligenceViz;
