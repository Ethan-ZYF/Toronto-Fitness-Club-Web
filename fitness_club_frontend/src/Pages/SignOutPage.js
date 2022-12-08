import React, { useState, useEffect, useContext } from 'react';
import { logout } from '../api';
import { userContext, loggedOutState } from '../userContext';
import { Navigate } from 'react-router-dom';

const SignOutPage = () => {
    const [logoutSuccess, setLogOutSuccess] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const context = useContext(userContext);

    useEffect(
        () => {localStorage.clear();
            logout().then((response) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                context.setContext(loggedOutState);
                localStorage.clear();
                localStorage.clear();
                setLogOutSuccess(true);
            }).catch((error) => {
                setLogOutSuccess(false);
                console.log(error)
                setErrorMsg(error.response.data); 
            })
        },
        []);


    return (
        <div>
            Sign out: {logoutSuccess ? 'Successfully Logged Out' : "Failed"}
            {logoutSuccess ? <Navigate to="/studios" /> : <div>{errorMsg}</div>}
        </div>
    );
};

export default SignOutPage;
