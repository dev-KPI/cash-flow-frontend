import React, { FC } from "react";
import Avatar from "../../assets/user-icon.svg";
import Logo from "../../assets/logo.svg";
import classes from "./MenuBurger.module.css"

import { ThemeButtonExtra } from "../ThemeButtons/ThemeButtons";
import { Link } from "react-router-dom";



const MenuBurger: FC = () => {
    return <>
        <div className={classes.burgernav}>
            <div className={classes.burgernav__title}>
                <img width="46px" height="46px" src={Logo} />
                <h1 className={classes.text}>Cash <span className={classes.textspan}>Flow</span></h1>
            </div>
            <div className={classes.burgernav__account}>
                <img src={Avatar} width="46px" height="46px" />
                <h2 className={classes.text}>John Doe</h2>
            </div>
            <div className={classes.burgernav__line}></div>
            <nav>
                <ul className={classes.burgernav__list}>
                    <Link to="/components/menu">
                        <li className={classes.item}>
                            <div className={classes.burgerIcon}><i className="bi bi-house"></i></div>
                            <h3 className={classes.text}>Dashboard</h3>
                        </li>
                    </Link>
                    <Link to="/components/menu">
                        <li className={classes.item}>
                            <div className={classes.burgerIcon}><i className="bi bi-bar-chart"></i></div>
                            <h3 className={classes.text}>Analytics</h3>
                        </li>
                    </Link>
                    <Link to="/components/menu">
                        <li className={classes.item + ' ' + classes.active}>
                            <div className={classes.burgerIcon}><i className="bi bi-bell"></i></div>
                            <h3 className={classes.text + ' ' + classes.active}>Notifications</h3>
                            <div className={classes.inc}>
                                <p className={classes.title}>6</p>
                            </div>
                            <div className={classes.active__line}></div>
                        </li>
                    </Link>
                    <Link to="/components/menu">
                        <li className={classes.item}>
                            <div className={classes.burgerIcon}><i className="bi bi-graph-down"></i></div>
                            <h3 className={classes.text}>Expenses</h3>
                        </li>
                    </Link>
                    <Link to="/components/menu/">
                        <li className={classes.item}>
                            <div className={classes.burgerIcon}><i className="bi bi-grid"></i></div>
                            <h3 className={classes.text}>Categories</h3>
                        </li>
                    </Link>
                    <Link to="/components/menu">
                        <li className={classes.item}>
                            <div className={classes.burgerIcon}><i className="bi bi-people"></i></div>
                            <h3 className={classes.text}>Groups</h3>
                        </li>
                    </Link>
                    <Link to="/components/menu">
                        <li className={classes.item}>
                            <div className={classes.burgerIcon}><i className="bi bi-clock"></i></div>
                            <h3 className={classes.text}>History</h3>
                        </li>
                    </Link >
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
                <ThemeButtonExtra />
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