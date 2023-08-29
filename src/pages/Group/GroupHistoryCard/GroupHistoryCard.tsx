import { FC, ReactNode } from "react";

//UI
import classes from './GroupHistoryCard.module.css';
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';
import { RecentOperationGroupCard } from "@components/RecentOperationsCards/RecentOperationsCards";

//logic
import { Link, useParams } from "react-router-dom";
import GroupHistoryCardLoader from "./GroupHistoryCardLoader";
import ICategory from "@models/ICategory";
import IUser from "@models/IUser";
import { useGetGroupUsersHistoryQuery } from "@store/Controllers/GroupsController/GroupsController";

const GroupHistoryCard: FC = () => {

    const { groupId } = useParams();
    
    const {data: GroupRecentHistory, isError: isGroupRecentHistoryError, isLoading: isGroupRecentHistoryLoading, isFetching: isGroupRecentHistoryFetching, isSuccess: isGroupRecentHistorySuccess} = useGetGroupUsersHistoryQuery({
        group_id: Number(groupId),
        page: 1,
        size: 8
    });

    const getRecentActivities = () => {
        if(GroupRecentHistory && isGroupRecentHistorySuccess){
            const userTimezoneOffsetMinutes = new Date().getTimezoneOffset();
            const userTimezoneOffsetMilliseconds = userTimezoneOffsetMinutes * 60 * 1000;
            let res: ReactNode[] = GroupRecentHistory.items.map((el, i) =>
            <RecentOperationGroupCard
                key={i}
                type={'expense'}
                categoryColor={el.color_code_category|| '#80D667'}
                categoryTitle={el.title_category || 'Salary'}
                member={{
                    id: el.user_id,
                    login: el.user_login,
                    first_name: el.user_first_name,
                    last_name: el.user_last_name,
                    picture: el.user_picture,
                }}
                amount={el.amount}
                time={new Date(new Date(el.time).getTime() - userTimezoneOffsetMilliseconds).toISOString()}></RecentOperationGroupCard>
            ) 
            return res.slice(0,7)
        } else {
            return []
        }
    }

    return (<>
        <div className={classes.HistoryCard}>
            {isGroupRecentHistoryLoading ? <GroupHistoryCardLoader /> :
                <div className={classes.inner}>
                    <h3 className={classes.title}>Recent Activity</h3>
                    <ul>
                        {getRecentActivities()}
                    </ul>
                    { getRecentActivities().length > 7 ?
                        <div key='239k23' className={classes.ViewMore}>
                            <Link to={'/history'}>
                                <div className={classes.ViewMore__inner}>
                                    <p className={classes.ViewMore__title}>View More</p>
                                    <ArrowRight className={classes.ArrowRight} />
                                </div>
                            </Link>
                        </div>
                        :null
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

export default GroupHistoryCard;