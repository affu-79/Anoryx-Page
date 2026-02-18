/**
 * Premium sliding stack cards — autonomous stacking animation + manual scroll override.
 * UI (container, cards, layout, styles) unchanged; only animation and scroll behavior.
 */

import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './SlidingStackCards.module.css';

const STACK_CARDS = [
  { id: 'financial', title: 'Financial Systems Intelligence', body: 'Autonomous intelligence infrastructure securing financial transaction ecosystems with real-time adaptive decision control, compliance verification, and audit-grade execution traceability.', icon: 'shield' },
  { id: 'healthcare', title: 'Healthcare Intelligence Systems', body: 'Privacy-first intelligence layers for healthcare data and clinical workflows—HIPAA-aligned signal processing, consent-aware orchestration, and secure cross-system coordination.', icon: 'neural' },
  { id: 'enterprise', title: 'Enterprise Infrastructure Automation', body: 'Orchestrated intelligence across hybrid and multi-cloud infrastructure. Continuous observability, autonomous remediation, and policy-driven execution at enterprise scale.', icon: 'agent' },
  { id: 'privacy', title: 'Privacy-First Data Protection', body: 'Intelligence infrastructure built for data sovereignty and compliance. PII-aware pipelines, consent management, and autonomous privacy risk detection across the stack.', icon: 'lock' },
  { id: 'autonomous', title: 'Autonomous AI Platform Infrastructure', body: 'Foundational layer for AI-native operations—model orchestration, agent coordination, and continuous learning pipelines with execution safety and trust enforcement.', icon: 'chip' },
  { id: 'saas', title: 'Secure SaaS Infrastructure', body: 'Scalable intelligence for software-as-a-service platforms. Real-time signal ingestion, adaptive automation, and enterprise-grade reliability with secure multi-tenant isolation.', icon: 'cloud' },
];

const STACK_OFFSET = 72;
const DELAY_BETWEEN_ENTER = 3000;
const DELAY_BETWEEN_EXIT = 2000;
const DELAY_BEFORE_RESTART = 2300;
const DELAY_AFTER_USER_SCROLL_RESUME = 5000;
const TOTAL_CARDS = STACK_CARDS.length;

