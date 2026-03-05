import styles from './ProjectCard.module.css';

const BADGE_LABELS = {
  NDA: 'NDA',
  Soon: 'Soon',
  Live: 'Live',
};

export default function ProjectCard({ project, index }) {
  const { title, tags, badge, link, mockupCount = 2 } = project;
  const num = String(index + 1).padStart(2, '0');

  const Card = link ? 'a' : 'div';
  const cardProps = link
    ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Card className={`${styles.card} ${link ? styles.clickable : ''}`} {...cardProps}>
      <div className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.num}>{num}</span>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.right}>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          {badge && (
            <span className={`${styles.badge} ${styles[`badge${badge}`]}`}>
              {BADGE_LABELS[badge]}
            </span>
          )}
        </div>
      </div>

      <div className={styles.mockupArea}>
        <div className={styles.mockupRow}>
          {Array.from({ length: mockupCount }).map((_, i) => (
            <div
              key={i}
              className={`${styles.mockup} ${i === 0 ? styles.mockupWide : styles.mockupTall}`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
