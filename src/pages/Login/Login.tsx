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
//logic
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useLoginQuery } from "@store/Auth/Auth";

const Login: FC = () => {

    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    //userActions
    const { data, error: loginError, isError: isLoginError, isLoading: isLoginLoading } = useLoginQuery(null);

    const LoginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try{
            const response = data
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

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
                <button className={classes.SubmitButton} onClick={LoginHandler}>
                    <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                    <img src={googleSvg} style={{width: '26px'}} alt='google svg'></img>Log In with Google</div>
                </button>
            </div>
        </main>
        <footer></footer>
    </div></>)
}

export default Login