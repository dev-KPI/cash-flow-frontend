import React, {FC, MouseEvent, ReactNode, useCallback} from "react";

//UI
import classes from './UserExpenseGraph.module.css';
import UserExpenseGraph from "./UserExpenseGraph";
import UserExpenseGraphPreloader from "./UserExpenseGraphPreloader";

//store
import { useGetExpensesPerLastMonthQuery } from "@store/ExpenseApiSlice/ExpenseApiSlice";
import { IMonthPickerState } from "@store/UI_store/MonthPickerSlice/MonthPickerInterfaces";
import { useAppSelector } from "@hooks/useAppStore";

const UserExpenseGraphCard = () => {
    const {data: expenses = [], isError: isExpensesError, isLoading: isExpensesLoading, error: Expenses_GET_error } = useGetExpensesPerLastMonthQuery(null);

    const { currentMonth } = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);

    const RangeTitle: ReactNode = 
            <h2 className={classes.range}>From {
                new Date(expenses[0]?.time).getDate() + ' ' + currentMonth.slice(0,3)
            } - {
                new Date(expenses[expenses?.length - 1]?.time).getDate() + ' ' + currentMonth.slice(0,3)
            }</h2>;

    return <>
        <div className={classes.expenseChart__wrapper}>
            <div className={classes.chart__uppernav}>
                <div className={classes.chart__titleRange}>
                    <h2 className={classes.title}>Statistic</h2>
                    {RangeTitle}
                </div>
            </div>
            <div className={classes.graph}>
                <UserExpenseGraph
                expenses={expenses}
                isExpensesLoading={isExpensesLoading}
                />
            </div>
        </div>
    </>
}

export default UserExpenseGraphCard