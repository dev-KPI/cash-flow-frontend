import React, { FC, ReactNode } from "react";

//UI
import classes from './HistoryCard.module.css';
import {ReactComponent as ArrowRight} from '@assets/arrow-right.svg';
import { RecentOperationDashboardCard } from "@components/RecentOperationsCards/RecentOperationsCards";

//logic
import { Link } from "react-router-dom";
import { useContentSize } from "@hooks/useLayout";



const HistoryCard: FC = () => {
    
    const tmpObj = {
        ColorBtn: '#FF6E01',
        title: 'Test',
        amount: 500.12,
        time: '2023-03-29T13:51:50'
    }
    const isColorBtn: boolean = tmpObj.ColorBtn.match(/#([A-Z0-9]{1,6})/i) ? true : false

    const {width} = useContentSize();

    const getRecentActivities = () => {
        // const rangeActivities = width < 1440 ? 3 : 6
        let res: ReactNode[] = [];
        for (let i = 0; i < 6; i++){
            res.push( 
            <li key={i + 'adsa'}>
                <RecentOperationDashboardCard 
                ColorBtn={tmpObj.ColorBtn}
                title={tmpObj.title}
                amount={tmpObj.amount}
                time={tmpObj.time}/> 
            </li>)
        }
        return res
    }

    return(<>
        <div className={classes.HistoryCard}>
            <h3>Recent Activity</h3>
            <ul>
                {getRecentActivities()}
                <li>
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