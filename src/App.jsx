import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Garden from './pages/Garden';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import NotFound from './pages/NotFound';
import SuggestPlant from './pages/SuggestPlant';
import ExistingPlant from './pages/ExistingPlant';
import AppContextProvider from './contexts/appContext';

function App() {
  return (
    <>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/garden' element={<Garden />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/new' element={<SuggestPlant />} />
            <Route path='/existing' element={<ExistingPlant />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </>
  );
}

export default App;
