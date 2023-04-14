import React, { FC } from 'react';
import { Group } from '@pages/Dashboard/UserGroupsCard/UserGroupsCard';
import { Link} from "react-router-dom";
//UI
import classes from './UserGroupsCardItem.module.css';

interface IUserGroupsCardItemProps {
    group: Group;
}

const UserGroupsCardItem: FC<IUserGroupsCardItemProps> = ({group}) => {

    return (
        <li className={classes.item}>
            <Link to='/' className={classes.itemInner}>
                <h6 className={classes.expenseName}>{group.title}</h6>
                <div className={classes.icon} style={{ background: group.color }}>
                    <i className="bi bi-credit-card-2-front"></i>
                </div>
            </Link>
        </li>
    );
};

export default UserGroupsCardItem;