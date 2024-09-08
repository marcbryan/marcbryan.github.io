import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useLocalStorage from 'use-local-storage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Home from './pages/Home';
import AboutMe from './pages/AboutMe';
import Portfolio from './pages/Portfolio';
import AboutPage from './pages/AboutPage';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const pages = [
  { key: 'aboutMe', route: '/about-me' }, 
  { key: 'portfolio', route: '/portfolio' }, 
  { key: 'aboutPage', route: '/about' }
];

const menuPages = [...pages];
menuPages.unshift({ key: 'home', route: '/' });

export function useTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    }
  });
}

function App() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useLocalStorage("i18nextLng", i18n.language);

  if (lang == undefined)
    setLang(i18n.language);

  return (
    <BrowserRouter>
      <ResponsiveAppBar lang={lang} setLang={setLang} pages={pages} menuPages={menuPages} />
      <Routes>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>  
    </BrowserRouter>
  )
}

export default App
