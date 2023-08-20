import { useEffect, useState } from 'react';
//logic
import DateService from '@services/DateService/DateService';
//store
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { useGetUserExpensesByCategoryQuery } from '@store/Controllers/UserController/UserController';
//UI
import classes from "./UserChartCard.module.css"
import ChartCard from '@components/ChartCard/ChartCard';
import ChartCardLoader from '@components/ChartCard/ChartCardLoader';


const UserChartCard = () => {
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const { data: ExpensesByCategory, isLoading: isExpensesLoading, isError: isExpensesError, isSuccess: isExpensesSuccess } = useGetUserExpensesByCategoryQuery({
        period: {
            year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth)
        }
    })

    return (
        <div className={classes.UserChart}>
            {isExpensesLoading ? <ChartCardLoader /> :
                <ChartCard data={ExpensesByCategory || []} title={'Expenses'} />
            }
        </div>
    );
};

export default UserChartCard;