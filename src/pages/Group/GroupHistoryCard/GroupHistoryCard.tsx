import React, { FC, useState, ReactNode } from "react";

//UI
import classes from './GroupHistoryCard.module.css';
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';
import { RecentOperationGroupCard } from "@components/RecentOperationsCards/RecentOperationsCards";

//logic
import { Link } from "react-router-dom";
import { Omiter, addFieldToObject } from "@services/UsefulMethods/ObjectMethods";
import { MembersHistoryObj } from "@pages/MembersHistoryObj";
import GroupHistoryCardLoader from "./GroupHistoryCardLoader";
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

    const [isPageLoading, setIsPageLoading] = useState<boolean>(true)

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
        })).slice(0, 8)
    }

    const getRecentActivities = () => {

        let res: ReactNode[] = getMixedHistory().map((el, i) =>
            <RecentOperationGroupCard
                key={i}
                type={el.type === 'expense' ? 'expense' : 'replenishment'}
                categoryColor={el.category_group?.category?.color_code || '#80D667'}
                categoryTitle={el.category_group?.category?.category?.title || 'Salary'}
                member={el.user}
                amount={el.amount}
                time={el.time}></RecentOperationGroupCard>
        ) 
        return res
    }

    return (<>
        <div className={classes.HistoryCard}>
            {isPageLoading ? <GroupHistoryCardLoader /> :
                <div className={classes.inner}>
                    <h3 className={classes.title}>Recent Activity</h3>
                    <ul>
                        {getRecentActivities().slice(0,7)}
                    </ul>
                    { getRecentActivities().length > 7 ?
                        <div key='239k23' className={classes.ViewMore}>
                            <Link to={'/history'}>
                                <div className={classes.ViewMore__inner}>
                                    <p className={classes.ViewMore__title}>View More</p>
                                    <ArrowRight className={classes.ArrowRight} />
                                </div>
                            </Link>
                        </div>
                        :null
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