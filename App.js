
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginSignUp from './Pages/LoginSignUp';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginSignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
