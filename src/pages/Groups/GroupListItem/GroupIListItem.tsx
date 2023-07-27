import React, { FC, SetStateAction, useCallback, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//logic
import { useGetUsersByGroupQuery, useLeaveGroupMutation } from '@store/Controllers/GroupsController/GroupsController';
import { isUrl } from '@services/UsefulMethods/UIMethods';
import uuid from 'react-uuid';
import SmallModal from '@components/ModalWindows/SmallModal/SmallModal';
//UI
import classes from './GroupListItem.module.css'
import userIcon from '@assets/user-icon.svg';
import GroupListItemLoader from './GroupListItemLoader';
import StatusTooltip from '@components/StatusTooltip/StatusTooltip';

interface IGroupItemProps {
    id: number;
    title: string,
    description: string,
    icon: string,
    adminName: string,
    adminEmail: string,
    color: string,
    isEditGroupModal: boolean,
    setIsEditGroupModal: React.Dispatch<SetStateAction<boolean>>,
    isGroupLoading: boolean,
    setGroupId: React.Dispatch<SetStateAction<number>>
}
const GroupItem: FC<IGroupItemProps> = ({ id, 
    title, description, icon, adminName, 
    adminEmail, color, isEditGroupModal, setIsEditGroupModal, setGroupId
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const buttonRef = useRef(null);
    const navigate = useNavigate();


    const [leaveGroup, { isLoading: isLeavingGroup, isSuccess: isLeavedGroup, isError: isLeavingGroupError},] = useLeaveGroupMutation();
    const {data: UsersInGroup, isFetching: isUsersInGroupFetching, isError: isUsersInGroupError} = useGetUsersByGroupQuery({group_id: id});

    description = description.length > 150 ? description.slice(0, 120) + '...' : description;
    const memberIcons = (): string[] => {
        if(!isUsersInGroupError && !isUsersInGroupFetching && UsersInGroup?.users_group[0]?.user) {
            return UsersInGroup.users_group.map(el => el.user.picture);
        } else {
            return ['']
        } 
    }
    const getMemberIcons = () => {
        if(!isUsersInGroupError && !isUsersInGroupFetching && UsersInGroup?.users_group[0]?.user){
            return memberIcons().map((icon, i) => 
                <div
                    className={classes.avatar}
                    key={i}
                >
                    <img className={classes.photo}
                        alt={'user icon'}
                        src={isUrl(icon) ? icon : userIcon}
                    />
                </div>
            ).slice(0,3)
        }
    }

    const getAdminIcon = () => {
        return isUrl(icon) ? 
            <img className={classes.photo}
                alt={'user icon'}
                src={icon}/>
            :
            <i className={"bi bi-people"}></i>
    }
    
    const showToolTip = useCallback(() => {
        if (isLeavedGroup) {
            return <StatusTooltip
            type="success" 
            title={`You leaved from ${title} group`}/>
        } else if(isLeavingGroupError) {
            return <StatusTooltip
            type="error" 
            title={`You not leaved from ${title} group`}/>
        }
    }, [leaveGroup, isLeavedGroup, isLeavingGroup, isLeavingGroupError])

    return (
        <div className={classes.group}>
            {showToolTip()}
            {UsersInGroup?.users_group[0] && !isUsersInGroupFetching ? 
                <>
                    <SmallModal
                        active={isMenuOpen}
                        setActive={setIsMenuOpen}
                        className={classes.modal}
                        title='User'
                        buttonRef={buttonRef}
                        disableHeader={true}
                        children={
                            <ul className={classes.List}>
                                <li className={classes.item}
                                    onClick={() => navigate(`/group/${id}`)}
                                >
                                    <i className="bi bi-eye"></i>
                                    <h6 className={classes.itemTitle}>View</h6>
                                </li>
                                <li className={classes.item}
                                    onClick={(e) => { e.preventDefault(); setGroupId(id); setIsEditGroupModal(!isEditGroupModal) }}
                                >
                                    <i className="bi bi-pencil"></i>
                                    <h6 className={classes.itemTitle}>Edit</h6>
                                </li>
                                <li className={classes.item}
                                    style={{ color: 'var(--main-red)' }}
                                    onClick={(e) => { e.preventDefault(); leaveGroup(id)}}
                                >
                                    <i className="bi bi-box-arrow-left"></i>
                                    <h6 className={classes.itemTitle} style={{ color: 'var(--main-red)' }}>Leave</h6>
                                </li>
                            </ul>}
                    />
                    <Link
                        key={uuid()}
                        to={`/group/${id}`}
                    >
                        <div className={classes.inner}>
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
                                        {memberIcons().length > 3 ?
                                            <div className={classes.avatar}>
                                                <div className={classes.avatarLeftMembers}
                                                    style={{ backgroundColor: color }}></div>
                                                <p className={classes.leftMembers}
                                                    style={{ color: color }}
                                                >+{memberIcons.length - 3}
                                                </p>
                                            </div>
                                            : null
                                        }
                                    </div>
                                    <button className={classes.moreBtn}
                                        ref={buttonRef}
                                        onClick={(e) => { e.preventDefault(); setIsMenuOpen(!isMenuOpen) }}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                </> : <GroupListItemLoader/>}
        </div>   
    );
};

export default GroupItem;