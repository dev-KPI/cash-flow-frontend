
import React from 'react';
//store
import { categoryExpenses, expenses } from '@pages/Expenses';
//UI
import classes from "./UserChartCard.module.css"
import ChartCard from '@components/ChartCard/ChartCard';

const UserChartCard = () => {
    return (
        <div className={classes.UserChart}>
            <ChartCard data={categoryExpenses} title={'Expenses'} />
        </div>
    );
};

export default UserChartCard;