import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './StoryModal.module.css';

const SLIDE_DURATION = 5000;
const TICK = 50;
const CONCEPT_COUNT = 5;

export default function StoryModal({ onClose }) {
  const [elapsed, setElapsed] = useState(0);
  const pausedRef = useRef(false);
  const elapsedRef = useRef(0);
  const intervalRef = useRef(null);

  const imgSrc = useMemo(
    () => `/src/assets/concepts/${Math.floor(Math.random() * CONCEPT_COUNT) + 1}.png`,
    [],
  );

  useEffect(() => {
    elapsedRef.current = 0;
    setElapsed(0);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (pausedRef.current) return;
      elapsedRef.current += TICK;
      setElapsed(elapsedRef.current);
      if (elapsedRef.current >= SLIDE_DURATION) {
        clearInterval(intervalRef.current);
        onClose();
      }
    }, TICK);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const progress = Math.min(elapsed / SLIDE_DURATION, 1);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.card}
        onClick={e => e.stopPropagation()}
        onMouseDown={() => { pausedRef.current = true; }}
        onMouseUp={() => { pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { pausedRef.current = false; }}
      >
        <img className={styles.conceptImg} src={imgSrc} alt="" draggable={false} />

        {/* Progress bar */}
        <div className={styles.bars}>
          <div className={styles.barTrack}>
            <div className={styles.barFill} style={{ width: `${progress * 100}%` }} />
          </div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <img className={styles.headerAvatar} src="/avatar.png" alt="Avatar" />
          <span className={styles.headerName}>Андрей</span>
          <span className={styles.headerTime}>сейчас</span>
          <button
            className={styles.closeBtn}
            onMouseDown={e => e.stopPropagation()}
            onClick={e => { e.stopPropagation(); onClose(); }}
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
