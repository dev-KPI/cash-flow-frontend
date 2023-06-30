import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

//UI
import GroupMemberUserCard from '@pages/GroupMember/GroupMemberUserCard/GroupMemberUserCard';
import GroupMemberChartCard from '@pages/GroupMember/GroupMemberChartCard/GroupMemberChartCard';
import GroupMemberGraphCard from '@pages/GroupMember/GroupMemberGraphCard/GroupMemberGraphCard';
import GroupMemberHistoryCard from '@pages/GroupMember/GroupMemberHistoryCard/GroupMemberHistoryCard';
import classes from './GroupMember.module.css';
import GroupInfoCard from '@pages/Group/GroupInfoCard/GroupInfoCard';;



const GroupMember = () => {

    return (
        <main id={'GroupMemberPage'} className={'no-padding'}>
            <div className={classes.page__container}>
                <div className={classes.grid}>
                    <GroupMemberUserCard />
                    <GroupMemberChartCard/>
                    <GroupInfoCard />
                    <GroupMemberGraphCard />
                    <GroupMemberHistoryCard />

                </div>
            </div>
        </main>
    );
};

export default GroupMember;