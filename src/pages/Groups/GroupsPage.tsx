import React, { FC, useState, ReactNode } from "react";
//logic
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { GroupObj } from "./GroupObj";
//UI
import classes from './GroupsPage.module.css'
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import GroupListItem from "./GroupListItem/GroupIListItem";
import { NavLink, Route, Router, Routes } from "react-router-dom";


interface people_props {
    id: number,
    login: string,
    first_name: string,
    last_name: string,
    picture: string
}

type group_props = {
    id: number,
    title: string,
    description: string,
    status: string,
    color: string,
    icon: string,
    admin: people_props,
    members: people_props[]
}
export interface IGroup {
    group: group_props,
    status: string,
    date_join: string
}

const Groups: FC = () => {

    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);
    const handleSubmit = () => {
        console.log(1);
    }

    
    const getGroups = () => {
        let groups: IGroup[] = GroupObj;
        return groups.map((el, i) => {
            const memberIcons = el.group.members.map(member => member.picture);
            return (<NavLink to={`/group/${el.group.id}`}>
                <GroupListItem
                    key={i}
                    description={el.group.description}
                    title={el.group.title}
                    icon={el.group.admin.picture}
                    adminName={el.group.admin.first_name}
                    adminEmail={el.group.admin.last_name}
                    color={el.group.color}
                    memberIcons={memberIcons}
                />
            </NavLink>
            )  
        })
           
    }
    return (<>
        <main id='GroupsPage'>
            <div className={classes.page__container}>
                <div className={classes.pageTop}>
                    <h1 className={classes.pageTitle}>Groups
                        <span> | </span>
                        <span className={classes.groupAmount}>{GroupObj.length}</span>
                    </h1>
                    <CustomButton
                        isPending={false}
                        children="Add new group"
                        icon="add"
                        type="primary"
                        callback={handleSubmit}
                        className={`${classes.addButton} btn-primary`} />
                </div>
                <section className={classes.groups}>
                    {getGroups()}
                </section>
            </div>
        </main>
    </>)
}

export default Groups