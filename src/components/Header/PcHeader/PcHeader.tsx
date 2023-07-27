import React, {FC, useCallback, MouseEvent, useState, useRef, ReactNode, useMemo} from 'react';

//UI
import classes from './PcHeader.module.css'
import Logo from "@assets/Header/logo.svg";
import ProfileIcon from "@assets/user-icon.svg"
import {ThemeButton} from '@components/Buttons/ThemeButtons/ThemeButtons';
import DesktopNotifications from '@components/Header/Notifications/DesktopNotifications/DesktopNotifications';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import { breadcrumbs } from './breadcrumbs';
import ContextUser from '@components/ContextUser/ContextUser';
//logic
import IHeaderProps from '../HeaderInterfaces';


const HeaderSite: FC<IHeaderProps> = ({User}) => {

    const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false)
    const notificationsButtonRef = useRef(null);

    const [isContextUserOpen, setIsContextUserOpen] = useState<boolean>(false);
    const contextButtonRef = useRef(null);
 
    const getChevronClass = useMemo(() => {
        if (isContextUserOpen) {
            return classes.chevronTransition
        }
        return ''
    }, [isContextUserOpen])
    return (<>
        <header className={classes.header}>
            <div className={classes.header__container}>
                <div className={classes.header__top}>
                    <div className={classes.header__logo}>
                        <div className={classes.logo__wrapper}>
                            <img src={Logo} alt="logo" />
                        </div>
                        <h1 className={classes.title}>Cash<span>Flow</span></h1>
                    </div>
                    <div className={classes.header__menu}>
                        <DesktopNotifications
                            isActive={isNotificationsOpen}
                            setIsActive={setIsNotificationsOpen}
                            buttonRef={notificationsButtonRef}
                        />
                        <ContextUser
                            isActive={isContextUserOpen}
                            setIsActive={setIsContextUserOpen}
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
                            <img style={{borderRadius: '50%'}} src={User.picture} alt="icon" />
                            <div className={classes.profile__inner}>
                                <div className={classes.profile__main}>
                                    <h4 className={classes.profile__name}>{User.first_name} {User.last_name}</h4>
                                    <p className={classes.profile__email}>{User.login}</p>
                                </div>
                                <i className={`bi bi-chevron-down ${classes.chevron} ${getChevronClass}`}></i>
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