import React from 'react';

//UI
import classes from './Dashboard.module.css'
import MonthPicker from '@components/MonthPicker/MonthPicker';
import Header from '@components/Header/Header';
import OperationCard from '@pages/Dashboard/OperationCard/OperationCard';
import UserExpenseCard from '@pages/Dashboard/UserExpenseCard/UserExpenseCard';
import UserExpenseGraphCard from '@pages/Dashboard/UserExpenseGraph/UserExpenseGraphCard';
import AccountCard from '@pages/Dashboard/AccountCard/AccountCard';


const Dashboard = () => {

    return (
        <div>
            <Header />
            <main>
                <div className='dashboard__container'>
                    <section className={classes.header}>
                        <h1 className={`${classes.title} pageTitle`}>Dashboard</h1>
                        <MonthPicker />
                    </section>
                    <section className={classes.mainside}>
                        <div className={classes.left}>
                            <div className={classes.Operation__buttons}>
                                <div className={classes.first}>
                                    <OperationCard operation={'Income'} />
                                </div>
                                <div className={classes.second}>
                                    <OperationCard operation={'Expenses'} />
                                </div>
                            </div>
                            <div className={classes.third}>
                                <div className={classes.categories}></div>
                            </div>
                        </div>
                        <div className={classes.right}>
                            <div className={classes.fourth}>
                                <UserExpenseCard />
                            </div>
                            <div className={classes.fifth}>
                                <div className={classes.groups}></div>
                            </div>
                        </div>
                        <div className={classes.sixth}>
                            <AccountCard/>
                        </div>
                        <div className={classes.seventh}>
                            <UserExpenseGraphCard/>
                        </div> 
                        <div className={classes.eighth}>
                            <div className={classes.history}></div>
                        </div>
                    </section>
                </div>
            </main>
            <footer style={{paddingBottom: '60px'}}>
            </footer>
        </div>     
    );
};

export default Dashboard;