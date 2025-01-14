import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/home/Home';
import Update from './components/home/Update';
import PageNotFound from './components/PageNotFound';


function App() {
  return (
    <><div className='bg-img'>
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />    
    <Route path="/home" element={<Home />} />
    <Route path="/update" element={<Update />} />
    <Route path="*" element={<PageNotFound/>} />
    
  </Routes>
</BrowserRouter>

    </div>
    </>
  );
}

export default App;
