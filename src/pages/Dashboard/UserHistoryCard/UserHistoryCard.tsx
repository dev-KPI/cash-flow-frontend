import React, { FC, useState, ReactNode } from "react";

//UI
import classes from './UserHistoryCard.module.css';
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';
import { RecentOperationDashboardCard } from "@components/RecentOperationsCards/RecentOperationsCards";

//logic
import { Link } from "react-router-dom";
import { Omiter, addFieldToObject } from "@services/UsefulMethods/ObjectMethods";
import { HistoryObj } from "@pages/HistoryObj";
import UserHistoryCardLoader from "./UserHistoryCardLoader";
import ICategory from "@models/ICategory";


interface Transaction {
    id: number;
    amount: number;
    time: string;
    description: string;
    category_group?: {
        group?: ICategory // but IGroup
        category?: ICategory
    },
    type: string
}

const UserHistoryCard: FC = () => {

    const [isPageLoading = true, setIsPageLoading] = useState<boolean>()

    setTimeout(() => {
        setIsPageLoading(false)
    }, 1500);

    const getMixedHistory = () => {
        const expensesDTO: Transaction[] = [...HistoryObj.expenses.map((el: Object) =>
            Omiter(['id'], el))].map(el => addFieldToObject(el, 'type', 'expense'))
        const replenishmentsDTO: Transaction[] = [...HistoryObj.replenishments.map((el: Object) =>
            Omiter(['id'], el))].map(el => addFieldToObject(el, 'type', 'replenishment'))

        const HistoryArray: Transaction[] = [...expensesDTO, ...replenishmentsDTO]
        return (HistoryArray.sort((b, a) => {
            const dateA = new Date(a.time).getTime();
            const dateB = new Date(b.time).getTime();
            return dateA - dateB;
        }))
    }

    const getRecentActivities = () => {

        let res: ReactNode[] = getMixedHistory().map((el, i) =>
            <RecentOperationDashboardCard
                key={i}
                type={el.type === 'expense' ? 'expense' : 'replenishment'}
                ColorBtn={el.category_group?.category?.color || '#80D667'}
                title={el.category_group?.category?.title || 'Salary'}
                amount={el.amount}
                time={el.time}></RecentOperationDashboardCard>
        )
        return []
    }

    return (<>
        <div className={classes.HistoryCard}>
            {isPageLoading ? <UserHistoryCardLoader /> :
                <div className={classes.inner}>
                    <h3 className={classes.title}>Recent Activity</h3>
                    <ul style={{ flex: getRecentActivities().length === 0 ? '0' : '1 0  auto'}}>
                        {getRecentActivities().slice(0,8)}
                    </ul>
                    {getRecentActivities().length > 8 ?
                        <div key='239k23' className={classes.ViewMore}>
                            <Link to={'/history'}>
                                <div className={classes.ViewMore__inner}>
                                    <p className={classes.ViewMore__title}>View More</p>
                                    <ArrowRight className={classes.ArrowRight} />
                                </div>
                            </Link>
                        </div>
                        : null
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

export default UserHistoryCard;