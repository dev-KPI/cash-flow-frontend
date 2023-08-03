import React, { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction } from "react";

//UI
import classes from './InvitationModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";

//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";
import IGroup from "@models/IGroup";
import { useCreateInvitationMutation } from "@store/Controllers/InvitationController/InvitationController";


interface IInvitationModalProps {
    isInvitationModalOpen: boolean
    setIsInvitationModalOpen: Dispatch<SetStateAction<boolean>>;
    groups: IGroup[],
    userName: string,
    userId: number
}

const InvitationModal: FC<IInvitationModalProps> = ({ isInvitationModalOpen, setIsInvitationModalOpen, groups, userName, userId }) => {
    let headerIcon: ReactNode = <i className="bi bi-person-add"></i>
    let titleModal: string = 'Invite user'
    const [selectedGroup, setSelectedGroup] = useState<{ id: number, title: string }>({ id: -1, title: '' })

    const [createInvitation, { isLoading: isInvitationCreating, isError: isInvitationError, isSuccess: isInvitationCreated }] = useCreateInvitationMutation()
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = +event.target.value;
        setSelectedGroup({ id: id, title: findTitleById(id) });
    }
    const  findTitleById = (id: number) => {
        const foundGroup = groupsObject.find((group) => group.id === id);
        return foundGroup ? foundGroup.title : '';
    }
    const handleSubmit = async () => {
        if(selectedGroup.id !== -1)
            createInvitation({
                recipient_id: userId,
                group_id: selectedGroup.id,
            })
        setIsInvitationModalOpen(false)
    }
    const showToolTip = useCallback(() => {
        if (isInvitationCreated) {
            return <StatusTooltip
                type="success"
                title={`${userName} successfully invited to ${selectedGroup.title} group`} />
        } else if (isInvitationError) {
            return <StatusTooltip
                type="error"
                title={<p>{userName} not added to <span>{selectedGroup.title}</span> group</p>} />
        }
    }, [createInvitation, isInvitationCreating, isInvitationError, isInvitationCreated])
    
    const groupsObject: {id:number, title:string}[] = groups.map((group) => {
        return {
            id: group.group.id,
            title: group.group.title,
        };
    });
    return <>
        {showToolTip()}
        <UsePortal
            setIsModalOpen={setIsInvitationModalOpen}
            isModalOpen={isInvitationModalOpen}
            headerIcon={headerIcon}
            title={titleModal}
            containerWidth={500}
        >
            <form
                onSubmit={handleSubmit}>
                <div className={classes.modal__wrapper}>
                    <p className={classes.text}>Do you want to invite <span>{userName}
                    </span> to <div className={classes.selectorWrapper}>
                            <select className={classes.select} onChange={handleChange}>
                                <option key={'none'} value='None'>
                                    none
                                </option>
                                {groupsObject.map((group) => (
                                    <option value={group.id}>{group.title}</option>
                                ))}
                            </select> 
                        </div> group?
                    </p>
                </div>
                <div className={classes.btnWrapper}>
                    <CustomButton
                        isPending={isInvitationCreating}
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
                        callback={() => { }}
                    />
                </div>
            </form>
        </UsePortal>
    </>
};

export default React.memo(InvitationModal);