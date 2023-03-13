import React, { useEffect, useState, FC } from "react";
import classes from './ThemeButtons.module.css';

//store
import { useAppDispatch, useAppSelector } from "../../hooks/useAppStore";
import { setTheme, setThemeDefault } from "../../store/ThemeSlice/ThemeSlice";


export interface IThemeButtonProps{
    ThemeButtonType?: string
}

export const ThemeButton: FC<IThemeButtonProps> = ({ThemeButtonType, ...props}) => {   

    const [ThemeActive, setThemeActive] = useState<string>('');

    const dispatch = useAppDispatch();
    const ThemeState = useAppSelector(state => state.persistedThemeSlice);

    useEffect(() => {
        if(ThemeState.requireReload) {dispatch(setThemeDefault())}
    }, [])

    const lightToggle = ThemeState.theme === 'light' ? classes.active : '';
    const darkToggle = ThemeState.theme === 'light' ? '' : classes.active;

    const LightTitle = () => {return ThemeButtonType ? <div className={classes.extra}><i className="bi bi-moon" style={{fontSize: '12px'}}></i><h3 className={classes.title__extra}>Dark</h3></div> : <i className="bi bi-moon"></i>}
    const DarkTitle = () => {return ThemeButtonType ? <div className={classes.extra}><i className="bi bi-brightness-high"style={{fontSize: '12px'}}></i><h3 className={classes.title__extra}>Light</h3></div> : <i className="bi bi-brightness-high"></i>}

    const updateTheme = (e: React.ChangeEvent): void => {
        dispatch(setTheme)
    }

    return (<>
        <input
            type="checkbox"
            id="themeDark"
            className={classes.themeButton__input}
            onChange={(e: React.ChangeEvent)=>updateTheme(e)}
        ></input>
        <input
            type="checkbox"
            id="themeLight"
            className={classes.themeButton__input}
            onChange={(e: React.ChangeEvent)=>updateTheme(e)}
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