import React, {FC, ReactNode} from "react";
//logic
import { Link } from "react-router-dom";
import { invites } from "../DesktopNotifications/invites";
//UI
import classes from './MobileNotifications.module.css';
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
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
                    <CustomButton 
                        btnWidth={60}
                        btnHeight={25}
                        isPending={false}
                        callback={() => { }}
                        children="Accept"
                        icon="none"
                        type='primary'/>
                    <CustomButton 
                        btnWidth={60}
                        btnHeight={25}
                        icon="none"
                        type="danger"
                        background="outline" 
                        isPending={false}
                        children="Reject"
                        disableScale={true}
                        callback={()=>{console.log(1)}}/>
                </div>
            </form>
        </li>)
    }

    return(
        <main>
            <div className={classes.MobileNotifications__container}>
                <h3 className={classes.title}>Notifications</h3>
                <ul>
                    {getInvites(invites)}
                </ul> 
            </div>     
    </main>)
}

export default MobileNotifications