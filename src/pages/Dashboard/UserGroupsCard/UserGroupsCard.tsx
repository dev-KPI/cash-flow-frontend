import { useCallback, useEffect, useMemo, useState } from 'react';

import { useElementSize } from 'usehooks-ts'
import { handleWrap } from '@services/UsefulMethods/UIMethods';
import IGroup from '@models/IGroup';
import { useGetCurrentUserGroupsQuery } from '@store/Controllers/GroupsController/GroupsController';

//UI
import classes from './UserGroupsCard.module.css'
import UserGroupsCardItem from '@pages/Dashboard/UserGroupsCardItem/UserGroupsCardItem';
import UserGroupsCardLoader from '@pages/Dashboard/UserGroupsCard/UserGroupsCardLoader';
import ViewMoreModal from '@components/ModalWindows/ViewMoreModal/ViewMoreModal';
import GroupModal from '@components/ModalWindows/GroupModal/GroupModal';
import SpecialButton from '@components/Buttons/SpeciaButton/SpecialButton';


const UserGroupsCard = () => {

    const {data: UserGroups, isLoading: isUserGroupsLoading, isError: isUserGroupsError} = useGetCurrentUserGroupsQuery(null)

    const [groupId, setGroupId] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(11);
    const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();

    useEffect(()=> {
        handleWrap(classes.list, classes.wrapped, classes.specialItem, 1);
    }, [height, width, UserGroups, isUserGroupsLoading, isUserGroupsError])

    const getGroups = useMemo(() => {
        if(UserGroups){
            return UserGroups.user_groups.map((item: IGroup, i) => <UserGroupsCardItem key={i} group={item.group} />)
        }
    }, [UserGroups, isUserGroupsLoading, isUserGroupsError])

    const useGroups = (groups: IGroup[], total: number) => {
        const properGroups = useMemo(() => {
            return groups?.slice(0, total)
        }, [groups, total])
        return properGroups;
    }

    const createGroupModal = () => {
        return <GroupModal
            groupId={groupId}
            setGroupId={setGroupId}
            isGroupModalOpen={isGroupModalOpen}
            setIsGroupModalOpen={setIsGroupModalOpen}
            mode='create'
        />
    }
    const getViewMoreModal = () => {
        return <ViewMoreModal
            isModalOpen={isMoreModalOpen}
            setIsModalOpen={setIsMoreModalOpen}
            isAddModalOpen={isGroupModalOpen}
            setIsAddModalOpen={setIsGroupModalOpen}          
            data={getGroups}
            type={'groups'}
        />
    }


    const properGroups = useGroups(UserGroups?.user_groups!, totalItems!)

    return (
        <div className={classes.groups}>
            {getViewMoreModal()}
            {createGroupModal()}
            {isUserGroupsLoading ? <UserGroupsCardLoader/> :
                <div className={classes.inner}>
                    <h3 className={classes.title}>Groups</h3>
                    <ul className={classes.list} ref={squareRef}>
                        {getGroups}
                        {
                        UserGroups!.user_groups.length === 0 ?
                            <div className={classes.emptyList}>
                                <SpecialButton
                                    handleClick={() => setIsGroupModalOpen(!isGroupModalOpen)}
                                    className={classes.specialItem}
                                    type='add'
                                />
                            </div>
                        :
                        UserGroups!.user_groups.length >= 5 ?
                            <SpecialButton
                                    handleClick={() => setIsMoreModalOpen(!isMoreModalOpen)}
                                    className={classes.specialItem}
                                    type='view'
                                />
                            :
                            <SpecialButton
                                handleClick={() => setIsGroupModalOpen(!isGroupModalOpen)}
                                className={classes.specialItem}
                                type='add'
                            />
                        }
                    </ul>
                </div>
                }
        </div>
    );
};

export default UserGroupsCard;
