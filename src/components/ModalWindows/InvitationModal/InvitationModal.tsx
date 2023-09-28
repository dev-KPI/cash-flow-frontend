import React, { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction } from "react";

//UI
import classes from './InvitationModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";

//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import IGroup from "@models/IGroup";
import { useCreateInvitationMutation } from "@store/Controllers/InvitationController/InvitationController";
import { notify } from "src/App";


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

    const [createInvitation, { isLoading: isInvitationCreating }] = useCreateInvitationMutation()
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const id = +event.target.value;
        setSelectedGroup({ id: id, title: findTitleById(id) });
    }
    const  findTitleById = (id: number) => {
        const foundGroup = groupsObject.find((group) => group.id === id);
        return foundGroup ? foundGroup.title : '';
    }

    const onCreateInvitation = async () => {
        if (userId && selectedGroup.id && !isInvitationCreating) {
            try {
                const isInvitationCreated = await createInvitation({
                    recipient_id: userId,
                    group_id: selectedGroup.id,
                }).unwrap()
                if (isInvitationCreated) {
                    notify('success', <p><span style={{ fontWeight: 700 }}>{userName}</span> invited to <span style={{ fontWeight: 700 }}>{selectedGroup.title}</span> group</p>);
                }
            } catch (err) {
                const error = err as { data: { detail: string }, status: string | number };
                notify('error', <p><span style={{ fontWeight: 700 }}>{userName}</span> haven't invited to <span style={{ fontWeight: 700 }}>{selectedGroup.title}</span> group. {error.data.detail}</p>)
            }
        }
    }

    const handleSubmit = async () => {
        onCreateInvitation()
        setIsInvitationModalOpen(false)
    }
    
    const groupsObject: {id:number, title:string}[] = groups.map((group) => {
        return {
            id: group.group.id,
            title: group.group.title,
        };
    });
    return <>
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
                    <div className={classes.text}>
                        Do you want to invite <span className={classes.name}> {userName}</span> to
                        <div className={classes.selectorWrapper}>
                            <select className={classes.select} onChange={handleChange}>
                                <option style={{backgroundColor: 'var(--cardbg)'}} key={'none'} value='None'>
                                    none
                                </option>
                                {groupsObject.map((group) => (
                                    <option value={group.id}>{group.title}</option>
                                ))}
                            </select> 
                        </div> group?
                    </div>
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
                        callback={() => { setIsInvitationModalOpen(false) }}
                    />
                </div>
            </form>
        </UsePortal>
    </>
};

export default React.memo(InvitationModal);