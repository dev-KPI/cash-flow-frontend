import React, { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction, useEffect, useMemo } from "react";

//UI
import classes from './ConfirmationModal.module.css';
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import IGroup from "@models/IGroup";
import { useLeaveGroupMutation, useRemoveUserMutation } from "@store/Controllers/GroupsController/GroupsController";
import { useNavigate } from "react-router-dom";
import IUser from "@models/IUser";
import { useActionCreators } from "@hooks/storeHooks/useAppStore";
import { TooltipSliceActions } from "@store/UI_store/TooltipSlice/TooltipSlice";
import { useCreateInvitationMutation } from "@store/Controllers/InvitationController/InvitationController";

interface IContfirmationModalProps {
    title?: string
    user?: IUser
    groupId: number
    isConfirmationModalOpen: boolean
    setIsConfirmationModalOpen: Dispatch<SetStateAction<boolean>>;
    mode: 'leave' | 'kick' | 'disband' | 'invite'
}

const ConfirmationModal: FC<IContfirmationModalProps> = ({groupId, title, isConfirmationModalOpen, setIsConfirmationModalOpen, mode, user}) => {

    const navigate = useNavigate();
    const [leaveGroup, { isLoading: isLeavingGroupLoading, isError: isLeavingGroupError, isSuccess: isLeavingGroupSuccess}] = useLeaveGroupMutation();
    const [removeUser, { isLoading: isRemovingUser, isSuccess: isRemoveUserSuccess, isError: isRemoveUserError }] = useRemoveUserMutation();
    const [createInvitation, { isLoading: isInvitationCreating, isError: isInvitationError, isSuccess: isInvitationCreated }] = useCreateInvitationMutation()
    const TooltipDispatch = useActionCreators(TooltipSliceActions)
    
    let headerIcon: ReactNode = <i className="bi bi-boxes"></i>
    let titleModal: string = ''
    let modalText: ReactNode = '';

    const handleSubmit = () => {
        if(mode === 'kick' && user){
            setIsConfirmationModalOpen(false)
            removeUser({ group_id: groupId, user_id: user.id})
        } else if (mode === 'leave' || mode === 'disband') {
            leaveGroup(groupId)
        } else if (mode === 'invite' && user) {
            createInvitation({
                recipient_id: user.id,
                group_id: groupId,
            })
        }
    }

    if (mode === 'leave') {
        headerIcon = <i className= "bi bi-box-arrow-right" ></i>
        titleModal = 'Leave group'
        modalText = <p>Are you sure you want to leave the <span>{title}</span> group?</p>
    } else if (mode === 'kick') {
        headerIcon = <i className="bi bi-person-dash"></i>
        titleModal = 'Remove user'
        modalText = <p>Are you sure you want to remove  <span>{user?.first_name} {user?.last_name}</span> from the group?</p>
    } else if (mode === 'disband') {
        headerIcon = <i className="bi bi-people"></i>
        titleModal = 'Disband group'
        modalText = <p>Are you sure you want to disband your <span>{title}</span> group?</p>
    } else if (mode === 'invite') {
        headerIcon = <i className="bi bi-person-add"></i>
        titleModal = 'Invite user'
        modalText = <p>Are you sure you want to send <span>{user?.first_name} {user?.last_name}</span> an invitation to the group?</p>
    }

    const showToolTip = useCallback(() => {
        if(mode === 'disband'){
            if (isLeavingGroupSuccess) {
                TooltipDispatch.setTooltip({
                    shouldShowTooltip: true,
                    modeTooltip: 'disband',
                    textTooltip: 'You have successfully disbanded the group',
                    status: 'success'
                })
                navigate('/groups')
                setIsConfirmationModalOpen(false)
            } else if(isLeavingGroupError) {
                setIsConfirmationModalOpen(false)
                TooltipDispatch.setTooltip({
                    shouldShowTooltip: true,
                    modeTooltip: 'disband',
                    textTooltip: "You haven't disbanded the group",
                    status: 'error'
                })
            }
        } else if (mode === 'leave'){
            if (isLeavingGroupSuccess) {
                navigate('/groups')
                setIsConfirmationModalOpen(false)
                TooltipDispatch.setTooltip({
                    shouldShowTooltip: true,
                    modeTooltip: 'leave',
                    textTooltip: "You have successfully left from group",
                    status: 'success'
                })
            } else if(isLeavingGroupError) {
                setIsConfirmationModalOpen(false)
                TooltipDispatch.setTooltip({
                    shouldShowTooltip: true,
                    modeTooltip: 'leave',
                    textTooltip: "You haven't left from group",
                    status: 'error'
                })
            }
        } else if(mode === 'kick'){
            if (isRemoveUserSuccess) {
                TooltipDispatch.setTooltip({
                    shouldShowTooltip: true,
                    modeTooltip: 'kick',
                    textTooltip: "You have successfully removed user",
                    status: 'success'
                })
            } else if(isRemoveUserError) {
                TooltipDispatch.setTooltip({
                    shouldShowTooltip: true,
                    modeTooltip: 'kick',
                    textTooltip: "You haven't removed user",
                    status: 'error'
                })
            }
        } else if (mode === 'invite') {
            setIsConfirmationModalOpen(false)
            if (isInvitationCreated) {
                TooltipDispatch.setTooltip({
                    shouldShowTooltip: true,
                    modeTooltip: 'create',
                    textTooltip: "You have successfully invited user",
                    status: 'success'
                })
            } else if (isInvitationError) {
                TooltipDispatch.setTooltip({
                    shouldShowTooltip: true,
                    modeTooltip: 'create',
                    textTooltip: "You haven't invited user",
                    status: 'error'
                })
            }
        }
    }, [mode, leaveGroup, isLeavingGroupError, isLeavingGroupSuccess,
        removeUser, isRemoveUserSuccess, isRemoveUserError,
        isInvitationCreated, isInvitationError, createInvitation])

    useEffect(() => {
        showToolTip()
    }, [showToolTip])

    return <div>
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