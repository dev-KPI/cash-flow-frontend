import React, { FC } from "react";

//logic
import { MouseEvent, MouseEventHandler, ReactNode, DetailedHTMLProps, 
    EventHandler, HTMLAttributes, useCallback} from 'react';
import {useMemo, useRef, useState, useEffect} from 'react';
import { useWindowSize } from "usehooks-ts";
import { Link } from "react-router-dom";
//UI
import classes from './MobileHeader.module.css'
import {ReactComponent as Burger} from '@assets/Header/burger.svg'
import Logo from '@assets/user-icon.svg'
import MenuBurger from "./MenuBurger/MenuBurger";
import { useScrollCoordinates } from "@hooks/layoutHooks/useScrollCoordinates";
import useClickOutsideRef from "@hooks/layoutHooks/useClickOutsideRef";

const MobileHeader: FC = () => {

    const BurgerNavRef = useRef<HTMLDivElement>(null);

    const [isOpen = false, setIsOpen] = useState<boolean>();
    useClickOutsideRef(BurgerNavRef, () => setIsOpen(false))

    const getBurgerNav = useMemo(() => {
        const body = document.body;    

        if (isOpen && body){
            body.style.overflowY = 'hidden';
            return classes.menuBurgerTransition
        }
        if (body) body.style.overflow = 'auto';
        return ''
    }, [isOpen])

    return(<>
        <header className={classes.header}>
            <div className={classes.header__wrapper}>
                <button onClick={() => setIsOpen(true)}>
                    <Burger className={classes.burger}/>
                </button>
                <Link to="/dashboard">
                    <h1>Cash<span>Flow</span></h1>
                </Link>
                <img src={Logo} alt="logo" />
            </div>
        </header>
        <div 
        ref={BurgerNavRef}
        id='burger-nav'
        className={classes.menuBurger  + ' ' + getBurgerNav}>
            <MenuBurger isMenuActive={isOpen} setMenuActive={setIsOpen}/>
        </div>
        <div 
        id='active-bg' 
        className={isOpen ? classes.bgDrop + ' ' + classes.bgDropTransition : classes.bcDrop}></div>
    </>)
}

export default MobileHeader;