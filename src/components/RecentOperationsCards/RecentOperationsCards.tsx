import { FC } from "react";

//UI
import classes from './RecentOperationsCards.module.css';
import Light from "@components/Light/Light";
import userIcon from '@assets/user-icon.svg';
//logic
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { isUrl, numberWithCommas } from "@services/UsefulMethods/UIMethods";
import IHistoryItem, { IGroupHistoryItem } from "@models/IHistoryItem";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { ICurrencyState } from "@store/UI_store/CurrencySlice/CurrencyInterfaces";

interface IRecentOperationDashboardCard {
    item: IHistoryItem
}
export interface IRecentOperationGroupCard  {
    item: IGroupHistoryItem
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


export const RecentOperationGroupCard: FC<IRecentOperationGroupCard> = ({ item }) => {
    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    const getAdminIcon = () => {
        return <img className={classes.photo}
                alt={'user icon'}
            src={isUrl(item.user_picture) ? item.user_picture : userIcon}/>   
    }

    const name = item.user_first_name + ' ' + item.user_last_name 
    
    return (
        <li className={classes.RecentOperationGroupCard}>
                <div className={classes.details}>
                    <div className={classes.icon}
                    >{getAdminIcon()}</div>
                    <div className={classes.memberInfo}>
                        <h6 className={classes.name}>{name}</h6>
                        <p className={classes.time}>{timeAgo.format(new Date(item.time))}</p>
                    </div>
            </div>
            <div className={classes.category}>
                <Light
                    color={item.color_code_category}
                    type={'hollow'}
                    className={classes.categoryColor} />
                <h5 className={classes.title}>{item.title_category}</h5>
            </div>
            <p style={{ color: "#FF2D55"  }}
                className={classes.amount}>
                {`${"-"}${currency}${numberWithCommas(item.amount)}`}</p>
        </li>
    )
}
