import React, { ReactNode, useCallback, useEffect, useState } from 'react';

//logic
import {useCookies} from 'react-cookie'
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

    const sdfijsf = async() => {
        try{
            const resp = await fetch('https://api.cash-money.store/users/groups', {
                credentials: 'include'
            })
            console.log(resp)
            console.log(resp.json())
        } catch (err){
            throw err
        }
    }

    return (<>
        <main id='DashboardPage'>
            <div className='dashboard__container'>
                <div className={classes.header}>
                    <button onClick={sdfijsf}>ofosdfksdf</button>
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
    </>);
};

export default Dashboard;