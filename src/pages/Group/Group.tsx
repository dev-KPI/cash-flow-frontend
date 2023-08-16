import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGetInfoByGroupQuery } from '@store/Controllers/GroupsController/GroupsController';
import { useGetCurrentUserInfoQuery } from '@store/Controllers/UserController/UserController';
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
import ViewMoreModal from '@components/ModalWindows/ViewMoreModal/ViewMoreModal';


const Group = () => {

    const { groupId } = useParams();

    const {data: GroupInfo, isLoading: isGroupInfoLoading, isError: isGroupInfoError} = useGetInfoByGroupQuery({group_id: Number(groupId)})
    const {data: CurrentUser, isLoading: isCurrentUserLoading, isError: isCurrentUserError} = useGetCurrentUserInfoQuery(null)    

    return (<>
        {GroupInfo && CurrentUser &&
        <main id='GroupPage' className={'no-padding'}>
            <div className={classes.page__container}>
                <div className={classes.grid}>
                    <GroupCategoriesCard />
                    <div className={classes.search}>
                        <div className={classes.searchTop}>
                            <h3 className={classes.cardTitle}>Members</h3>
                            <NavLink
                                to={`/group/${groupId}/member/1`}
                                className={classes.membersLink}
                                >
                                See all
                            </NavLink>
                        </div>
                        <SearchBar/>
                    </div>
                    <div className={classes.grid__operation}>
                        <OperationCard operation={'Income'} />
                        <OperationCard operation={'Expenses'} />
                    </div>
                    <GroupSpendersCard />
                    <GroupInfoCard 
                        isAdmin={GroupInfo.admin.id === CurrentUser.id}
                        isInfoLoading={isGroupInfoLoading} 
                        groupInfo={GroupInfo}
                    />
                    <GroupChartsCard />
                    <GroupGraphCard />
                    <GroupHistoryCard/>
                </div>
            </div>
        </main>}
        </>);
};

export default Group;