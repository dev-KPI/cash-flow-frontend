import { FC, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
//UI
import classes from './GroupMemberGraphCard.module.css';
import ToggleButton from "@components/Buttons/ToggleButton/ToggleButton";
import GraphCardLoader from "@components/GraphCard/GraphCardLoader";
import StackedGraph from "@components/GraphCard/StackedGraph";
import Graph from "@components/GraphCard/Graph";
//logic
import { addDays } from 'date-fns'
import { IMonthPickerState } from "@store/UI_store/MonthPickerSlice/MonthPickerInterfaces";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import DateService from "@services/DateService/DateService";
import { subDays, isSameDay } from 'date-fns'
import { useGetGroupMemberExpensesByCategoryDailyQuery, useGetGroupMemberExpensesDailyQuery } from "@store/Controllers/GroupsController/GroupsController";



const GroupMemberGraphCard: FC = () => {

    const { groupId = 0, memberId = 0} = useParams<{ groupId: string, memberId: string }>();

    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);
    const MonthPickerRange = useMemo(() => {
        if(MonthPickerStore.type === 'date-range'){
            return {
                period: {
                    start_date: MonthPickerStore.startDate.toISOString().slice(0, 10), end_date: MonthPickerStore.endDate.toISOString().slice(0, 10)
                }
            }
        } else {
            return {
                period: {
                    year_month: `${MonthPickerStore.currentYear}-${DateService.getFormatedMonth(DateService.getMonthIdxByName(MonthPickerStore.currentMonth))}`
                } 
            }
        }
    }, [MonthPickerStore.type, MonthPickerStore.startDate, MonthPickerStore.endDate, MonthPickerStore.currentMonth, MonthPickerStore.currentYear])
    
    const { data: ExpensesMemberDaily, isLoading: isExpensesMemberDailyLoading, isFetching: isExpensesMemberDailyFetching, isSuccess: isExpensesMemberDailySuccess, isError: isExpensesMemberDailyError} = useGetGroupMemberExpensesDailyQuery({ 
        group_id: Number(groupId) || 0, member_id: Number(memberId) || 0, period: MonthPickerRange.period }, 
        { skip: groupId === 0 || memberId === 0 });
    const { data: ExpensesMemberByCategoryDaily, isLoading: isExpensesMemberByCategoryDailyLoading, isFetching: isExpensesMemberByCategoryDailyFetching, isSuccess: isExpensesMemberByCategoryDailySuccess, isError: isExpensesMemberByCategoryDailyError} = useGetGroupMemberExpensesByCategoryDailyQuery({ 
        group_id: Number(groupId) || 0, member_id: Number(memberId) || 0, period: MonthPickerRange.period },
        { skip: groupId === 0 || memberId === 0 });

    const [isToggled, setIsToggled] = useState<boolean>(false);
    
    const RangeTitle = useMemo(() => {
        if(MonthPickerStore.type === 'year-month') {
            return `${MonthPickerStore.currentMonth} ${MonthPickerStore.currentYear}`
        } else {
            if (MonthPickerStore.rangeType === 'month') {
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
            } else {
                return `From ${
                    new Date(new Date(MonthPickerStore.startDate)).getDate() + ' ' + DateService.getMonthNameByIdx(new Date(new Date(MonthPickerStore.startDate)).getMonth()).slice(0, 3)
                } - ${new Date(subDays(new Date(MonthPickerStore.endDate), 1)).getDate() + ' ' + DateService.getMonthNameByIdx(new Date(subDays(new Date(MonthPickerStore.endDate), 1)).getMonth()).slice(0, 3)}`
            }
        }
    }, [MonthPickerStore.rangeType, MonthPickerStore.type, MonthPickerStore.endDate, MonthPickerStore.startDate, MonthPickerStore.currentMonth])

    return (
        <div className={classes.GroupMemberGraph}>
            {isExpensesMemberDailyLoading || isExpensesMemberByCategoryDailyLoading ? <GraphCardLoader /> :
                <div className={classes.inner}>
                    <div className={classes.uppernav}>
                        <div className={classes.titleRange}>
                            <h2 className={classes.title}>Statistic</h2>
                            <h3 className={classes.range}> 
                                {RangeTitle}
                            </h3>
                            </div>
                        <div className={classes.button}>
                            <span className={classes.buttonText}>Categories</span>
                            <ToggleButton isToggle={isToggled} onToggle={() => setIsToggled(!isToggled)} />
                        </div>
                    </div>
                    <div className={classes.graph}>
                        {!isToggled ?
                            isExpensesMemberDailySuccess ? <Graph data={ExpensesMemberDaily} /> : null
                            :
                            isExpensesMemberByCategoryDailySuccess ? <StackedGraph dataUserCategories={ExpensesMemberByCategoryDaily}/> : null
                        }
                    </div>
                </div>}
       </div>
    )
}

export default GroupMemberGraphCard