import React, { FC } from 'react';
import { Link} from "react-router-dom";
//UI
import classes from './UserGroupsCardItem.module.css';
import IGroup from '@models/IGroup';


const UserGroupsCardItem: FC<Pick<IGroup, 'group'>> = ({group}) => {

    return (
        <li className={classes.item}>
            <Link to={`process.env.REACT_APP_HOST/group/${group.id}`} className={classes.itemInner}>
                <h6 className={classes.expenseName}>{group.title}</h6>
                <div className={classes.icon} style={{ background: group.color_code }}>
                    <i className="bi bi-credit-card-2-front"></i>
                </div>
            </Link>
        </li>
    );
};

export default UserGroupsCardItem;