import React, { FC } from "react";

//logic
import {useMemo, useRef, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
//store
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { IUserState } from "@store/UserSlice/UserInterfaces";
//UI
import classes from './MobileHeader.module.css'
import userIcon from '@assets/user-icon.svg';
import MenuBurger from "./MenuBurger/MenuBurger";
import useClickOutsideRef from "@hooks/layoutHooks/useClickOutsideRef";


const MobileHeader: FC = () => {

    const UserStore = useAppSelector<IUserState>(state => state.UserSlice);

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
            <div className={classes.header__container}>
                <BurgerButton 
                isOpen={isOpen}
                onClick={() => setIsOpen(true)}/>
                <Link to="/dashboard">
                    <h1 className={classes.title}>Cash<span>Flow</span></h1>
                </Link>
                <img style={{borderRadius: '10px'}} width={46} src={UserStore.photo ? UserStore.photo : userIcon} alt="logo" />
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
            className={isOpen ? classes.bgDrop + ' ' + classes.bgDropTransition : classes.bcDrop}>
        </div>
    </>)
}

export default MobileHeader;

const BurgerButton:React.FC<{
    isOpen: boolean
    onClick: ()=> void
}> = ({isOpen, onClick}) => {

    return (
    <button className={isOpen ? [classes.menu,classes.opened].join(' ') : classes.menu} onClick={onClick}>
        <svg width="24" height="24" viewBox="0 0 100 100">
            <path className={[classes.line,classes.line1].join(' ')} d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
            <path className={[classes.line,classes.line2].join(' ')} d="M 20,50 H 80" />
            <path className={[classes.line,classes.line3].join(' ')} d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
        </svg>
    </button>
    )
}