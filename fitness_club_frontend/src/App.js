import './App.css';

import {BrowserRouter, 
  Routes, Route, Navigate}  from 'react-router-dom';

import Navbar from './Pages/components/Navbar';
import Footer from './Pages/components/Footer';

import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <>
    {/* Use Browser Router to add routes here */}
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route exact path='/register' element={<RegisterPage />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>  
    <Footer />
    </>
  );
}

export default App;
