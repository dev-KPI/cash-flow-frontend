import React from 'react';
import Header from '../../components/Header/Header';

import MonthPicker from '../../components/MonthPicker/MonthPicker';
import MenuBurger from '../../components/MenuBurger/MenuBurger';
import classes from './Dashboard.module.css'
import OperationCard from '../../components/OperationCard/OperationCard';

const Dashboard = () => {
    return (
        <div>
            <Header />
            <div className='dashboard__container'>
                <div className={classes.header}>
                    <h1 className={`${classes.title} pageTitle`}>Dashboard</h1>
                    <MonthPicker />
                </div>
                <div style={{marginTop:30, display: 'flex', gap:30}}>
                    <OperationCard operation={'Income'} />
                    <OperationCard operation={'Expenses'} />
                </div>
                <MenuBurger/>
            </div>
        </div>     
    );
};

export default Dashboard;