import React, {FC, MouseEvent, ReactNode, useCallback, useState} from "react";

//UI
import classes from './UserExpenseGraph.module.css';
import UserExpenseGraph from "./UserExpenseGraph";

//store
import { useGetExpensesPerLastMonthQuery } from "@store/ExpenseApiSlice/ExpenseApiSlice";
import { IMonthPickerState } from "@store/UI_store/MonthPickerSlice/MonthPickerInterfaces";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import UserExpenseGraphLoader from "./UserExpenseGraphLoader";

const UserExpenseGraphCard = () => {
    const [loading = true, setLoading] = useState<boolean>();
    const {data: expenses = [], isError: isExpensesError, isLoading: isExpensesLoading, error: Expenses_GET_error } = useGetExpensesPerLastMonthQuery(null);
    const { currentMonth } = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);
    setTimeout(() => {
        setLoading(false)
    }, 1500);

    const RangeTitle: ReactNode = 
            <h2 className={classes.range}>From {
                new Date(expenses[0]?.time).getDate() + ' ' + currentMonth.slice(0,3)
            } - {
                new Date(expenses[expenses?.length - 1]?.time).getDate() + ' ' + currentMonth.slice(0,3)
            }</h2>;

    return (
        <div className={classes.expenseGraph}>
           {loading ? <UserExpenseGraphLoader/> :
                <div className={classes.inner}>
                    <div className={classes.chart__uppernav}>
                        <div className={classes.chart__titleRange}>
                            <h2 className={classes.title}>Statistic</h2>
                            {RangeTitle}
                        </div>
                    </div>
                    <div className={classes.graph}>
                        <UserExpenseGraph
                            expenses={expenses}
                        />
                    </div>
                </div>
            }
        </div>
    )
}

export default UserExpenseGraphCard