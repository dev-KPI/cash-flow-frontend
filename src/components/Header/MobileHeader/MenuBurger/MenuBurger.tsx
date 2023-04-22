import { FC, Dispatch, SetStateAction, DragEvent } from "react";
import { Link, NavLink } from "react-router-dom";

//UI
import classes from "./MenuBurger.module.css";
import Avatar from "@assets/user-icon.svg";
import Logo from "@assets/Header/logo.svg";
import Light from "@components/Light/Light";
import {ReactComponent as CloseBtn} from '@assets/close-bth.svg'
import { ThemeButton } from "@components/ThemeButtons/ThemeButtons";

//store
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import CloseButton from "@components/Buttons/CloseButton/CloseButton";

interface IPropsMenuBurger {
    setMenuActive: (value: boolean) => void
    isMenuActive: boolean
}

const MenuBurger: FC<IPropsMenuBurger> = ({setMenuActive, isMenuActive}) => {
    
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const closeMenu = () => setMenuActive(false)
    const setActiveLinkClasses = (isActive: boolean) => {
        let res = isActive ? classes.item + ' ' + classes.activeLink : classes.item;
        res += (actualTheme === 'dark' && isActive) ?  ' ' + classes.shadowLink : ' ';
        return res
    }

    return <>
        <nav className={classes.burgernav}>
            <div className={classes.burgernav__title}>
                <div className={classes.burgernav__titleLink}>
                    <img alt="LogoSite" width="42px" height="42px" src={Logo} className={classes.logo}/>
                    <h1 className={classes.title}>Cash <span className={classes.title__span}>Flow</span></h1>
                    <CloseButton size={32} closeHandler={()=>{setMenuActive(false)}}/>    
                </div>
            </div>
            <div className={classes.burgernav__account}>
                <img alt="Avatar" src={Avatar} width="46px" height="46px" />
                <h2 className={classes.title}>John Doe</h2>
            </div>
            <div className={classes.burgernav__line}></div>
            <ul className={classes.burgernav__list}>
                <li key={'1htjyn'}>
                    <NavLink 
                    onClick={closeMenu}
                    id={'1'}
                    to="/dashboard"
                    className={({ isActive }) => setActiveLinkClasses(isActive)}>
                        <div className={classes.burgerIcon}><i className="bi bi-house"></i></div>
                        <h3 className={classes.title}>Dashboard</h3>
                    </NavLink>
                </li>
                <li key={'2tre'}>
                    <NavLink 
                    onClick={closeMenu}
                    className={({ isActive }) => setActiveLinkClasses(isActive)}
                    to="/analytics" >
                        <div className={classes.burgerIcon}><i className={"bi bi-bar-chart"}></i></div>
                        <h3 className={classes.title}>Analytics</h3>
                    </NavLink>
                </li>
                <li key={'3gd'}>
                    <NavLink 
                    onClick={closeMenu}
                    className={({ isActive }) => setActiveLinkClasses(isActive)}
                    to="/notifications">
                        <div className={classes.burgerIcon}><i className="bi bi-bell"></i></div>
                        <h3 className={classes.title}>Notifications</h3>
                        <div className={classes.inc}><p>6</p></div>
                    </NavLink>
                </li>
                <li key={'5gd'}>
                    <NavLink 
                    onClick={closeMenu}
                    to="/categories"
                    className={({ isActive }) => setActiveLinkClasses(isActive)}>
                        <div className={classes.burgerIcon}><i className="bi bi-grid"></i></div>
                        <h3 className={classes.title}>Categories</h3>
                    </NavLink>
                </li>
                <li key={'6yt'}>
                    <NavLink 
                    onClick={closeMenu}
                    className={({ isActive }) => setActiveLinkClasses(isActive)}
                    to="/groups">
                        <div className={classes.burgerIcon}><i className="bi bi-people"></i></div>
                        <h3 className={classes.title}>Groups</h3>
                    </NavLink>
                </li>
                <li key={'7ewr'}>
                    <NavLink 
                    onClick={closeMenu}
                    className={({ isActive }) => setActiveLinkClasses(isActive)}
                    to="/history">
                        <div className={classes.burgerIcon}><i className="bi bi-clock"></i></div>
                        <h3 className={classes.title}>History</h3>
                    </NavLink >
                </li>
            </ul>
            <div className={classes.burgernav__line}></div>
            <div className={classes.burgernav__groups}>
                <h3 className={classes.groupTitle}>Groups</h3>
                <ul className={classes.list}>
                    <li>
                        <NavLink to="/" key={'12grt13'} className={classes.item}>
                            <Light type={'solid'} color="#4C6FFF"/>
                            <h4 className={classes.title}>Job</h4>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" key={'11jh23'} className={classes.item}>
                            <Light type={'solid'} color="#FF6E01"/>
                            <h4 className={classes.title}>Family</h4>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className={classes.themeButton}>
                <ThemeButton ThemeButtonType="extra" />
            </div>
            <div className={classes.burgernav__downside}>
                <ul className={classes.list}>
                    <li>
                        <NavLink to="/" key={'ok09'} className={classes.item}>
                            <i className="bi bi-gear"></i>
                            <h3 className={classes.title}>Settings</h3>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" key={'erf2'} className={classes.item}>
                            <i className="bi bi-box-arrow-left"></i>
                            <h3 className={classes.title}>Logout</h3>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    </>
}
export default MenuBurger;