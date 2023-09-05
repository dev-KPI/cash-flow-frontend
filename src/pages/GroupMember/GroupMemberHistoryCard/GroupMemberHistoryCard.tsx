import React, { FC, useState, ReactNode, useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
//UI
import classes from './GroupMemberHistoryCard.module.css';
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';
import { RecentOperationGroupCard } from "@components/RecentOperationsCards/RecentOperationsCards";
import GroupMemberHistoryCardLoader from "./GroupMemberHistoryCardLoader";


//logic
import { Omiter, addFieldToObject } from "@services/UsefulMethods/ObjectMethods";
import { MembersHistoryObj } from "@pages/MembersHistoryObj";

import ICategory from "@models/ICategory";
import IUser from "@models/IUser";
import IGroup from "@models/IGroup";
import { useGetGroupMemberHistoryQuery } from "@store/Controllers/GroupsController/GroupsController";



interface GroupTransaction {
    id: number;
    amount: number;
    time: string;
    description: string;
    category_group?: {
        group?: IGroup 
        category?: ICategory
    },
    user: IUser
    type: string
}

const GroupHistoryCard: FC = () => {

    const { groupId, memberId } = useParams<{
        groupId: string,
        memberId: string,
    }>()
    const { data: MemberHistory, isSuccess: isMemberHistorySuccess, isError: isMemberHistoryError, isLoading: isMemberHistoryLoading } = 
    useGetGroupMemberHistoryQuery({page: 1, size: 8, group_id: Number(groupId) || 0, member_id: Number(memberId) || 0}, { skip: Number(groupId) === 0 || Number(memberId) === 0 })
    
    const {width} = useWindowSize();

    const getRecentActivities = useMemo(() => {
        const userTimezoneOffsetMinutes = new Date().getTimezoneOffset();
        const userTimezoneOffsetMilliseconds = userTimezoneOffsetMinutes * 60 * 1000;
        if(MemberHistory) {
            if (memberId) {
                let recentOperations = MemberHistory.items.map((el, i) =>
                    <RecentOperationGroupCard
                    key={i}
                    type={'expense'}
                    categoryColor={el.color_code_category || '#80D667'}
                    categoryTitle={el.title_category || 'Salary'}
                    member={{
                        id: el.user_id,
                        login: el.user_login,
                        first_name: el.user_first_name,
                        last_name: el.user_last_name,
                        picture: el.user_picture,
                    }}
                    amount={el.amount}
                    time={new Date(new Date(el.time).getTime() - userTimezoneOffsetMilliseconds).toISOString()}></RecentOperationGroupCard>
                )
                if (width > 1440)
                    return recentOperations.slice(0, 4)
                else
                    return recentOperations.slice(0, 7)
            }
        } else return []
    }, [MemberHistory, width])

    return (<>
        <div className={classes.HistoryCard}>
            {isMemberHistoryLoading ? <GroupMemberHistoryCardLoader /> :
                <div className={classes.inner}>
                    <h3 className={classes.title}>Recent Activity</h3>
                    <ul>
                        {getRecentActivities}
                    </ul>
                    {
                        getRecentActivities && getRecentActivities?.length > 4 ?
                            <div key='239k23' className={classes.ViewMore}>
                                <Link to={'/history'}>
                                    <div className={classes.ViewMore__inner}>
                                        <p className={classes.ViewMore__title}>View More</p>
                                        <ArrowRight className={classes.ArrowRight} />
                                    </div>
                                </Link>
                            </div>
                        : 
                        null
                    }
                    {
                        getRecentActivities?.length === 0 ?
                            <div className={classes.emptyList}>
                                <i className="bi bi-clock-history"></i>
                                <p className={classes.emptyTitle}>Activity list is empty!</p>
                            </div> 
                            :
                            null
                    }
                </div>
            }
        </div>
    </>)
}

export default GroupHistoryCard;