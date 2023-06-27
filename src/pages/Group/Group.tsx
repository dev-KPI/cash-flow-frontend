
import React from 'react';

import { GroupObj } from '@pages/Groups/GroupObj';

import { isUrl } from '@services/UsefulMethods/UIMethods';
import { IGroup } from '@pages/Groups/GroupsPage';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//UI
import classes from './Group.module.css';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import CustomButton from '@components/Buttons/CustomButton/CustomButton';
import OperationCard from '@components/OperationCard/OperationCard';
import GroupCategoriesCard from './GroupCategoriesCard/GroupCategoriesCard';
import GroupSpendersCard from './GroupSpendersCard/GroupSpendersCard';
import GroupInfoCard from './GroupInfoCard/GroupInfoCard';
import SearchBar from '@components/SearchBar/SearchBar';
import GroupChartsCard from './GroupChartsCard/GroupChartsCard';
import GroupGraphCard from './GroupGraphCard/GroupGraphCard';
import GroupHistoryCard from './GroupHistoryCard/GroupHistoryCard';
import userIcon from '@assets/user-icon.svg';


const Group = () => {
    const { groupId } = useParams();
    
    return (
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
    );
};

export default Group;