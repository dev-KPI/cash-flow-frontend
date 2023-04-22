import React, { ReactNode, useCallback, useEffect, useState } from 'react';

//UI
import classes from './Dashboard.module.css'                                        //global components
import MonthPicker from '@components/MonthPicker/MonthPicker';
import OperationCard from '@components/OperationCard/OperationCard';

import UserExpenseCard from '@pages/Dashboard/UserExpenseCard/UserExpenseCard';            //local components
import UserExpenseGraphCard from '@pages/Dashboard/UserExpenseGraph/UserExpenseGraphCard';
import UserAccountCard from '@pages/Dashboard/UserAccountCard/UserAccountCard';
import UserHistoryCard from '@pages/Dashboard/UserHistoryCard/UserHistoryCard';
import UserCategoriesCard from '@pages/Dashboard/UserCategoriesCard/UserCategoriesCard';
import UserGroupsCard from '@pages/Dashboard/UserGroupsCard/UserGroupsCard';


const Dashboard = () => {

    return (<>
        <main id='DashboardPage'>
            <div className='dashboard__container'>
                <div className={classes.header}>
                    <h1 className={`${classes.title} pageTitle`}>Dashboard</h1>
                    <MonthPicker />
                </div>
                <div className={classes.grid}>
                    <div className={classes.grid__topleft}>
                        <div className={classes.grid__operation}>
                            <OperationCard operation={'Income'} />
                            <OperationCard operation={'Expenses'} />
                        </div>
                        <UserCategoriesCard />
                    </div>
                    <div className={classes.grid__topright}>
                        <UserExpenseCard />
                        <UserGroupsCard />
                    </div>
                    <UserAccountCard />
                    <UserExpenseGraphCard />
                    <UserHistoryCard />
                </div>
            </div>
        </main>
    </>);
};

export default Dashboard;