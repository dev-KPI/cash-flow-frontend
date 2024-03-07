import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//logic
import { useGetCurrentGroupSpendersQuery, useGetCurrentUserInGroupTotalExpensesQuery, useGetGroupTotalExpensesQuery, useGetInfoByGroupQuery } from '@store/Controllers/GroupsController/GroupsController';
import { useGetCurrentUserInfoQuery } from '@store/Controllers/UserController/UserController';
import { useWindowSize } from 'usehooks-ts';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
//UI
import classes from './Group.module.css';
import OperationCard from '@components/OperationCard/OperationCard';
import GroupCategoriesCard from '@pages/Group/GroupCategoriesCard/GroupCategoriesCard';
import GroupSpendersCard from '@pages/Group/GroupSpendersCard/GroupSpendersCard';
import GroupInfoCard from '@pages/Group/GroupInfoCard/GroupInfoCard';
import SearchBar from '@components/SearchBar/SearchBar';
import GroupChartsCard from '@pages/Group/GroupChartsCard/GroupChartsCard';
import GroupGraphCard from '@pages/Group/GroupGraphCard/GroupGraphCard';
import GroupHistoryCard from '@pages/Group/GroupHistoryCard/GroupHistoryCard';
import MonthPicker from '@components/MonthPicker/MonthPicker';


const Group = () => {

    const { groupId } = useParams<{ groupId: string }>();

    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const { data: GroupTotalExpenses, isLoading: isGroupTotalExpensesLoading, isError: isGroupTotalExpensesError, isSuccess: isGroupTotalExpensesSuccess, isFetching: isGroupSpendersFetching } = useGetGroupTotalExpensesQuery({
        group_id: Number(groupId),
        period: { start_date: MonthPickerStore.startDate, end_date: MonthPickerStore.endDate }
    })
    const {data: GroupCurrentUserTotalExpenses, isLoading: isGroupCurrentUserTotalExpensesLoading, isError: isGroupCurrentUserTotalExpensesError, isSuccess: isGroupCurrentUserTotalExpensesSuccess} = useGetCurrentUserInGroupTotalExpensesQuery({
        group_id: Number(groupId),
        period: { start_date: MonthPickerStore.startDate, end_date: MonthPickerStore.endDate }
    })
    const {data: GroupSpenders, isLoading: isGroupSpendersLoading, isError: isGroupSpendersError, isSuccess: isGroupSpendersSuccess} = useGetCurrentGroupSpendersQuery({
        group_id: Number(groupId),
        period: { start_date: MonthPickerStore.startDate, end_date: MonthPickerStore.endDate }
    })
    const {data: GroupInfo, isLoading: isGroupInfoLoading, isError: isGroupInfoError} = useGetInfoByGroupQuery({group_id: Number(groupId)})
    const {data: CurrentUser, isLoading: isCurrentUserLoading, isError: isCurrentUserError} = useGetCurrentUserInfoQuery(null)    

    const {width, height} = useWindowSize();
    const getMonthPicker = useMemo(() => {
        if(width < 769) {
            return (
                <div className={classes.MonthPicker}>
                    <MonthPicker/>
                </div>
            )
        }
    }, [width])

    return (<>
        {GroupInfo && CurrentUser &&
        <main id='GroupPage' className={'no-padding'}>
            <div className={classes.page__container}>
                {getMonthPicker}
                <div className={classes.grid}>
                    <GroupCategoriesCard />
                    <div className={classes.search}>
                        <div className={classes.searchTop}>
                            <h3 className={classes.cardTitle}>Members</h3>
                            <NavLink
                                to={`/group/${groupId}/members`}
                                className={classes.membersLink}
                                >
                                See all
                            </NavLink>
                        </div>
                        <SearchBar groupId={Number(groupId)}/>
                    </div>
                    <div className={classes.grid__operation}>
                        <OperationCard 
                        operation={'Expenses'}
                        className={classes.operations} 
                        title='Total group expenses' icon='bi bi-people'
                        data={GroupTotalExpenses}
                        isSuccess={isGroupTotalExpensesSuccess}
                        isLoading={isGroupTotalExpensesLoading}
                        isError={isGroupTotalExpensesError} />
                        <OperationCard 
                        operation={'ExpensesExpanded'} 
                        title={'Expenses'}
                        groupId={Number(groupId)}
                        className={classes.operations} 
                        data={GroupCurrentUserTotalExpenses}
                        isSuccess={isGroupCurrentUserTotalExpensesSuccess}
                        isLoading={isGroupCurrentUserTotalExpensesLoading}
                        isError={isGroupCurrentUserTotalExpensesError}/>
                    </div>
                    <GroupSpendersCard 
                    data={GroupSpenders}
                    isSuccess={isGroupSpendersSuccess}
                    isFetching={isGroupSpendersFetching}
                    isLoading={isGroupSpendersLoading}
                    isError={isGroupSpendersError}
                    />
                    <GroupInfoCard 
                        isAdmin={GroupInfo.admin.id === CurrentUser.id}
                        isInfoLoading={isGroupInfoLoading} 
                        groupInfo={GroupInfo}
                    />
                    <GroupChartsCard />
                    <GroupGraphCard/>
                    <GroupHistoryCard/>
                </div>
            </div>
        </main>}
        </>);
};

export default Group;