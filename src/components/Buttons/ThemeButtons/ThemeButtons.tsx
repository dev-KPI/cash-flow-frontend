import React, { useEffect, FC } from "react";

//UI
import classes from './ThemeButtons.module.css'
//store
import { useActionCreators, useAppSelector } from "@hooks/storeHooks/useAppStore";
import { ThemeActions } from "@UI_store/ThemeSlice/ThemeSlice";
import { IThemeState } from "@store/UI_store/ThemeSlice/ThemeInterfaces";

export interface IThemeButtonProps{
    ThemeButtonType?: string
}

export const ThemeButton: FC<IThemeButtonProps> = ({ThemeButtonType, ...props}) => {   

    const { theme } = useAppSelector<IThemeState>(state => state.persistedThemeSlice)
    const ThemeDispatch = useActionCreators(ThemeActions);


    const lightToggle = theme === 'light' ? classes.active : '';
    const darkToggle = theme === 'light' ? '' : classes.active;

    const LightTitle = () => {return ThemeButtonType ? <div className={classes.extra}><i className="bi bi-moon" style={{fontSize: '12px'}}></i><h3 className={classes.title__extra}>Dark</h3></div> : <i className="bi bi-moon"></i>}
    const DarkTitle = () => {return ThemeButtonType ? <div className={classes.extra}><i className="bi bi-brightness-high"style={{fontSize: '12px'}}></i><h3 className={classes.title__extra}>Light</h3></div> : <i className="bi bi-brightness-high"></i>}

    const updateTheme = (e: React.ChangeEvent, theme: string): void => {
        ThemeDispatch.setTheme();
    }

    return (<>
        <input
            type="checkbox"
            id="themeDark"
            className={classes.themeButton__input}
            onChange={(e: React.ChangeEvent)=>updateTheme(e, 'light')}
        ></input>
        <input
            type="checkbox"
            id="themeLight"
            className={classes.themeButton__input}
            onChange={(e: React.ChangeEvent)=>updateTheme(e, 'dark')}
        ></input>
        <div className={classes.themeButton__label}>
            <div className={classes.themeButton}>
                <div className={classes.themeButton__inner}>                
                    <label htmlFor="themeLight">
                        <div className={classes.themeButton__item + ' ' + classes.light + ' ' + darkToggle}>
                            <LightTitle/>
                        </div>
                    </label>
                    <label htmlFor="themeDark">
                        <div className={classes.themeButton__item + ' ' + classes.dark  + ' ' + lightToggle}>
                            <DarkTitle/>
                        </div>
                    </label>
                </div>
            </div>
        </div>
        </>)
}