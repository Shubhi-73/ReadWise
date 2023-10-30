
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginSignUp from './Pages/LoginSignUp';
import ComposePage from './Pages/Compose/Compose';
import CollectionPage from './Pages/Collection/Collection';
import AllHighlightsPage from './Pages/Collection/AllHighlights';
import TagPage from './Pages/Collection/Tags';

function App() {

  return (
    <div>
      <BrowserRouter>
    
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/' element={<LoginSignUp />} />
          <Route path='/Compose' element={<ComposePage />} />
          <Route path='/Collection' element={<CollectionPage />} />
          <Route path="/all-highlights" element={<AllHighlightsPage />} />
          <Route path="/tags" element={<TagPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
