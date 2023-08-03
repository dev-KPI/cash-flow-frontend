import React, { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction, useEffect } from "react";

//UI
import classes from './ConfirmationModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";

//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";
import IGroup from "@models/IGroup";
import { useLeaveGroupMutation } from "@store/Controllers/GroupsController/GroupsController";
import { useNavigate } from "react-router-dom";

interface IContfirmationModalProps {
    title?: string
    kickedUserName?: string
    groupId: number
    isConfirmationModalOpen: boolean
    setIsConfirmationModalOpen: Dispatch<SetStateAction<boolean>>;
    mode: 'leave' | 'kick' | 'disband'
}

const ConfirmationModal: FC<IContfirmationModalProps> = ({groupId, title, isConfirmationModalOpen, setIsConfirmationModalOpen, mode, kickedUserName = 'Unknown Unkown'}) => {

    const [leaveGroup, {isLoading: isLeavingGroupLoading, isError: isLeavingGroupError, isSuccess: isLeavingGroupSuccess}] = useLeaveGroupMutation();
    const navigate = useNavigate();
    
    let headerIcon: ReactNode = <i className="bi bi-boxes"></i>
    let titleModal: string = ''
    let modalText: ReactNode = '';

    const handleSubmit = () => {
        if(mode === 'kick'){
        }else if (mode === 'leave' || mode === 'disband') {
            leaveGroup(groupId)
        }
    }
    
    const showToolTip = useCallback(() => {
        if(mode === 'leave'){
            if (!isLeavingGroupLoading && isLeavingGroupSuccess) {
                setIsConfirmationModalOpen(false)
                navigate('/groups')
                return <StatusTooltip
                    type="success"
                    title="You have successfully left the group" />
            } else if(!isLeavingGroupLoading && isLeavingGroupError) {
                setIsConfirmationModalOpen(false)
                navigate('/groups')
                return <StatusTooltip
                    type="error"
                    title={"You haven`t left the group"} />
            }
        } else if(mode === 'disband'){
            if (!isLeavingGroupLoading && isLeavingGroupSuccess) {
                setIsConfirmationModalOpen(false)
                navigate('/groups')
                return <StatusTooltip
                    type="success"
                    title="You have successfully left the group" />
            } else if(!isLeavingGroupLoading && isLeavingGroupError) {
                setIsConfirmationModalOpen(false)
                navigate('/groups')
                return <StatusTooltip
                    type="error"
                    title={"You haven`t left the group"} />
            }
        }
    }, [leaveGroup, isLeavingGroupLoading, isLeavingGroupError, isLeavingGroupSuccess])

    if (mode === 'leave') {
        headerIcon = <i className= "bi bi-box-arrow-right" ></i>
        titleModal = 'Leave group'
        modalText = <p>Are you sure you want to leave the <span>{title}</span> group?</p>
    } else if (mode === 'kick') {
        headerIcon = <i className="bi bi-person-dash"></i>
        titleModal = 'Remove user'
        modalText = <p>Are you sure you want to remove <span>{kickedUserName}</span> from the group?</p>
    } else if (mode === 'disband') {
        headerIcon = <i className="bi bi-people"></i>
        titleModal = 'Disband group'
        modalText = <p>Are you sure you want to disband your <span>{title}</span> group?</p>
    }

    return <>
        {showToolTip()}
        <UsePortal
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
                        isPending={isLeavingGroupLoading}
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
    </>
};

export default React.memo(ConfirmationModal);