
import React from 'react';
//store
import { useGetCategoryExpensesQuery } from '@store/UserCategoryExpenseApiSlice/UserCategoryExpenseApiSlice';
//UI
import classes from "./GroupMemberChartCard.module.css"
import ChartCard from '@components/ChartCard/ChartCard';

const GroupMemberChartCard = () => {
    const { data: expenses = [], error: expensesGetError, isError: isExpensesError, isLoading: isExpensesLoading } = useGetCategoryExpensesQuery(null);

    return (
        <div className={classes.Chart}>
                <ChartCard data={expenses} title={'Expenses'} />
        </div>
    );
};

export default GroupMemberChartCard;