import React, { FC, Dispatch, SetStateAction, ReactNode, useState, useCallback, useEffect, useMemo} from "react";

//UI
import classes from './GroupModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import Accordion, { AccordionTab } from "@components/Accordion/Accordion";
import ConfirmationModal from "../ConfirtmationModal/ConfirmationModal";
import { notify } from "src/App";
//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import { IGetInfoFromGroupResponse } from "@store/Controllers/GroupsController/GroupsControllerInterfaces";
import { useActionCreators, useAppSelector } from "@hooks/storeHooks/useAppStore";
import { TooltipSliceActions } from "@store/UI_store/TooltipSlice/TooltipSlice";
import { useCreateGroupMutation, useLeaveGroupMutation, useUpdateGroupMutation } from "@store/Controllers/GroupsController/GroupsController";
import { customColors, customIcons } from "@services/UsefulMethods/UIMethods";

interface IGroupModalProps{
    groupId?: number,
    group?: IGetInfoFromGroupResponse,
    setGroupId: Dispatch<SetStateAction<number>>,
    isGroupModalOpen: boolean
    setIsGroupModalOpen: Dispatch<SetStateAction<boolean>>;
    mode: 'create' | 'edit' | 'disband' | 'leave',
}

const GroupModal: FC<IGroupModalProps> = ({ isGroupModalOpen, setIsGroupModalOpen, mode, groupId, setGroupId, group }) => {
    
    const TooltipDispatch = useActionCreators(TooltipSliceActions);
    
    const headerIcon: ReactNode = <i className="bi bi-boxes"></i>
    const titleModal = 'Group'
    const [isConfirmationModal, setIsConfirmationModal] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isInputError, setIsInputError] = useState<boolean>(false);
    //pickers
    const [nameValue, setNameValue] = useState<string>('');
    const [descValue, setDescValue] = useState<string>('');
    const [pickedColor, setPickedColor] = useState<string>('#FF2D55');
    const changeColor = (e: React.MouseEvent<HTMLDivElement>, color: string) => {setPickedColor(color)};
    const light = <div style={{backgroundColor: pickedColor, boxShadow: '0px 0px 8px ' + pickedColor}} className={classes.colorPicked}></div>

    const [icon, setIcon] = useState<string>('bi bi-people');
    const changeIcon = (e: React.MouseEvent<HTMLDivElement>, icon: string) => {setIcon(icon)};
    const iconDisplayed = <i style={{fontSize: '24px', color: 'var(--main-text)'}} className={icon}></i>

    const [createGroup, { isLoading: isGroupCreating, isSuccess: isGroupCreated, isError: isGroupCreatingError},] = useCreateGroupMutation();
    const [updateGroup, { isLoading: isGroupUpdating, isSuccess: isGroupUpdated, isError: isGroupUpdatingError},] = useUpdateGroupMutation();
    const [leaveGroup, { isLoading: isGroupLeaving }] = useLeaveGroupMutation();

    const initializeModalInputs = useCallback(() => {
        if(group){
            setNameValue(mode === 'edit' ? group.title : '')
            setDescValue(mode === 'edit' ? group.description : '')
            setPickedColor(mode === 'edit' ? group.color_code : '#FF2D55')
            setIcon(mode === 'edit' ? group.icon_url : 'bi bi-people')
        }
    }, [group])

    const initializeSubmit = useCallback(() => {
        if(!isGroupModalOpen && isSubmitted){
            setIsSubmitted(false)
            setIsInputError(false);
        } 
    }, [isSubmitted, isGroupModalOpen])

    const closeModalHandler = useCallback(() => {
        if(!isGroupCreating || !isGroupUpdating){
            setGroupId(0);
            setIsGroupModalOpen(false);
            setIsSubmitted(false);
            setIsInputError(false);
        }
    }, [isGroupUpdatingError, isGroupUpdating, isGroupUpdated,
        isGroupCreatingError, isGroupCreating, isGroupCreated])

    const onCreateGroup = async () => {
        if (descValue && nameValue && icon && pickedColor && !isGroupCreating) {
            try {
                const isGroupCreated = await createGroup({
                    title: nameValue,
                    description: descValue,
                    icon_url: icon,
                    color_code: pickedColor,
                }).unwrap()
                if (isGroupCreated) {
                    notify('success', `You created ${nameValue} group`)
                }
            } catch (err) {
                console.error('Failed to create group: ', err)
                notify('error', `You haven't created ${nameValue} group`)
            }
        }
    }
    const onUpdateGroup = async () => {
        if (descValue && groupId && nameValue && icon && pickedColor && !isGroupUpdating) {
            try {
                const isGroupUpdated = await updateGroup({
                    id: groupId,
                    title: nameValue,
                    description: descValue,
                    icon_url: icon,
                    color_code: pickedColor,
                }).unwrap()
                if (isGroupUpdated) {
                    notify('success', `You updated ${nameValue} group`)
                }
            } catch (err) {
                console.error('Failed to create group: ', err)
                notify('error', `You haven't update the ${nameValue} group`)
            }
        }
    }
    const onLeaveGroup = async () => {
        if (groupId && !isGroupLeaving) {
            try {
                const isGroupLeft = await leaveGroup(groupId).unwrap()
                if (isGroupLeft) {
                    if (mode === 'disband') {
                        notify('success', `You disbanded the ${nameValue} group`)
                    } else if (mode === 'leave') {
                        notify('success', `You left from ${nameValue} group`)
                    }
                }
            } catch (err) {
                if (mode === 'disband') {
                    console.error('Failed to disband the group: ', err)
                    notify('error', `You haven't dibanded ${nameValue} group`)
                } else if (mode === 'leave') {
                    console.error('Failed to left from the group: ', err)
                    notify('error', `You haven't left from ${nameValue} group`)
                }
            }
        }
    }

    const handleSubmit = () => {
        if(isSubmitted && nameValue.replace(/\s/gm, '').length > 0) {
            setIsInputError(false);
            if(mode === 'create'){
                onCreateGroup();
                closeModalHandler();
            } else if(mode === 'edit'){
                if (!(nameValue === group?.title && descValue === group.description && icon === group.icon_url && pickedColor === group.color_code)) {
                    onUpdateGroup()
                } else {
                    notify('info', 'Expense not updated')
                }
                closeModalHandler();
            } else if(mode === 'disband' || mode === 'leave'){
                onLeaveGroup()
                closeModalHandler();
            } 
        } else if (isSubmitted && nameValue.replace(/\s/gm, '').length < 1) {
            setIsInputError(true)
            setIsSubmitted(false);
        }
    }

    let labelText = 'Name of the group:';
 
    useEffect(() => closeModalHandler(), [closeModalHandler])
    useEffect(() => initializeModalInputs(), [initializeModalInputs])
    useEffect(() => handleSubmit(), [handleSubmit])
    useEffect(() => initializeSubmit(), [initializeSubmit])

    return <>
    {
        <ConfirmationModal 
        groupId={groupId ?? 0} 
        setIsConfirmationModalOpen={setIsConfirmationModal} 
        isConfirmationModalOpen={isConfirmationModal} 
        mode={mode === 'disband' ? "disband" : 'leave'}/>
    }
        <UsePortal
            callback={() => {}}
            isModalOpen={isGroupModalOpen}
            setIsModalOpen={setIsGroupModalOpen}
            headerIcon={headerIcon}
            title={titleModal}
        >
            <form
                onSubmit={() => handleSubmit}>
                <div className={classes.modal__wrapper}>
                    <div className={classes.inputNameGroup}>
                        <label className={classes.title} htmlFor="groupName">{labelText}</label>
                        <div className={classes.inputWrapper}>
                            <Input
                                value={group?.title}
                                isError={isInputError}
                                setFormValue={{ type: 'name', callback: setNameValue }}
                                isInputMustClear={!isGroupModalOpen}
                                inputType="name" id="groupName"
                                name="groupName" placeholder="Name" />
                        </div>
                    </div>
                    <div className={classes.textAreaGroup}>
                        <label className={classes.title} htmlFor="groupDesc">Description:</label>
                        <div className={classes.textAreaWrapper}>
                            <Input
                                value={group?.description}
                                setFormValue={{ type: 'area', callback: setDescValue }}
                                isInputMustClear={!isGroupModalOpen}
                                inputType="area" id="groupDesc"
                                name="groupDesc" placeholder="Description" />
                        </div>
                    </div>
                    <div style={{ marginTop: '16px' }}>
                        <Accordion>
                            <AccordionTab title="Select color" choosedItem={light}>
                                <div className={classes.pickBody}>
                                    {
                                        customColors.map((el, i) =>
                                            <div
                                                key={i}
                                                onClick={(e) => changeColor(e, el)}
                                                style={{
                                                    width: '24px', height: '24px',
                                                    borderRadius: '100%', backgroundColor: el,
                                                    cursor: 'pointer'
                                                }}>
                                            </div>)
                                    }
                                </div>
                            </AccordionTab>
                            <AccordionTab title="Select icon" choosedItem={iconDisplayed}>
                                <div className={classes.pickBody}>
                                    {
                                        customIcons.map((el, i) =>
                                        <div
                                            key={i}
                                            onClick={(e) => changeIcon(e, el)}
                                            style={{
                                                fontSize: '24px',
                                                cursor: 'pointer'
                                            }}>
                                            <i style={{ color: 'var(--main-text)' }} className={el}></i>
                                        </div>)
                                    }
                                </div>
                            </AccordionTab>
                        </Accordion>
                    </div>
                    <div className={classes.btnWrapper}
                        style={{ justifyContent: mode === 'edit' ? 'space-between' : 'center' }}>
                        {mode === 'edit' && groupId && <CustomButton
                            isPending={isGroupLeaving}
                            children="Disband"
                            btnWidth={170}
                            btnHeight={36}
                            icon="disband"
                            type='danger'
                            background="outline"
                            disableScale={true}
                            callback={() => {setIsConfirmationModal(true); setIsGroupModalOpen(false)}}
                        />}
                        <CustomButton
                            isPending={isGroupCreating}
                            children="Confirm"
                            btnWidth={170}
                            btnHeight={36}
                            icon="submit"
                            type='primary'
                            callback={() => {setIsSubmitted(true); handleSubmit()}}
                        />
                    </div>
                </div>
            </form>
        </UsePortal>
</>};
  
export default React.memo(GroupModal);