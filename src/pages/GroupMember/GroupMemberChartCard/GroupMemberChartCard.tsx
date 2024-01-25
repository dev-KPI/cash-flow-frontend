import { FC } from 'react';
import { useParams } from 'react-router-dom';
//logic
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
import { useGetGroupMemberExpensesByCategoryQuery } from '@store/Controllers/GroupsController/GroupsController';
//UI
import classes from './GroupMemberChartCard.module.css';
import ChartCard from '@components/ChartCard/ChartCard';
import ChartCardLoader from '@components/ChartCard/ChartCardLoader';



const GroupMemberChartCard: FC = () => {
    const { groupId, memberId } = useParams<{ groupId: string, memberId: string }>()
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const { data: MemberExpenses, isLoading: isMemberExpensesLoading } = useGetGroupMemberExpensesByCategoryQuery({
        group_id: Number(groupId),
        member_id: Number(memberId),
        period: { start_date: MonthPickerStore.startDate, end_date: MonthPickerStore.endDate }
    })
    
    return (
        <div className={classes.ChartCard}>
            {(!isMemberExpensesLoading && MemberExpenses) ?
                <ChartCard categories={MemberExpenses} title={'Expenses'} messageType={'member'} />
                :
                <ChartCardLoader />
            }
        </div>
    );
};

export default GroupMemberChartCard;