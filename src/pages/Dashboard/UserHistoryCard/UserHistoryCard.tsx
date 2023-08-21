import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
//UI
import classes from './UserHistoryCard.module.css';
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';
import { RecentOperationDashboardCard } from "@components/RecentOperationsCards/RecentOperationsCards";
import UserHistoryCardLoader from "./UserHistoryCardLoader";

//logic
import { useGetUserHistoryQuery } from "@store/Controllers/UserController/UserController";


const UserHistoryCard: FC = () => {
    const { data: HistoryItems, isLoading: isHistoryLoading, isError: isHistoryError, isSuccess: isHistorySuccess } = useGetUserHistoryQuery({
        page: 0,
        size: 8
    })
    const getRecentActivities = () => {
        let res: ReactNode[] = isHistorySuccess ? HistoryItems.items.map((el, i) =>
            <RecentOperationDashboardCard
                key={i}
                item={el}></RecentOperationDashboardCard> 
        ) : []
        return res
    }

    return (<>
        <div className={classes.HistoryCard}>
            {isHistoryLoading ? <UserHistoryCardLoader /> :
                <div className={classes.inner}>
                    <h3 className={classes.title}>Recent Activity</h3>
                    <ul style={{ flex: getRecentActivities().length === 0 ? '0' : '1 0  auto'}}>
                        {getRecentActivities().slice(0,8)}
                    </ul>
                    {isHistorySuccess && HistoryItems.total > 8 ?
                        <div key='239k23' className={classes.ViewMore}>
                            <Link to={'/history'}>
                                <div className={classes.ViewMore__inner}>
                                    <p className={classes.ViewMore__title}>View More</p>
                                    <ArrowRight className={classes.ArrowRight} />
                                </div>
                            </Link>
                        </div>
                        : null
                    }
                    {
                        getRecentActivities().length === 0 ?
                            <div className={classes.emptyList}>
                                <i className="bi bi-clock-history"></i>
                                <p className={classes.emptyTitle}>Activity list is empty!</p>
                            </div>
                            :
                            null
                    }
                </div>
            }
        </div>
    </>)
}

export default UserHistoryCard;