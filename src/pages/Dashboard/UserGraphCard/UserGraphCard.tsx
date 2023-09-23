import {  useMemo } from 'react';

import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
import {addDays, subDays, isSameDay} from 'date-fns'
//UI
import classes from './UserGraphCard.module.css'
import GraphCardLoader from '@components/GraphCard/GraphCardLoader';
import Graph from '@components/GraphCard/Graph';
import { useGetCurrentUserExpensesDailyQuery } from '@store/Controllers/UserController/UserController';


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

    const RangeTitle = useMemo(() => {
        if (MonthPickerStore.rangeType === 'month') {
            return `${MonthPickerStore.currentMonth} ${MonthPickerStore.currentYear}`
        }
        else if (MonthPickerStore.type === 'year-month') {
            return `${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} 
            ${new Date(MonthPickerStore.startDate).getFullYear()}`
           
        } 
        else if(MonthPickerStore.rangeType === 'today' || MonthPickerStore.rangeType === 'yesterday' || 
            isSameDay(new Date(MonthPickerStore.startDate), subDays(new Date(MonthPickerStore.endDate), 1))){
            return `${new Date(MonthPickerStore.startDate).getDate()} 
            ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} 
            ${new Date(MonthPickerStore.startDate).getFullYear()}`
        } else if (MonthPickerStore.rangeType === 'alltime'){
            return 'All time'
        }  else {
            return `From ${
                new Date(new Date(MonthPickerStore.startDate)).getDate() + ' ' + DateService.getMonthNameByIdx(new Date(new Date(MonthPickerStore.startDate)).getMonth()).slice(0, 3)
            } - ${new Date(subDays(new Date(MonthPickerStore.endDate), 1)).getDate() + ' ' + DateService.getMonthNameByIdx(new Date(subDays(new Date(MonthPickerStore.endDate), 1)).getMonth()).slice(0, 3)}`
        }
    }, [MonthPickerStore.currentMonth, MonthPickerStore.rangeType, MonthPickerStore.type, MonthPickerStore.startDate, MonthPickerStore.endDate])

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