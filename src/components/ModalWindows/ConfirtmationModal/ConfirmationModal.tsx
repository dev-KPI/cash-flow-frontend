import React, { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction, useEffect, useMemo } from "react";

//UI
import classes from './ConfirmationModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";

//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";
import IGroup from "@models/IGroup";
import { useLeaveGroupMutation, useRemoveUserMutation } from "@store/Controllers/GroupsController/GroupsController";
import { useNavigate } from "react-router-dom";
import IUser from "@models/IUser";

interface IContfirmationModalProps {
    title?: string
    kickedUser?: IUser
    groupId: number
    isConfirmationModalOpen: boolean
    setIsConfirmationModalOpen: Dispatch<SetStateAction<boolean>>;
    mode: 'leave' | 'kick' | 'disband'
}

const ConfirmationModal: FC<IContfirmationModalProps> = ({groupId, title, isConfirmationModalOpen, setIsConfirmationModalOpen, mode, kickedUser}) => {

    const navigate = useNavigate();
    const [leaveGroup, { isLoading: isLeavingGroupLoading, isError: isLeavingGroupError, isSuccess: isLeavingGroupSuccess}] = useLeaveGroupMutation();
    const [removeUser, { isLoading: isRemovingUser, isSuccess: isRemoveUserSuccess, isError: isRemoveUserError}] = useRemoveUserMutation();
    
    let headerIcon: ReactNode = <i className="bi bi-boxes"></i>
    let titleModal: string = ''
    let modalText: ReactNode = '';

    const handleSubmit = () => {
        if(mode === 'kick' && kickedUser){
            setIsConfirmationModalOpen(false)
            removeUser({group_id: groupId, user_id: kickedUser.id})
        } else if (mode === 'leave' || mode === 'disband') {
            navigate('/groups')
            setIsConfirmationModalOpen(false)
            leaveGroup(groupId)
        }
    }

    if (mode === 'leave') {
        headerIcon = <i className= "bi bi-box-arrow-right" ></i>
        titleModal = 'Leave group'
        modalText = <p>Are you sure you want to leave the <span>{title}</span> group?</p>
    } else if (mode === 'kick') {
        headerIcon = <i className="bi bi-person-dash"></i>
        titleModal = 'Remove user'
        modalText = <p>Are you sure you want to remove {kickedUser?.first_name} {kickedUser?.last_name} from the group?</p>
    } else if (mode === 'disband') {
        headerIcon = <i className="bi bi-people"></i>
        titleModal = 'Disband group'
        modalText = <p>Are you sure you want to disband your <span>{title}</span> group?</p>
    }

    const showToolTip = useMemo(() => {
        if(mode === 'disband'){
            if (isLeavingGroupSuccess) {
                return <StatusTooltip
                type="success"
                title={"You have successfully disband the group"} />
            } else if(isLeavingGroupError) {
                return <StatusTooltip
                type="error"
                title={"You haven't disband the group"} />
            }
        } else if (mode === 'leave'){
            if (isLeavingGroupSuccess) {
                return <StatusTooltip
                type="success"
                title={"You have successfully left from group"} />
            } else if(isLeavingGroupError) {
                return <StatusTooltip
                type="error"
                title={"You haven't left from group"} />
            }
        } else if(mode === 'kick'){
            if (isRemoveUserSuccess) {
                return <StatusTooltip
                    type="success"
                    title={"You have successfully removed user"} />
            } else if(isRemoveUserError) {
                return <StatusTooltip
                    type="error"
                    title={"You haven't removed user"} />
            }
        }
    }, [mode, leaveGroup, isLeavingGroupError, isLeavingGroupSuccess,
        removeUser, isRemoveUserSuccess, isRemoveUserError])

    return <div>
        {showToolTip}
        <UsePortal
            callback={() => {}}
            setIsModalOpen={setIsConfirmationModalOpen}
            isModalOpen={isConfirmationModalOpen}
            headerIcon={headerIcon}
            title={titleModal}
            containerWidth={500}
        >
            <form
                onSubmit={handleSubmit}>
                <div className={classes.modal__wrapper}>
                    <p className={classes.text}>{modalText}</p>
                </div>
                <div className={classes.confirmBtnWrapper}>
                    <CustomButton
                        isPending={isLeavingGroupLoading || isRemovingUser}
                        children="Confirm"
                        btnWidth={170}
                        btnHeight={36}
                        icon="submit"
                        type='primary'
                        callback={handleSubmit}
                        />
                    <CustomButton
                        isPending={false}
                        children="Cancel"
                        btnWidth={170}
                        btnHeight={36}
                        icon="refuse"
                        type='danger'
                        callback={() => { setIsConfirmationModalOpen(false) }}
                    />
                </div>
            </form>
        </UsePortal>
    </div>
};

export default React.memo(ConfirmationModal);