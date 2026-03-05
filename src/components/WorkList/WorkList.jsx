import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { works } from '../../data/projects.js';
import styles from './WorkList.module.css';
import gidkeyIcon from '../../assets/gidkey.svg';
import gidIcon from '../../assets/gid.svg';
import mostIcon from '../../assets/most.svg';

const icons = {
  fintech: (
    <img src={gidkeyIcon} width="18" height="18" alt="" />
  ),
  wellness: (
    <img src={gidIcon} width="18" height="18" alt="" />
  ),
  fitness: (
    <img src={mostIcon} width="18" height="18" alt="" />
  ),
};

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 11.5L11.5 2.5M11.5 2.5H5M11.5 2.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2.5" y="6" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CensorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="0" y="4" width="18" height="10" rx="2" fill="currentColor"/>
    </svg>
  );
}

export default function WorkList() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  function handleLockedClick() {
    window.dispatchEvent(new CustomEvent('show-locked-toast'));
  }

  return (
    <section className={styles.list}>
      {works.map((work) => (
        <button
          key={work.id}
          className={`${styles.item}${work.locked ? ` ${styles.itemLocked}` : ''}`}
          onClick={() => work.locked ? handleLockedClick() : navigate(`/work/${work.slug}`)}
          onMouseEnter={() => !work.locked && setHoveredId(work.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className={styles.content}>
            <div className={styles.meta}>
              <span className={styles.icon}>{work.locked ? <CensorIcon /> : icons[work.icon]}</span>
              <span className={styles.company}>
                {work.company}, {work.year}
              </span>
              {work.badge && (
                <span className={styles.badge}>{work.badge}</span>
              )}
            </div>
            <p className={styles.title}>{work.title}</p>
          </div>
          <span className={styles.arrow}>
            {work.locked ? <LockIcon /> : <ArrowIcon />}
          </span>

          {!work.locked && hoveredId === work.id && (
            <div className={styles.preview}>
              {work.preview ? (
                <img src={work.preview} alt={work.title} className={styles.previewImg} />
              ) : (
                <div className={styles.previewPlaceholder} />
              )}
            </div>
          )}
        </button>
      ))}

      <button
        className={`${styles.item} ${styles.itemDashed}`}
        onClick={() => navigate('/concepts')}
      >
        <p className={styles.title}>Концепты для души</p>
        <span className={styles.arrow}>
          <ArrowIcon />
        </span>
      </button>

    </section>
  );
}
