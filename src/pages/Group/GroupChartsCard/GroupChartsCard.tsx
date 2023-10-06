import { FC } from 'react';
import { useParams } from 'react-router-dom';
//logic
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
import { useGetCurrentGroupSpendersQuery, useGetGroupExpensesByCategoryQuery } from '@store/Controllers/GroupsController/GroupsController';
//UI
import classes from './GroupChartsCard.module.css';
import ChartCard from '@components/ChartCard/ChartCard';
import ChartCardLoader from '@components/ChartCard/ChartCardLoader';


const GroupChartsCard: FC = () => {
    const { groupId } = useParams<{groupId: string}>();
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const { data: GroupExpensesByCategory, isLoading: isExpensesByCategoryLoading } = useGetGroupExpensesByCategoryQuery({
        group_id: Number(groupId),
        period: MonthPickerStore.type === 'year-month' ?
            { year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth) } :
            { start_date: MonthPickerStore.startDate.toISOString().slice(0, 10), end_date: MonthPickerStore.endDate.toISOString().slice(0, 10) }
    })
    const { data: GroupExpensesByMember, isLoading: isExpensesByMemberLoading } = useGetCurrentGroupSpendersQuery({
        group_id: Number(groupId),
        period: MonthPickerStore.type === 'year-month' ?
            { year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth) } :
            { start_date: MonthPickerStore.startDate.toISOString().slice(0, 10), end_date: MonthPickerStore.endDate.toISOString().slice(0, 10) }
    })

    return (
        <div className={classes.ChartsCard}>
            {(!isExpensesByCategoryLoading && GroupExpensesByCategory) ? 
                <ChartCard categories={GroupExpensesByCategory} title={'Expenses by categories'} messageType={'group'} />
                :
                <ChartCardLoader className={classes.loader} />
            }
            {(!isExpensesByMemberLoading && GroupExpensesByMember) ? 
                <ChartCard members={GroupExpensesByMember?.filter(item => item.amount !== 0)} title={'Expenses by members'} messageType={'group'} />
                :
                <ChartCardLoader className={classes.loader} />
            }
        </div>        
    );
};

export default GroupChartsCard;