import React, { FC } from 'react';
import { Link} from "react-router-dom";
//UI
import classes from './UserGroupsCardItem.module.css';
import IGroup from '@models/IGroup';
//logic
import { isValidHex, isValidIcon } from '@services/UsefulMethods/UIMethods';


const UserGroupsCardItem: FC<Pick<IGroup, 'group'>> = ({group}) => {
    const color = isValidHex(group.color_code)
    const icon = isValidIcon(group.icon_url);
    return (
        <li className={classes.item}>
            <Link to={`/group/${group.id}`} className={classes.itemInner}>
                <h6 className={classes.expenseName}>{group.title.length > 12 ? group.title.slice(0,12) : group.title}</h6>
                <div className={classes.icon} style={{ background: color + 'B3' }}>
                    <i className={icon}></i>
                </div>
            </Link>
        </li>
    );
};

export default UserGroupsCardItem;