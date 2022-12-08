import './App.css';
import { useParams } from 'react-router-dom';

import {
    BrowserRouter,
    Routes, Route, Navigate
} from 'react-router-dom';

import ResponsiveAppBar from './Pages/components/Navbar';
import Footer from './Pages/components/Footer';
import SignInPage from './Pages/SignInPage';
import Dashboard from './Pages/Dashboard';
import SignUp from './Pages/SignUpPage';
import EditProfile from './Pages/EditPage';
import Pricing from './Pages/Price';
import AllStudiosPage from './Pages/AllStudiosPage';
import SignOutPage from './Pages/SignOutPage';
import ProfilePage from './Pages/ProfilePage';
import SubscribePage from './Pages/Subscribe';
import MyPayments from './Pages/Payment';
import StudioDetail from './Pages/StudioDetail';
import EditPlanPage from './Pages/EditPlan';
import ViewSchedulePage from './Pages/ViewSchedulePage';
import ViewHistoryPage from './Pages/ViewHistoryPage';

import { userContext, loggedOutState } from './userContext';
import { useState } from 'react';

function App() {
    const [context, setContext] = useState(userContext);
    return (
        <>
            <userContext.Provider value={{ context, setContext }}>
                {/* Use Browser Router to add routes here */}
                <BrowserRouter>
                    <ResponsiveAppBar />
                    <Routes>
                        <Route exact path='/signup' element={<SignUp />} />
                        <Route exact path='/signin' element={<SignInPage />} />
                        <Route exact path='/signout' element={<SignOutPage />} />
                        <Route exact path='/' element={<Dashboard />} />
                        <Route exact path='/profile' element={<ProfilePage />} />
                        <Route exact path='/edit' element={<EditProfile />} />
                        <Route exact path='/plans' element={<Pricing />} />
                        <Route exact path='/studios' element={<AllStudiosPage />} />
                        <Route exact path='/studios/:id' element={<StudioDetail />} />
                        <Route exact path='/classes' element={<Dashboard />} />
                        <Route exact path='/myplan' element={<SubscribePage />} />
                        <Route exact path='/payments' element={<MyPayments />} />
                        <Route exact path='/edit_plan' element={<EditPlanPage />} />
                        <Route exact path='/view_schedule' element={<ViewSchedulePage />} />
                        <Route exact path='/view_history' element={<ViewHistoryPage/>} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </userContext.Provider>
        </>
    );
}
export default App