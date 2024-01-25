import {  useMemo } from 'react';

import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
import { isSameDay, startOfMonth, endOfMonth } from 'date-fns';
//UI
import classes from './UserGraphCard.module.css'
import GraphCardLoader from '@components/GraphCard/GraphCardLoader';
import Graph from '@components/GraphCard/Graph';
import { useGetCurrentUserExpensesDailyQuery } from '@store/Controllers/UserController/UserController';


const UserGraphCard = () => {

    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);
    const MonthPickerRange = useMemo(() => {
        return {
            start_date: MonthPickerStore.startDate,
            end_date: MonthPickerStore.endDate
        }
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])
    const {data: userDailyExpenses, isFetching: isUserDailyExpensesFetching, isLoading: isUserDailyExpensesLoading, isError: isUserDailyExpensesError, isSuccess: isUserDailyExpensesSuccess, refetch} = useGetCurrentUserExpensesDailyQuery(MonthPickerRange);

    const RangeTitle = useMemo(() => {
        if (DateService.isAllTime(MonthPickerStore.startDate, MonthPickerStore.endDate)) {
            return 'All time'
        } else if (DateService.isMonth(MonthPickerStore.startDate, MonthPickerStore.endDate)) {
            return `${DateService.getMonthNameByIdx(MonthPickerStore.startDate.getMonth())} ${MonthPickerStore.startDate.getFullYear()}`
        } else if (isSameDay(MonthPickerStore.startDate, MonthPickerStore.endDate)) {
            return `${MonthPickerStore.startDate.getDate()} ${DateService.getMonthNameByIdx(MonthPickerStore.startDate.getMonth())} 
            ${MonthPickerStore.startDate.getFullYear()}`
        }
        else {
            return (`${DateService.getFormattedRangeTitle(MonthPickerStore.startDate)} - ${DateService.getFormattedRangeTitle(MonthPickerStore.endDate)}`)
        }
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])

    return (
        <div className={classes.UserGraph}>
            {
                useMemo(() => {
                    return (isUserDailyExpensesLoading ? <GraphCardLoader /> :
                    <div className={classes.inner}>
                        <div className={classes.uppernav}>
                            <div className={classes.titleRange}>
                                <h2 className={classes.title}>Statistic</h2>
                                <h3 className={classes.range}> 
                                {RangeTitle}
                                </h3>
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