import  { FC, useState, useMemo, ReactNode, useCallback, useEffect } from "react";

//logic
import uuid from "react-uuid";
import GroupModal from '@components/ModalWindows/GroupModal/GroupModal';
import IUser from "@models/IUser";
//UI
import classes from './GroupsPage.module.css'
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import GroupListItem from "./GroupListItem/GroupIListItem";
import { useGetCurrentUserGroupsQuery } from "@store/Controllers/GroupsController/GroupsController";
import { IGetCurrentUserGroups } from "@store/Controllers/GroupsController/GroupsControllerInterfaces";

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

    const {data: Groups, isFetching: isGroupsFetching, isError: isGroupsError} = useGetCurrentUserGroupsQuery(null);

    const [groupId, setGroupId] = useState<number>(0);
    const [isCreateGroupModal, setIsCreateGroupModal] = useState<boolean>(false);
    const [isEditGroupModal, setIsEditGroupModal] = useState<boolean>(false);

    const getGroups = (): ReactNode => {
        return Groups?.user_groups.map((el, i) => {
            return (
                <GroupListItem
                    key={uuid()}
                    id={el.group.id}
                    description={el.group.description}
                    title={el.group.title}
                    icon={el.group.admin.picture}
                    adminName={`${el.group.admin.first_name} ${el.group.admin.last_name}`}
                    adminEmail={el.group.admin.login}
                    color={el.group.color_code}
                    isEditGroupModal={isEditGroupModal}
                    setIsEditGroupModal={setIsEditGroupModal}
                    isGroupLoading={isGroupsFetching}
                    setGroupId={setGroupId}
                />
            )
        })
    }

    return (<>
        {<GroupModal
            groupId={groupId}
            setGroupId={setGroupId}
            setIsGroupModalOpen={setIsEditGroupModal}
            isGroupModalOpen={isEditGroupModal}
            mode='edit'
        />}
        {<GroupModal
            setGroupId={setGroupId}
            setIsGroupModalOpen={setIsCreateGroupModal}
            isGroupModalOpen={isCreateGroupModal}
            mode='create'
        />}
        <main id='GroupsPage'>
            <div className={classes.page__container}>
                <div className={classes.pageTop}>
                    <h1 className={classes.pageTitle}>Groups
                        <span> | </span>
                        <span className={classes.groupAmount}>{Groups?.user_groups.length}</span>
                    </h1>
                    <CustomButton
                        isPending={false}
                        children="Add new group"
                        icon="add"
                        type="primary"
                        callback={()=>setIsCreateGroupModal(!isCreateGroupModal)}
                        className={classes.addButton} />

                </div>
                <section className={classes.groups}>
                    {getGroups()}
                </section>
            </div>
        </main>
    </>)
}

export default Groups