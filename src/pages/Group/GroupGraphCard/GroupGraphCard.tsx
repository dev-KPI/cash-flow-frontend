import { FC, useMemo, useState } from "react";
import { useParams } from 'react-router-dom';
//UI
import classes from './GroupGraphCard.module.css';
import ToggleButton from "@components/Buttons/ToggleButton/ToggleButton";
import GraphCardLoader from "@components/GraphCard/GraphCardLoader";
import StackedGraph from "@components/GraphCard/StackedGraph";
import Graph from "@components/GraphCard/Graph";
//logic
import {addDays} from 'date-fns'
import { IMonthPickerState } from "@store/UI_store/MonthPickerSlice/MonthPickerInterfaces";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import DateService from "@services/DateService/DateService";
import { subDays, isSameDay } from 'date-fns'
import { useGetGroupExpensesByMemberDailyQuery, useGetGroupExpensesDailyQuery } from "@store/Controllers/GroupsController/GroupsController";


const GroupGraphCard: FC= () => {
    const { groupId } = useParams<{ groupId: string }>();
    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);
    const MonthPickerRange = useMemo(() => {
        if (MonthPickerStore.type === 'date-range') {
            return {
                period: {
                    start_date: new Date(MonthPickerStore.startDate).toISOString().slice(0, 10),
                    end_date: new Date(MonthPickerStore.endDate).toISOString().slice(0, 10)
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

    const { data: GroupExpenses, isFetching: isGroupExpensesFetching, isLoading: isGroupExpensesLoading, isError: isGroupExpensesError, isSuccess: isGroupExpensesSuccess } = useGetGroupExpensesDailyQuery({ group_id: Number(groupId), period: MonthPickerRange.period });

    const { data: GroupExpensesByMember, isFetching: isGroupExpensesByMemberFetching, isLoading: isGroupExpensesByMemberLoading, isError: isGroupExpensesByMemberError, isSuccess: isGroupExpensesByMemberSuccess } = useGetGroupExpensesByMemberDailyQuery({ group_id: Number(groupId), period: MonthPickerRange.period });

    const [isToggled, setIsToggled] = useState<boolean>(false);
    
    const RangeTitle = useMemo(() => {
        if (MonthPickerStore.rangeType === 'month') {
            return `${MonthPickerStore.currentMonth} ${MonthPickerStore.currentYear}`
        }
        else if (MonthPickerStore.type === 'year-month') {
            return `${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} 
            ${new Date(MonthPickerStore.startDate).getFullYear()}`

        }
        else if (MonthPickerStore.rangeType === 'today' || MonthPickerStore.rangeType === 'yesterday' ||
            isSameDay(new Date(MonthPickerStore.startDate), subDays(new Date(MonthPickerStore.endDate), 1))) {
            return `${new Date(MonthPickerStore.startDate).getDate()} 
            ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} 
            ${new Date(MonthPickerStore.startDate).getFullYear()}`
        } else if (MonthPickerStore.rangeType === 'alltime') {
            return 'All time'
        } else {
            return `From ${new Date(new Date(MonthPickerStore.startDate)).getDate() + ' ' + DateService.getMonthNameByIdx(new Date(new Date(MonthPickerStore.startDate)).getMonth()).slice(0, 3)
                } - ${new Date(subDays(new Date(MonthPickerStore.endDate), 1)).getDate() + ' ' + DateService.getMonthNameByIdx(new Date(subDays(new Date(MonthPickerStore.endDate), 1)).getMonth()).slice(0, 3)}`
        }
    }, [MonthPickerStore.currentMonth, MonthPickerStore.rangeType, MonthPickerStore.type, MonthPickerStore.startDate, MonthPickerStore.endDate])

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