import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ConceptsPage.module.css';

import concept1 from '../../assets/concepts/1.png';
import concept2 from '../../assets/concepts/2.png';
import concept3 from '../../assets/concepts/3.png';
import concept4 from '../../assets/concepts/4.png';
import concept5 from '../../assets/concepts/5.png';

const photos = [
  { src: concept4, caption: 'Концепт ленты для внутренней платформы. Мне очень нравится X' },
  { src: concept5, caption: 'Профиль сотрудника — решаем проблемы с быстрым поиском контактов' },
  { src: concept1, caption: 'Тест скрипта для задника обложки - как в Spotify' },
  { src: concept2, caption: 'Меня спросили как я вижу идеальным окно лимитов — красиво, но не взяли' },
  { src: concept3, caption: 'Предложение улучшить зеленому банку то, что в теории хорошо работает' },
];

export default function ConceptsPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>

      <header className={styles.header}>
        <h1 className={styles.title}>Концепты для души</h1>
      </header>

      <div className={styles.body}>
        {photos.map(({ src, caption }, i) => (
          <Fragment key={i}>
            <div className={styles.heroImageWrapper}>
              <div className={styles.heroImage}>
                {src ? (
                  <img src={src} alt={caption} className={styles.heroImg} />
                ) : (
                  <div className={styles.heroPlaceholder} />
                )}
              </div>
            </div>
            <section className={styles.section}>
              <p className={styles.text}>{caption}</p>
            </section>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
