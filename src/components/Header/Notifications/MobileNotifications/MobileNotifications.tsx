import React, {FC, ReactNode} from "react";
//logic
import { Link } from "react-router-dom";
import { invites } from "../DesktopNotifications/invites";
//UI
import classes from './MobileNotifications.module.css';
import ConfirmButton from "@components/Buttons/ConfirmButton/ConfirmButton";
import RejectButton from "@components/Buttons/RejectButton/RejectButton";
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';

interface IMobileNotifications {
}

interface IInvite {
    userName: string,
    group: string,
    avatar: string,
    groupUrl: string
}

const MobileNotifications: FC = ({}) => {


    const getInvites = (invites: IInvite[]): ReactNode[] => {
        return invites.map((el, i) => 
        <li className={classes.inviteLi} 
        key={el.userName + el.group + el.groupUrl + i}>
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
                    callback={()=>{}}/>
                    <RejectButton 
                    title="Reject"
                    RejectHandler={()=>{}}/>
                </div>
            </form>
        </li>)
    }

    return(<>
        <div 
        style={{marginTop: '75px'}} 
        className={'MobileNotifications__container'}>
            <div className={classes.MobileNotifications}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h5 className={classes.TitleInvitesBlock}>Notifications</h5>
                </div>
                <ul>
                    {getInvites(invites)}
                </ul>
            </div>
        </div>
    </>)
}

export default MobileNotifications