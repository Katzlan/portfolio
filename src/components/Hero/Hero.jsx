import { useState } from 'react';
import { designer } from '../../data/projects.js';
import StoryModal from '../StoryModal/StoryModal';
import styles from './Hero.module.css';

export default function Hero() {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div
            className={styles.avatarWrap}
            onClick={() => setStoryOpen(true)}
            role="button"
            aria-label="Открыть историю"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setStoryOpen(true)}
          >
            <video
              className={styles.avatar}
              src="/avatar.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <h1 className={styles.name}>
            {designer.name}, {designer.title}
          </h1>
        </div>
      </section>

      {storyOpen && <StoryModal onClose={() => setStoryOpen(false)} />}
    </>
  );
}
