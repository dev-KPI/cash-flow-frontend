import React, { FC, useState, ReactNode, useMemo } from "react";
import { Link } from "react-router-dom";

//logic
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import uuid from "react-uuid";
import { GroupObj } from "@pages/GroupObj";
//UI
import classes from './GroupsPage.module.css'
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import GroupListItem from "./GroupListItem/GroupIListItem";
import CreateGroupModal from '@components/ModalWindows/GroupModal/CreateGroupModal';
import IUser from "@models/IUser";
import EditGroupModal from "@components/ModalWindows/GroupModal/EditGroupModal";


type group_props = {
    id: number,
    title: string,
    description: string,
    status: string,
    color: string,
    icon: string,
    admin: IUser,
    members: IUser[]
}
export interface IGroup {
    group: group_props,
    status: string,
    date_join: string
}

const Groups: FC = () => {

    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const [isGroupModal, setIsGroupModal] = useState<boolean>(false);

    const openModal = () => {
        setIsGroupModal(!isGroupModal)
    }

    const getCreateGroupModal = () => {
        return <CreateGroupModal
            setIsGroupModalOpen={setIsGroupModal}
            isGroupModalOpen={isGroupModal}
        />
    }
    const getGroups = useMemo(() => {
        let groups: IGroup[] = GroupObj;
        return groups.map((el, i) => {
            const memberIcons = el.group.members.map(member => member.picture);
            return (
                <GroupListItem
                    key={uuid()}
                    id={el.group.id}
                    description={el.group.description}
                    title={el.group.title}
                    icon={el.group.admin.picture}
                    adminName={`${el.group.admin.first_name} ${el.group.admin.last_name}`}
                    adminEmail={el.group.admin.login}
                    color={el.group.color}
                    memberIcons={memberIcons}
                    isGroupModal={isGroupModal}
                    setIsGroupModal={setIsGroupModal}
                />
            )
        })
    },[GroupObj])

    return (<>
        {<EditGroupModal
            setIsGroupModalOpen={setIsGroupModal}
            isGroupModalOpen={isGroupModal}
        />}
        {getCreateGroupModal()}
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
                        callback={openModal}
                        className={classes.addButton} />

                </div>
                <section className={classes.groups}>
                    {getGroups}
                </section>
            </div>
        </main>
    </>)
}

export default Groups