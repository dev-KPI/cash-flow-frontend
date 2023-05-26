import React, {FC} from 'react';

//UI
import classes from './PcHeader.module.css'
import Logo from "@assets/Header/logo.svg";
import ProfileIcon from "@assets/user-icon.svg"
import {ThemeButton} from '@components/ThemeButtons/ThemeButtons';

import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';


const HeaderSite: FC = () => {

    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const breadcrumbs = [
        {
            'title': 'Dashboard',
            'link': '/dashboard'
        },
        {
            'title': 'Analytics',
            'link': '/analytics'
        },
        {
            'title': 'Categories',
            'link': '/categories'
        },
        {
            'title': 'Groups',
            'link': '/groups'
        },
        {
            'title': 'History',
            'link': '/history'
        },
        {
            'title': 'Settings',
            'link': '/settings'
        },
    ]

    return (
        <header className={classes.header}>
            <div className={classes.header__container}>
                <div className={classes.header__top}>
                    <div className={classes.header__logo}>
                        <img src={Logo} alt="logo" />
                        <h1 className={classes.title}>Cash<span>Flow</span></h1>
                    </div>
                    <div className={classes.header__menu}>
                        <ThemeButton />
                        <div className={classes.header__notifications}>
                            <i className="bi bi-bell"></i>
                        </div>
                    </div>
                    <div className={classes.header__profile}>
                        <img src={ProfileIcon} alt="icon" />
                        <div className={classes.profile__inner}>
                            <div className={classes.profile__main}>
                                <h4 className={classes.profile__name}>John Doe</h4>
                                <p className={classes.profile__email}>johndoee@gmail.com</p>
                            </div>
                            <i className="bi bi-chevron-down"></i>
                        </div>
                   </div>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>
        </header>
    );
};

export default HeaderSite;