import React, {FC, MouseEvent, ReactNode, useCallback} from "react";

//UI
import UserExpenseGraph from "./UserExpenseGraph";
//store
import { useGetExpensesPerLastMonthQuery } from "@store/ExpenseApiSlice/ExpenseApiSlice";

const UserExpenseGraphCard = () => {
    const {data: expenses = [], isError: isLoadingError, isLoading: isLoadingExpense, error: Expense_GET_error } = useGetExpensesPerLastMonthQuery(null);

return <>
        <div className="">
            <UserExpenseGraph
            expenses={expenses}
            />
        </div>
    </>
}

export default UserExpenseGraphCard