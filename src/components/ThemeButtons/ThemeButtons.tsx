import React, { useEffect } from "react";
import classes from './ThemeButtons.module.css'
//store
import { useAppSelector, useAppDispatch } from '../../hooks/useAppStore'
import { setAnotherTheme } from "../../store/ThemeSlice/ThemeSlice";

export const ThemeButton = () => {

    const actualTheme = useAppSelector((state) => state.ThemeSlice.type)
    const dispatch = useAppDispatch();

    const setTheme = () => {
        const body = document.querySelector('body') as HTMLElement;
        body.setAttribute('data-theme', actualTheme);
    }
    const updateTheme = async (e: React.ChangeEvent) => {
        await dispatch(setAnotherTheme());
        setTheme();
    }

    useEffect(() => {
        const body = document.querySelector('body') as HTMLElement;
        body.setAttribute('data-theme', actualTheme);
    }, [])

    return (<>
        <input
            type="checkbox"
            id="themeToggle"
            className={classes.themeButton__input}
            onChange={updateTheme}
        ></input>
        <label
            className={classes.themeButton__label}
            htmlFor="themeToggle">
            <div className={classes.themeButton}>
                <div className={classes.themeButton__inner}>
                    <div className={classes.themeButton__item + ' ' + classes.dark}>
                        <i className="bi bi-moon"></i>
                    </div>
                    <div className={classes.themeButton__item + ' ' + classes.light + ' ' + classes.active}>
                        <i className="bi bi-brightness-high"></i>
                    </div>
                </div>
            </div>
        </label>
    </>)
}

export const ThemeButtonExtra = () => {
    return <>
        <div className={classes.themeButtonExtra__wrapper}>
            <div className={classes.themeButtonExtra}>
                <div className={classes.themeButtonExtra__inner}>
                    <div className={classes.themeButtonExtra__item + ' ' + classes.darkExtra}>
                        <i className="bi bi-moon"></i>
                        <p className={classes.themeButtonExtra__title}>Dark</p>
                    </div>
                    <div className={classes.themeButtonExtra__item + ' ' + classes.light + ' ' + classes.activeExtra}>
                        <i className="bi bi-brightness-high"></i>
                        <p className={classes.themeButtonExtra__title + ' ' + classes.activeExtra} >Light</p>
                    </div>
                </div>
            </div>
        </div>
    </>
} 