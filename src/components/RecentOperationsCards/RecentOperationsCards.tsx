import React, { FC } from "react";

//UI
import classes from './RecentOperationsCards.module.css';
import Light from "@components/Light/Light";

//logic
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export interface IRecentOperationDashboardCard{
    ColorBtn: string,
    title: string, 
    time: string, 
    amount: number
}
export const RecentOperationDashboardCard: FC<IRecentOperationDashboardCard> = ({ColorBtn, title, time, amount}) => {
    
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')

    return (<>
        <div className={classes.RecentOperationDashboardCard}>
            <div className={classes.info}>
                <Light 
                color={ColorBtn} 
                type={'hollow'}/>
                <div className={classes.center}>
                    <h5>{title}</h5>
                    <p className={classes.time}>{timeAgo.format(new Date(time))}</p>
                </div>
            </div>
            <p className={classes.amount}>{`- $${amount}`}</p>
        </div>
    </>)
}

