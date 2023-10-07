import { FC, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
//UI
import classes from './GroupMemberGraphCard.module.css';
import ToggleButton from "@components/Buttons/ToggleButton/ToggleButton";
import GraphCardLoader from "@components/GraphCard/GraphCardLoader";
import StackedGraph from "@components/GraphCard/StackedGraph";
import Graph from "@components/GraphCard/Graph";
//logic
import { addDays, startOfMonth, endOfMonth } from 'date-fns'
import { IMonthPickerState } from "@store/UI_store/MonthPickerSlice/MonthPickerInterfaces";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import DateService from "@services/DateService/DateService";
import { subDays, isSameDay } from 'date-fns'
import { useGetGroupMemberExpensesByCategoryDailyQuery, useGetGroupMemberExpensesDailyQuery } from "@store/Controllers/GroupsController/GroupsController";



const GroupMemberGraphCard: FC = () => {

    const { groupId = 0, memberId = 0} = useParams<{ groupId: string, memberId: string }>();

    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);
    const MonthPickerRange = useMemo(() => {
        return {
            start_date: MonthPickerStore.startDate,
            end_date: MonthPickerStore.endDate
        }
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])
    
    const { data: ExpensesMemberDaily, isLoading: isExpensesMemberDailyLoading, isFetching: isExpensesMemberDailyFetching, isSuccess: isExpensesMemberDailySuccess, isError: isExpensesMemberDailyError} = useGetGroupMemberExpensesDailyQuery({ 
        group_id: Number(groupId) || 0, member_id: Number(memberId) || 0, period: MonthPickerRange }, 
        { skip: groupId === 0 || memberId === 0 });
    const { data: ExpensesMemberByCategoryDaily, isLoading: isExpensesMemberByCategoryDailyLoading, isFetching: isExpensesMemberByCategoryDailyFetching, isSuccess: isExpensesMemberByCategoryDailySuccess, isError: isExpensesMemberByCategoryDailyError} = useGetGroupMemberExpensesByCategoryDailyQuery({ 
        group_id: Number(groupId) || 0, member_id: Number(memberId) || 0, period: MonthPickerRange },
        { skip: groupId === 0 || memberId === 0 });

    const [isToggled, setIsToggled] = useState<boolean>(false);
    
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