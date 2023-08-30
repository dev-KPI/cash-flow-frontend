import { useEffect, useMemo, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
//logic
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

    const {data: UserGroups, isLoading: isUserGroupsLoading, isError: isUserGroupsError, isSuccess: isUserGroupsSuccess} = useGetCurrentUserGroupsQuery(null)

    const [groupId, setGroupId] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(5);
    const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();
    const ref = useRef<HTMLUListElement>(null);

    useEffect(() => {
        handleWrap(ref.current, classes.wrapped, classes.specialItem, 1);
    }, [UserGroups, width, height])

    const getGroups = (groups: IGroup[]) => {
        return groups.map((item: IGroup, i) => <UserGroupsCardItem key={i} group={item.group} />)
    }
    
    const properGroups: IGroup[] = useMemo(() => {
        if (UserGroups)
            return UserGroups.user_groups.slice(0, totalItems)
        else return []
    }, [UserGroups, totalItems])


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
            data={getGroups(properGroups)}
            type={'groups'}
        />
    }

    let groupsContent;
    if (isUserGroupsSuccess && UserGroups.user_groups.length !== 0) {
        groupsContent = getGroups(properGroups)
        UserGroups.user_groups.length >= totalItems ?
            groupsContent.push(<SpecialButton
                handleClick={() => setIsMoreModalOpen(!isMoreModalOpen)}
                className={classes.specialItem}
                type='view'
            />)
            :
            groupsContent.push(<SpecialButton
                handleClick={() => setIsGroupModalOpen(!isGroupModalOpen)}
                className={classes.specialItem}
                type='add'
            />)
    } else {
        groupsContent = <div className={classes.emptyList}>
            <SpecialButton
                handleClick={() => setIsGroupModalOpen(!isGroupModalOpen)}
                className={classes.specialItem}
                type='add'
            />
        </div>
    }
    return (
        <div className={classes.groups}>
            {getViewMoreModal()}
            {createGroupModal()}
            {isUserGroupsLoading ? <UserGroupsCardLoader/> :
                <div className={classes.inner}>
                    <h3 className={classes.title}>Groups</h3>
                    <ul className={classes.list} ref={mergeRefs([ref, squareRef])}>
                        {groupsContent}
                    </ul>
                </div>
                }
        </div>
    );
};

export default UserGroupsCard;
