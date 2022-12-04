import React from 'react';

const loggedOutState = {
    signedIn: false,
    username: "hllloo",
    token: ""
  }


const loggedInState = (username, token) => {
    return {signedIn: true,
    username: username,
    token: token}

}
const userContext = React.createContext(loggedOutState);

export { userContext, loggedOutState, loggedInState };