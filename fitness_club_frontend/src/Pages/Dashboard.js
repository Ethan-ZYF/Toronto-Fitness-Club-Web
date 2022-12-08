import React, { useContext, useEffect } from 'react';
import { userContext } from '../userContext';
import { getCurrPlan } from '../api';

const Dashboard = () => {
    const context = useContext(userContext);
    console.log(context)

    useEffect(() => {
        if (localStorage.getItem('user') === null) {
            localStorage.clear();
            return;
        }
        getCurrPlan()
            .then((response) => {
                if (response.data['detail'] === "You are not subscribed.") {
                    localStorage.removeItem('plan');
                    return;
                }
                localStorage.setItem('plan', response.data.id);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, []);

    return (
        <div>
            {window.location.href = '/studios'}
        </div>
    );
};

export default Dashboard;