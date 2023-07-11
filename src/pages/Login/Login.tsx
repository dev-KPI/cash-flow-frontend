import React, {FC} from "react";

//UI
import classes from'./Login.module.css';
import { ThemeButton } from "@components/Buttons/ThemeButtons/ThemeButtons";
import logo from '@assets/Header/logo.svg'
import googleSvg from '@assets/google.svg';
import devicesDark from '@assets/devicesDark.png';
import devicesLight from '@assets/devicesLight.png';
//logic
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { IThemeState } from "@store/UI_store/ThemeSlice/ThemeInterfaces";
import { Link } from "react-router-dom";
import PageGlobalLoader from "@components/PageGlobalPreloader/PageGlobalPreloader";

const Login: FC = () => {

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
                <Link to={"/"} className={classes.SubmitButton}>
                    <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                    <img src={googleSvg} style={{width: '26px'}} alt='google svg'></img>Log In with Google</div>
                </Link>
                <p className={classes.underText}>Don`t have an account? 
                    <Link to='/register' style={{fontWeight: '700'}}>
                        <span style={{color: 'var(--main-text)'}}> Sign Up</span>
                    </Link>
                </p>
            </div>
        </main>
        <footer></footer>
    </div></>)
}

export default Login