import {FC } from "react";
import { Link } from "react-router-dom";
//UI
import classes from'./Login.module.css';
import { ThemeButton } from "@components/Buttons/ThemeButtons/ThemeButtons";
import Logo from '@assets/Header/logo.svg'
import googleSvg from '@assets/google.svg';
import devicesDark from '@assets/devicesDark.png';
import devicesLight from '@assets/devicesLight.png';
//store
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { IThemeState } from "@store/UI_store/ThemeSlice/ThemeInterfaces";

//logic

const Login: FC = () => {

    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);

    return(<>
        <header className={classes.Header}>
            <div className={classes.Header__container}>
                <div className={classes.header__logo}>
                    <div className={classes.logo__wrapper}>
                        <img src={Logo} alt="logo" />
                    </div>
                    <h1 className={classes.title}>Cash<span>Flow</span></h1>
                </div>
                <ThemeButton />
            </div>
        </header>
        <main id={'LoginPage'} className={'no-padding'}>
            <div className={classes.page__container}>
                <div className={classes.imgWrapper}>
                    <img className={classes.devices} src={ThemeStore.theme === 'light' ? devicesLight : devicesDark} alt="devices dark" />
                </div>
                <div className={classes.form}>
                    <h2 className={classes.title}>Log <span style={{ color: 'var(--main-green)' }}>In</span></h2>
                    <Link to="https://api.cash-money.store/login" className={classes.SubmitButton}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <img src={googleSvg} style={{ width: '26px' }} alt='google svg'></img>Log In with Google</div>
                    </Link>
                </div>
            </div>
        </main>
        <footer></footer>
    </>)
}

export default Login