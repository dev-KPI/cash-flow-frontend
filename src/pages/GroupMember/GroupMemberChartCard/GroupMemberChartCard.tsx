
import React from 'react';
//store
import { categoryExpenses } from '@pages/Expenses';
//UI
import classes from "./GroupMemberChartCard.module.css"
import ChartCard from '@components/ChartCard/ChartCard';

const GroupMemberChartCard = () => {

    return (
        <div className={classes.Chart}>
                {/* <ChartCard data={categoryExpenses} title={'Expenses'} /> */}
        </div>
    );
};

export default GroupMemberChartCard;