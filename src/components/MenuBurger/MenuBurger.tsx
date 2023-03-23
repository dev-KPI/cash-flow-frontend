import { FC } from "react";
import { Link, NavLink } from "react-router-dom";

//UI
import classes from "./MenuBurger.module.css";
import Avatar from "@assets/user-icon.svg";
import Logo from "@assets/logo.svg";
import Light from "@components/Light/Light";
import { ThemeButton } from "@components/ThemeButtons/ThemeButtons";

//store
import { useAppSelector } from "@hooks/useAppStore";

const MenuBurger: FC = () => {
    
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const setActiveLinkClasses = (isActive: boolean) => {
        let res = isActive ? classes.activeLink : classes.item;
        res += (actualTheme === 'dark' && isActive) ?  ' ' + classes.shadowLink : ' ';
        return res
    }

    return <>
    <div className={classes.burgernav}>
        <div className={classes.burgernav__title}>
            <Link to="/">
                <img alt="LogoSite" width="46px" height="46px" src={Logo} className={classes.logo}/>
                <h1 className={classes.title}>Cash <span className={classes.title__span}>Flow</span></h1>
            </Link>
        </div>
        <div className={classes.burgernav__account}>
            <img alt="Avatar" src={Avatar} width="46px" height="46px" />
            <h2 className={classes.title}>John Doe</h2>
        </div>
        <div className={classes.burgernav__line}></div>
        <nav id="sidebar">
            <ul className={classes.burgernav__list}>
                <li key={'1htjyn'}>
                    <NavLink 
                    id={'1'}
                    to="/components/Menu/analytics"
                    className={({ isActive }) => setActiveLinkClasses(isActive)}>
                        <div className={classes.burgerIcon}><i className="bi bi-house"></i></div>
                        <h3 className={classes.title}>Dashboard</h3>
                    </NavLink>
                </li>
                <li key={'2tre'}>
                    <NavLink 
                    className={({ isActive }) => setActiveLinkClasses(isActive)}
                    to="/components/Menu/analytics1" >
                        <div className={classes.burgerIcon}><i className={"bi bi-bar-chart"}></i></div>
                        <h3 className={classes.title}>Analytics</h3>
                    </NavLink>
                </li>
                <li key={'3gd'}>
                    <NavLink 
                    className={({ isActive }) => setActiveLinkClasses(isActive)}
                    to="/components/Menu/analytics2">
                        <div className={classes.burgerIcon}><i className="bi bi-bell"></i></div>
                        <h3 className={classes.title}>Notifications</h3>
                        <div className={classes.inc}><p>6</p></div>
                    </NavLink>
                </li>
                <li key={'4wer'}>
                    <NavLink 
                    className={({ isActive }) => setActiveLinkClasses(isActive)}
                    to="/components/Menu/analytics3">
                        <div className={classes.burgerIcon}><i className="bi bi-graph-down"></i></div>
                        <h3 className={classes.title}>Expenses</h3>
                    </NavLink>
                </li>
                <li key={'5gd'}>
                    <NavLink 
                    to="/components/Menu/analytics4"
                    className={({ isActive }) => setActiveLinkClasses(isActive)}>
                        <div className={classes.burgerIcon}><i className="bi bi-grid"></i></div>
                        <h3 className={classes.title}>Categories</h3>
                    </NavLink>
                </li>
                <li key={'6yt'}>
                    <NavLink 
                    className={({ isActive }) => setActiveLinkClasses(isActive)}
                    to="/components/Menu/analytics5">
                        <div className={classes.burgerIcon}><i className="bi bi-people"></i></div>
                        <h3 className={classes.title}>Groups</h3>
                    </NavLink>
                </li>
                <li key={'7ewr'}>
                    <NavLink 
                    className={({ isActive }) => setActiveLinkClasses(isActive)}
                    to="/components/Menu/analytics6">
                        <div className={classes.burgerIcon}><i className="bi bi-clock"></i></div>
                        <h3 className={classes.title}>History</h3>
                    </NavLink >
                </li>
            </ul>
        </nav>
        <div className={classes.burgernav__line}></div>
        <div className={classes.burgernav__groups}>
            <h3 className={classes.title}>Groups</h3>
            <ul className={classes.list}>
                <li key={'12grt13'} className={classes.item}>
                    <Light type="green"/>
                    <h4 className={classes.item__title}>Job</h4>
                </li>
                <li key={'11jh23'} className={classes.item}>
                    <Light type="red"/>
                    <h4 className={classes.item__title}>Family</h4>
                </li>
            </ul>
        </div>
        <div className={classes.themeButton}>
            <ThemeButton ThemeButtonType="extra" />
        </div>
        <div className={classes.burgernav__downside}>
            <ul className={classes.list}>
                <li key={'1'} className={classes.item}>
                    <i className="bi bi-gear"></i>
                    <h3 className={classes.title}>Settings</h3>
                </li>
                <li key={'erf2'} className={classes.item}>
                    <i className="bi bi-box-arrow-left"></i>
                    <h3 className={classes.title}>Logout</h3>
                </li>
            </ul>
        </div>
    </div>
    </>
}
export default MenuBurger;