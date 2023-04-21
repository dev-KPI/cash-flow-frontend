import React, {FC, MouseEvent} from 'react';
import { Link, NavLink } from 'react-router-dom';

//UI
import classes from './PcHeader.module.css'
import Logo from "@assets/Header/logo.svg";
import ProfileIcon from "@assets/user-icon.svg"
import {ThemeButton} from '@components/ThemeButtons/ThemeButtons';

import { useAppSelector } from '@hooks/storeHooks/useAppStore';


const HeaderSite: FC = () => {

    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const setActiveLinkClasses = (isActive: boolean) => {
        let res = isActive ? classes.active : classes.item;
        res += (actualTheme === 'dark' && isActive) ?  ' ' + classes.shadowLink : ' ';
        return res
    }

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
                </div>
                <nav className={classes.breadcrumbs}>
                    <ul className={classes.navbar}>
                        <li key={'12hf,f'}>
                            <NavLink 
                            className={({ isActive }) => setActiveLinkClasses(isActive)}
                            to="/dashboard">Dashboard</NavLink>
                        </li>
                        <li key={'12fgd1'}>
                            <NavLink 
                            className={({ isActive }) => setActiveLinkClasses(isActive)}
                            to="/analytics">Analytics</NavLink>
                        </li>
                        <li key={'12sf3'}>
                            <NavLink 
                            className={({ isActive }) => setActiveLinkClasses(isActive)}
                            to="/categories">Categories</NavLink>
                        </li>
                        <li key={'143dfg2'}>
                            <NavLink 
                            className={({ isActive }) => setActiveLinkClasses(isActive)}
                            to="/groups">Groups</NavLink>
                        </li>
                        <li key={'154asd2'}>
                            <NavLink 
                            className={({ isActive }) => setActiveLinkClasses(isActive)}
                            to="/history">History</NavLink>
                        </li>
                        <li key={'142gfd2'}>
                            <NavLink 
                            className={({ isActive }) => setActiveLinkClasses(isActive)}
                            to="/settings">Settings</NavLink>
                        </li>
                    </ul>
                </nav>
            </div> 
        </header>
    );
};

export default HeaderSite;