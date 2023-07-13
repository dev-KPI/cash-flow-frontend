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
import { IUserState } from "@store/UserSlice/UserInterfaces";
import { IThemeState } from "@store/UI_store/ThemeSlice/ThemeInterfaces";
import { UserSliceActions } from "@store/UserSlice/UserSlice";
//logic
import { auth, googleAuthProvider } from "@services/Auth/firebaseInitialization";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Login: FC = () => {

    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    //userActions
    const UserStore = useAppSelector<IUserState>(state => state.persistedUserSlice);
    const UserDispatch = useActionCreators(UserSliceActions);

    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate();
    if(user){
        navigate('/dashboard', {replace: true})
    }

    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider)
            const userDTO: IUserState = {
                firebaseId: result.user.uid,
                name: result.user.displayName?.split(' ')[0] || '',
                surname: result.user.displayName?.split(' ')[1]|| '',
                email: result.user.email || '',
                photo: result.user.photoURL || '',
            }
            UserDispatch.setUserCredentials(userDTO)
            navigate('/dashboard', {replace: true})
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
                <button className={classes.SubmitButton} onClick={GoogleLogin}>
                    <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                    <img src={googleSvg} style={{width: '26px'}} alt='google svg'></img>Log In with Google</div>
                </button>
            </div>
        </main>
        <footer></footer>
    </div></>)
}

export default Login