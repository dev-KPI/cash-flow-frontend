import React, { FC } from "react";

//UI
import classes from './RecentOperationsCards.module.css';
import Light from "@components/Light/Light";
import userIcon from '@assets/user-icon.svg';
//logic
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { isUrl, numberWithCommas } from "@services/UsefulMethods/UIMethods";
import IUser from "@models/IUser";
import IHistoryItem from "@models/IHistoryItem";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { ICurrencyState } from "@store/UI_store/CurrencySlice/CurrencyInterfaces";

interface IRecentOperationDashboardCard {
    item: IHistoryItem
}
export interface IRecentOperationGroupCard {
    categoryColor: string,
    categoryTitle: string,
    time: string,
    amount: number,
    member: IUser,
    type: 'expense' | 'replenishment'
}

export const RecentOperationDashboardCard: FC<IRecentOperationDashboardCard> = ({ item }) => {
    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);
    const isExpense = item.category_id !== null;
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    return (
        <li className={classes.RecentOperationDashboardCard}>
            <div className={classes.info}>
                <Light
                    color={ isExpense ? item.color_code_category : "#80D667" }
                    type={'hollow'} />
                <div className={classes.center}>
                    <h5 className={classes.title}>{isExpense ? item.title_category: 'Salary'}</h5>
                    <p className={classes.time}>{timeAgo.format(new Date(item.time))}</p>
                </div>
            </div>
            <p style={{ color: isExpense ? "#FF2D55" : "#80D667" }}
                className={classes.amount}>
                {`${isExpense ? "-" : "+"}${currency}${numberWithCommas(item.amount)}`}</p>
        </li>
    )
}


export const RecentOperationGroupCard: FC<IRecentOperationGroupCard> = ({ categoryColor, categoryTitle, time, amount, member, type }) => {
    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const getAdminIcon = () => {
        return <img className={classes.photo}
                alt={'user icon'}
                src={isUrl(member.picture) ? member.picture : userIcon}/>   
    }

    const name = member.first_name + ' ' + member.last_name
    
    return (
        <li className={classes.RecentOperationGroupCard}>
                <div className={classes.details}>
                    <div className={classes.icon}
                    >{getAdminIcon()}</div>
                    <div className={classes.memberInfo}>
                        <h6 className={classes.name}>{name}</h6>
                        <p className={classes.time}>{timeAgo.format(new Date(time))}</p>
                    </div>
            </div>
            <div className={classes.category}>
                <Light
                    color={categoryColor}
                    type={'hollow'}
                    className={classes.categoryColor} />
                <h5 className={classes.title}>{categoryTitle}</h5>
            </div>
            <p style={{ color: type === 'expense' ? "#FF2D55" : "#80D667" }}
                className={classes.amount}>
                {`${type === 'expense' ? "-" : "+"}${currency}${numberWithCommas(amount)}`}</p>
        </li>
    )
}
