import React, {FC, MouseEvent, ReactNode, useState, SetStateAction, Dispatch} from "react";

//UI
import classes from './DesktopNotifications.module.css';
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import { ReactComponent as ArrowRight } from '@assets/arrow-right.svg';

//logic
import { invites } from "./invites";
import { Link } from "react-router-dom";
import SmallModal from "@components/ModalWindows/SmallModal/SmallModal";

interface IDesktopNotifications {
    isActive: boolean,
    setIsActive:  Dispatch<SetStateAction<boolean>>;
    buttonRef: React.RefObject<HTMLElement>
}

interface IInvite {
    userName: string,
    group: string,
    avatar: string,
    groupUrl: string
}

const DesktopNotifications: FC<IDesktopNotifications> = ({isActive, setIsActive, buttonRef}) => {
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
                    <CustomButton 
                        btnWidth={60}
                        btnHeight={25}
                        icon="none"
                        type="primary" 
                        isPending={false}
                        children="Accept"
                        callback={()=>{console.log(1)}}/>
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
        <SmallModal
        active={isActive} 
        setActive={setIsActive} 
        className={classes.notficationsModal} 
        title='Notifications' 
        buttonRef={buttonRef}
        children={
            <>
                <ul>
                {getInvites(invites).slice(0,6)}
                </ul>
                <div key='239k23' className={classes.ViewMore}>
                    <Link 
                    onClick={() => {setIsActive(false);}}
                    to={'/notifications'}>
                        <div className={classes.ViewMore__inner}>
                            <p className={classes.ViewMore__title}>View More</p>
                            <ArrowRight className={classes.ArrowRight} />
                        </div>
                    </Link>
                </div>
            </>}
            />
        )
}

export default DesktopNotifications