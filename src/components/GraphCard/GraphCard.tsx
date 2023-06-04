import React, {FC, MouseEvent, ReactNode, useCallback, useState} from "react";

//UI
import classes from './GraphCard.module.css';
import Graph from "./Graph";

//store
import { useGetExpensesPerLastMonthQuery } from "@store/ExpenseApiSlice/ExpenseApiSlice";
import { IMonthPickerState } from "@store/UI_store/MonthPickerSlice/MonthPickerInterfaces";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import GraphCardLoader from "./GraphCardLoader";

const GraphCard = () => {
    const [loading = true, setLoading] = useState<boolean>();
    const {data: expenses = [], isError: isExpensesError, isLoading: isExpensesLoading, error: Expenses_GET_error } = useGetExpensesPerLastMonthQuery(null);
    const { currentMonth } = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);
    setTimeout(() => {
        setLoading(false)
    }, 1500);

    const RangeTitle: ReactNode = 
            <h3 className={classes.range}>From {
                new Date(expenses[0]?.time).getDate() + ' ' + currentMonth.slice(0,3)
            } - {
                new Date(expenses[expenses?.length - 1]?.time).getDate() + ' ' + currentMonth.slice(0,3)
            }</h3>;

    return (
            loading ? <GraphCardLoader/> :
            <div className={classes.inner}>
                <div className={classes.chart__uppernav}>
                    <div className={classes.chart__titleRange}>
                        <h2 className={classes.title}>Statistic</h2>
                        {RangeTitle}
                    </div>
                </div>
                <div className={classes.graph}>
                    <Graph
                        expenses={expenses}
                    />
                </div>
            </div>
    )
}

export default GraphCard