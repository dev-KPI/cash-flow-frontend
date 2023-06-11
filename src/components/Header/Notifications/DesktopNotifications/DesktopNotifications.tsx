import React, {FC, MouseEvent, ReactNode, useState} from "react";

//UI
import classes from './DesktopNotifications.module.css';
import ConfirmButton from "@components/Buttons/ConfirmButton/ConfirmButton";
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';
import RejectButton from "@components/Buttons/RejectButton/RejectButton";
//logic
import { invites } from "./invites";
import { Link } from "react-router-dom";
import CloseButton from "@components/Buttons/CloseButton/CloseButton";

interface IDesktopNotifications {
    animation: boolean,
    closeNotifications: () => void
}

interface IInvite {
    userName: string,
    group: string,
    avatar: string,
    groupUrl: string
}

const DesktopNotifications: FC<IDesktopNotifications> = ({animation, closeNotifications}) => {

    const [Animation = 'in', setAnimation] = useState<'in'|'out'>();

    const closeNotificationsHandler = () => {
        if (Animation === 'out'){
            closeNotifications()
        }
    }
    const setAnimationOut = () => setAnimation('out')

    const getInvites = (invites: IInvite[]): ReactNode[] => {
        return invites.map((el, i) => 
        <li className={classes.inviteLi} 
        key={el.userName + el.group + el.groupUrl + i*i}>
            <form className={classes.inviteForm}>
                <img width={40} src={el.avatar} alt='Avatar' />
                <p className={classes.Promo}>
                    <span style={{fontWeight: 600}}>{el.userName}
                    </span> has invited you to the group <Link to={el.groupUrl} className={classes.InviteGroupRef}>
                    {el.group}</Link>
                </p>
                <div className={classes.buttonGroup}>
                    <ConfirmButton 
                    btnWidth={60}
                    btnHeight={25}
                    titleFontWeight={400}
                    type="none" 
                    isPending={false}
                    title="Accept"
                    callback={()=>{console.log(1)}}/>
                    <RejectButton 
                    title="Reject"
                    RejectHandler={()=>{console.log(1)}}/>
                </div>
            </form>
        </li>)
    }

    return(<>
        <div style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 4884}} 
        onClick={(e: MouseEvent<HTMLDivElement>) => {e.preventDefault(); e.stopPropagation(); setAnimationOut()}}></div>
        <div onAnimationEnd={e => closeNotificationsHandler()}
        className={classes.DesktopNotifications  + ' ' + classes[Animation]}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h5 className={classes.TitleInvitesBlock}>Notifications</h5>
                <CloseButton size={24} closeHandler={() => {setAnimationOut();}}/>
            </div>
            <ul>
                {getInvites(invites).slice(0,6)}
            </ul>
            <div key='239k23' className={classes.ViewMore}>
                <Link onClick={() => {setAnimationOut();}} to={'/notifications'}>
                    <div className={classes.ViewMore__inner}>
                        <p className={classes.ViewMore__title}>View More</p>
                        <ArrowRight className={classes.ArrowRight} />
                    </div>
                </Link>
            </div>
        </div>
    </>)
}

export default DesktopNotifications