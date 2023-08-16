import { FC, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";

//logic
import { numberWithCommas } from "@services/UsefulMethods/UIMethods";
import IHeaderProps from "@components/Header/HeaderInterfaces";
import { IGetCurrentUserInfo } from "@store/Controllers/UserController/UserControllerInterfaces";
//store
import { useActionCreators, useAppSelector } from "@hooks/storeHooks/useAppStore"; import { UserSliceActions } from "@store/User/UserSlice";
import { useGetInvitationsByCurrentUserQuery } from "@store/Controllers/InvitationController/InvitationController";
//UI
import classes from "./MenuBurger.module.css";
import userIcon from '@assets/user-icon.svg';
import usersPeopleIcon from '@assets/users-people-icon.svg';
import Logo from "@assets/Header/logo.svg";
import Light from "@components/Light/Light";
import { ThemeButton } from "@components/Buttons/ThemeButtons/ThemeButtons";
import CloseButton from "@components/Buttons/CloseButton/CloseButton";
import { useGetCurrentUserGroupsQuery } from "@store/Controllers/GroupsController/GroupsController";
interface IPropsMenuBurger {
    setMenuActive: (value: boolean) => void
    isMenuActive: boolean,
    User: IGetCurrentUserInfo
}

const MenuBurger: FC<IPropsMenuBurger> = ({setMenuActive, isMenuActive, User}) => {
    const { data: Groups,  isLoading: isGroupsLoading, isFetching: isGroupsFetching, isError: isGroupsError, isSuccess: isGroupsSuccess } = useGetCurrentUserGroupsQuery(null)
    const { data: Invitations, isLoading: isInvitationsLoading, isFetching: isInvitationsFetching, isError: isInvitationsError, isSuccess: isInvitationsSuccess } = useGetInvitationsByCurrentUserQuery(null)
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

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
            return Groups.user_groups.map(el => (
                <li>
                    <NavLink to={`/group/${el.group.id}`} key={'12grt13'} className={classes.groupItem}>
                        <Light type={'solid'} color={el.group.color_code}/>
                        <h4 className={classes.title}>{el.group.title}</h4>
                    </NavLink>
                </li>
            ))
        }
    }, [])

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
                    <h2 className={classes.title}>{User.first_name}</h2>
                    <h2 className={classes.title}>{User.last_name}</h2>
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
                        <img src={usersPeopleIcon} alt="users-people" className={classes.burgerIcon} />
                        <h3 className={classes.title}>Users</h3>
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
            <div className={classes.themeButton}>
                <ThemeButton ThemeButtonType="extra" />
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