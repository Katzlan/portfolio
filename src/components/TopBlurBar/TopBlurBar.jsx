import styles from './TopBlurBar.module.css';

/**
 * Progressive Blur — 6 слоёв с разным blur, как на ezhov.site.
 * Каждый слой имеет свою маску, вместе создают плавное размытие.
 */
export default function TopBlurBar() {
  return (
    <div aria-hidden="true">
      {/* Top Layers */}
      <div className={`${styles.layer} ${styles.layerTop} ${styles.layer1}`} />
      <div className={`${styles.layer} ${styles.layerTop} ${styles.layer2}`} />
      <div className={`${styles.layer} ${styles.layerTop} ${styles.layer3}`} />
      <div className={`${styles.layer} ${styles.layerTop} ${styles.layer4}`} />
      <div className={`${styles.layer} ${styles.layerTop} ${styles.layer5}`} />
      <div className={`${styles.layer} ${styles.layerTop} ${styles.layer6}`} />
    </div>
  );
}
