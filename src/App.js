
import './App.css';
import Navbar from './Component/Navbar/Navbar';
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
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginSignUp />} />
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
