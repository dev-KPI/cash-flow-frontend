import React, { FC, ReactNode, SetStateAction, Dispatch, useCallback } from "react";

//UI
import classes from './DesktopNotifications.module.css';
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";
import PreLoader from "@components/PreLoader/PreLoader";
//logic
import { Link } from "react-router-dom";
import SmallModal from "@components/ModalWindows/SmallModal/SmallModal";
import { useGetInvitationsByCurrentUserQuery, useLazyGetInvitationsByCurrentUserQuery, useResponseInvitationByIdMutation } from "@store/Controllers/InvitationController/InvitationController";
import IInvitation from "@models/IInvitation";



interface IDesktopNotifications {
    isActive: boolean,
    setIsActive:  Dispatch<SetStateAction<boolean>>;
    buttonRef: React.RefObject<HTMLElement>
}



const DesktopNotifications: FC<IDesktopNotifications> = ({ isActive, setIsActive, buttonRef }) => {
    const { data: Invitations, isLoading: isInvitationsLoading, isFetching: isInvitationsFetching, isError: isInvitationsError, isSuccess: isInvitationsSuccess, refetch} = useGetInvitationsByCurrentUserQuery(null)
    const [makeResponse, { data: ResponseData, isLoading: isResponseCreating, isError: isResponseError, isSuccess: isResponseCreated }] = useResponseInvitationByIdMutation()

    const handleSumbit = (invitationId: number, response: 'ACCEPTED' | 'DENIED') => {
        makeResponse({
            invitation_id: invitationId,
            response: response
        })
        setIsActive(false)
    }

    const showToolTip = useCallback(() => {
        if (isResponseCreated) {
            return <StatusTooltip
                type="success"
                title={`You have successfully accepted the invitation to ${ResponseData?.group.title}`} />
        } else if (isResponseError) {
            return <StatusTooltip
                type="error"
                title={`Invitation not accepted`} />
        }
    }, [makeResponse, isResponseCreating, isResponseError, isResponseCreated])
    
    const getInvites = (invites: IInvitation[]): ReactNode[] => {
        return invites.map((el, i) => {
            const group = el.group;
            const admin = el.group.admin;
            const userName = admin.first_name + ' ' + admin.last_name
            return <li className={classes.inviteLi}
                key={admin.id + group.title + i}>
                <form className={classes.inviteForm}>
                    <img src={admin.picture} alt={admin.first_name + 'avatar'} />
                    <p className={classes.Promo}>
                        <span style={{ fontWeight: 600 }}>{userName}
                        </span> has invited you to the group <Link to={`/group/${group.id}`} className={classes.InviteGroupRef}>
                            {group.title}</Link>
                    </p>
                    <div className={classes.buttonGroup}>
                        <CustomButton
                            btnWidth={60}
                            btnHeight={25}
                            icon="none"
                            type="primary"
                            isPending={isResponseCreating}
                            children="Accept"
                            callback={() => { handleSumbit(el.id, 'ACCEPTED') } } />
                        <CustomButton
                            btnWidth={60}
                            btnHeight={25}
                            icon="none"
                            type="danger"
                            background="outline"
                            isPending={isResponseCreating}
                            children="Reject"
                            disableScale={true}
                            callback={() => { handleSumbit(el.id, 'DENIED') } } />
                    </div>
                </form>
            </li>
        })
    }

    let notificationsContent;
    if (isInvitationsLoading || isInvitationsFetching) {
        notificationsContent = <div className={classes.loaderWrapper}><PreLoader preLoaderSize={25} type='auto'/></div>
    } else if (isInvitationsSuccess) {
        if(Invitations.length > 0) 
            notificationsContent = <>
                <ul className={classes.inviteList}>
                    {getInvites(Invitations)}
                </ul>
                {Invitations.length > 6 &&
                <div key='239k23' className={classes.ViewMore}>
                    <Link
                        onClick={() => { setIsActive(false); }}
                        to={'/notifications'}>
                        <div className={classes.ViewMore__inner}>
                            <p className={classes.ViewMore__title}>View More</p>
                            <ArrowRight className={classes.ArrowRight} />
                        </div>
                    </Link>
                </div>}
            </>
        else
            notificationsContent = (<div className={classes.noNotifications}>
                <i className="bi bi-bell"></i>
                <h5 className={classes.noNotifications__title}>No notifications yet</h5>
                <p className={classes.noNotifications__text}>When you get notifications, they'll show up here</p>
                <div className={classes.refreshButtonWrapper}>
                    <button className={classes.refreshButton} onClick={() => refetch()}>
                        <i className={"bi bi-arrow-clockwise"}></i>
                        <p className={classes.btnText}>Refresh</p>
                    </button>
                </div>
            </div>)
    }

    return (<>
        {showToolTip()}
        <SmallModal
            active={isActive}
            setActive={setIsActive}
            className={classes.notficationsModal}
            title='Notifications'
            buttonRef={buttonRef}
            children={notificationsContent}
        />
    </>)
}

export default DesktopNotifications