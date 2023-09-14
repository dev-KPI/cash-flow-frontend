import {FC, ReactNode, useState} from "react";
//logic
import IInvitation from "@models/IInvitation";
import { useGetInvitationsByCurrentUserQuery, useResponseInvitationByIdMutation } from "@store/Controllers/InvitationController/InvitationController";
//UI
import classes from './MobileNotifications.module.css';
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import PreLoader from "@components/PreLoader/PreLoader";
import { notify } from "src/App";


const MobileNotifications: FC = () => {
    const { data: Invitations, isLoading: isInvitationsLoading, isFetching: isInvitationsFetching, isError: isInvitationsError, isSuccess: isInvitationsSuccess } = useGetInvitationsByCurrentUserQuery(null)
    const [buttonClicked, setButtonClicked] = useState<'accept' | 'reject' | 'none'>('none')
    const [clickedButtonId, setClickedButtonId] = useState<number>(0);

    const [makeResponse, { data: ResponseData, isLoading: isResponseCreating, isError: isResponseError, isSuccess: isResponseCreated }] = useResponseInvitationByIdMutation()
    const onResponseInvitation = async (invitationId: number, response: 'ACCEPTED' | 'DENIED') => {
        if (invitationId && response && !isResponseCreating) {
            try {
                const isGroupCreated = await makeResponse({
                    invitation_id: invitationId,
                    response: response
                }).unwrap()
                if (isGroupCreated) {
                    if (response === 'ACCEPTED') {
                        notify('success', `You accepted the invitation to ${ResponseData?.group.title} group`)
                    } else {
                        notify('success', `You denied the invitation to ${ResponseData?.group.title} group`)
                    }
                }
            } catch (err) {
                console.error('Failed to response invitation group: ', err)
                notify('error', `You haven't response the invitation`)
            }
        }
    }

    const handleSumbit = (invitationId: number, response: 'ACCEPTED' | 'DENIED') => {
        onResponseInvitation(invitationId, response)
        setButtonClicked(response === 'ACCEPTED' ? 'accept' : 'reject')
    }

    const getInvites = (invites: IInvitation[]): ReactNode[] => {
        return invites.map((el, i) => {
            const group = el.group;
            const admin = el.group.admin;
            const userName = admin.first_name + ' ' + admin.last_name
            return <li className={classes.inviteLi}
                key={admin.id + group.title + i}>
                <form className={classes.inviteForm}>
                    <img src={admin.picture} alt={admin.first_name + '_avatar'} />
                    <p className={classes.Promo}>
                        <span style={{ fontWeight: 600 }}>{userName}
                        </span> has invited you to the group <span className={classes.InviteGroupRef}>
                            {group.title}</span>
                    </p>
                    <div className={classes.buttonGroup}>
                        <CustomButton
                            icon="submit"
                            type="primary"
                            isPending={isResponseCreating && buttonClicked === 'accept' && el.id === clickedButtonId}
                            callback={() => { setClickedButtonId(el.id); handleSumbit(el.id, 'ACCEPTED') }}
                        >
                            <p>Accept</p>
                        </CustomButton>
                        <CustomButton
                            icon="refuse"
                            type="danger"
                            background="outline"
                            isPending={isResponseCreating && buttonClicked === 'reject' && el.id === clickedButtonId}
                            disableScale={true}
                            callback={() => { setClickedButtonId(el.id); handleSumbit(el.id, 'DENIED') }}
                        >
                            <p>Reject</p>
                        </CustomButton>
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
                <ul className={classes.invitesUl}>
                    {notificationsContent}
                </ul> 
            </div>     
    </main>)
}

export default MobileNotifications