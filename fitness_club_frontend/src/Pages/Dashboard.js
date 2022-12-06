import React, { useContext, useEffect } from 'react';
import { userContext } from '../userContext';



const Dashboard = () => {

    const context = useContext(userContext);
    console.log(context)

    return (
        <div>
            {context.context.username}
            {window.location.href = '/'}
        </div>
    );
};

export default Dashboard;