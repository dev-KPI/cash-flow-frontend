import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css'
import Logo from "@assets/logo.svg";
import ProfileIcon from "@assets/user-icon.svg"
import {ThemeButton} from '@components/ThemeButtons/ThemeButtons';


const HeaderSite = () => {
    return (
        <header className={classes.header}>
            <div className={classes.header__container}>
                <div className={classes.header__inner}>
                   <div className={classes.header__top}>
                        <div className={classes.header__logo}>
                            <img src={Logo} alt="logo" />
                            <h1>Cash<span>Flow</span></h1>
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
                            <li key={'12hf'} className={classes.active}>
                                <Link  to="/">Dashboard</Link>
                            </li>
                            <li key={'12fgd1'}>
                                <Link to="/">Analytics</Link>
                            </li>
                            <li key={'12sf3'}>
                                <Link to="/">Categories</Link>
                            </li>
                            <li key={'143dfg2'}>
                                <Link to="/">Groups</Link>
                            </li>
                            <li key={'154asd2'}>
                                <Link to="/">History</Link>
                            </li>
                            <li key={'142gfd2'}>
                                <Link to="/">Settings</Link>
                            </li>
                        </ul>
                   </nav>
                </div> 
            </div>
        </header>
    );
};

export default HeaderSite;