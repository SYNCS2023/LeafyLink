import './App.css';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Garden from './pages/Garden';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import NotFound from './pages/NotFound';
import SuggestPlant from './pages/SuggestPlant';
import ExistingPlant from './pages/ExistingPlant';
import AppContextProvider from './contexts/appContext';
import FinalSuggestion from './pages/FinalSuggestion';
import { useEffect, useState } from 'react';
import defaultPlantData from './assets/defaultPlants.json'
import Background from './components/Background';
import { config } from './logic/constants';

function App() {
  const [theme, setTheme] = useState(
    (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) ? "dark" : "light"
  );

  useEffect(() => {
    if (localStorage.getItem('plants') === null) {
      localStorage.setItem('plants', JSON.stringify(defaultPlantData));
      console.log('Setting default plant DB.');
    }
  }, []);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
      document.querySelector("html").classList.remove("light");
    } else {
      document.querySelector("html").classList.remove("dark");
      document.querySelector("html").classList.add("light");
    }
  }, [theme]);

  function handleThemeChange() {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem('theme', 'light');
    } else {
      setTheme("dark");
      localStorage.setItem('theme', 'dark');
    }
  }

  return (
    <div className='App grid'>
      <div className='bg-transparent z-50'>
        <Background />
        <HashRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/garden' element={<Garden />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/new' element={<SuggestPlant />} />
            <Route path='/suggestion' element={<FinalSuggestion />} />
            <Route path='/existing' element={<ExistingPlant />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
