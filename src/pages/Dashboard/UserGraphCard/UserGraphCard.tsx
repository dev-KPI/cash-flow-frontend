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
            period: {
                start_date: new Date(MonthPickerStore.startDate),
                end_date: new Date(MonthPickerStore.endDate)
            }
        }
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])
    const {data: userDailyExpenses, isFetching: isUserDailyExpensesFetching, isLoading: isUserDailyExpensesLoading, isError: isUserDailyExpensesError, isSuccess: isUserDailyExpensesSuccess, refetch} = useGetCurrentUserExpensesDailyQuery(MonthPickerRange);

    const getStartDateForTitle = useMemo(() => {
        return `${new Date(MonthPickerStore.startDate).getDate()} ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth()).slice(0, 3)} ${new Date(MonthPickerStore.startDate).getFullYear()}`
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])
    const getEndDateForTitle = useMemo(() => {
        return `${new Date(MonthPickerStore.endDate).getDate()} ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.endDate).getMonth()).slice(0, 3)} ${new Date(MonthPickerStore.endDate).getFullYear()}`
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])

    const RangeTitle = useMemo(() => {
        if (isSameDay(new Date(MonthPickerStore.startDate), new Date(2023, 5, 1)) && isSameDay(new Date(MonthPickerStore.endDate), new Date())) {
            return 'All time'
        } else if (isSameDay(startOfMonth(new Date(MonthPickerStore.startDate)), new Date(MonthPickerStore.startDate)) &&
            isSameDay(endOfMonth(new Date(MonthPickerStore.endDate)), new Date(MonthPickerStore.endDate))) {
            return `${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} ${new Date(MonthPickerStore.startDate).getFullYear()}`
        } else if (isSameDay(new Date(MonthPickerStore.startDate), new Date(MonthPickerStore.endDate))) {
            return `${new Date(MonthPickerStore.startDate).getDate()} ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} 
            ${new Date(MonthPickerStore.startDate).getFullYear()}`
        }
        else {
            return (`${getStartDateForTitle} - ${getEndDateForTitle}`)
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