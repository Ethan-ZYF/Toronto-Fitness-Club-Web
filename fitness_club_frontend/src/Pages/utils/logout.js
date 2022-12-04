import {useContext}from 'react';
import { userContext, loggedOutState } from "../../userContext";

export function logout() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const context = useContext(userContext);
    context.setContext(loggedOutState);
    localStorage.clear();

    window.location.pathname = '/accounts/signin'; // window refresh, back to initial stage
}