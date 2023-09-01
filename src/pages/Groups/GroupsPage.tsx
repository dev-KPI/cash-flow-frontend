import  { FC, useState, useMemo, ReactNode, useCallback, useEffect } from "react";

//logic
import uuid from "react-uuid";
import GroupModal from '@components/ModalWindows/GroupModal/GroupModal';
import { useGetCurrentUserGroupsQuery } from "@store/Controllers/GroupsController/GroupsController";
import { useGetCurrentUserInfoQuery } from "@store/Controllers/UserController/UserController";
//UI
import classes from './GroupsPage.module.css'
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import GroupListItem from "./GroupListItem/GroupIListItem";
import PreLoader from "@components/PreLoader/PreLoader";
import ConfirmationModal from "@components/ModalWindows/ConfirtmationModal/ConfirmationModal";



const Groups: FC = () => {

    const {data: Groups, isFetching: isGroupsFetching, isLoading: isGroupsLoading, isError: isGroupsError, isSuccess: isGroupsSuccess} = useGetCurrentUserGroupsQuery(null);
    const {data: CurrentUser, isLoading: isCurrentUserLoading, isError: isCurrentUserError} = useGetCurrentUserInfoQuery(null);

    const [groupId, setGroupId] = useState<number>(0);
    const [isCreateGroupModal, setIsCreateGroupModal] = useState<boolean>(false);
    const [isEditGroupModal, setIsEditGroupModal] = useState<boolean>(false);
    const [isConfirmationModal, setIsConfirmationModal] = useState<boolean>(false);

    let groupsContent;
    if (isGroupsFetching) {
        groupsContent = <div className={classes.loaderWrapper}>
            <PreLoader preLoaderSize={50} type='auto' />
        </div>
    }
    else if (isGroupsSuccess) {
        if (Groups.user_groups.length > 0) {
            groupsContent = <section className={classes.groups}>
                {Groups.user_groups.map((el, i) =>
                    <GroupListItem
                        key={uuid()}
                        id={el.group.id}
                        description={el.group.description}
                        title={el.group.title}
                        icon={el.group.admin.picture}
                        adminName={`${el.group.admin.first_name} ${el.group.admin.last_name}`}
                        adminEmail={el.group.admin.login}
                        color={el.group.color_code}
                        isAdmin={CurrentUser?.id === el.group.admin.id}
                        isEditGroupModal={isEditGroupModal}
                        setIsEditGroupModal={setIsEditGroupModal}
                        isGroupLoading={isGroupsFetching}
                        setIsConfirmationModal={setIsConfirmationModal}
                        setGroupId={setGroupId}
                    />)}
            </section>
                
        } else {
            groupsContent = (<div className={classes.noItems}>
                <i className="bi bi-person-x" style={{ fontSize: 50, color: 'var(--main-text)' }}></i>
                <h5 className={classes.noItems__title}>Your groups list currently is empty!</h5>
                <p className={classes.noItems__text}>Tap the button above to create group.</p>
            </div>)
        }     
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
        { 
            <ConfirmationModal 
            groupId={groupId} 
            title={Groups?.user_groups?.find(el => groupId === el.group.id )?.group.title}
            isConfirmationModalOpen={isConfirmationModal} 
            setIsConfirmationModalOpen={setIsConfirmationModal} 
            mode={!!Groups?.user_groups?.find(el => CurrentUser?.id === el.group.admin.id ) ? 'disband' : 'leave'}/>
        }
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
                {groupsContent}
            </div>
        </main>
    </>)
}

export default Groups