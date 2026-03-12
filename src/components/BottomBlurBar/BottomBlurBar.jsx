import styles from './BottomBlurBar.module.css';

/**
 * Progressive Blur — 6 слоёв для нижней части, как на ezhov.site.
 * Размывает контент над StickyBar при скролле.
 */
export default function BottomBlurBar() {
  return (
    <div aria-hidden="true">
      {/* Bottom Layers */}
      <div className={`${styles.layer} ${styles.layerBottom} ${styles.layer1}`} />
      <div className={`${styles.layer} ${styles.layerBottom} ${styles.layer2}`} />
      <div className={`${styles.layer} ${styles.layerBottom} ${styles.layer3}`} />
      <div className={`${styles.layer} ${styles.layerBottom} ${styles.layer4}`} />
      <div className={`${styles.layer} ${styles.layerBottom} ${styles.layer5}`} />
      <div className={`${styles.layer} ${styles.layerBottom} ${styles.layer6}`} />
    </div>
  );
}
