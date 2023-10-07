import { FC, useMemo, useState } from "react";
import { useParams } from 'react-router-dom';
//UI
import classes from './GroupGraphCard.module.css';
import ToggleButton from "@components/Buttons/ToggleButton/ToggleButton";
import GraphCardLoader from "@components/GraphCard/GraphCardLoader";
import StackedGraph from "@components/GraphCard/StackedGraph";
import Graph from "@components/GraphCard/Graph";
//logic
import { addDays, startOfMonth, endOfMonth} from 'date-fns'
import { IMonthPickerState } from "@store/UI_store/MonthPickerSlice/MonthPickerInterfaces";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import DateService from "@services/DateService/DateService";
import { subDays, isSameDay } from 'date-fns'
import { useGetGroupExpensesByMemberDailyQuery, useGetGroupExpensesDailyQuery } from "@store/Controllers/GroupsController/GroupsController";


const GroupGraphCard: FC= () => {
    const { groupId } = useParams<{ groupId: string }>();
    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);
    const MonthPickerRange = useMemo(() => {
        return {
            start_date: MonthPickerStore.startDate,
            end_date: MonthPickerStore.endDate
        }
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])

    const { data: GroupExpenses, isFetching: isGroupExpensesFetching, isLoading: isGroupExpensesLoading, isError: isGroupExpensesError, isSuccess: isGroupExpensesSuccess } = useGetGroupExpensesDailyQuery({ group_id: Number(groupId), period: MonthPickerRange });

    const { data: GroupExpensesByMember, isFetching: isGroupExpensesByMemberFetching, isLoading: isGroupExpensesByMemberLoading, isError: isGroupExpensesByMemberError, isSuccess: isGroupExpensesByMemberSuccess } = useGetGroupExpensesByMemberDailyQuery({ group_id: Number(groupId), period: MonthPickerRange });

    const [isToggled, setIsToggled] = useState<boolean>(false);
    
    const RangeTitle = useMemo(() => {
        if (isSameDay(MonthPickerStore.startDate, new Date(2023, 5, 1))
            && isSameDay(MonthPickerStore.endDate, new Date())) {
            return 'All time'
        } else if (isSameDay(startOfMonth(MonthPickerStore.startDate), MonthPickerStore.startDate)
            && isSameDay(endOfMonth(MonthPickerStore.endDate), MonthPickerStore.endDate)) {
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
        <div className={classes.GroupGraph}>
            {isGroupExpensesLoading || isGroupExpensesByMemberLoading ? <GraphCardLoader /> :
                <div className={classes.inner}>
                    <div className={classes.uppernav}>
                        <div className={classes.titleRange}>
                            <h2 className={classes.title}>Statistic</h2>
                            <h3 className={classes.range}> 
                                {RangeTitle}
                            </h3>
                            </div>
                        <div className={classes.button}>
                            <span className={classes.buttonText}>Members</span>
                            <ToggleButton isToggle={isToggled} onToggle={() => setIsToggled(!isToggled)} />
                        </div>
                    </div>
                    <div className={classes.graph}>
                        {!isToggled ?
                            isGroupExpensesSuccess ? <Graph data={GroupExpenses}/> : null
                            :
                            isGroupExpensesByMemberSuccess ? <StackedGraph dataUsers={GroupExpensesByMember}/> : null
                        }
                    </div>
                </div>}
        </div>
    )
}

export default GroupGraphCard