import React from 'react';
//logic
import { useGetInfoByGroupQuery } from '@store/Controllers/GroupsController/GroupsController';
import { NavLink, useParams } from 'react-router-dom';
//UI
import GroupMemberUserCard from '@pages/GroupMember/GroupMemberUserCard/GroupMemberUserCard';
import GroupMemberChartCard from '@pages/GroupMember/GroupMemberChartCard/GroupMemberChartCard';
import GroupMemberGraphCard from '@pages/GroupMember/GroupMemberGraphCard/GroupMemberGraphCard';
import GroupMemberHistoryCard from '@pages/GroupMember/GroupMemberHistoryCard/GroupMemberHistoryCard';
import classes from './GroupMember.module.css';
import GroupInfoCard from '@pages/Group/GroupInfoCard/GroupInfoCard';
import { useGetCurrentUserInfoQuery } from '@store/Controllers/UserController/UserController';



const GroupMember = () => {

    const {groupId} = useParams<{groupId: string}>()
    const {data: GroupInfo, isLoading: isGroupInfoLoading, isError: isGroupInfoError} = useGetInfoByGroupQuery({group_id: Number(groupId)})
    const {data: CurrentUser, isLoading: isCurrentUserLoading, isError: isCurrentUserError} = useGetCurrentUserInfoQuery(null)

    return (<>
        {GroupInfo && CurrentUser && 
        <main id={'GroupMemberPage'} className={'no-padding'}>
            <div className={classes.page__container}>
                <div className={classes.grid}>
                    <GroupMemberUserCard />
                    <GroupMemberChartCard/>
                    <GroupInfoCard 
                    isAdmin={GroupInfo.admin.id === CurrentUser.id}
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