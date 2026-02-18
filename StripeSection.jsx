import { useState, useEffect, useRef, useCallback } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .stripe-section {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    width: 100%;
  }
  .stats-row {
    display: flex; justify-content: center;
    padding: 44px 60px 32px;
    border-bottom: 1px solid rgba(0,0,0,0.07);
    background: #fff;
    transition: background 0.7s, border-color 0.7s;
  }
  .dark .stats-row { background: #1a1f6e; border-bottom-color: rgba(255,255,255,0.1); }
  .stat-item {
    flex: 1; max-width: 260px; text-align: center; padding: 0 20px;
    border-right: 1px solid rgba(0,0,0,0.07); transition: border-color 0.7s;
  }
  .dark .stat-item { border-right-color: rgba(255,255,255,0.1); }
  .stat-item:last-child { border-right: none; }
  .stat-number {
    font-size: 2.35rem; font-weight: 400; color: #1a1a2e;
    letter-spacing: -0.02em; transition: color 0.7s;
  }
  .dark .stat-number { color: #fff; }
  .stat-label {
    font-size: 0.8rem; color: #6b7280; margin-top: 5px;
    line-height: 1.45; white-space: pre-line; transition: color 0.7s;
  }
  .dark .stat-label { color: rgba(255,255,255,0.5); }

  .animation-wrapper {
    position: relative; width: 100%; height: 500px; overflow: hidden;
    cursor: crosshair;
  }
  .canvas-bg {
    position: absolute; inset: 0; width: 100%; height: 100%; display: block;
  }
  .controls {
    position: absolute; top: 14px; right: 16px;
    display: flex; gap: 5px; z-index: 10;
  }
  .ctrl-btn {
    width: 34px; height: 34px; border-radius: 6px;
    border: 1px solid rgba(0,0,0,0.13);
    background: rgba(255,255,255,0.75);
    backdrop-filter: blur(6px); cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: #555; transition: all 0.2s;
  }
  .ctrl-btn:hover { background: #fff; }
  .dark .ctrl-btn {
    background: rgba(255,255,255,0.09);
    border-color: rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.8);
  }
  .dark .ctrl-btn:hover { background: rgba(255,255,255,0.16); }
  .ctrl-btn svg { width: 15px; height: 15px; pointer-events: none; }

  .section-text {
    padding: 36px 60px 52px; background: #fff; transition: background 0.7s;
  }
  .dark .section-text { background: #1a1f6e; }
  .section-title {
    font-size: 1.45rem; font-weight: 500; color: #1a1a2e;
    line-height: 1.45; max-width: 700px; transition: color 0.7s;
  }
  .dark .section-title { color: #fff; }
  .section-title .highlight { color: #635bff; }

  @media (max-width: 768px) {
    .stats-row { flex-wrap: wrap; padding: 24px 16px 20px; gap: 18px; }
    .stat-item { flex: 0 0 44%; border-right: none; }
    .stat-number { font-size: 1.75rem; }
    .animation-wrapper { height: 340px; }
    .section-text { padding: 24px 16px 40px; }
    .section-title { font-size: 1.1rem; }
  }
`;

// ── Ray size groups: 100 tiny, 100 small, 200 medium, 100 big
// All spread evenly from 0° to 180° (0 to π)
function buildRays() {
  const rays = [];

  // Groups: [count, minLen, maxLen, thicknessRange]
  const groups = [
    { count: 100, minLen: 18, maxLen: 55, thick: [0.3, 0.6] }, // tiny
    { count: 100, minLen: 56, maxLen: 120, thick: [0.4, 0.75] }, // small
    { count: 200, minLen: 121, maxLen: 230, thick: [0.5, 0.9] }, // medium
    { count: 100, minLen: 231, maxLen: 370, thick: [0.6, 1.1] }, // big
  ];

  groups.forEach(({ count, minLen, maxLen, thick }) => {
    for (let i = 0; i < count; i++) {
      // Random angle across full 0→180° but weighted denser toward center
      // Use beta-distribution-like weighting: more rays in 60°–120° range
      const u = Math.random();
      // Triangle distribution biased to center
      const tc = u < 0.5
        ? 0.5 - Math.sqrt(0.5 * (0.5 - u) * 2) * 0.5
        : 0.5 + Math.sqrt(0.5 * (u - 0.5) * 2) * 0.5;
      // Mix uniform + center-biased
      const mix = Math.random() * 0.45 + tc * 0.55;
      // Full 0→π
      const baseAngle = Math.PI * 0.001 + Math.PI * 0.998 * mix;

      const fromCenter = Math.abs(baseAngle - Math.PI * 0.5) / (Math.PI * 0.5);
      const baseLen = minLen + Math.random() * (maxLen - minLen);

      rays.push({
        baseAngle,
        fromCenter,
        baseLen,

        // ── Physics state ──
        angDisp: 0,   // current angular displacement
        angVel: 0,
        lenDisp: 0,   // fractional length displacement
        lenVel: 0,
        bendDisp: 0,   // mid-point bend (for curved look)
        bendVel: 0,

        // ── Idle motion params — very slow frequencies ──
        // Angular sway: 3 layers, all very slow
        aw1: 0.04 + Math.random() * 0.06,   // ~0.04-0.10 rad/s — very slow drift
        aw2: 0.10 + Math.random() * 0.12,   // ~0.10-0.22 rad/s — slow sway
        aw3: 0.22 + Math.random() * 0.18,   // ~0.22-0.40 rad/s — gentle flutter
        aa1: 0.012 + Math.random() * 0.016,
        aa2: 0.006 + Math.random() * 0.010,
        aa3: 0.002 + Math.random() * 0.005,
        ap1: Math.random() * Math.PI * 2,
        ap2: Math.random() * Math.PI * 2,
        ap3: Math.random() * Math.PI * 2,

        // Length breathe: very slow
        lw1: 0.03 + Math.random() * 0.05,
        la1: 0.04 + Math.random() * 0.06,
        lp1: Math.random() * Math.PI * 2,

        // Bend wave: very slow
        bw1: 0.05 + Math.random() * 0.07,
        ba1: 0.008 + Math.random() * 0.012,
        bp1: Math.random() * Math.PI * 2,

        // Visuals
        thickness: thick[0] + Math.random() * (thick[1] - thick[0]),
        hasTick: Math.random() > 0.35,
        tickPos: 0.50 + Math.random() * 0.45,

        // Ripple from cursor propagation
        ripple: 0,
        rippleVel: 0,
        lenRipple: 0,
        lenRippleVel: 0,
      });
    }
  });

  return rays;
}

export default function StripeSection() {
  const [isDark, setIsDark] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const canvasRef = useRef(null);
  // Build once, stable reference
  const raysRef = useRef(null);
  if (!raysRef.current) raysRef.current = buildRays();

  const animRef = useRef(null);
  const timeRef = useRef(0);
  const lastTRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false, vx: 0, vy: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const prev = mouseRef.current;
    const nx = e.clientX - rect.left;
    const ny = e.clientY - rect.top;
    mouseRef.current = {
      x: nx, y: ny, active: true,
      vx: nx - prev.x,
      vy: ny - prev.y,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999, active: false, vx: 0, vy: 0 };
  }, []);

  // isDark ref to avoid stale closure in draw
  const isDarkRef = useRef(isDark);
  const isPausedRef = useRef(isPaused);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);

  const draw = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const dark = isDarkRef.current;
    const paused = isPausedRef.current;

    const rawDt = Math.min((timestamp - lastTRef.current) / 1000, 0.05);
    lastTRef.current = timestamp;
    const dt = paused ? 0 : rawDt;
    if (!paused) timeRef.current += dt;
    const t = timeRef.current;

    const ox = W * 0.5;
    const oy = H * 1.02;  // origin just below canvas bottom

    ctx.clearRect(0, 0, W, H);

    // ── Background ──────────────────────────────────────────────────────
    if (dark) {
      ctx.fillStyle = "#1a1f6e";
      ctx.fillRect(0, 0, W, H);
      const bgR = ctx.createRadialGradient(ox, H * 0.45, 0, ox, H * 0.45, W * 0.7);
      bgR.addColorStop(0, "rgba(55,65,195,0.5)");
      bgR.addColorStop(0.6, "rgba(22,27,130,0.2)");
      bgR.addColorStop(1, "rgba(8,10,70,0.0)");
      ctx.fillStyle = bgR; ctx.fillRect(0, 0, W, H);
    } else {
      ctx.fillStyle = "#eef2f8";
      ctx.fillRect(0, 0, W, H);
      const bgL = ctx.createLinearGradient(0, 0, 0, H);
      bgL.addColorStop(0, "rgba(208,224,244,0.9)");
      bgL.addColorStop(0.7, "rgba(226,237,250,0.5)");
      bgL.addColorStop(1, "rgba(238,244,252,0.0)");
      ctx.fillStyle = bgL; ctx.fillRect(0, 0, W, H);
    }

    // ── Origin glow ──────────────────────────────────────────────────────
    if (dark) {
      const gs = W * 0.44;
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, gs);
      g.addColorStop(0, "rgba(255,255,255,0.96)");
      g.addColorStop(0.06, "rgba(215,225,255,0.62)");
      g.addColorStop(0.20, "rgba(150,175,255,0.28)");
      g.addColorStop(0.50, "rgba(90,120,230,0.10)");
      g.addColorStop(1, "rgba(50,80,200,0.00)");
      ctx.beginPath(); ctx.arc(ox, oy, gs, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    } else {
      const gs = W * 0.56;
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, gs);
      g.addColorStop(0, "rgba(255,218,80,1.0)");
      g.addColorStop(0.05, "rgba(255,192,48,0.88)");
      g.addColorStop(0.14, "rgba(248,162,26,0.62)");
      g.addColorStop(0.28, "rgba(235,145,18,0.38)");
      g.addColorStop(0.50, "rgba(215,175,80,0.16)");
      g.addColorStop(0.72, "rgba(200,205,225,0.05)");
      g.addColorStop(1, "rgba(190,210,230,0.00)");
      ctx.beginPath(); ctx.arc(ox, oy, gs, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
    }

    // ── Physics + Draw ────────────────────────────────────────────────────
    const mouse = mouseRef.current;
    const rays = raysRef.current;
    const N = rays.length;

    // Very low spring constants → slow, dreamy motion
    // K_ANG = angular stiffness, K_ADAMP = damping
    const K_ANG = 1.8;   // very soft spring — slow return
    const K_ADAMP = 2.2;   // gentle damping — allows slow oscillation
    const K_LEN = 1.4;
    const K_LDAMP = 1.8;
    const K_BEND = 1.2;
    const K_BDAMP = 1.6;
    const K_RIP = 2.0;   // ripple spring — also slow
    const K_RDMP = 2.8;
    const K_LRIP = 1.6;
    const K_LRDMP = 2.2;

    const CURSOR_RADIUS = 200;
    // Max displacement targets — deliberately small so motion is subtle/slow
    const MAX_ANG_PUSH = 0.20;   // radians — soft angular bend
    const MAX_LEN_PUSH = 0.18;   // fractional length change (18% stretch/contract)
    const MAX_BEND_PUSH = 0.06;

    rays.forEach((ray, idx) => {
      // ── Idle target: very slow layered sines ──────────────────────────
      const idleAng =
        Math.sin(t * ray.aw1 + ray.ap1) * ray.aa1 +
        Math.sin(t * ray.aw2 + ray.ap2) * ray.aa2 +
        Math.sin(t * ray.aw3 + ray.ap3) * ray.aa3;

      const idleLen =
        Math.sin(t * ray.lw1 + ray.lp1) * ray.la1;

      const idleBend =
        Math.sin(t * ray.bw1 + ray.bp1) * ray.ba1;

      // ── Cursor influence ──────────────────────────────────────────────
      let pushAng = 0;
      let pushLen = 0;
      let pushBend = 0;

      if (mouse.active && !paused) {
        // Sample 6 points along the ray
        const testAng = ray.baseAngle + ray.angDisp;
        const testLen = ray.baseLen * (1 + ray.lenDisp);
        let minDist = Infinity;
        let minFrac = 0.5;

        for (let s = 0.15; s <= 1.0; s += 0.17) {
          const rx = ox + Math.cos(testAng) * testLen * s;
          const ry = oy - Math.sin(testAng) * testLen * s;
          const d = Math.sqrt((rx - mouse.x) ** 2 + (ry - mouse.y) ** 2);
          if (d < minDist) { minDist = d; minFrac = s; }
        }

        if (minDist < CURSOR_RADIUS) {
          const raw = 1 - minDist / CURSOR_RADIUS;
          const smooth = raw * raw * (3 - 2 * raw); // smoothstep

          // Direction: which side of the ray is cursor on?
          const tipX = ox + Math.cos(testAng) * testLen;
          const tipY = oy - Math.sin(testAng) * testLen;
          const toTip = Math.atan2(-(tipY - oy), tipX - ox);
          const toCur = Math.atan2(-(mouse.y - oy), mouse.x - ox);
          let diff = toTip - toCur;
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;

          // Slow, gentle push
          pushAng = Math.sign(diff) * smooth * MAX_ANG_PUSH;
          // Cursor at tip → stretch; cursor at base → contract
          pushLen = (minFrac - 0.5) * smooth * MAX_LEN_PUSH;
          pushBend = Math.sign(diff) * smooth * MAX_BEND_PUSH * minFrac;

          // Propagate wave to neighbors — slow ripple injection
          // Only inject a little per frame so the wave is slow
          const injectAng = smooth * 0.012;
          const injectLen = smooth * 0.008;
          for (let s = 1; s <= 40; s++) {
            const f = Math.exp(-s * 0.10); // slow falloff
            if (idx + s < N) {
              rays[idx + s].ripple += injectAng * f * Math.sign(diff);
              rays[idx + s].lenRipple += injectLen * f * (minFrac - 0.5);
            }
            if (idx - s >= 0) {
              rays[idx - s].ripple += injectAng * f * Math.sign(diff);
              rays[idx - s].lenRipple += injectLen * f * (minFrac - 0.5);
            }
          }
        }
      }

      if (!paused) {
        // ── Ripple spring (angular) ────────────────────────────────────
        const rAcc = -K_RIP * ray.ripple - K_RDMP * ray.rippleVel;
        ray.rippleVel += rAcc * dt;
        ray.ripple += ray.rippleVel * dt;

        // ── Ripple spring (length) ─────────────────────────────────────
        const lrAcc = -K_LRIP * ray.lenRipple - K_LRDMP * ray.lenRippleVel;
        ray.lenRippleVel += lrAcc * dt;
        ray.lenRipple += ray.lenRippleVel * dt;

        // ── Angular spring → target (idle + cursor push) ───────────────
        const angTarget = idleAng + pushAng;
        const angAcc = -K_ANG * (ray.angDisp - angTarget) - K_ADAMP * ray.angVel;
        ray.angVel += angAcc * dt;
        ray.angDisp += ray.angVel * dt;

        // ── Length spring → target ─────────────────────────────────────
        const lenTarget = idleLen + pushLen;
        const lenAcc = -K_LEN * (ray.lenDisp - lenTarget) - K_LDAMP * ray.lenVel;
        ray.lenVel += lenAcc * dt;
        ray.lenDisp += ray.lenVel * dt;

        // ── Bend spring → target ───────────────────────────────────────
        const bendTarget = idleBend + pushBend;
        const bendAcc = -K_BEND * (ray.bendDisp - bendTarget) - K_BDAMP * ray.bendVel;
        ray.bendVel += bendAcc * dt;
        ray.bendDisp += ray.bendVel * dt;
      }

      // ── Render ────────────────────────────────────────────────────────
      const angle = ray.baseAngle + ray.angDisp + ray.ripple;
      const len = ray.baseLen * Math.max(0.1, 1 + ray.lenDisp + ray.lenRipple);
      const bendAmt = ray.bendDisp;

      const ex = ox + Math.cos(angle) * len;
      const ey = oy - Math.sin(angle) * len;

      const fromCenter = ray.fromCenter;
      const alpha = dark
        ? 0.50 - fromCenter * 0.16
        : 0.60 - fromCenter * 0.20;

      const rayColor = dark
        ? `rgba(200,215,255,${alpha})`
        : `rgba(48,68,168,${alpha})`;

      // Draw as quadratic curve for bend effect
      const bendX = ox + Math.cos(angle + Math.PI * 0.5) * bendAmt * len * 0.5 + (ex - ox) * 0.5;
      const bendY = oy + Math.sin(angle + Math.PI * 0.5) * bendAmt * len * 0.5 + (ey - oy) * 0.5;

      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.quadraticCurveTo(bendX, bendY, ex, ey);
      ctx.strokeStyle = rayColor;
      ctx.lineWidth = ray.thickness;
      ctx.lineCap = "round";
      ctx.stroke();

      // Tick dot
      if (ray.hasTick) {
        const tp = ray.tickPos;
        // Point along the quadratic curve at parameter tp
        const qx = (1 - tp) * (1 - tp) * ox + 2 * (1 - tp) * tp * bendX + tp * tp * ex;
        const qy = (1 - tp) * (1 - tp) * oy + 2 * (1 - tp) * tp * bendY + tp * tp * ey;
        ctx.beginPath();
        ctx.arc(qx, qy, ray.thickness * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(220,232,255,${alpha + 0.14})`
          : `rgba(48,68,168,${alpha + 0.20})`;
        ctx.fill();
      }
    });

    animRef.current = requestAnimationFrame(draw);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    lastTRef.current = performance.now();
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <>
      <style>{styles}</style>
      <section className={`stripe-section${isDark ? " dark" : ""}`}>

        <div className="stats-row">
          {[
            { num: "135+", label: "currencies and payment\nmethods supported" },
            { num: "$1.4T", label: "in payments volume\nprocessed in 2024" },
            { num: "99.999%", label: "historical uptime\nfor Stripe services" },
            { num: "200M+", label: "active subscriptions\nmanaged on Stripe Billing" },
          ].map((s) => (
            <div key={s.num} className="stat-item">
              <div className="stat-number">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div
          className="animation-wrapper"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <canvas ref={canvasRef} className="canvas-bg" />
          <div className="controls">
            <button
              className="ctrl-btn"
              onClick={() => setIsPaused(p => !p)}
              title={isPaused ? "Play" : "Pause"}
            >
              {isPaused
                ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              }
            </button>
            <button
              className="ctrl-btn"
              onClick={() => setIsDark(d => !d)}
              title={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark
                ? <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
                : <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              }
            </button>
          </div>
        </div>

        <div className="section-text">
          <p className="section-title">
            <strong>Powering businesses of all sizes.</strong>{" "}
            <span className="highlight">Run your business on a reliable platform that adapts to your needs.</span>
          </p>
        </div>

      </section>
    </>
  );
}
