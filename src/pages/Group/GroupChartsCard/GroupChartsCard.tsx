import { FC } from 'react';
//logic
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
import { useGetGroupExpensesByCategoryQuery } from '@store/Controllers/GroupsController/GroupsController';
import { useGetCurrentGroupSpendersQuery } from '@store/Controllers/ExpensesController/ExpensesController';
//UI
import classes from './GroupChartsCard.module.css';
import ChartCard from '@components/ChartCard/ChartCard';
import ChartCardLoader from '@components/ChartCard/ChartCardLoader';


const GroupChartsCard:FC<{groupId:number}> = ({groupId}) => {
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const { data: GroupExpensesByCategory, isLoading: isExpensesByCategoryLoading } = useGetGroupExpensesByCategoryQuery({
        group_id: groupId,
        period: MonthPickerStore.type === 'year-month' ?
            { year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth) } :
            { start_date: MonthPickerStore.startDate.slice(0, 10), end_date: MonthPickerStore.endDate.slice(0, 10) }
    })
    const { data: GroupExpensesByMember, isLoading: isExpensesByMemberLoading } = useGetCurrentGroupSpendersQuery({
        group_id: groupId,
        period: MonthPickerStore.type === 'year-month' ?
            { year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth) } :
            { start_date: MonthPickerStore.startDate.slice(0, 10), end_date: MonthPickerStore.endDate.slice(0, 10) }
    })

    return (
        <div className={classes.ChartsCard}>
            {isExpensesByCategoryLoading ? <ChartCardLoader /> :
                <ChartCard categories={GroupExpensesByCategory || []} title={'Expenses by categories'} />
            }
            {isExpensesByMemberLoading ? <ChartCardLoader /> :
                <ChartCard members={GroupExpensesByMember?.filter(item => item.amount !== 0) || []} title={'Expenses by members'} />
            }
        </div>        
    );
};

export default GroupChartsCard;