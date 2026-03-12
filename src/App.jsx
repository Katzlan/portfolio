import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import WorkList from './components/WorkList/WorkList';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import ConceptsPage from './pages/ConceptsPage/ConceptsPage';
import StickyBar from './components/StickyBar/StickyBar';
import styles from './App.module.css';

function Home() {
  return (
    <div className={styles.app}>
      <Hero />
      <main className={styles.main}>
        <WorkList />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/concepts" element={<ConceptsPage />} />
      </Routes>
      <StickyBar />
    </>
  );
}
