import React, { FC } from "react";

//UI
import classes from './RecentOperationsCards.module.css';
import Light from "@components/Light/Light";

//logic
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { numberWithCommas } from "@services/UsefulMethods/UIMethods";

export interface IRecentOperationDashboardCard {
    ColorBtn: string,
    title: string,
    time: string,
    amount: number,
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

