
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
    const { id } = useParams();
    const breadcrumbs = [
        {
            'title': 'Dashboard',
            'link': '/group'
        },
        {
            'title': 'Members',
            'link': '/group/member/1'
        },
        {
            'title': 'History',
            'link': '/group/history'
        },
    ]
    const handleSubmit = () => {
        console.log(1);
    }
    let groups: IGroup[] = GroupObj;
    const memberIcons = groups[2].group.members.map(member => member.picture);
    const getMemberIcons = () => {
        return memberIcons.map((icon, i) =>
            <div key={i} className={classes.avatar}>
                <img className={classes.photo}
                    alt={'user icon'}
                    src={isUrl(icon) ? icon : userIcon}
                />
            </div>
        ).slice(0, 3)
    }
    
    return (
        <main id='GroupPage'>
            <div className={classes.header}>
                <div className={classes.header__container}>
                    <h1 className={`${classes.title} pageTitle`}>Group</h1>
                    <nav className={classes.breadcrumbs}>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </nav>
                    <div className={classes.header__right}>
                        <div className={classes.members}>
                            {getMemberIcons()}
                            {memberIcons.length > 3 ?
                                <div className={classes.avatar}>
                                    <div className={classes.avatarLeftMembers}
                                        style={{ backgroundColor: 'var(--main-green)' }}></div>
                                    <p className={classes.leftMembers}
                                        style={{ color: 'var(--main-green)' }}
                                    >+{memberIcons.length - 3}
                                    </p>
                                </div>
                                : null
                            }
                        </div>
                        <CustomButton
                            isPending={false}
                            children="Leave group"
                            btnWidth={120}
                            btnHeight={30}
                            icon={'none'}
                            type="danger"
                            background={'outline'}
                            callback={handleSubmit}
                            className={`${classes.leaveButton} btn-danger outline`} />
                    </div>
                </div>
            </div>
            <div className={classes.page__container}>
                <div className={classes.grid}>
                    <GroupCategoriesCard />
                    <div className={classes.search}>
                        <div className={classes.searchTop}>
                            <h3 className={classes.cardTitle}>Members</h3>
                            <NavLink
                                to="/group/members"
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