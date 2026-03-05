import styles from './ConceptCard.module.css';

export default function ConceptCard({ project }) {
  const { title, tags, badge, link } = project;

  const Card = link ? 'a' : 'div';
  const cardProps = link
    ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Card className={`${styles.card} ${link ? styles.clickable : ''}`} {...cardProps}>
      <div className={styles.mockup} />
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.footer}>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          {badge && (
            <span className={`${styles.badge} ${styles[`badge${badge}`]}`}>{badge}</span>
          )}
        </div>
      </div>
    </Card>
  );
}
