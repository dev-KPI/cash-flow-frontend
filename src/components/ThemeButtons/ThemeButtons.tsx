import React from "react";
import classes from './ThemeButtons.module.css'
export const ThemeButton = () => {
    return (
        <div className={classes.themeButton}>
            <div className={classes.themeButton__inner}>
                <div className={classes.themeButton__item + ' ' + classes.dark }>
                    <i className="bi bi-moon"></i>
                </div>
                <div className={classes.themeButton__item + ' ' + classes.light + ' ' + classes.active}>
                    <i className="bi bi-brightness-high"></i>
                </div>
            </div>
        </div>
    )
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