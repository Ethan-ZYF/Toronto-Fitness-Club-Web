<<<<<<< HEAD
import './App.css';
=======
import React from 'react'
import { Grommet } from 'grommet'
import { grommet, dark } from 'grommet/themes'
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'
>>>>>>> main

import {BrowserRouter, 
  Routes, Route, Navigate}  from 'react-router-dom';

import ResponsiveAppBar from './Pages/components/Navbar';
import Footer from './Pages/components/Footer';

import LoginPage from './Pages/SignInPage';
import Dashboard from './Pages/Dashboard';
import SignUp from './Pages/SignUpPage';

function App() {
<<<<<<< HEAD
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
=======
    return (
        <Grommet theme={dark} full>
            <MyHeader />
            Something
            <MyFooter />
        </Grommet>
    )
>>>>>>> main
}

export default App