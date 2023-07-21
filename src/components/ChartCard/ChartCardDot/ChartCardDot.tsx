import React, { FC, Dispatch, SetStateAction, useEffect } from 'react';

import { IMembersExpensesChart } from '../ChartCard';
//UI
import classes from './ChartCardDot.module.css'
import Light from '@components/Light/Light';
//store
import { IUserExpenseChartDataItem } from '@store/TemporaryInterfaces';


interface ChartCardDotProps {
    item: IUserExpenseChartDataItem | IMembersExpensesChart;
    setId: (Dispatch<SetStateAction<number>>)
}


const ChartCardDot: FC<ChartCardDotProps> = ({ item, setId }) => {
    let color = '#4C6FFF'
    let title = ''
    const onClick = () => {
        if ('member' in item) {
            setId(item ? item.member.id : 0)
        } else {
            setId(item ? item.category.id : 0)
        }
    }
    if ('member' in item) { 
        color = item.member.color || '#4C6FFF'
        title = item?.member.first_name.slice(0,1) + ". " + item?.member.last_name
    } else if ('category' in item) {
        color = item.category.color;
        title = item?.category.title || '';
    }

    title = title.length > 13 ? title.slice(0,12) + '..' : title
    return (
        <li className={classes.item} onClick={onClick}>
            <Light type={'solid'} color={color}></Light>
            <p className={classes.itemTitle}>{title}</p>
        </li>
    );
};

export default ChartCardDot;