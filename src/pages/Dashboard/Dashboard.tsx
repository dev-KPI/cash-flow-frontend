import React, { ReactNode, useCallback, useEffect, useState } from 'react';

//logic
import { useGetCategoryExpensesQuery, useGetCategoryExpensesTotalQuery } from '@store/UserCategoryExpenseApiSlice/UserCategoryExpenseApiSlice';

//UI
import classes from './Dashboard.module.css'                                        //global components
import MonthPicker from '@components/MonthPicker/MonthPicker';
import OperationCard from '@components/OperationCard/OperationCard';

//local components
import UserGraphCard from '@pages/Dashboard/UserGraphCard/UserGraphCard';
import UserAccountCard from '@pages/Dashboard/UserAccountCard/UserAccountCard';
import UserHistoryCard from '@pages/Dashboard/UserHistoryCard/UserHistoryCard';
import UserCategoriesCard from '@pages/Dashboard/UserCategoriesCard/UserCategoriesCard';
import UserGroupsCard from '@pages/Dashboard/UserGroupsCard/UserGroupsCard';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import UserChartCard from './UserChartCard/UserChartCard';


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
                    <UserAccountCard />
                    <UserGraphCard />
                    <UserHistoryCard />
                </div>
            </div>
        </main>
        <Footer/>
    </>);
};

export default Dashboard;