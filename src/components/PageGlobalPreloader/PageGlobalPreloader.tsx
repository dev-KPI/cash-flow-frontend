import React, {useEffect} from "react";

import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { IThemeState } from "@store/UI_store/ThemeSlice/ThemeInterfaces";
import classes from './PageGlobalPreloader.module.css';


const PageGlobalLoader = () => {
    
    const ThemeStore = useAppSelector<IThemeState>(state => state.persistedThemeSlice);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return <div style={{
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: ThemeStore.backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
          <div className={classes.loading}>
            <div className={classes.loading__letter}>C</div>
            <div className={classes.loading__letter}>a</div>
            <div className={classes.loading__letter}>s</div>
            <div className={classes.loading__letter}>h</div>
            <div style={{color: "var(--main-green)"}} className={classes.loading__letter}>M</div>
            <div style={{color: "var(--main-green)"}} className={classes.loading__letter}>o</div>
            <div style={{color: "var(--main-green)"}} className={classes.loading__letter}>n</div>
            <div style={{color: "var(--main-green)"}} className={classes.loading__letter}>e</div>
            <div style={{color: "var(--main-green)"}} className={classes.loading__letter}>y</div>
          </div>
    </div> 
}

export default PageGlobalLoader;