import React, { FC, useState, ReactNode, useCallback } from "react";
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



interface GroupTransaction {
    id: number;
    amount: number;
    time: string;
    description: string;
    category_group?: {
        group?: ICategory // but IGroup
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
    const [isPageLoading = true, setIsPageLoading] = useState<boolean>()
    const {width} = useWindowSize();
    setTimeout(() => {
        setIsPageLoading(false)
    }, 1500);
    const getMixedHistory = () => {
        const expensesDTO: GroupTransaction[] = [...MembersHistoryObj.expenses.map((el: Object) =>
            Omiter(['id'], el))].map(el => addFieldToObject(el, 'type', 'expense'))
        const replenishmentsDTO: GroupTransaction[] = [...MembersHistoryObj.replenishments.map((el: Object) =>
            Omiter(['id'], el))].map(el => addFieldToObject(el, 'type', 'replenishment'))

        const HistoryArray: GroupTransaction[] = [...expensesDTO, ...replenishmentsDTO]

        return (HistoryArray.sort((b, a) => {
            const dateA = new Date(a.time).getTime();
            const dateB = new Date(b.time).getTime();
            return dateA - dateB;
        }))
    }

    const getRecentActivities = () => {
        let res: ReactNode[] = []
        if (memberId) {
            res = getMixedHistory()
            .filter(el => el.user.id === +memberId)
            .map((el, i) =>
                <RecentOperationGroupCard
                    key={i}
                    type={el.type === 'expense' ? 'expense' : 'replenishment'}
                    categoryColor={el.category_group?.category?.color || '#80D667'}
                    categoryTitle={el.category_group?.category?.title || 'Salary'}
                    member={el.user}
                    amount={el.amount}
                    time={el.time}></RecentOperationGroupCard>
            )
        }
        return res
    }

    const getHistory = useCallback(() => {
        if (width > 1440)
            return getRecentActivities().slice(0, 4)
        else
            return getRecentActivities().slice(0, 7)
    }, [width])

    return (<>
        <div className={classes.HistoryCard}>
            {isPageLoading ? <GroupMemberHistoryCardLoader /> :
                <div className={classes.inner}>
                    <h3 className={classes.title}>Recent Activity</h3>
                    <ul>
                        {getHistory()}
                    </ul>
                    {
                        getRecentActivities().length > 4 ?
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
                        getRecentActivities().length === 0 ?
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