
import React from 'react';
//store
import { useGetCategoryExpensesQuery } from '@store/UserCategoryExpenseApiSlice/UserCategoryExpenseApiSlice';
//UI
import classes from "./UserChartCard.module.css"
import ChartCard from '@components/ChartCard/ChartCard';

const UserChartCard = () => {
    const { data: expenses = [], error: expensesGetError, isError: isExpensesError, isLoading: isExpensesLoading } = useGetCategoryExpensesQuery(null);

    return (
        <div className={classes.UserChart}>
                <ChartCard data={expenses} title={'Expenses'} />
        </div>
    );
};

export default UserChartCard;