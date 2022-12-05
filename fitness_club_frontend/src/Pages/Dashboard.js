import React, { useContext } from 'react';
import { userContext } from '../userContext';
import StudiosMapComponent from './components/StudioMapComponent';

const Dashboard = () => {
    const context = useContext(userContext);
    console.log(context)

    return (
        <div>
           <StudiosMapComponent></StudiosMapComponent>
        </div>
    );
};

export default Dashboard;