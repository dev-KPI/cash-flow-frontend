import React, { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction } from "react";

//UI
import classes from './ConfirmationModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";

//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";

interface IContfirmationModalProps {
    isConfirmationModalOpen: boolean
    setIsConfirmationModalOpen: Dispatch<SetStateAction<boolean>>;
    mode: 'leave' | 'kick' | 'disband'
    kickedUserName?: string
    groupName?: string
}
interface IModalState {
    name: string
    color: string
}

const ConfirmationModal: FC<IContfirmationModalProps> = ({ isConfirmationModalOpen, setIsConfirmationModalOpen, mode, kickedUserName = 'Unknown Unkown', groupName = ''}) => {
    let headerIcon: ReactNode = <i className="bi bi-boxes"></i>
    let titleModal: string = ''
    let modalText: ReactNode = '';
    const [nameValue, setNameValue] = useState<string>('');
    const [colorValue, setColorValue] = useState<string>('');

    //submit
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [shouldShowTooltip, setShouldShowTooltip] = useState<boolean>(false);


    const postObject: IModalState = {
        name: nameValue,
        color: colorValue
    };

    const handleSubmit = async () => {
        setIsSubmiting(true)
        await setTimeout(() => {
            setShouldShowTooltip(true)
            setIsSubmiting(false);
            alert(JSON.stringify(postObject, null, 2));
            setIsConfirmationModalOpen(false);
        }, 3000);
    }
    const showToolTip = useCallback(() => {
        if (shouldShowTooltip) {
            return <StatusTooltip
                type="success"
                title="You have successfully left the group" />
        }
    }, [shouldShowTooltip])
    
    if (mode === 'leave') {
        headerIcon = <i className= "bi bi-box-arrow-right" ></i>
        titleModal = 'Leave group'
        modalText = <p>Are you sure you want to leave the <span>{groupName}</span> group?</p>
    } else if (mode === 'kick') {
        headerIcon = <i className="bi bi-person-dash"></i>
        titleModal = 'Remove user'
        modalText = <p>Are you sure you want to remove <span>{kickedUserName}</span> from the group?</p>
    } else if (mode === 'disband') {
        headerIcon = <i className="bi bi-people"></i>
        titleModal = 'Disband group'
        modalText = <p>Are you sure you want to disband your <span>{groupName}</span> group?</p>
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
                        isPending={isSubmiting}
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

export default React.memo(ConfirmationModal);