import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import { useGetCurrentUserExpensesDailyQuery } from '@store/Controllers/ExpensesController/ExpensesController';
import DateService from '@services/DateService/DateService';
import {addDays} from 'date-fns'
//UI
import classes from './UserGraphCard.module.css'
import GraphCardLoader from '@components/GraphCard/GraphCardLoader';
import Graph from '@components/GraphCard/Graph';


const UserGraphCard = () => {

    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);
    const MonthPickerRange = useMemo(() => {
        if(MonthPickerStore.type === 'date-range'){
            return {
                period: {
                    start_date: new Date(MonthPickerStore.startDate).toISOString().slice(0,10),
                    end_date: new Date(MonthPickerStore.endDate).toISOString().slice(0,10)
                }
            }
        } else {
            return {
                period: {
                    year_month: `${MonthPickerStore.currentYear}-${DateService.getFormatedMonth(DateService.getMonthIdxByName(MonthPickerStore.currentMonth))}`} 
            }
        }
    }, [MonthPickerStore.type, MonthPickerStore.startDate, MonthPickerStore.endDate, MonthPickerStore.currentMonth, MonthPickerStore.currentYear])
    const {data: userDailyExpenses, isFetching: isUserDailyExpensesFetching, isLoading: isUserDailyExpensesLoading, isError: isUserDailyExpensesError, isSuccess: isUserDailyExpensesSuccess, refetch} = useGetCurrentUserExpensesDailyQuery(MonthPickerRange);

    const RangeTitle = (startDate: string, endDate: string) => {
        return (<h3 className={classes.range}>From {
            new Date(startDate).getDate() + ' ' + MonthPickerStore.currentMonth.slice(0, 3)
        } - {new Date(endDate).getDate() + ' ' + MonthPickerStore.currentMonth.slice(0, 3)}
        </h3>);
    }


    return (
        <div className={classes.UserGraph}>
            {
                useMemo(() => {
                    return (isUserDailyExpensesLoading ? <GraphCardLoader /> :
                    <div className={classes.inner}>
                        <div className={classes.uppernav}>
                            <div className={classes.titleRange}>
                                <h2 className={classes.title}>Statistic</h2>
                                {isUserDailyExpensesSuccess && userDailyExpenses && userDailyExpenses[0]?.date  
                                ? RangeTitle(userDailyExpenses[0].date, userDailyExpenses[userDailyExpenses.length - 1].date) : ''}
                            </div>
                        </div>
                        <div className={classes.graph}>
                            {isUserDailyExpensesSuccess && userDailyExpenses && <Graph data={userDailyExpenses} /> }
                        </div>
                    </div>)
                }, [isUserDailyExpensesSuccess, userDailyExpenses, isUserDailyExpensesLoading])
            }
       </div>
    )
};

export default UserGraphCard;