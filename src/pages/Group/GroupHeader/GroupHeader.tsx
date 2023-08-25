import { FC, useCallback, useEffect, useMemo, useState } from 'react';
//logic
import { isUrl } from '@services/UsefulMethods/UIMethods';
import { useParams } from 'react-router-dom';
import { IGetInfoFromGroupResponse } from '@store/Controllers/GroupsController/GroupsControllerInterfaces';
import { useGetInfoByGroupQuery, useLeaveGroupMutation } from '@store/Controllers/GroupsController/GroupsController';
import { useGetCurrentUserInfoQuery, useGetUsersByGroupQuery } from '@store/Controllers/UserController/UserController';
//UI
import classes from './GroupHeader.module.css'
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import userIcon from '@assets/user-icon.svg';
import CustomButton from '@components/Buttons/CustomButton/CustomButton';
import ConfirmationModal from '@components/ModalWindows/ConfirtmationModal/ConfirmationModal';
import { useWindowSize } from 'usehooks-ts';
import MonthPicker from '@components/MonthPicker/MonthPicker';

export interface IPropsGroupHeader {
    groupInfo: IGetInfoFromGroupResponse
}

const GroupHeader: FC<IPropsGroupHeader> = ({ groupInfo }) => {

    const { groupId } = useParams<{ groupId: string }>();
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState<boolean>(false);

    const { data: UsersByGroup, isLoading: isUsersByGroupLoading, isError: isUsersByGroupError } = useGetUsersByGroupQuery({ group_id: Number(groupId) });
    const { data: CurrentUser, isLoading: isCurrentUserLoading, isError: isCurrentUseError } = useGetCurrentUserInfoQuery(null)

    const breadcrumbs = [
        {
            'title': 'Dashboard',
            'link': `/group/${groupId}/`
        },
        {
            'title': 'Members',
            'link': `/group/${groupId}/members/`
        },
        {
            'title': 'History',
            'link': `/group/${groupId}/history/`
        },
    ]
    const handleLeave = () => {
        setIsLeaveModalOpen(!isLeaveModalOpen);
    }

    const getMemberIcons = () => {
        if (UsersByGroup) {
            return UsersByGroup.users_group.map((el, i) =>
                <div key={i} className={classes.avatar}>
                    <img className={classes.photo}
                        alt={'user icon'}
                        src={isUrl(el.user.picture) ? el.user.picture : userIcon}
                    />
                </div>
            ).slice(0, 3)
        } else {
            return []
        }
    }
    const {width, height} = useWindowSize();
    const [groupTitleCustom, setGroupTitleCustom] = useState<string>(groupInfo.title);
    const setGroupTitleCustomCallback = useCallback(() => {
        ((groupInfo.title.length > 12) && (width < 520)) ? 
        setGroupTitleCustom(groupInfo.title.slice(0, 12) + '...') : 
        setGroupTitleCustom(groupInfo.title)
    }, [width])
    const [leaveMode, setLeaveMode] = useState<'leave' | 'disband' | 'kick'>('leave');
    const [buttonName, setButtonName] = useState<string>('Leave group')

    const getMonthPicker = useMemo(() => {
        if(width > 768) return (<>
            <div style={{maxWidth: 'max-content'}}>
                <MonthPicker/>
            </div>
        </>)
        
    }, [width])
    const getLeaveButton = useCallback(() => {
        if (CurrentUser?.id === groupInfo.admin.id) {
            setButtonName('Disband group')
            setLeaveMode('disband')
        } else {
            setButtonName('Leave group')
            setLeaveMode('leave')
        }
    }, [CurrentUser, isCurrentUserLoading, isCurrentUseError,
        UsersByGroup, isUsersByGroupLoading, isUsersByGroupError])

    useEffect(() => {
        getLeaveButton()
        setGroupTitleCustomCallback()
    }, [getLeaveButton, setGroupTitleCustomCallback])

    return (
        <>
            {<ConfirmationModal
                isConfirmationModalOpen={isLeaveModalOpen}
                setIsConfirmationModalOpen={setIsLeaveModalOpen}
                mode={leaveMode}
                groupId={groupInfo.id}
                title={groupInfo.title}
            />}
            <div className={classes.header}>
                <div className={classes.header__container}>
                    <div style={{display: 'flex', gap: '30px'}}>
                        <h2 
                        onClick={() => setGroupTitleCustom(groupInfo.title)}
                        className={`${classes.title} pageTitle`}>{groupTitleCustom}</h2>
                        {getMonthPicker}
                    </div>
                    <nav className={classes.breadcrumbs}>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                        <div className={classes.breadcrumbs__underline}></div>
                    </nav>
                    <div className={classes.header__right}>
                        <div className={classes.members}>
                            {getMemberIcons()}
                            {getMemberIcons().length > 3 ?
                                <div className={classes.avatar}>
                                    <div className={classes.avatarLeftMembers}
                                        style={{ backgroundColor: 'var(--main-green)' }}></div>
                                    <p className={classes.leftMembers}
                                        style={{ color: 'var(--main-green)' }}
                                    >+{getMemberIcons().length - 3}
                                    </p>
                                </div>
                                : null
                            }
                        </div>
                        <CustomButton
                            isPending={false}
                            children={buttonName}
                            btnWidth={120}
                            btnHeight={30}
                            icon={'none'}
                            type="danger"
                            background={'outline'}
                            callback={handleLeave}
                            className={`${classes.leaveButton} btn-danger outline`} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GroupHeader;