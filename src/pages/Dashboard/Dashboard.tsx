import React, { ReactNode } from 'react';

//UI
import classes from './Dashboard.module.css'
import MonthPicker from '@components/MonthPicker/MonthPicker';
import Header from '@components/Header/Header';
import OperationCard from '@components/OperationCard/OperationCard';
import UserExpenseCard from '@pages/Dashboard/UserExpenseCard/UserExpenseCard';
import UserExpenseGraphCard from '@pages/Dashboard/UserExpenseGraph/UserExpenseGraphCard';
import AccountCard from './AccountCard/AccountCard';


const Dashboard = () => {

    const getHeader = (): ReactNode => {
        return (window.innerWidth > 400 && window.innerWidth < 320) ? (
            <Header />
            ) : ( 
            <div>Mobile</div>
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
                            <div className={classes.history}></div>
                        </div>
                    </div>
                </div>
            </main>
            <footer style={{paddingBottom: '60px'}}>
            </footer>
        </div>     
    );
};

export default Dashboard;