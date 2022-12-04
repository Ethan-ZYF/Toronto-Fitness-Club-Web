// import {useContext}from 'react';
// import { userContext, loggedOutState } from "../../userContext";
// import { logoutrequest } from '../../api';

// export function logout() {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const context = useContext(userContext);
//     context.setContext(loggedOutState);
//     localStorage.clear();
//     logoutrequest().then((response) => {
//         return response;
//     }).catch((error) => {
//         return error;
        
//     })
//     window.location.pathname = '/accounts/signout'; // window refresh, back to initial stage
// }