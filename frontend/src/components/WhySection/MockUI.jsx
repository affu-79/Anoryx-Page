import s from './MockUI.module.css';

/**
 * Anoryx Privacy Dashboard — animated mock UI.
 * Compact privacy-first architecture showcase with:
 *  - Privacy shield status     (top-left)
 *  - Security metrics          (top-right)
 *  - Encrypted data flow       (center, 3 nodes + particles)
 *  - AI agent status           (bottom-left)
 *  - Access control toggles    (bottom-right)
 *  - Toast notification        (center-right, cycles)
 *
 * Pure CSS animations. No libraries.
 */
export default function MockUI() {
  return (
    <div className={s.scene} aria-hidden="true">

      {/* ── 1. Privacy Shield — top-left ──────────────────────── */}
      <div className={`${s.card} ${s.shield}`}>
        <div className={s.shieldIconWrap}>
          <div className={s.shieldIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>
          <div className={s.pulseRing} />
        </div>
        <div className={s.shieldBody}>
          <span className={s.shieldTitle}>Privacy Active</span>
          <span className={s.shieldStatus}>
            <span className={s.liveDot} />
            Encrypted
          </span>
          <span className={s.shieldMeta}>End-to-End</span>
        </div>
      </div>

      {/* ── 2. Security Metrics — top-right ───────────────────── */}
      <div className={`${s.card} ${s.security}`}>
        <div className={s.lockIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className={s.secBody}>
          <span className={s.secTitle}>Zero-Knowledge</span>
          <span className={s.secCheck}>
            <span className={s.checkAnim}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            Active
          </span>
        </div>
      </div>

      {/* ── 3. Data Flow — center ─────────────────────────────── */}
      <div className={s.dataFlow}>
        {/* Node 1: User Data */}
        <div className={`${s.node} ${s.node1}`}>
          <div className={s.nodeCircle}>
            <svg viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <span className={s.nodeLabel}>User Data</span>
        </div>

        {/* Connector 1 → 2 with particle */}
        <div className={`${s.connector} ${s.conn1}`}>
          <div className={s.connLine} />
          <div className={s.particle} />
        </div>

        {/* Node 2: Encrypted */}
        <div className={`${s.node} ${s.node2}`}>
          <div className={s.nodeCircle}>
            <svg viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className={s.nodeLabel}>Encrypted</span>
        </div>

        {/* Connector 2 → 3 with particle */}
        <div className={`${s.connector} ${s.conn2}`}>
          <div className={s.connLine} />
          <div className={s.particle} />
        </div>

        {/* Node 3: AI Processing */}
        <div className={`${s.node} ${s.node3}`}>
          <div className={s.nodeCircle}>
            <svg viewBox="0 0 24 24">
              <path d="M12 2a4 4 0 0 1 4 4v1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2V6a4 4 0 0 1 4-4z" />
              <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
              <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
              <path d="M8 14v2a4 4 0 0 0 8 0v-2" />
            </svg>
          </div>
          <span className={s.nodeLabel}>AI Process</span>
        </div>
      </div>

      {/* ── 4. AI Agent — bottom-left ─────────────────────────── */}
      <div className={`${s.card} ${s.agent}`}>
        <div className={s.agentIcon}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.18V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1.08H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1.08 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1.08H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.08z" />
          </svg>
        </div>
        <div className={s.agentBody}>
          <span className={s.agentTitle}>Autonomous Agent</span>
          <span className={s.agentStatus}>
            <span className={s.liveDot} />
            Active
          </span>
        </div>
      </div>

      {/* ── 5. Access Control — bottom-right ───────────────────── */}
      <div className={`${s.card} ${s.controls}`}>
        <span className={s.ctrlTitle}>Privacy Controls</span>
        <div className={s.toggleRow}>
          <span className={s.toggleLabel}>Data Sharing</span>
          <div className={`${s.toggle} ${s.toggleOff}`} />
        </div>
        <div className={s.toggleRow}>
          <span className={s.toggleLabel}>Analytics</span>
          <div className={`${s.toggle} ${s.toggleOn}`} />
        </div>
      </div>

      {/* ── 6. Toast — "Privacy Check Complete" (outside right) ── */}
      <div className={s.toast}>
        <div className={s.toastDot}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <span className={s.toastMsg}>Privacy Check Complete</span>
      </div>

      {/* ── 7. E2E Notification (outside top-right) ─────────── */}
      <div className={s.e2eToast}>
        <div className={s.e2eLock}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <span className={s.e2eText}>End-to-End Encryption</span>
      </div>

    </div>
  );
}
