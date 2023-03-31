import React, { ReactNode } from 'react';

//UI
import classes from './Dashboard.module.css'
import MonthPicker from '@components/MonthPicker/MonthPicker';
import Header from '@components/Header/Header';
import OperationCard from '@pages/Dashboard/OperationCard/OperationCard';
import UserExpenseCard from '@pages/Dashboard/UserExpenseCard/UserExpenseCard';
import UserExpenseGraphCard from '@pages/Dashboard/UserExpenseGraph/UserExpenseGraphCard';


const Dashboard = () => {

    const getHeader = (): ReactNode => {
        return (window.innerWidth > 400 && window.innerWidth > 320) ? (
        <div>Mobile</div>
        ) : ( 
            <Header />
        )
    }

    return (
        <div>
            {getHeader()}
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
                    <div className={classes.outerSide}>
                        <UserExpenseGraphCard/>
                    </div>
                </div>
            </main>
            <footer style={{paddingBottom: '60px'}}>
            </footer>
        </div>     
    );
};

export default Dashboard;