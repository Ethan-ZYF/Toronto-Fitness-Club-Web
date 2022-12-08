import React, { useContext, useEffect } from 'react';
import { userContext } from '../userContext';
import { getCurrPlan } from '../api';


const Dashboard = () => {
    const context = useContext(userContext);
    console.log(context)

    useEffect(() => {
        if (localStorage.getItem('user') === null) return;
        getCurrPlan()
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('plan', response.data.id);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, []);

    return (
        <div>
            test
        </div>
    );
};

export default Dashboard;