import React, { FC, useState, ReactNode } from "react";
//logic
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
//UI
import classes from './Groups.module.css'
import ConfirmButton from "@components/Buttons/ConfirmButton/ConfirmButton";
import GroupItem from "./GroupItem/GroupItem";


const Groups: FC = () => {

    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);
    const handleSubmit = () => {
        console.log(1);
    }
    return (<>
        <main id='GroupsPage'>
            <div className={classes.page__container}>
                <div className={classes.pageTop}>
                    <h3 className={classes.pageTitle}>Groups
                        <span> | </span>
                        <span className={classes.groupAmount}>4</span>
                    </h3>
                    <ConfirmButton
                        isPending={false}
                        title="Add new group"
                        btnWidth={170}
                        btnHeight={36}
                        type="add"
                        callback={handleSubmit} />
                </div>

                <section className={classes.groups}>
                    <GroupItem />
                    <GroupItem />
                    <GroupItem />
                    <GroupItem />
                    <GroupItem />
                </section>
            </div>
        </main>
    </>)
}

export default Groups