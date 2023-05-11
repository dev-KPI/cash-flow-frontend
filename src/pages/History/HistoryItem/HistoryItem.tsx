import React, { FC } from "react";

//UI
import classes from './HistoryItem.module.css';
import Light from "@components/Light/Light";

//logic
import { numberWithCommas } from "@services/UsefulMethods/UIMethods";
import DateService from "@services/DateService/DateService"
export interface IRecentOperationDashboardCard {
    description: string,
    categoryColor: string,
    groupColor: string,
    categoryTitle: string,
    groupTitle: string,
    time: string,
    amount: number,
    type: 'expense' | 'replenishment'
}
export const HistoryItem: FC<IRecentOperationDashboardCard> = ({ description, type, categoryColor, groupColor, categoryTitle, groupTitle, amount, time }) => {
    return (
        <tr>
            <td>{description}</td>
            <td>
                <Light
                    className={classes.dotLight}
                    style={{ display: type === 'expense' ? 'inline-block' : 'none' }}
                    color={categoryColor}
                    type='solid' />
                <p className={classes.itemTitle}>{categoryTitle}</p>
            </td>
            <td>
                <Light
                    className={classes.dotLight}
                    style={{ display: type === 'expense' ? 'inline-block' : 'none' }}
                    color={groupColor}
                    type='solid' />
                <p className={classes.itemTitle}>{groupTitle}</p>
            </td>
            <td>{DateService.getTime(new Date(time))}</td>
            <td style={{ color: type === 'expense' ? "#FF2D55" : "#80D667", textAlign: "left" }}>
                {`${type === 'expense' ? "-" : "+"}$${numberWithCommas(amount)}`}
            </td>
        </tr>
    )
}

