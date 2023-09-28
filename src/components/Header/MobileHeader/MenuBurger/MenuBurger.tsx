import { FC, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";

//logic
import { numberWithCommas } from "@services/UsefulMethods/UIMethods";
import { IGetCurrentUserInfo } from "@store/Controllers/UserController/UserControllerInterfaces";
import { useGetCurrentUserGroupsQuery } from "@store/Controllers/GroupsController/GroupsController";
import { useGetCurrentUserBalanceQuery } from "@store/Controllers/UserController/UserController";
//store
import { useActionCreators, useAppSelector } from "@hooks/storeHooks/useAppStore"; import { UserSliceActions } from "@store/User/UserSlice";
import { useGetInvitationsByCurrentUserQuery } from "@store/Controllers/InvitationController/InvitationController";
import { ICurrencyState } from "@store/UI_store/CurrencySlice/CurrencyInterfaces";
import { IThemeState } from "@store/UI_store/ThemeSlice/ThemeInterfaces";
//UI
import classes from "./MenuBurger.module.css";
import userIcon from '@assets/user-icon.svg';
import usersPeopleIcon from '@assets/users-people-icon.svg';
import Logo from "@assets/Header/logo.svg";
import Light from "@components/Light/Light";
import { ThemeButton } from "@components/Buttons/ThemeButtons/ThemeButtons";
import CloseButton from "@components/Buttons/CloseButton/CloseButton";
import { ToggleCurrencyButton } from "@components/Buttons/ToggleButton/ToggleButton";



interface IPropsMenuBurger {
    setMenuActive: (value: boolean) => void
    isMenuActive: boolean,
    User: IGetCurrentUserInfo
}

const MenuBurger: FC<IPropsMenuBurger> = ({ setMenuActive, isMenuActive, User }) => {
    
    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);

    const { data: Groups,  isLoading: isGroupsLoading, isFetching: isGroupsFetching, isError: isGroupsError, isSuccess: isGroupsSuccess } = useGetCurrentUserGroupsQuery(null)
    const { data: Invitations, isLoading: isInvitationsLoading, isFetching: isInvitationsFetching, isError: isInvitationsError, isSuccess: isInvitationsSuccess } = useGetInvitationsByCurrentUserQuery(null)
    const { data: UserBalance = { balance: 0 }, isError: isUserBalanceError, isFetching: isUserBalanceFetching } = useGetCurrentUserBalanceQuery(null)
    const { theme: actualTheme } = useAppSelector<IThemeState>(state => state.persistedThemeSlice);

    const closeMenu = () => setMenuActive(false)
    const setActiveLinkClasses = (isActive: boolean) => {
        let res = isActive ? classes.item + ' ' + classes.activeLink : classes.item;
        res += (actualTheme === 'dark' && isActive) ?  ' ' + classes.shadowLink : ' ';
        return res
    }
    const amountNotifications = useMemo(() => {
        return isInvitationsSuccess ? Invitations.length : 0
    }, [isInvitationsLoading, isInvitationsFetching])
    const UserSliceDispatch = useActionCreators(UserSliceActions);
    
    const LogOut = () => {
        UserSliceDispatch.setIsAuth(false)
    }

    const groupsList = useMemo(() => {
        if(Groups?.user_groups){
            const userGroups = Groups.user_groups.map((el, i) => (
                <li key={'12grt' + i}>
                    <NavLink to={`/group/${el.group.id}`} className={classes.groupItem} onClick={closeMenu}>
                        <Light type={'solid'} color={el.group.color_code}/>
                        <h4 className={classes.title}>{el.group.title}</h4>
                    </NavLink>
                </li>
            ))
            return userGroups.slice(0,3)
        }
    }, [Groups])

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
                <img alt="Avatar" src={User.picture} width="46px" style={{borderRadius: '50%'}}/>
                <div className={classes.account__info}>
                    <h2 className={classes.title}>{User.first_name} {User.last_name}</h2>
                    <p className={classes.balance + ' ' + (UserBalance.balance < 0 ? classes.red : classes.green)}>{currency}{numberWithCommas(UserBalance.balance)}</p>
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
                        {amountNotifications > 0 &&
                            <div className={classes.inc}>
                                <p>{amountNotifications}</p>
                            </div>
                        }
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
                <li key={'23hr1'}>
                    <NavLink
                        onClick={closeMenu}
                        className={({ isActive }) => setActiveLinkClasses(isActive)}
                        to="/users">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className={classes.burgerIcon} ><path fill='#7A7A9D' d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" /></svg>
                        <h3 className={classes.title}>Users</h3>
                    </NavLink >
                </li>
                <li key={'jfg31'}>
                    <NavLink
                        onClick={closeMenu}
                        className={({ isActive }) => setActiveLinkClasses(isActive)}
                        to="/faq">
                        <div className={classes.burgerIcon}><i className="bi bi-chat-left-dots"></i></div>
                        <h3 className={classes.title}>FAQ</h3>
                    </NavLink >
                </li>
            </ul>
            <div className={classes.burgernav__line}></div>
            <div className={classes.burgernav__groups}>
                <h3 className={classes.groupTitle}>Groups</h3>
                <ul className={classes.list}>
                    {groupsList}          
                </ul>
            </div>
            <div className={classes.buttons}>
                <div><ToggleCurrencyButton/></div>
                <div><ThemeButton ThemeButtonType="extra" /></div>
            </div>
            <div className={classes.burgernav__downside}>
                <ul className={classes.list}>
                    <li>
                        <button onClick={LogOut}>
                            <Link to={"https://api.cash-money.store/logout"} key={'erf2'} className={classes.item}>
                                <i className="bi bi-box-arrow-left"></i>
                                <h3 className={classes.title}>Log <span style={{ color: 'var(--main-green)' }}>Out</span></h3>
                            </Link>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    </>
}
export default MenuBurger;