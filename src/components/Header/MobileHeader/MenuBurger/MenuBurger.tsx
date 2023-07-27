import { FC, Dispatch, SetStateAction, DragEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

//logic
import { numberWithCommas } from "@services/UsefulMethods/UIMethods";
//store
import { useActionCreators, useAppSelector } from "@hooks/storeHooks/useAppStore";
//UI
import classes from "./MenuBurger.module.css";
import userIcon from '@assets/user-icon.svg';
import Logo from "@assets/Header/logo.svg";
import Light from "@components/Light/Light";
import { ThemeButton } from "@components/Buttons/ThemeButtons/ThemeButtons";
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
                <img alt="Avatar" src={userIcon} width="46px" style={{borderRadius: '10px'}}/>
                <div className={classes.account__info}>
                    <h2 className={classes.title}>{`Adam`}</h2>
                    <h2 className={classes.title}>{`Breban`}</h2>
                    <p className={classes.balance}>{numberWithCommas(4124)}$</p>
                </div>
            </div>
            <div className={classes.burgernav__line}></div>
            <ul className={classes.burgernav__list}>
                <li key={'1htjyn'}>
                    <NavLink 
                    onClick={closeMenu}
                    id={'1jfi2'}
                    to="/dashboard"
                    className={({ isActive }) => setActiveLinkClasses(isActive)}>
                        <div className={classes.burgerIcon}><i className="bi bi-house"></i></div>
                        <h3 className={classes.title}>Dashboard</h3>
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
                        <NavLink to="/" key={'12grt13'} className={classes.groupItem}>
                            <Light type={'solid'} color="#4C6FFF"/>
                            <h4 className={classes.title}>Job</h4>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" key={'11jh23'} className={classes.groupItem}>
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
                        <Link to={"https://api.cash-money.store/logout"} key={'erf2'} className={classes.item}>
                            <i className="bi bi-box-arrow-left"></i>
                            <h3 className={classes.title}>Log <span style={{ color: 'var(--main-green)' }}>Out</span></h3>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </>
}
export default MenuBurger;