import React, { useMemo } from 'react';
//logic
import { useGetInfoByGroupQuery, useGetMemberInfoByGroupQuery, useGetUsersByGroupQuery } from '@store/Controllers/GroupsController/GroupsController';
import { NavLink, useParams } from 'react-router-dom';
import { useGetCurrentUserInfoQuery } from '@store/Controllers/UserController/UserController';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import DateService from '@services/DateService/DateService';
import { useWindowSize } from 'usehooks-ts';
//UI
import GroupMemberUserCard from '@pages/GroupMember/GroupMemberUserCard/GroupMemberUserCard';
import GroupMemberChartCard from '@pages/GroupMember/GroupMemberChartCard/GroupMemberChartCard';
import GroupMemberGraphCard from '@pages/GroupMember/GroupMemberGraphCard/GroupMemberGraphCard';
import GroupMemberHistoryCard from '@pages/GroupMember/GroupMemberHistoryCard/GroupMemberHistoryCard';
import classes from './GroupMember.module.css';
import GroupInfoCard from '@pages/Group/GroupInfoCard/GroupInfoCard';
import MonthPicker from '@components/MonthPicker/MonthPicker';



const GroupMember = () => {

    const {groupId, memberId} = useParams<{groupId: string, memberId: string}>()

    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const {data: GroupInfo, isLoading: isGroupInfoLoading, isError: isGroupInfoError, isSuccess: isGroupInfoSuccess} = useGetInfoByGroupQuery({group_id: Number(groupId)})
    const {data: Member, isLoading: isMemberLoading, isError: isMemberError, isSuccess: isMemberSuccess} = useGetMemberInfoByGroupQuery({
        group_id: Number(groupId), 
        member_id: Number(memberId),
        period: MonthPickerStore.type === 'year-month' ? 
        {year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth)}  : 
        {start_date: MonthPickerStore.startDate.split('T')[0], end_date: MonthPickerStore.endDate.split('T')[0]} 
    }, { skip: Number(groupId) === 0 || Number(memberId) === 0 })

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
        {isGroupInfoSuccess && isMemberSuccess && GroupInfo && Member && 
        <main id={'GroupMemberPage'} className={'no-padding'}>
            <div className={classes.page__container}>
                <div style={{marginTop: '10px'}}>
                    {getMonthPicker}
                </div>
                <div className={classes.grid}>
                    <GroupMemberUserCard 
                    Member={Member} 
                    isMemberLoading={isMemberLoading} 
                    isMemberError={isMemberError} 
                    isMemberSuccess={isMemberSuccess}/>
                    <GroupMemberChartCard/>
                    <GroupInfoCard 
                    isAdmin={GroupInfo.admin.id === Member.id}
                    isInfoLoading={isGroupInfoLoading} 
                    groupInfo={GroupInfo}/>
                    <GroupMemberGraphCard />
                    <GroupMemberHistoryCard />
                </div>
            </div>
        </main>}
    </>);
};

export default GroupMember;