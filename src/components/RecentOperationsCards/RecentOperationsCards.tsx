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

export interface IRecentOperationDashboardCard {
    ColorBtn: string,
    title: string,
    time: string,
    amount: number,
    type: 'expense' | 'replenishment'
}

export interface IRecentOperationGroupCard {
    categoryColor: string,
    categoryTitle: string,
    time: string,
    amount: number,
    member: IUser,
    type: 'expense' | 'replenishment'
}

export const RecentOperationDashboardCard: FC<IRecentOperationDashboardCard> = ({ ColorBtn, title, time, amount, type }) => {

    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    return (
        <li className={classes.RecentOperationDashboardCard}>
            <div className={classes.info}>
                <Light
                    color={ColorBtn}
                    type={'hollow'} />
                <div className={classes.center}>
                    <h5 className={classes.title}>{title}</h5>
                    <p className={classes.time}>{timeAgo.format(new Date(time))}</p>
                </div>
            </div>
            <p style={{ color: type === 'expense' ? "#FF2D55" : "#80D667" }}
                className={classes.amount}>
                {`${type === 'expense' ? "-" : "+"}$${numberWithCommas(amount)}`}</p>
        </li>
    )
}


export const RecentOperationGroupCard: FC<IRecentOperationGroupCard> = ({ categoryColor, categoryTitle, time, amount, member, type }) => {

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
                {`${type === 'expense' ? "-" : "+"}$${numberWithCommas(amount)}`}</p>
        </li>
    )
}
