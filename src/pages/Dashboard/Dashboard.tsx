import React, { ReactNode, useCallback, useEffect, useState } from 'react';

//UI
import classes from './Dashboard.module.css'
import Header from '@components/Header/Header';                                            //global components
import MonthPicker from '@components/MonthPicker/MonthPicker';
import OperationCard from '@components/OperationCard/OperationCard';
import UserExpenseCard from '@pages/Dashboard/UserExpenseCard/UserExpenseCard';            //local components
import UserExpenseGraphCard from '@pages/Dashboard/UserExpenseGraph/UserExpenseGraphCard'; 
import AccountCard from '@pages/Dashboard/AccountCard/AccountCard';
import HistoryCard from '@pages/Dashboard/HistoryCard/HistoryCard';


const Dashboard = () => {  

    return (
        <div>
            <Header/>
            <main id='DashboardPage'>
                <div className='dashboard__container'>
                    <div className={classes.header}>
                        <h1 className={`${classes.title} pageTitle`}>Dashboard</h1>
                        <MonthPicker />
                    </div>
                    <div className={classes.grid}>
                        <div className={classes.first__item}>
                            <div className={classes.OperationCards}>
                                <OperationCard operation={'Income'} />
                                <OperationCard operation={'Expenses'} />
                            </div>
                            <div className={classes.categories}></div>
                        </div>
                        <div className={classes.second__item}>
                            <UserExpenseCard />
                            <div className={classes.groups}></div>
                        </div>
                        <div className={classes.third__item}>
                            <AccountCard/>                        
                        </div>
                        <div className={classes.fourth__item}>
                            {/* <UserExpenseGraphCard/> */}
                        </div>
                        <div className={classes.fifth__item}>
                            <HistoryCard/>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
            </footer>
        </div>     
    );
};

export default Dashboard;