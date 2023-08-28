//UI
import classes from './GroupMembers.module.css';
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import ConfirmationModal from "@components/ModalWindows/ConfirtmationModal/ConfirmationModal";
import SmallModal from "@components/ModalWindows/SmallModal/SmallModal";
//logic
import IUser from "@models/IUser";
import { IGetInfoFromGroupResponse } from "@store/Controllers/GroupsController/GroupsControllerInterfaces";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ButtonContent: React.FC<{
    groupId: string | undefined,
    groupInfo: IGetInfoFromGroupResponse | undefined,
    setConfirmationMode: React.Dispatch<React.SetStateAction<'disband' | 'kick'>>
    setIsConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>
    CurrentUser: IUser | undefined,
    user: IUser,
    isActionDisabled: boolean
}> = ({ groupId, user, isActionDisabled, groupInfo, CurrentUser, setConfirmationMode, setIsConfirmationModal}) => {
const [isActionsOpen, setIsActionsOpen] = useState<boolean>(false)
const actionsButtonRef = useRef(null);
const handleActionOpen = () => {
    if (isActionDisabled) return
    else setIsActionsOpen(!isActionsOpen)
}
const navigate = useNavigate();



const getSpecialButton = useMemo(() => {
    if(CurrentUser && groupInfo){
        if(CurrentUser?.id === groupInfo?.admin?.id)
        return <CustomButton
            isPending={false}
            children={user.id === groupInfo.admin.id ? "Disband group" : 'Remove member'}
            icon={'none'}
            type="danger"
            background={'outline'}
            disableScale={true}
            callback={() => {
                if(user.id === groupInfo.admin.id){
                    setConfirmationMode('disband')
                } else {
                    setConfirmationMode('kick')
                }
                setIsConfirmationModal(true)
            }}
            className={`${classes.leaveButton} btn-danger outline`} />}
}, [])

return (<>
    
    <button className={[classes.moreBtn, isActionDisabled ? classes.actionsDisabled : ''].join(' ')}
        onClick={handleActionOpen}
        ref={actionsButtonRef}>
        <div></div>
        <div></div>
        <div></div>
    </button>
    <SmallModal
        active={isActionsOpen}
        setActive={setIsActionsOpen}
        className={classes.actionsModal}
        title=''
        buttonRef={actionsButtonRef}
        disableHeader={true}
        children={
            <div className={classes.actionsWrapper}>
                <CustomButton
                    icon={'none'}
                    type={'white'}
                    background={'outline'}
                    callback={() => navigate(`/group/${groupId}/member/${user.id}`)}
                    isPending={false}
                    disableScale={true}
                    className={classes.btnInsight}
                    children={
                        <div className={classes.btnChild}>
                            <i className="bi bi-bar-chart"></i>
                            <p>Insight</p>
                        </div>
                    } />
                {getSpecialButton}
            </div>}
    /></>)
}

export default ButtonContent