import React, { useState, useEffect, useContext } from 'react';
import { logout } from '../api';
import { userContext, loggedOutState } from '../userContext';

const SignOutPage = () => {
    const [logoutSuccess, setLogOutSuccess] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(
        () => {
            logout().then((response) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                // const context = useContext(userContext);
                // context.setContext(loggedOutState);
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
            Sign out: {logoutSuccess? 'Successfully Logged Out' : "Failed"}
        </div>
    );
};

export default SignOutPage;
