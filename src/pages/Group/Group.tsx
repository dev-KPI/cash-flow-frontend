import React from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//UI
import classes from './Group.module.css';
import OperationCard from '@components/OperationCard/OperationCard';
import GroupCategoriesCard from '@pages/Group/GroupCategoriesCard/GroupCategoriesCard';
import GroupSpendersCard from '@pages/Group/GroupSpendersCard/GroupSpendersCard';
import GroupInfoCard from '@pages/Group/GroupInfoCard/GroupInfoCard';
import SearchBar from '@components/SearchBar/SearchBar';
import GroupChartsCard from '@pages/Group/GroupChartsCard/GroupChartsCard';
import GroupGraphCard from '@pages/Group/GroupGraphCard/GroupGraphCard';
import GroupHistoryCard from '@pages/Group/GroupHistoryCard/GroupHistoryCard';


const Group = () => {
    const { groupId } = useParams();

    return (<>
        <main id='GroupPage'>
            <div className={classes.page__container}>
                <div className={classes.grid}>
                    <GroupCategoriesCard />
                    <div className={classes.search}>
                        <div className={classes.searchTop}>
                            <h3 className={classes.cardTitle}>Members</h3>
                            <NavLink
                                to={`/group/${groupId}/member/1`}
                                className={classes.membersLink}
                                >
                                See all
                            </NavLink>
                        </div>
                        
                        <SearchBar/>
                    </div>
                    
                    <div className={classes.grid__operation}>
                        <OperationCard operation={'Income'} />
                        <OperationCard operation={'Expenses'} />
                    </div>
                    <GroupSpendersCard />
                    <GroupInfoCard />
                    <GroupChartsCard />
                    <GroupGraphCard />
                    <GroupHistoryCard/>
                </div>
            </div>
        </main>
        </>);
};

export default Group;