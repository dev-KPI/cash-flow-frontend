import React, { FC } from 'react';

import userIcon from '@assets/user-icon.svg';
import { isUrl } from '@services/UsefulMethods/UIMethods';
//UI
import classes from './GroupListItem.module.css'


interface IGroupItemProps {
    title: string,
    description: string,
    icon: string,
    adminName: string,
    adminEmail: string,
    color: string,
    memberIcons: string[]
}
const GroupItem: FC<IGroupItemProps> = ({ title, description, icon, adminName, adminEmail, color, memberIcons }) => {
    description = description.length > 150 ? description.slice(0, 120) + '...' : description;

    const getMemberIcons = () => {
        return memberIcons.map((icon, i) => 
            <div className={classes.avatar}>
                <img className={classes.photo}
                    alt={'user icon'}
                    src={isUrl(icon) ? icon : userIcon}
                />
            </div>
        ).slice(0,3)
    }

    const getAdminIcon = () => {
        return isUrl(icon) ? 
            <img className={classes.photo}
                alt={'user icon'}
                src={icon}/>
            :
            <i className={"bi bi-people"}></i>
    }

    return (
        <div className={classes.group}>
            <h4 className={classes.title}>{title}</h4>
            <div className={classes.content}>
                <div className={classes.details}>
                    <div className={classes.icon}
                        style={{ backgroundColor: color }}
                    >{getAdminIcon()}</div>
                    <div className={classes.info}>
                        <h6 className={classes.ownerName}>{adminName}</h6>
                        <p className={classes.ownerEmail}>{adminEmail}</p>
                    </div>
                </div>
                <div className={classes.description}>{description}</div>
                <div className={classes.contentBottom}>
                    <div className={classes.members}>
                        {getMemberIcons()}
                        {memberIcons.length > 3 ? 
                            <div className={classes.avatar}>
                                <div className={classes.avatarLeftMembers}
                                    style={{ backgroundColor: color }}></div>
                                <p className={classes.leftMembers}
                                    style={{ color: color }}
                                >+{memberIcons.length-3}
                                </p>
                            </div>
                            :null
                        }
                    </div>
                    <button className={classes.moreBtn}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupItem;