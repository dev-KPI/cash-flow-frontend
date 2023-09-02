import React, { FC, useEffect, useState } from 'react';

//UI
import classes from './GroupInfoCard.module.css';
import { isUrl, numberWithCommas } from '@services/UsefulMethods/UIMethods';
import userIcon from '@assets/user-icon.svg';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import GroupInfoCardLoader from './GroupInfoCardLoader';
import { IGetInfoFromGroupResponse } from '@store/Controllers/GroupsController/GroupsControllerInterfaces';
import GroupModal from '@components/ModalWindows/GroupModal/GroupModal';

interface IGroupInfoCard {
    isAdmin: boolean
    groupInfo: IGetInfoFromGroupResponse
    isInfoLoading: boolean
}

const GroupInfoCard: FC<IGroupInfoCard> = ({isAdmin, groupInfo, isInfoLoading}) => {

    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const [isEditGroupModal, setIsEditGroupModal] = useState<boolean>(false);

    const { id, title, description, color_code, icon_url } = groupInfo;
    const { members, expenses  } = groupInfo;
    const descriptionModded  = description.length > 150 ? description.slice(0, 180) + '...' : description;

    return (
        <div className={classes.GroupInfoCard}>
            {
                <GroupModal
                group={groupInfo}
                groupId={groupInfo.id}
                setGroupId={() => {}}
                isGroupModalOpen={isEditGroupModal}
                setIsGroupModalOpen={setIsEditGroupModal}
                mode='edit'
                />
            }
            {isInfoLoading ? <GroupInfoCardLoader /> :
                <div className={classes.inner}>
                    {
                        isAdmin ? <button 
                        onClick={() => setIsEditGroupModal(true)}
                        className={classes.adminEditButton}>
                            <i className={"bi bi-pencil"}></i>
                        </button> : null
                    }
                    <div className={classes.avatar}>
                        <div className={classes.icon}
                            style={{ backgroundColor: color_code }}>
                            <i className={groupInfo.icon_url}></i>
                        </div>
                    </div>
                    <div className={classes.group__info}>
                        <h4 className={classes.title}>{title}</h4>
                        <ul className={classes.details}>
                            <li className={classes.detailItem}>
                                <p className={classes.detailNumber}>{members}</p>
                                <p className={classes.detailTitle}>Members</p>
                            </li>
                            <li className={classes.detailItem}>
                                <p className={classes.detailNumber}>{expenses}</p>
                                <p className={classes.detailTitle}>Expenses</p>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.description}>{descriptionModded}</div>
                </div>}
        </div>
    )
}
export default GroupInfoCard