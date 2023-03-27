import React, {FC, MouseEvent, ReactNode, useCallback} from "react";

//UI
import UserExpenseGraph from "./UserExpenseGraph";
//store
import { useGetExpensesPerLastMonthQuery } from "@store/ExpenseApiSlice/ExpenseApiSlice";
import UserExpenseGraphPreloader from "./UserExpenseGraphPreloader";

//UI
import classes from './UserExpenseGraph.module.css';

const UserExpenseGraphCard = () => {
    const {data: expenses = [], isError: isExpensesError, isLoading: isExpensesLoading, error: Expenses_GET_error } = useGetExpensesPerLastMonthQuery(null);

return <>
        <div className={classes.graph}>
            <UserExpenseGraph
            expenses={expenses}
            isExpensesLoading={isExpensesLoading}
            />
        </div>
    </>
}

export default UserExpenseGraphCard