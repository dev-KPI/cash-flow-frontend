import React, { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction, useEffect, useMemo } from "react";

//UI
import classes from './ConfirmationModal.module.css';
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import { toast } from "react-toastify";
//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import IGroup from "@models/IGroup";
import { useLeaveGroupMutation, useRemoveUserMutation } from "@store/Controllers/GroupsController/GroupsController";
import { useNavigate } from "react-router-dom";
import IUser from "@models/IUser";
import { useActionCreators } from "@hooks/storeHooks/useAppStore";
import { useDeleteExpenseByGroupMutation } from "@store/Controllers/ExpensesController/ExpensesController";
import { useDeleteReplenishmentByIdMutation } from "@store/Controllers/ReplenishmentController/ReplenishmentController";
import { notify } from "src/App";

type IContfirmationModalProps = {
    title?: string;
    isConfirmationModalOpen: boolean;
    setIsConfirmationModalOpen: Dispatch<SetStateAction<boolean>>;
} & (
    | {mode: 'kick', kickedUser: IUser, groupId: number, expenseId?: never, callback?: never, replenishmentId?: never}
    | {mode: 'leave' | 'disband', kickedUser?: IUser, groupId: number, expenseId?: never, callback?: never, replenishmentId?: never}
    | {mode: 'remove_expense', kickedUser?: never, groupId: number, expenseId: number, callback: () => void, replenishmentId?: never}
    | {mode: 'remove_replenishment', kickedUser?: never, groupId?: never, expenseId?: never, callback: () => void, replenishmentId: number}
)

const ConfirmationModal: FC<IContfirmationModalProps> = ({groupId, 
    expenseId, title, isConfirmationModalOpen, 
    setIsConfirmationModalOpen, mode, kickedUser,
    callback, replenishmentId}) => {

    const navigate = useNavigate();
    const [leaveGroup, { isLoading: isLeavingGroupLoading}] = useLeaveGroupMutation();
    const [removeUser, { isLoading: isRemovingUser}] = useRemoveUserMutation();
    const [removeExpense, {isLoading: isRemovingExpenseLoading}] = useDeleteExpenseByGroupMutation();
    const [removeReplenishment, {isLoading: isRemovingReplenishmentLoading}] = useDeleteReplenishmentByIdMutation();
    
    let headerIcon: ReactNode = <i className="bi bi-boxes"></i>
    let titleModal: string = ''
    let modalText: ReactNode = '';

    if (mode === 'leave') {
        headerIcon = <i className= "bi bi-box-arrow-right" ></i>
        titleModal = 'Leave group'
        modalText = <p>Are you sure you want to leave the <span>{title}</span> group?</p>
    } else if (mode === 'kick') {
        headerIcon = <i className="bi bi-person-dash"></i>
        titleModal = 'Remove user'
        modalText = <p>Are you sure you want to remove  <span>{kickedUser?.first_name} {kickedUser?.last_name}</span> from the group?</p>
    } else if (mode === 'disband') {
        headerIcon = <i className="bi bi-people"></i>
        titleModal = 'Disband group'
        modalText = <p>Are you sure you want to disband your <span>{title}</span> group?</p>
    } else if (mode === 'remove_expense') {
        headerIcon = <i className="bi bi-trash"></i>
        titleModal = 'Remove expense'
        modalText = <p>Are you sure you want to remove <span>{title}</span> expense?</p>
    } else if (mode === 'remove_replenishment') {
        headerIcon = <i className="bi bi-trash"></i>
        titleModal = 'Remove replenishment'
        modalText = <p>Are you sure you want to remove <span>{title}</span> replenishment?</p>
    }

    const onLeaveGroup = async () => {
        if (groupId && !isLeavingGroupLoading && (mode === 'disband' || 'leave')) {
            try {
                const isLeavedGroup = await leaveGroup(groupId || 0).unwrap()
                if (isLeavedGroup) {
                    if (mode === 'disband') {
                        notify('success', `You disbanded the ${title} group`)
                    } else if (mode === 'leave') {
                        notify('success', `You left from the ${title} group`)
                    }
                    navigate('/groups')
                }
            } catch (err) {
                if (mode === 'disband') {
                    console.error(`Failed to disband the ${title} group: `, err)
                    notify('error', `You haven't disbanded the ${title} group`)
                } else if (mode === 'leave') {
                    console.error(`Failed to leave from the ${title} group: `, err)
                    notify('error', `You haven't left from the ${title} group`)
                }
            }
        }
    }
    const onRemoveUser = async () => {
        if (groupId && kickedUser && !isRemovingUser && mode === 'kick') {
            try {
                const isRemovedUser = await removeUser({group_id: groupId, user_id: kickedUser.id}).unwrap()
                if (isRemovedUser) {
                    notify('success', `You removed ${kickedUser.first_name + kickedUser.last_name ? (' ' + kickedUser.last_name) : ''} from the group`)
                }
            } catch (err) {
                console.error('Failed to remove user from the group: ', err)
                notify('error', `You haven't removed ${kickedUser.first_name + kickedUser.last_name ? (' ' + kickedUser.last_name) : ''}`)
            }
        }
    }
    const onRemoveExpense = async () => {
        if (groupId && expenseId && !isRemovingExpenseLoading && mode === 'remove_expense') {
            try {
                const isRemovedExpense = await removeExpense({group_id: groupId, expense_id: expenseId}).unwrap()
                if (isRemovedExpense) {
                    notify('success', `You removed expense`)
                }
            } catch (err) {
                console.error('Failed to remove expense: ', err)
                notify('error', `You haven't removed expense`)
            }
        }
    }
    const onRemoveReplenishment = async () => {
        if (replenishmentId && !isRemovingReplenishmentLoading && mode === 'remove_replenishment') {
            try {
                const isRemovedReplenishment = await removeReplenishment({id: replenishmentId})
                if (isRemovedReplenishment) {
                    notify('success', `You removed replenishment`)
                }
            } catch (err) {
                console.error('Failed to remove replenishment: ', err)
                notify('error', `You haven't removed replenishment`)
            }
        }
    }

    const handleSubmit = () => {
        if(mode === 'kick' && kickedUser){
            setIsConfirmationModalOpen(false)
            onRemoveUser()
        } else if (mode === 'leave' || mode === 'disband') {
            setIsConfirmationModalOpen(false)
            onLeaveGroup()
        } else if (mode === 'remove_expense') {
            setIsConfirmationModalOpen(false)
            onRemoveExpense()
        } else if (mode === 'remove_replenishment') {
            setIsConfirmationModalOpen(false)
            onRemoveReplenishment()
        }
    }

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