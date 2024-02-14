import { FC, ReactNode } from "react";
import { Link, useParams } from "react-router-dom";

//UI
import classes from './GroupHistoryCard.module.css';
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';
import { RecentOperationGroupCard } from "@components/RecentOperationsCards/RecentOperationsCards";

//logic
import GroupHistoryCardLoader from "./GroupHistoryCardLoader";
import { useGetGroupUsersHistoryQuery } from "@store/Controllers/GroupsController/GroupsController";

const GroupHistoryCard: FC = () => {

    const { groupId } = useParams<{ groupId: string }>();
    
    const {data: GroupRecentHistory, isError: isGroupRecentHistoryError, isLoading: isGroupRecentHistoryLoading, isFetching: isGroupRecentHistoryFetching, isSuccess: isGroupRecentHistorySuccess} = useGetGroupUsersHistoryQuery({
        group_id: Number(groupId),
        page: 1,
        size: 8
    });
    const activitiesLength = GroupRecentHistory?.total || 0;
    const getRecentActivities = () => {
        if(GroupRecentHistory && isGroupRecentHistorySuccess){
            let res: ReactNode[] = GroupRecentHistory.items.slice(0, 7).map((el, i) =>
            <RecentOperationGroupCard
                    key={i}
                    groupId={Number(groupId)}
                    item={el}
                ></RecentOperationGroupCard>
            ) 
            return res
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
                    {activitiesLength > 7 ?
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
                        activitiesLength === 0 ?
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