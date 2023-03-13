import React, { FC, useState } from "react";
import Avatar from "../../assets/user-icon.svg";
import Logo from "../../assets/logo.svg";
import classes from "./MenuBurger.module.css"

import { ThemeButton } from "../ThemeButtons/ThemeButtons";
import { Link, NavLink } from "react-router-dom";

import Light from "../Light/Light";

const MenuBurger: FC = () => {
    
    return <>
    <div className={classes.burgernav}>
        <div className={classes.burgernav__title}>
            <Link to="/">
                <img alt="LogoSite" width="46px" height="46px" src={Logo} className={classes.logo}/>
                <h1 className={classes.title}>Cash <span className={classes.title__span}>Flow</span></h1>
            </Link>
        </div>
        <Light 
        type="red"/>
        <div className={classes.burgernav__account}>
            <img alt="Avatar" src={Avatar} width="46px" height="46px" />
            <h2 className={classes.title}>John Doe</h2>
        </div>
        <div className={classes.burgernav__line}></div>
        <nav id="sidebar">
            <ul className={classes.burgernav__list}>

                <li >
                    <NavLink 
                    to="/components/Menu/analytics"
                    className={({ isActive }) => isActive ? classes.activeLink + ' ' + classes.activeLink__after : classes.item}>
                        <div className={classes.burgerIcon}><i className="bi bi-house"></i></div>
                        <h3 className={classes.title}>Dashboard</h3>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    className={({ isActive }) => isActive ? classes.activeLink : classes.item}
                    to="/components/Menu/analytics1" >
                        <div className={classes.burgerIcon}><i className={"bi bi-bar-chart"}></i></div>
                        <h3 className={classes.title}>Analytics</h3>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    className={({ isActive }) => isActive ? classes.activeLink : classes.item}
                    to="/components/Menu/analytics2">
                        <div className={classes.burgerIcon}><i className="bi bi-bell"></i></div>
                        <h3 className={classes.title}>Notifications</h3>
                        <div className={classes.inc}><p>6</p></div>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    className={({ isActive }) => isActive ? classes.activeLink : classes.item}
                    to="/components/Menu/analytics3">
                        <div className={classes.burgerIcon}><i className="bi bi-graph-down"></i></div>
                        <h3 className={classes.title}>Expenses</h3>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to="/components/Menu/analytics4"
                    className={({ isActive }) => isActive ? classes.activeLink : classes.item}>
                        <div className={classes.burgerIcon}><i className="bi bi-grid"></i></div>
                        <h3 className={classes.title}>Categories</h3>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    className={({ isActive }) => isActive ? classes.activeLink : classes.item}
                    to="/components/Menu/analytics5">
                        <div className={classes.burgerIcon}><i className="bi bi-people"></i></div>
                        <h3 className={classes.title}>Groups</h3>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    className={({ isActive }) => isActive ? classes.activeLink : classes.item}
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
                <li className={classes.item}>
                    <div className={classes.light}></div>
                    <h4 className={classes.item__title}>Job</h4>
                </li>
                <li className={classes.item}>
                    <div className={classes.orange}></div>
                    <h4 className={classes.item__title}>Family</h4>
                </li>
            </ul>
        </div>
        <div className={classes.themeButton}>
            <ThemeButton ThemeButtonType="extra" />
            <Light type="red"/>
        </div>
        <div className={classes.burgernav__downside}>
            <ul className={classes.list}>
                <li className={classes.item}>
                    <i className="bi bi-gear"></i>
                    <h3 className={classes.title}>Settings</h3>
                </li>
                <li className={classes.item}>
                    <i className="bi bi-box-arrow-left"></i>
                    <h3 className={classes.title}>Logout</h3>
                </li>
            </ul>
        </div>
    </div>
    </>
}
export default MenuBurger;