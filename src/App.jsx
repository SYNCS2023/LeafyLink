import './App.css';
import { Routes, Route } from 'react-router-dom';
import Garden from './pages/Garden';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/garden' element={<Garden />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
