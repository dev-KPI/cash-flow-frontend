import React, { FC, SetStateAction, useCallback, useEffect, useState} from 'react';

import classes from './ChartCard.module.css'

import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
import ChartCardLoader from '@components/ChartCard/ChartCardLoader';
import Chart from '@components/ChartCard/Chart';
import ChartCardDot from '@components/ChartCard/ChartCardDot/ChartCardDot';
import { IUserExpenseChartDataItem } from '@store/UserCategoryExpenseApiSlice/UserCategoryExpenseInterfaces';


export interface IMembersExpensesChart {
    member: {
        id: number,
        login: string,
        first_name: string,
        last_name: string,
        picture: string,
        color?: string 
    },
    amount: number
}

type IChartCardProps = {
    data: IMembersExpensesChart[] | IUserExpenseChartDataItem[];
    title: string
}; 


const ChartCard: FC<IChartCardProps> = ({ data, title }) => {
    const [id, setId] = useState<number>();
    const [isExtended, setIsExtended] = useState<boolean>();
    const [loading = true, setLoading] = useState<boolean>();
    let itemAmount = 0;
    let itemTitle = '';
    if (data.some(item => item.hasOwnProperty("member"))) {
        const members = data as IMembersExpensesChart[];
        const member = members.find(el => el.member.id === id)
        itemTitle = member?.member.first_name + " " + member?.member.last_name
        itemAmount = member?.amount || 0;

    } else if (data.some(item => item.hasOwnProperty("category"))) {
        const categories = data as IUserExpenseChartDataItem[];
        const category = categories.find(el => el.category.id === id)
        itemTitle = category?.category.title || '';
        itemAmount = category?.amount || 0
    }

    const total = data
        .map((item) => item.amount || 0)
        .reduce((acc, curr) => acc + curr, 0);

    useEffect(()=>{
        id ? setId(id) : setId(0)
    }, [])

    // if (isError) {
    //     return <div>Error</div>
    // }

    const getItems = useCallback(() => {
        return data.map((item, i) => <ChartCardDot key={i} item={item} setId={setId} />)
    }, [data]) 

    let itemPercentage;
    if (itemAmount){
        itemPercentage = +(itemAmount * 100 / total).toFixed(2) || 0;
    }


    const handleOpenExtended = () => {
        setIsExtended(true)
    }
    const handleCloseExtended = () => {
        if (isExtended) {
            setIsExtended(false)
        }
    }


    // if the user does not interact with this card for more than 15 seconds, close the extended menu
    let timeout: ReturnType<typeof setTimeout>;

    let clearInterval = () => {
        clearTimeout(timeout);
    }

    let setInterval = () => {
        timeout = setTimeout(handleCloseExtended, 15000);
    }

    setTimeout(() => {
        setLoading(false)
    }, 1500);
   
    return (
            loading ? <ChartCardLoader /> :
            <div className={classes.inner} onMouseEnter={clearInterval} onMouseLeave={setInterval} onClick={handleCloseExtended}>
                <h3 className={classes.title}>{title}</h3>
                <div className={classes.wrapper}>
                    <div className={classes.chart}>
                        <Chart data={data} total={total} setId={setId} />
                    </div>
                    <div className={classes.info}>
                        <div className={classes.expenseInfo}>
                            <h5 className={classes.expenseTitle}>{itemTitle?.slice(0,16)}</h5>
                            <p className={classes.expensePercent}>{itemPercentage}%</p>
                            <span className={classes.expenseAmount}>{numberWithCommas(itemAmount)}$</span>
                        </div>
                        {isExtended ?
                            <ul className={classes.popupList} onClick={(e) => (e.stopPropagation())}>
                                {getItems()}
                            </ul>
                            :
                            <ul className={classes.chartList}>
                                {getItems().slice(0, 4)}
                                <li className={classes.item}>
                                    <button className={classes.viewMore} onClick={handleOpenExtended}>View more</button>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </div>
    );
};

export default ChartCard;
