import React from 'react';
import Header from '../../components/Header/Header';

import MonthPicker from '../../components/MonthPicker/MonthPicker';
import MenuBurger from '../../components/MenuBurger/MenuBurger';
import classes from './Dashboard.module.css'

const Dashboard = () => {
    return (
        <div>
            <Header />
            <div className='dashboard__container'>
                <div className={classes.header}>
                    <h1 className={`${classes.title} pageTitle`}>Dashboard</h1>
                    <MonthPicker />
                </div>
                <MenuBurger/>
            </div>
        </div>     
    );
};

export default Dashboard;