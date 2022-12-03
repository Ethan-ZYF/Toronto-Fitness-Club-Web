import './App.css';

import {BrowserRouter, 
  Routes, Route, Navigate}  from 'react-router-dom';

import ResponsiveAppBar from './Pages/components/Navbar';
import Footer from './Pages/components/Footer';

import LoginPage from './Pages/SignInPage';
import Dashboard from './Pages/Dashboard';
import SignUp from './Pages/SignUpPage';

function App() {
  return (
    <>
    {/* Use Browser Router to add routes here */}
    <ResponsiveAppBar />
    <BrowserRouter>
      <Routes>
        {/* <Route exact path='/' element={<RegisterPage />} /> */}
        <Route exact path='/signup' element={<SignUp/>} />
        <Route exact path='/signin' element={<LoginPage />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>  
    <Footer />
    </>
  );
}

export default App;
