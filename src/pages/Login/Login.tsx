import React, {FC, useEffect, useState} from "react";

//UI
import classes from'./Login.module.css';
import { ThemeButton } from "@components/Buttons/ThemeButtons/ThemeButtons";
import logo from '@assets/Header/logo.svg'
import googleSvg from '@assets/google.svg';
import devicesDark from '@assets/devicesDark.png';
import devicesLight from '@assets/devicesLight.png';
import PageGlobalLoader from "@components/PageGlobalPreloader/PageGlobalPreloader";
//store
import { useActionCreators, useAppSelector } from "@hooks/storeHooks/useAppStore";
import { IThemeState } from "@store/UI_store/ThemeSlice/ThemeInterfaces";
import { Link, useNavigate } from "react-router-dom";
//logic

const Login: FC = () => {

    const navigate = useNavigate();
    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);

    return(<>
        {<PageGlobalLoader/>}
        <div className="Login__container">
        <header className={classes.Header}>
            <div className={classes.leftSide}>
                <img src={logo} alt="logo" />
                <h1 className={classes.CashFlow}>Cash <span style={{color: 'var(--main-green)'}}>Flow</span></h1>
            </div>
            <ThemeButton />
        </header>
        <div className={classes.line}></div>
        <main id={'LoginPage'} className={classes.pageContent}>
            <img className={classes.devices} src={ThemeStore.theme === 'light' ? devicesLight : devicesDark} alt="devices dark" />
            <div className={classes.form}>
                <h2 className={classes.CashFlow}>Log <span style={{color: 'var(--main-green)'}}>In</span></h2>
                <Link to="https://cash-money.store/login" className={classes.SubmitButton}>
                    <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                    <img src={googleSvg} style={{width: '26px'}} alt='google svg'></img>Log In with Google</div>
                </Link>
            </div>
        </main>
        <footer></footer>
    </div></>)
}

export default Login