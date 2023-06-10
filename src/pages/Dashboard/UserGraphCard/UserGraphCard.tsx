import React, { useState } from 'react';

import { useGetExpensesPerLastMonthQuery } from '@store/ExpenseApiSlice/ExpenseApiSlice';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';

//UI
import classes from './UserGraphCard.module.css'
import GraphCardLoader from '@components/GraphCard/GraphCardLoader';
import Graph from '@components/GraphCard/Graph';


const UserGraphCard = () => {

    const [loading = true, setLoading] = useState<boolean>();
    const { data: expenses = [], isError: isExpensesError, isLoading: isExpensesLoading, error: Expenses_GET_error } = useGetExpensesPerLastMonthQuery(null);
    const { currentMonth } = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);
    setTimeout(() => {
        setLoading(false)
    }, 1500);

    const RangeTitle = (startDate: string, endDate: string) => {
        return (<h3 className={classes.range}>From
            {new Date(startDate).getDate() + ' ' + currentMonth.slice(0, 3)}
            -
            {new Date(endDate).getDate() + ' ' + currentMonth.slice(0, 3)}
        </h3>);
    }

    return (
        <div className={classes.UserGraph}>
            {loading ? <GraphCardLoader /> :
                <div className={classes.inner}>
                    <div className={classes.uppernav}>
                        <div className={classes.titleRange}>
                            <h2 className={classes.title}>Statistic</h2>
                            {RangeTitle(expenses[0].time, expenses[expenses.length - 1].time)}
                        </div>
                    </div>
                    <div className={classes.graph}>
                        <Graph data={expenses} />
                    </div>
                </div>}
       </div>
    )
};

export default UserGraphCard;