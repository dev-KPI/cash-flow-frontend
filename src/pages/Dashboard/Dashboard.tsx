import React from 'react';

//UI
import classes from './Dashboard.module.css'
import MonthPicker from '@components/MonthPicker/MonthPicker';
import Header from '@components/Header/Header';
import OperationCard from '@pages/Dashboard/OperationCard/OperationCard';
import UserExpenseCard from '@pages/Dashboard/UserExpenseCard/UserExpenseCard';
import UserExpenseGraphCard from '@pages/Dashboard/UserExpenseGraph/UserExpenseGraphCard';

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
                    <div className={classes.DashboardPage}>
                        <OperationCard operation={'Income'} />
                        <OperationCard operation={'Expenses'} />
                        <UserExpenseCard />
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