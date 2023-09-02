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
    const [maxItems, setMaxItems] = useState<number>(5);
    const [totalItems, setTotalItems] = useState<number>(maxItems);
    const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();
    const ref = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const totalGroups = handleWrap(ref.current, classes.wrapped, classes.specialItem, 1);
        setTotalItems(totalGroups || maxItems);
    }, [UserGroups, width, height])

    const getGroups = (groups: IGroup[]) => {
        return groups.map((item: IGroup, i) => <UserGroupsCardItem key={i} group={item.group} />)
    }
    
    const properGroups: IGroup[] = useMemo(() => {
        if (UserGroups)
            return UserGroups.user_groups.slice(0, maxItems)
        else return []
    }, [UserGroups, maxItems])

    const categoriesLength: number = UserGroups?.user_groups.length || 0;

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

    const addButton = (<SpecialButton
        handleClick={() => setIsGroupModalOpen(!isGroupModalOpen)}
        className={classes.specialItem}
        type='add'
    />);
    const moreButton = (<SpecialButton
        handleClick={() => setIsMoreModalOpen(!isMoreModalOpen)}
        className={classes.specialItem}
        type='view'
    />);
    const specialButton = useMemo(() => {
        return totalItems <= categoriesLength ? moreButton : addButton
    }, [totalItems])


    let groupsContent;
    if (isUserGroupsSuccess && UserGroups.user_groups.length !== 0) {
        groupsContent = getGroups(properGroups)
        groupsContent.push(specialButton);
    } else {
        groupsContent = <div className={classes.emptyList}>
            {addButton}
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
