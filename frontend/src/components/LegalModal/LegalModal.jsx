/**
 * Legal Modal — Premium overlay for Privacy Policy and Terms.
 * Backdrop blur, focus trap, Escape/click-outside to close.
 */

import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './LegalModal.module.css';
import { PRIVACY_CONTENT, TERMS_CONTENT } from './legalContent';

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function LegalModal({ variant, isOpen, onClose }) {
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const prevFocusRef = useRef(null);
  const closingRef = useRef(false);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    overlayRef.current?.setAttribute('data-closing', 'true');
    setTimeout(() => {
      onClose();
      closingRef.current = false;
    }, 240);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) close();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key !== 'Tab' || !overlayRef.current) return;
    const focusable = overlayRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    prevFocusRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      prevFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.removeAttribute('data-closing');
    const firstFocusable = overlay.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    firstFocusable?.focus();
  }, [isOpen, variant]);

  if (!isOpen) return null;

  const title = variant === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions';
  const content = variant === 'privacy' ? <PRIVACY_CONTENT /> : <TERMS_CONTENT />;

  const modal = (
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="document"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 id="legal-modal-title" className={styles.title}>{title}</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={close}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </header>
        <div className={styles.body}>
          <div className={styles.content}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

export { PRIVACY_CONTENT, TERMS_CONTENT };
