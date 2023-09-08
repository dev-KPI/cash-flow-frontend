import React, { FC, Dispatch, SetStateAction, ReactNode, useState, useCallback, useEffect, useMemo} from "react";

//UI
import classes from './GroupModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import Accordion, { AccordionTab } from "@components/Accordion/Accordion";
import ConfirmationModal from "../ConfirtmationModal/ConfirmationModal";
import { IGetInfoFromGroupResponse } from "@store/Controllers/GroupsController/GroupsControllerInterfaces";
import ITooltipState from "@store/UI_store/TooltipSlice/TooltipSliceInterfaces";
import { useActionCreators, useAppSelector } from "@hooks/storeHooks/useAppStore";
import { TooltipSliceActions } from "@store/UI_store/TooltipSlice/TooltipSlice";
//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
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
    const [leaveGroup, { isLoading: isGroupDisbanding, isSuccess: isGroupDisbanded, isError: isGroupDisbandingError},] = useLeaveGroupMutation();

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

    const handleSubmit = () => {
        if(isSubmitted && nameValue.replace(/\s/gm, '').length > 0) {
            setIsInputError(false);
            if(mode === 'create'){
                createGroup({
                    title: nameValue,
                    description: descValue,
                    icon_url: icon,
                    color_code: pickedColor,
                })
                closeModalHandler();
            } else if(mode === 'edit'){
                if (groupId) {
                    if (group?.title === nameValue && group?.description === descValue &&
                        group?.icon_url === icon && group?.color_code === pickedColor) {
                        setIsGroupModalOpen(false)
                        }
                    else {
                        updateGroup({
                            id: groupId,
                            title: nameValue,
                            description: descValue,
                            icon_url: icon,
                            color_code: pickedColor,
                        })
                        closeModalHandler();
                    }
                    
                }
            } else if(mode === 'disband' || mode === 'leave'){
                if(groupId){
                    leaveGroup(groupId)
                    closeModalHandler();
                }
            } 
        } else if (isSubmitted && nameValue.replace(/\s/gm, '').length < 1) {
            setIsInputError(true)
            setIsSubmitted(false);
        }
    }

    const initTooltip = useCallback(() => {
        if (isGroupCreated) {
            TooltipDispatch.setTooltip({
                shouldShowTooltip: true,
                modeTooltip: 'create',
                textTooltip: `Group ${nameValue} successfully added`,
                status: 'success'
            })
        } else if(isGroupCreatingError) {
            TooltipDispatch.setTooltip({
                shouldShowTooltip: true,
                modeTooltip: 'create',
                textTooltip: `Group ${nameValue} not added`,
                status: 'error'
            })
        }
        else if (isGroupUpdated) {
            TooltipDispatch.setTooltip({
                shouldShowTooltip: true,
                modeTooltip: 'update',
                textTooltip: `Group ${nameValue} successfully updated`,
                status: 'success'
            })
        } else if(isGroupUpdatingError) {
            TooltipDispatch.setTooltip({
                shouldShowTooltip: true,
                modeTooltip: 'update',
                textTooltip: `Group ${nameValue} not updated`,
                status: 'error'
            })
        }
    }, [createGroup, isGroupCreating, isGroupCreated, isGroupCreatingError, 
        updateGroup, isGroupUpdating, isGroupUpdated, isGroupUpdatingError])

    let labelText = 'Name of the group:';
 
    useEffect(() => closeModalHandler(), [closeModalHandler])
    useEffect(() => initializeModalInputs(), [initializeModalInputs])
    useEffect(() => initTooltip(), [initTooltip])
    useEffect(() => handleSubmit(), [handleSubmit])
    useEffect(() => initializeSubmit(), [initializeSubmit])

    return <>
    {
        <ConfirmationModal 
            groupId={groupId ?? 0}
            title={group?.title}
            setIsConfirmationModalOpen={setIsConfirmationModal} 
            isConfirmationModalOpen={isConfirmationModal} 
            mode={mode === 'leave' ? "leave" : 'disband'}/>
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
                            isPending={isGroupDisbanding}
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