const iconProps = { width: 28, height: 28, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

function CardIcon({ name }) {
  switch (name) {
    case 'shield': return <svg {...iconProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case 'neural': return <svg {...iconProps}><circle cx="12" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M12 8v2M8.5 16.5L12 13M15.5 16.5L12 13" /></svg>;
    case 'agent': return <svg {...iconProps}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6M9 13h4M9 17h2" /></svg>;
    case 'lock': return <svg {...iconProps}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
    case 'chip': return <svg {...iconProps}><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9zM4 12h2M18 12h2M12 4v2M12 18v2M4 8h1M4 16h1M19 8h1M19 16h1M8 4h1M16 4h1M8 20h1M16 20h1" /></svg>;
    case 'cloud': return <svg {...iconProps}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>;
    default: return <svg {...iconProps}><circle cx="12" cy="12" r="3" /></svg>;
  }
}

export default function SlidingStackCards() {
  const scrollContainerRef = useRef(null);
  const [revealedCount, setRevealedCount] = useState(1);
  const autoRunningRef = useRef(true);
  const userScrollTimeoutRef = useRef(null);
  const loopTimeoutRef = useRef(null);

  const scrollTrackHeight = (TOTAL_CARDS - 1) * STACK_OFFSET;
  const scrollContentHeight = 420 + scrollTrackHeight;

  const scrollToRevealed = useCallback((count) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTop = (count - 1) * STACK_OFFSET;
  }, []);

  useEffect(() => {
    let phase = 'enter';
    let current = 1;

    const runLoop = () => {
      if (!autoRunningRef.current) return;

      if (phase === 'enter') {
        if (current < TOTAL_CARDS) {
          const next = current + 1;
          setRevealedCount(next);
          loopTimeoutRef.current = setTimeout(() => {
            current = next;
            runLoop();
          }, DELAY_BETWEEN_ENTER);
        } else {
          phase = 'exit';
          current = TOTAL_CARDS;
          loopTimeoutRef.current = setTimeout(runLoop, DELAY_BETWEEN_EXIT);
        }
        return;
      }

      if (phase === 'exit') {
        if (current > 1) {
          const next = current - 1;
          setRevealedCount(next);
          scrollToRevealed(next);
          current = next;
          loopTimeoutRef.current = setTimeout(runLoop, DELAY_BETWEEN_EXIT);
        } else {
          phase = 'enter';
          current = 1;
          loopTimeoutRef.current = setTimeout(runLoop, DELAY_BEFORE_RESTART);
        }
      }
    };

    const startLoop = () => {
      current = 1;
      phase = 'enter';
      loopTimeoutRef.current = setTimeout(runLoop, DELAY_BETWEEN_ENTER);
    };

    const t0 = setTimeout(startLoop, DELAY_BETWEEN_ENTER);
    return () => {
      clearTimeout(t0);
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    };
  }, [scrollToRevealed]);

  useEffect(() => {
    if (autoRunningRef.current) scrollToRevealed(revealedCount);
  }, [revealedCount, scrollToRevealed]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (loopTimeoutRef.current) {
        clearTimeout(loopTimeoutRef.current);
        loopTimeoutRef.current = null;
      }
      autoRunningRef.current = false;
      if (userScrollTimeoutRef.current) clearTimeout(userScrollTimeoutRef.current);

      const top = el.scrollTop;
      const count = Math.max(1, Math.min(TOTAL_CARDS, Math.round(top / STACK_OFFSET) + 1));
      setRevealedCount(count);

      userScrollTimeoutRef.current = setTimeout(() => {
        autoRunningRef.current = true;
        userScrollTimeoutRef.current = null;
        let phase = count >= TOTAL_CARDS ? 'exit' : 'enter';
        let current = count;

        const runLoop = () => {
          if (!autoRunningRef.current) return;
          if (phase === 'enter') {
            if (current < TOTAL_CARDS) {
              const next = current + 1;
              setRevealedCount(next);
              scrollToRevealed(next);
              loopTimeoutRef.current = setTimeout(() => {
                current = next;
                runLoop();
              }, DELAY_BETWEEN_ENTER);
            } else {
              phase = 'exit';
              current = TOTAL_CARDS;
              loopTimeoutRef.current = setTimeout(runLoop, DELAY_BETWEEN_EXIT);
            }
          } else {
            if (current > 1) {
              const next = current - 1;
              setRevealedCount(next);
              scrollToRevealed(next);
              current = next;
              loopTimeoutRef.current = setTimeout(runLoop, DELAY_BETWEEN_EXIT);
            } else {
              phase = 'enter';
              current = 1;
              loopTimeoutRef.current = setTimeout(runLoop, DELAY_BEFORE_RESTART);
            }
          }
        };

        loopTimeoutRef.current = setTimeout(runLoop, DELAY_AFTER_USER_SCROLL_RESUME);
      }, DELAY_AFTER_USER_SCROLL_RESUME);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (userScrollTimeoutRef.current) clearTimeout(userScrollTimeoutRef.current);
    };
  }, [scrollToRevealed]);

  const getCardStyle = (index) => {
    const isRevealed = index < revealedCount;
    const activeIndex = revealedCount - 1;
    let y = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = TOTAL_CARDS;

    if (!isRevealed) {
      y = STACK_OFFSET + (index - revealedCount) * STACK_OFFSET;
      scale = 1;
      opacity = 0;
      zIndex = TOTAL_CARDS - (index - revealedCount);
    } else {
      const slotsAbove = activeIndex - index;
      y = slotsAbove * -STACK_OFFSET;
      scale = 1;
      opacity = 1;
      zIndex = TOTAL_CARDS - slotsAbove;
    }
    return {
      transform: `translateY(${y}px) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div className={styles.stack}>
          {STACK_CARDS.map((card, i) => (
            <div
              key={card.id}
              className={`${styles.stackCard} ${i < revealedCount ? styles.stackCardRevealed : ''} ${styles[`cardBg${i}`]}`}
              data-index={i}
              data-stack-card
              style={getCardStyle(i)}
            >
              <div className={styles.cardInner}>
                <span className={styles.cardIconWrap}>
                  <span className={styles.cardIcon} aria-hidden>
                    <CardIcon name={card.icon} />
                  </span>
                </span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardBody}>{card.body}</p>
                <span className={styles.cardAccent} aria-hidden />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.scrollIndicator} aria-hidden>
          <span className={styles.scrollDot} />
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className={styles.scrollRail}
        aria-label="Scroll to change card"
        tabIndex={0}
      >
        <div className={styles.scrollTrack} style={{ height: scrollContentHeight }} />
      </div>
    </div>
  );
}
