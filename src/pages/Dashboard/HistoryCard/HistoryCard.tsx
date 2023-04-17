import React, { FC, ReactNode } from "react";

//UI
import classes from './HistoryCard.module.css';
import {ReactComponent as ArrowRight} from '@assets/arrow-right.svg';
import { RecentOperationDashboardCard } from "@components/RecentOperationsCards/RecentOperationsCards";

//logic
import { Link } from "react-router-dom";
import { useContentSize } from "@hooks/layoutHooks/useLayout";
import { Omiter, addFieldToObject } from "@services/UsefulMethods/ObjectMethods";
import { tmpObj } from "./testObj";


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

const HistoryCard: FC = () => {
    
     
    const {width} = useContentSize();
    
    const getMixedHistory = () => {
        const expensesDTO: Transaction[] = [...tmpObj.expenses.map((el: Object) => 
            Omiter(['id'], el))].map(el => addFieldToObject(el, 'type', 'expense'))
        const replenishmentsDTO: Transaction[] = [...tmpObj.replenishments.map((el: Object) => 
            Omiter(['id'], el))].map(el => addFieldToObject(el, 'type', 'replenishment'))
    
        const HistoryArray: Transaction[] = [...expensesDTO, ...replenishmentsDTO]
        return(HistoryArray.sort((a, b) => {
            const dateA = new Date(a.time).getTime();
            const dateB = new Date(b.time).getTime();
            return dateA - dateB;
        }))
    }

    const getRecentActivities = () => {
        let res: ReactNode[] = getMixedHistory().map((el, i) => {
            return <li key={i + 'adsa'}>
                    <RecentOperationDashboardCard
                    type={el.type === 'expense' ? 'expense' : 'replenishment'}
                    ColorBtn={el.category_group?.category?.color || '#80D667'}
                    title={el.category_group?.category?.title || 'Salary'}
                    amount={el.amount}
                    time={el.time}/> 
                </li>
        })
        return res
    }

    return(<>
        <div className={classes.HistoryCard}>
            <h3>Recent Activity</h3>
            <ul>
                {getRecentActivities()}
                <li key='239j76k'>
                    <Link to={'/'}>
                        <div className={classes.ViewMore}>
                            <p>View More</p>
                            <ArrowRight className={classes.ArrowRight}/>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    </>)
}

export default HistoryCard;