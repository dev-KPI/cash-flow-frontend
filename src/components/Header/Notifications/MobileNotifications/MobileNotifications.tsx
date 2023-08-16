import {FC, ReactNode, useCallback, useState} from "react";
//logic
import { Link } from "react-router-dom";
import IInvitation from "@models/IInvitation";
import { useGetInvitationsByCurrentUserQuery, useResponseInvitationByIdMutation } from "@store/Controllers/InvitationController/InvitationController";
//UI
import classes from './MobileNotifications.module.css';
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";
import PreLoader from "@components/PreLoader/PreLoader";


const MobileNotifications: FC = () => {
    const { data: Invitations, isLoading: isInvitationsLoading, isFetching: isInvitationsFetching, isError: isInvitationsError, isSuccess: isInvitationsSuccess } = useGetInvitationsByCurrentUserQuery(null)
    const [makeResponse, { data: ResponseData, isLoading: isResponseCreating, isError: isResponseError, isSuccess: isResponseCreated }] = useResponseInvitationByIdMutation()
    const [buttonClicked, setButtonClicked] = useState<'accept' | 'reject' | 'none'>('none')
    const handleSumbit = (invitationId: number, response: 'ACCEPTED' | 'DENIED') => {
        makeResponse({
            invitation_id: invitationId,
            response: response
        })
        setButtonClicked(response === 'ACCEPTED' ? 'accept' : 'reject')
    }
    const showToolTip = useCallback(() => {
        if (isResponseCreated && ResponseData) {
            if (ResponseData.status === 'DENIED') {
                return <StatusTooltip
                    type="error"
                    title={<p>You have successfully denied the invitation to <span>{ResponseData.group.title}</span></p>} />

            } else {
                return <StatusTooltip
                    type="success"
                    title={<p>You have successfully accepted the invitation to <span>{ResponseData.group.title}</span></p>} />

            }
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
                            btnWidth={100}
                            btnHeight={30}
                            icon="none"
                            type="primary"
                            isPending={isResponseCreating && buttonClicked === 'accept' }
                            children="Accept"
                            callback={() => { handleSumbit(el.id, 'ACCEPTED') }} />
                        <CustomButton
                            btnWidth={100}
                            btnHeight={30}
                            icon="none"
                            type="danger"
                            background="outline"
                            isPending={isResponseCreating && buttonClicked === 'reject'}
                            children="Reject"
                            disableScale={true}
                            callback={() => { handleSumbit(el.id, 'DENIED') }} />
                    </div>
                </form>
            </li>
        })
    }
    let notificationsContent;
    if (isInvitationsLoading || isInvitationsFetching) {
        notificationsContent = <div className={classes.loaderWrapper}><PreLoader preLoaderSize={50} type='auto' /></div>
    } else if (isInvitationsSuccess) {
        if(Invitations.length > 0)
            notificationsContent = getInvites(Invitations)
        else 
            notificationsContent = (<div className={classes.noNotifications}>
                <i className="bi bi-bell" style={{ fontSize: 60, color: 'var(--main-text)' }}></i>
                <h5 className={classes.noNotifications__title}>No notifications yet</h5>
                <p className={classes.noNotifications__text}>When you get notifications, they'll show up here</p>
            </div>)
    }
            
    return(
        <main>
            <div className={classes.MobileNotifications__container}>
                <h3 className={classes.title}>Notifications</h3>
                {showToolTip()}
                <ul>
                    {notificationsContent}
                </ul> 
            </div>     
    </main>)
}

export default MobileNotifications