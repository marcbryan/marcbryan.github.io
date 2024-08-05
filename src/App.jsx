import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const pages2 = [...pages];
pages2.unshift({ key: 'home', route: '/' });

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
  const userLang = navigator.language || navigator.userLanguage;
  const [lang, setLang] = useState(userLang.includes('en') ? 'EN' : 'ES');

  return (
    <>
      <BrowserRouter>
        <ResponsiveAppBar lang={lang} setLang={setLang} pages={pages} pages2={pages2}></ResponsiveAppBar>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>  
      </BrowserRouter>
    </>
  )
}

export default App
