import { useState, useEffect, useRef } from 'react';
import { designer } from '../../data/projects.js';
import styles from './StickyBar.module.css';
import telegramIcon from '../../assets/telegram.svg';

const CV_URL = 'https://drive.google.com/file/d/1KMEWZECCzqiDKdhxcFHwoQifjR6efagC/view?usp=sharing';

const TOAST_MESSAGES = [
  'Напишите мне, чтобы получить доступ',
  'Ещё раз говорю, напишите мне...',
  'Ты издеваешься!?',
  'В ТЕЛЕГУ ЗАЙДИ',
];

export default function StickyBar() {
  const [value, setValue] = useState('');
  const [toastState, setToastState] = useState(null); // null | 'visible' | 'hiding'
  const [toastLevel, setToastLevel] = useState(0);
  const [toastKey, setToastKey] = useState(0);
  const [barHeight, setBarHeight] = useState(124);
  const toastTimer = useRef(null);
  const barRef = useRef(null);
  const clickLevelRef = useRef(0);
  const lastClickTime = useRef(0);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBarHeight(el.offsetHeight));
    ro.observe(el);
    setBarHeight(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    function handleLockedToast() {
      const now = Date.now();
      const withinWindow = now - lastClickTime.current < 2000;
      lastClickTime.current = now;

      clickLevelRef.current = withinWindow
        ? Math.min(clickLevelRef.current + 1, 3)
        : 0;

      setToastLevel(clickLevelRef.current);
      setToastState('visible');
      setToastKey((k) => k + 1);

      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => {
        setToastState('hiding');
        setTimeout(() => setToastState(null), 350);
      }, 2500);
    }

    window.addEventListener('show-locked-toast', handleLockedToast);
    return () => {
      window.removeEventListener('show-locked-toast', handleLockedToast);
      clearTimeout(toastTimer.current);
    };
  }, []);

  function handleSend() {
    const text = value.trim();
    const url = text
      ? `${designer.telegram}?text=${encodeURIComponent(text)}`
      : designer.telegram;
    window.open(url, '_blank');
    setValue('');
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleSend();
  }

  const toastClasses = [
    styles.toast,
    toastLevel === 3 && styles.toastLevel3,
    toastState === 'hiding' && styles.toastHiding,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {toastState && (
        <div
          key={toastKey}
          className={toastClasses}
          style={{ '--toast-offset': `${barHeight + 16}px` }}
        >
          <span className={styles.toastText}>{TOAST_MESSAGES[toastLevel]}</span>
        </div>
      )}

      <div className={styles.bar} ref={barRef}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${styles.tabCV}`}
            onClick={() => window.open(CV_URL, '_blank')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Посмотреть CV
          </button>
          <button
            className={`${styles.tab} ${styles.tabLinkedin}`}
            onClick={() => window.open(designer.linkedin, '_blank')}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="1" y="4.5" width="2.5" height="8.5" rx="0.5" fill="currentColor"/>
              <circle cx="2.25" cy="2.25" r="1.25" fill="currentColor"/>
              <path d="M5.5 5a.5.5 0 0 1 .5-.5h1.25a.5.5 0 0 1 .5.5v.6C8.1 4.8 8.9 4.5 9.75 4.5 11.55 4.5 13 5.95 13 8v5a.5.5 0 0 1-.5.5H11a.5.5 0 0 1-.5-.5V8.25C10.5 7.56 9.94 7 9.25 7S8 7.56 8 8.25V13a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5V5Z" fill="currentColor"/>
            </svg>
            LinkedIn
          </button>
        </div>

        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type="text"
            placeholder="Напишите и все отправится в Telegram…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className={styles.sendBtn} onClick={handleSend} aria-label="Send">
            <img src={telegramIcon} width="42" height="42" alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
