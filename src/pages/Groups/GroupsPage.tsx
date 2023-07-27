import  { FC, useState, useMemo, ReactNode } from "react";

//logic
import uuid from "react-uuid";
import GroupModal from '@components/ModalWindows/GroupModal/GroupModal';

//UI
import classes from './GroupsPage.module.css'
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import GroupListItem from "./GroupListItem/GroupIListItem";
import { useGetCurrentUserGroupsQuery } from "@store/Controllers/GroupsController/GroupsController";


const Groups: FC = () => {

    const {data: Groups, isFetching: isGroupsFetching, isError: isGroupsError} = useGetCurrentUserGroupsQuery(null);

    const [isCreateGroupModal, setIsCreateGroupModal] = useState<boolean>(false);
    const [isEditGroupModal, setIsEditGroupModal] = useState<boolean>(false);

    const getGroups = (): ReactNode => {
        if(Groups && !isGroupsError && !isGroupsFetching){
            return Groups.user_groups.map((el, i) => {
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
                    />
                )
            })
        } else {
            return <></>
        }
    }

    return (<>
        {<GroupModal
            setIsGroupModalOpen={setIsEditGroupModal}
            isGroupModalOpen={isEditGroupModal}
            mode='edit'
        />}
        {<GroupModal
            setIsGroupModalOpen={setIsCreateGroupModal}
            isGroupModalOpen={isCreateGroupModal}
            mode='create'
        />}
        <main id='GroupsPage'>
            <div className={classes.page__container}>
                <div className={classes.pageTop}>
                    <h1 className={classes.pageTitle}>Groups
                        <span> | </span>
                        {Groups && <span className={classes.groupAmount}>{Groups.user_groups.length}</span>}
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