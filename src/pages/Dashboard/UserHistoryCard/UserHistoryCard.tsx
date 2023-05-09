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


type group_category_props = {
    id: number,
    title: string,
    color: string,
    icon: string
}
interface Transaction {
    id: number;
    amount: number;
    time: string;
    description: string;
    category_group?: {
        group?: group_category_props
        category?: group_category_props
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
        return res
    }

    return (<>
        <div className={classes.HistoryCard}>
            {isPageLoading ? <UserHistoryCardLoader /> :
                <div className={classes.inner}>
                    <h3 className={classes.title}>Recent Activity</h3>
                    <ul>
                        {getRecentActivities()}
                    </ul>
                    <div key='239k23' className={classes.ViewMore}>
                        <Link to={'/'}>
                            <div className={classes.ViewMore__inner}>
                                <p className={classes.ViewMore__title}>View More</p>
                                <ArrowRight className={classes.ArrowRight} />
                            </div>
                        </Link>
                    </div>
                </div>
            }
        </div>
    </>)
}

export default UserHistoryCard;