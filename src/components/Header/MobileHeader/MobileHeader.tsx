import React, { FC, MouseEvent, MouseEventHandler, ReactNode, DetailedHTMLProps, 
    EventHandler, HTMLAttributes, useCallback } from "react";
import {useMemo, useRef, useState, useEffect} from 'react';
import { useWindowSize } from "usehooks-ts";

//UI
import classes from './MobileHeader.module.css'
import {ReactComponent as Burger} from '@assets/Header/burger.svg'
import Logo from '@assets/user-icon.svg'
import MenuBurger from "./MenuBurger/MenuBurger";
import { useScrollCoordinates } from "@hooks/useScrollCoordinates";
import useClickOutsideRef from "@hooks/useClickOutsideRef";

const MobileHeader: FC = () => {

    const BurgerNavRef = useRef<HTMLDivElement>(null);

    const {pageYPos} = useScrollCoordinates();
    const [isOpen, setIsOpen] = useState<boolean>();
    useClickOutsideRef(BurgerNavRef, () => setIsOpen(false))

    const getBurgerNav = useMemo(() => {
        const body = document.body;    
        const modal = document.getElementById('burger-nav');
        const bcDrop = document.getElementById('active-bg');

        if (modal && bcDrop) {
            modal.style.top = pageYPos + 'px';
            bcDrop.style.top = pageYPos + 'px';
        }
        if (isOpen){
            if(body) body.style.overflow = 'hidden';
            return classes.menuBurgerTransition
        }
        if (body) body.style.overflow = 'auto';
        return ''
    }, [isOpen, pageYPos])

    return(<>
        <header className={classes.header}>
            <div className={classes.header__container}>
                <button onClick={() => setIsOpen(true)}>
                    <Burger className={classes.burger}/>
                </button>
                <h1 className={classes.title}>Cash<span>Flow</span></h1>
                <img src={Logo} alt="logo" />
            </div>
        </header>
        <div 
        ref={BurgerNavRef}
        id='burger-nav'
        className={classes.menuBurger + ' ' + getBurgerNav}>
            <MenuBurger setMenuActive={setIsOpen}/>
        </div>
        <div 
        id='active-bg' 
        className={isOpen ? classes.bgDrop + ' ' + classes.bgDropTransition : classes.bcDrop}></div>
    </>)
}

export default MobileHeader;