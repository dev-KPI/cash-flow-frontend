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
import UserCategoriesCard from '@pages/Dashboard/UserCategoriesCard/UserCategoriesCard';
import UserGroupsCard from '@pages/Dashboard/UserGroupsCard/UserGroupsCard';


const Dashboard = () => {  

    return (<>
            <Header/>
            <main id='DashboardPage'>
                <div className='dashboard__container'>
                    <div className={classes.header}>
                        <h1 className={`${classes.title} pageTitle`}>Dashboard</h1>
                        <MonthPicker />
                    </div>
                    <div className={classes.grid}>
                        <div className={classes.grid__inner}>
                            <OperationCard operation={'Income'} />
                            <OperationCard operation={'Expenses'} />
                            <UserExpenseCard />
                            <UserCategoriesCard/>
                            <UserGroupsCard />
                        </div>
                        <AccountCard/>                        
                        <UserExpenseGraphCard/>
                        <HistoryCard/>
                    </div>
                </div>
            </main>
            <footer>
            </footer>
        </>);
};

export default Dashboard;