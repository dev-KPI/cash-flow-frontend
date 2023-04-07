import React, { FC, MouseEvent, MouseEventHandler, ReactNode, DetailedHTMLProps, HTMLAttributes } from "react";
import {useMemo, useState, useEffect} from 'react';
import { useWindowSize } from "usehooks-ts";

//UI
import classes from './MobileHeader.module.css'
import {ReactComponent as Burger} from '@assets/Header/burger.svg'
import Logo from '@assets/user-icon.svg'
import MenuBurger from "./MenuBurger/MenuBurger";

const MobileHeader: FC = () => {

    const {width, height} = useWindowSize();
    const [isOpen, setIsOpen] = useState<boolean>();
    
    useEffect(()=>{
        setIsOpen(false)
    },[])

    const getBurgerNav = useMemo(() => {
        const DashboardPage = document.getElementById('DashboardPage');
        if(isOpen){
            if(DashboardPage){
                DashboardPage.style.position = 'fixed'
            }
            return classes.menuBurgerTransition
        }
        if(DashboardPage){
            DashboardPage.style.position = 'relative'
        }
        return ''
    }, [isOpen])

    return(<>
        <header className={classes.header}>
            <div className={classes.header__wrapper}>
                <button onClick={() => setIsOpen(true)}>
                    <Burger className={classes.burger}/>
                </button>
                <h1>Cash<span>Flow</span></h1>
                <img src={Logo} alt="logo" />
            </div>
            
        </header>
        <div className={classes.menuBurger + ' ' + getBurgerNav}>
            <MenuBurger setMenuActive={setIsOpen}/>
            <div 
                onClick={() => setIsOpen(false)}
                className={classes.backdrop}>
            </div>
        </div>
    </>)
}

export default MobileHeader;