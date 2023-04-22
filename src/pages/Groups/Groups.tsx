import React, { FC, useState, ReactNode } from "react";
//logic
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
//UI
import classes from './Groups.module.css'


const Groups: FC = () => {
    
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    return(<>
        <main id='GroupsPage'>
            <div className={classes.GroupsPage__container}>
                <h3>Groups</h3>
            </div>
        </main>
    </>)
}

export default Groups