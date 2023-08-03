import React, { ReactNode, useCallback, useEffect, useState } from 'react';

//UI
import classes from './Dashboard.module.css'                                     
import MonthPicker from '@components/MonthPicker/MonthPicker';
import OperationCard from '@components/OperationCard/OperationCard';
//local components
import UserGraphCard from '@pages/Dashboard/UserGraphCard/UserGraphCard';
import UserAccountCard from '@pages/Dashboard/UserAccountCard/UserAccountCard';
import UserHistoryCard from '@pages/Dashboard/UserHistoryCard/UserHistoryCard';
import UserCategoriesCard from '@pages/Dashboard/UserCategoriesCard/UserCategoriesCard';
import UserGroupsCard from '@pages/Dashboard/UserGroupsCard/UserGroupsCard';
import UserChartCard from './UserChartCard/UserChartCard';

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
                        <UserChartCard/>
                        <UserGroupsCard />
                    </div>
                    <UserAccountCard/>
                    <UserGraphCard />
                    <UserHistoryCard />
                </div>
            </div>
        </main>
    </>);
};

export default Dashboard;