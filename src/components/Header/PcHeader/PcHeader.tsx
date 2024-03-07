import React, {FC, useCallback, MouseEvent, useState, useRef, ReactNode, useMemo} from 'react';

//UI
import classes from './PcHeader.module.css'
import darkLogo from '@assets/logo/dark-logo.svg';
import lightLogo from '@assets/logo/light-logo.svg';
import {ThemeButton} from '@components/Buttons/ThemeButtons/ThemeButtons';
import DesktopNotifications from '@components/Header/Notifications/DesktopNotifications/DesktopNotifications';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import { breadcrumbs } from './breadcrumbs';
import ContextUser from '@components/ContextUser/ContextUser';
//logic
import IHeaderProps from '../HeaderInterfaces';
import { useGetInvitationsByCurrentUserQuery } from '@store/Controllers/InvitationController/InvitationController';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';


const HeaderSite: FC<IHeaderProps> = ({User}) => {
    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false)
    const notificationsButtonRef = useRef(null);

    const [isContextUserOpen, setIsContextUserOpen] = useState<boolean>(false);
    const contextButtonRef = useRef(null);

    const { data: Invitations, isLoading: isInvitationsLoading, isFetching: isInvitationsFetching, isError: isInvitationsError, isSuccess: isInvitationsSuccess } = useGetInvitationsByCurrentUserQuery(null)
 
    const getChevronClass = useMemo(() => {
        if (isContextUserOpen) {
            return classes.chevronTransition
        }
        return ''
    }, [isContextUserOpen])

    const notificationsClass = useMemo(() => {
       return [classes.header__notifications, isInvitationsSuccess && Invitations.length > 0 ? classes.notificationsVisible : ''].join(' ');
    }, [isInvitationsLoading, isInvitationsFetching])
    const name = (User.first_name + ' ' + User.last_name).slice(0, 40);
    return (<>
        <header className={classes.header}>
            <div className={classes.header__container}>
                <div className={classes.header__top}>
                    <Link to='/dashboard' className={classes.header__logo}>
                        <div className={classes.logo__wrapper}>
                            <img className={classes.devices} src={ThemeStore.theme === 'light' ? lightLogo : darkLogo} alt="devices dark" />
                        </div>
                        <h1 className={classes.title}>Cash<span>Money</span></h1>
                    </Link>
                    <div className={classes.header__menu}>
                        <DesktopNotifications
                            isActive={isNotificationsOpen}
                            setIsActive={setIsNotificationsOpen}
                            buttonRef={notificationsButtonRef}
                        />
                        <ThemeButton />
                        <button 
                        onClick={e => setIsNotificationsOpen(!isNotificationsOpen) } 
                        className={notificationsClass}
                            ref={notificationsButtonRef}
                        >
                            <i className="bi bi-bell"></i>
                        </button>
                    </div>
                    <button
                        className={classes.profile__wrapper}
                        onClick={e => setIsContextUserOpen(!isContextUserOpen)}
                        ref={contextButtonRef}>
                        <div className={classes.header__profile}>
                            <img style={{borderRadius: '50%'}} src={User.picture} alt="icon" />
                            <div className={classes.profile__inner}>
                                <div className={classes.profile__main}>
                                    <h4 className={classes.profile__name}>{name}</h4>
                                    <p className={classes.profile__email}>{User.login}</p>
                                </div>
                                <i className={`bi bi-chevron-down ${classes.chevron} ${getChevronClass}`}></i>
                            </div>
                        </div>
                        <ContextUser
                            isActive={isContextUserOpen}
                            setIsActive={setIsContextUserOpen}
                            buttonRef={contextButtonRef} />
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