import React, { FC, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { isUrl } from '@services/UsefulMethods/UIMethods';
import uuid from 'react-uuid';
//UI
import classes from './GroupListItem.module.css'
import SmallModal from '@components/ModalWindows/SmallModal/SmallModal';
import EditGroupModal from '@components/ModalWindows/GroupModal/EditGroupModal';
import userIcon from '@assets/user-icon.svg';
import GroupListItemLoader from './GroupListItemLoader';



interface IGroupItemProps {
    id: number;
    title: string,
    description: string,
    icon: string,
    adminName: string,
    adminEmail: string,
    color: string,
    memberIcons: string[]
}
const GroupItem: FC<IGroupItemProps> = ({ id, title, description, icon, adminName, adminEmail, color, memberIcons }) => {
    const [isGroupModal, setIsGroupModal] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const buttonRef = useRef(null);
    const navigate = useNavigate()

    description = description.length > 150 ? description.slice(0, 120) + '...' : description;
    const getMemberIcons = () => {
        return memberIcons.map((icon, i) => 
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

    const getAdminIcon = () => {
        return isUrl(icon) ? 
            <img className={classes.photo}
                alt={'user icon'}
                src={icon}/>
            :
            <i className={"bi bi-people"}></i>
    }
    setTimeout(() => {
        setLoading(false)
    }, 1500);
    return (
        <div className={classes.group}>
            {loading ? <GroupListItemLoader /> : 
                <>
                    <SmallModal
                        active={isModalOpen}
                        setActive={setIsModalOpen}
                        className={classes.modal}
                        title='User'
                        buttonRef={buttonRef}
                        disableHeader={true}
                        children={
                            <ul className={classes.List}>
                                <li className={classes.item}>
                                    <button className={classes.itemWrapper}
                                        onClick={() => navigate(`/group/${id}`)}>
                                        <i className="bi bi-eye"></i>
                                        <h6 className={classes.itemTitle}>View</h6>
                                    </button>
                                </li>
                                <li className={classes.item}>
                                    <button className={classes.itemWrapper}
                                        onClick={(e) => { e.preventDefault(); setIsGroupModal(!isGroupModal) }}>
                                        <i className="bi bi-pencil"></i>
                                        <h6 className={classes.itemTitle}>Edit</h6>
                                    </button>
                                </li>
                                <li className={classes.item}>
                                    <button className={classes.itemWrapper}
                                        style={{ color: 'var(--main-red)' }}
                                        onClick={(e) => { e.preventDefault(); }}>
                                        <i className="bi bi-box-arrow-left"></i>
                                        <h6 className={classes.itemTitle} style={{ color: 'var(--main-red)' }}>Leave</h6>
                                    </button>
                                </li>
                            </ul>}
                    />
                    <EditGroupModal
                        setIsGroupModalOpen={setIsGroupModal}
                        isGroupModalOpen={isGroupModal}
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
                                        {memberIcons.length > 3 ?
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
                                        onClick={(e) => { e.preventDefault(); setIsModalOpen(!isModalOpen) }}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                </>}
        </div>   
    );
};

export default GroupItem;