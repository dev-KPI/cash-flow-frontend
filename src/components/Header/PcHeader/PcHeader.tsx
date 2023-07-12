import React, {FC, useCallback, MouseEvent, useState, useRef, ReactNode} from 'react';

//UI
import classes from './PcHeader.module.css'
import Logo from "@assets/Header/logo.svg";
import ProfileIcon from "@assets/user-icon.svg"
import {ThemeButton} from '@components/Buttons/ThemeButtons/ThemeButtons';
import DesktopNotifications from '@components/Header/Notifications/DesktopNotifications/DesktopNotifications';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import { breadcrumbs } from './breadcrumbs';
import ContextUser from '@components/ContextUser/ContextUser';
//store
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IUserState } from '@store/UserSlice/UserInterfaces';


const HeaderSite: FC = () => {

    const UserStore = useAppSelector<IUserState>(state => state.UserSlice);

    const [isNotificationsOpen  = false, setIsNotificationsOpen] = useState<boolean>()
    const notificationsButtonRef = useRef(null);

    const [isContextUserOpen = false, setIsContextUserOpen] = useState<boolean>();
    const contextButtonRef = useRef(null);
 

    return (<>
        <header className={classes.header}>
            <div className={classes.header__container}>
                <div className={classes.header__top}>
                    <div className={classes.header__logo}>
                        <img src={Logo} alt="logo" />
                        <h1 className={classes.title}>Cash<span>Flow</span></h1>
                    </div>
                    <div className={classes.header__menu}>
                        <DesktopNotifications
                            isActive={isNotificationsOpen}
                            setIsActive={() => setIsNotificationsOpen}
                            buttonRef={notificationsButtonRef}
                        />
                        <ContextUser
                            isActive={isContextUserOpen}
                            setIsActive={() => setIsContextUserOpen}
                            buttonRef={contextButtonRef} />
                        <ThemeButton />
                        <button 
                        onClick={e => setIsNotificationsOpen(!isNotificationsOpen) } 
                        className={classes.header__notifications}
                            ref={notificationsButtonRef}
                        >
                            <i className="bi bi-bell"></i>
                        </button>
                    </div>
                    <button
                        onClick={e => setIsContextUserOpen(!isContextUserOpen)}
                        ref={contextButtonRef}>
                        <div className={classes.header__profile}>
                            <img style={{borderRadius: '10px'}} src={UserStore.photo} alt="icon" />
                            <div className={classes.profile__inner}>
                                <div className={classes.profile__main}>
                                    <h4 className={classes.profile__name}>{UserStore.name} {UserStore.surname}</h4>
                                    <p className={classes.profile__email}>{UserStore.email}</p>
                                </div>
                                <i className="bi bi-chevron-down"></i>
                            </div>
                        </div>
                    </button>
                    <nav className={classes.breadcrumbs}>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </nav>
                </div>
            </div>
        </header>
    </>);
};

export default HeaderSite;