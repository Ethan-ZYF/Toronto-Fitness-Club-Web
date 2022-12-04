import './App.css';

import {BrowserRouter, 
  Routes, Route, Navigate}  from 'react-router-dom';

import ResponsiveAppBar from './Pages/components/Navbar';
import Footer from './Pages/components/Footer';
import SignInPage from './Pages/SignInPage';
import Dashboard from './Pages/Dashboard';
import SignUp from './Pages/SignUpPage';
import AllStudiosPage from './Pages/AllStudiosPage';

import { userContext, loggedOutState } from './userContext';
import { useState } from 'react';

function App() {
  const [context, setContext] = useState(loggedOutState);


  return (
    <>
    <userContext.Provider value={{context, setContext}}>

      {/* Use Browser Router to add routes here */}
      <ResponsiveAppBar />
      <BrowserRouter>
          <Routes>
            <Route exact path='/dashboard' element={<Dashboard />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/signin' element={<SignInPage />} />
            <Route exact path='/all-studios' element={< AllStudiosPage/>} />
          </Routes>
      </BrowserRouter><Footer />

    </userContext.Provider>
    </>
  );
}

export default App;
