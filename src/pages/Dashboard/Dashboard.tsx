import React from 'react';

//UI
import classes from './Dashboard.module.css'
import MonthPicker from '@components/MonthPicker/MonthPicker';
import Header from '@components/Header/Header';
import OperationCard from '@components/OperationCard/OperationCard';
import UserExpenseGraphCard from '@components/UserExpenseGraph/UserExpenseGraphCard';

const Dashboard = () => {

    return (
        <div>
            <Header />
            <main>
                <div className='dashboard__container'>
                    <div className={classes.header}>
                        <h1 className={`${classes.title} pageTitle`}>Dashboard</h1>
                        <MonthPicker />
                    </div>
                    <div style={{marginTop:30, display: 'flex', gap:30}}>
                        <OperationCard operation={'Income'} />
                        <OperationCard operation={'Expenses'} />
                    </div>
                    <UserExpenseGraphCard/>
                </div>
            </main>
            <footer style={{paddingBottom: '60px'}}>
            </footer>
        </div>     
    );
};

export default Dashboard;