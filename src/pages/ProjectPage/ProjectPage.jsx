import { useParams, useNavigate } from 'react-router-dom';
import { works } from '../../data/projects.js';
import styles from './ProjectPage.module.css';
import heroFintech from '../../assets/hero-fintech.png';
import heroFintechCjmDiagram from '../../assets/hero-fintech-cjm-diagram.png';
import heroFintechOnboarding from '../../assets/hero-fintech-onboarding.png';
import heroFintechUnderstanding from '../../assets/hero-fintech-understanding.png';
import heroFintechAbtest from '../../assets/hero-fintech-abtest.png';
import heroFintechPush from '../../assets/hero-fintech-push.png';
import heroFintechFlowScreens from '../../assets/hero-fintech-flow-screens.png';
import heroCorporateCalendarIteration from '../../assets/hero-corporate-calendar-iteration.png';
import heroFintechFlow from '../../assets/hero-fintech-flow.png';

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = works.find((w) => w.slug === slug);
  const cs = project?.caseStudy;
  const imgs = project?.bodyImages;
  const isCorporateGid = project?.slug === 'corporate-gid';

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>

      <header className={styles.header}>
        {project && (
          <div className={styles.label}>
            {cs?.meta ?? `${project.company} · ${project.year}`}
          </div>
        )}
        <h1 className={styles.title}>
          {project ? project.title : 'Проект не найден'}
        </h1>
        {cs && (
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImage}>
              <img src={project.heroImage ?? heroFintech} alt="" />
            </div>
          </div>
        )}
      </header>

      {!cs && (
        <p className={styles.placeholder}>Case study coming soon.</p>
      )}

      {cs && (
        <div className={styles.body}>

          {/* Problem */}
          <section className={styles.section}>
            {(Array.isArray(cs.problem) ? cs.problem : [cs.problem]).map((paragraph, i) => (
              <p key={i} className={styles.text}>{paragraph}</p>
            ))}
          </section>

          {/* Expected result */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Контекст</h2>
            <p className={styles.text}>
              {cs.context ?? "Мы провели 15 интервью, разобрали транскрипты, собрали CJM и выделили три сегмента: новички, среднячки, профи. Но ключевое — не различия, а общий критерий выбора: скорость + привычка"}
            </p>
            {!cs.context && (
              <>
                <div className={styles.solutionCard}>
                  <blockquote className={styles.text}>«СМС — это просто. Она всегда там же, и телефон сам подставляет код.»</blockquote>
                </div>
                <div className={styles.solutionCard}>
                  <blockquote className={styles.text}>«Я не хочу каждый раз искать, где подтверждать. Мне нужно зайти — и всё.»</blockquote>
                </div>
              </>
            )}
          </section>

          <div className={styles.heroImageWrapper}>
            <div className={`${styles.heroImage} ${styles.heroImageContain}`}>
              <img src={imgs?.cjmDiagram ?? heroFintechCjmDiagram} alt="" />
            </div>
          </div>

          {/* Understanding */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Для кого</h2>
            {cs.forWhom ? (
              Array.isArray(cs.forWhom)
                ? cs.forWhom.map((p, i) => <p key={i} className={styles.text}>{p}</p>)
                : <p className={styles.text}>{cs.forWhom}</p>
            ) : (
              <>
                <p className={styles.text}>Победить SMS нельзя "объяснениями". Можно только одним способом: сделать путь таким же коротким, как автокод из SMS — но без SMS</p>
                <p className={styles.text}>Push — самый близкий аналог "одного клика": пришло → открыл → подтвердил. А TOTP нужен как "всегда работает", когда пуш недоступен/неуместен/нет сети</p>
              </>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Проблема</h2>
            {cs.problemSection ? (
              cs.problemSection.map((p, i) => <p key={i} className={styles.text}>{p}</p>)
            ) : (
              <>
                <p className={styles.text}>{cs.understanding}</p>
                <p className={styles.text}>Мы сделали так, чтобы подтверждение не требовало поиска: пришёл запрос → открыл приложение → сделал одно понятное действие. При этом интерфейс должен поддерживать тревожную мысль пользователя «а что вообще происходит?» — через ясные статусы и отсутствие лишних развилок</p>
              </>
            )}
          </section>

          <div className={styles.heroImageWrapper}>
            <div className={`${styles.heroImage} ${project?.slug === 'authenticator-app-gid' ? styles.heroImageWhiteBg : ''}`}>
              <img src={imgs?.understanding ?? heroFintechUnderstanding} alt="" />
            </div>
          </div>

          {/* Research */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Задача</h2>
            {cs.taskSection ? (
              <p className={styles.text}>{cs.taskSection}</p>
            ) : (
              <>
                <p className={styles.text}>Ещё один важный разрыв мы увидели в начале: человек ставит приложение, открывает — и часто попадает в пространство без ясной следующей точки. Для новичка это почти конец: если непонятно, что делать прямо сейчас, значит «я потом разберусь», а потом происходит вход через SMS и привычка закрепляется</p>
                <p className={styles.text}>Поэтому мы сделали простой принцип: первый вход должен приводить к первому полезному результату. Не "посмотри тут настройки", не "ознакомься с функциями", а конкретно — подключи первый сервис и пойми, что дальше аутентификатор будет помогать</p>
              </>
            )}
          </section>

          {cs.approachSection && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Подход</h2>
              {Array.isArray(cs.approachSection)
                ? cs.approachSection.map((p, i) => <p key={i} className={styles.text}>{p}</p>)
                : <p className={styles.text}>{cs.approachSection}</p>}
            </section>
          )}

          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImage}>
              <img src={imgs?.onboarding ?? heroFintechOnboarding} alt="" />
            </div>
          </div>

          {/* Iterations */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{cs.iterationsSectionTitle ?? "Почему это должно победить SMS"}</h2>
            <p className={styles.text}>{cs.iterations}</p>
            {cs.iterationsAdditional && (
              <div className={styles.solutionCard}>
                <blockquote className={styles.text}>Релевантный контент вместо общего потока</blockquote>
              </div>
            )}
            {cs.iterationsAdditional && <p className={styles.text}>{cs.iterationsAdditional}</p>}
            {cs.iterationsAdditional2 && (
              <div className={styles.solutionCard}>
                <blockquote className={styles.text}>Более живая связность через людей</blockquote>
              </div>
            )}
            {cs.iterationsAdditional2 && <p className={styles.text}>{cs.iterationsAdditional2}</p>}
            {cs.iterationsAdditional3 && <p className={styles.text}>{cs.iterationsAdditional3}</p>}
            {cs.iterationsAdditional4 && (
              <>
                <div className={styles.solutionCard}>
                  <blockquote className={styles.text}>Путь до участия, а не просто информирование</blockquote>
                </div>
                <p className={styles.text}>{cs.iterationsAdditional4}</p>
              </>
            )}
          </section>

          {/* A/B test */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{cs.abTestSectionTitle ?? "Итерации: что поправили после первых прогонов"}</h2>
            <p className={styles.text}>
              {cs.abTestSection ?? (
                <>После быстрых проверок на понятность мы подкрутили две вещи:<br />1. Убрали лишние шаги вокруг подтверждения, оставив один главный сценарий без "куда нажать".<br />2. Сделали первый запуск более направленным: меньше "ознакомления", больше "сделай один раз — и пользуйся"</>
              )}
            </p>
            {cs.abTestSolutionCard && (
              <div className={styles.solutionCard}>
                <blockquote className={styles.text}>{cs.abTestSolutionCard}</blockquote>
              </div>
            )}
            {cs.abTestSectionAdditional && (
              <p className={styles.text}>{cs.abTestSectionAdditional}</p>
            )}
          </section>

          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImage}>
              <img src={imgs?.abtest2 ?? heroFintechPush} alt="" />
            </div>
          </div>

          {project?.slug === 'authenticator-app-gid' && (
            <div className={styles.heroImageWrapper}>
              <div className={styles.heroImage}>
                <img src={heroFintechFlowScreens} alt="" />
              </div>
            </div>
          )}

          {(cs.abTestSolutionCard2 || cs.abTestSectionAdditional2) && (
            <>
              <section className={styles.section}>
                {cs.abTestSolutionCard2 && (
                  <div className={styles.solutionCard}>
                    <blockquote className={styles.text}>{cs.abTestSolutionCard2}</blockquote>
                  </div>
                )}
                {cs.abTestSectionAdditional2 && (
                  <p className={styles.text}>{cs.abTestSectionAdditional2}</p>
                )}
                {cs.abTestSectionAdditional3 && (
                  <p className={styles.text}>{cs.abTestSectionAdditional3}</p>
                )}
              </section>
              <div className={styles.heroImageWrapper}>
                <div className={`${styles.heroImage} ${styles.heroImageContain}`}>
                  <img src={heroCorporateCalendarIteration} alt="" />
                </div>
              </div>
            </>
          )}

          {/* What's next */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Результат</h2>
            <p className={styles.text}>{cs.whatsNext}</p>
          </section>

          <div className={styles.heroImageWrapper}>
            <div className={`${styles.heroImage} ${styles.heroImageContain}`}>
              <img src={imgs?.flow ?? project?.flowImage ?? heroFintechFlow} alt="" />
            </div>
          </div>

          {/* My role */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Моя роль</h2>
            <ul className={styles.roleList}>
              {cs.myRole.map((item, i) => (
                <li key={i} className={styles.roleItem}>— {item}</li>
              ))}
            </ul>
          </section>

        </div>
      )}
    </div>
  );
}
