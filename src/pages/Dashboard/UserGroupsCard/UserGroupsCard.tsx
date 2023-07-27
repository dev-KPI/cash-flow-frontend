import { useCallback, useEffect, useMemo, useState } from 'react';

import { useElementSize } from 'usehooks-ts'
import { handleWrap } from '@services/UsefulMethods/UIMethods';

//UI
import classes from './UserGroupsCard.module.css'
import UserGroupsCardItem from '@pages/Dashboard/UserGroupsCardItem/UserGroupsCardItem';
import UserGroupsCardLoader from '@pages/Dashboard/UserGroupsCard/UserGroupsCardLoader';
import ViewMoreModal from '@components/ModalWindows/ViewMoreModal/ViewMoreModal';
import GroupModal from '@components/ModalWindows/GroupModal/GroupModal';
import SpecialButton from '@components/Buttons/SpeciaButton/SpecialButton';
const json = {
    "groups": [
        {
            "id": 1,
            "title": "Family",
            "color": "#0f4f5f",
            "icon": "link.com" 
        },
        {
            "id": 2,
            "title": "Job",
            "color": "#0f4f5f",
            "icon": "link.com"
        },
        {
            "id": 3,
            "title": "University",
            "color": "#0f4f5f",
            "icon": "link.com"
        },
        {
            "id": 4,
            "title": "Home",
            "color": "#0f4f5f",
            "icon": "link.com"
        },
        {
            "id": 5,
            "title": "Family",
            "color": "#0f4f5f",
            "icon": "link.com"
        }
    ],
}

export interface Group {
    id: number,
    title: string,
    color: string,
    icon: string
}


const UserGroupsCard = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [groupId, setGroupId] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(11);
    const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();

    useEffect( () => {
        setGroups(json.groups)
    }, [])

    useEffect(()=> {
        handleWrap(classes.list, classes.wrapped, classes.specialItem, 1);
    }, [height, width, groups])

    const getGroups = (groups: Group[]) => {
        return groups.map((item, i) => <UserGroupsCardItem key={i} group={item} />)
    }
    const useGroups = (groups: Group[], total: number) => {
        const properGroups = useMemo(() => {
            return groups?.slice(0, total)
        }, [groups, total])
        return properGroups;
    }
    const getGroupModal = () => {
        return <GroupModal
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
            data={getGroups(groups)}
            type={'groups'}
        />
    }


    const properGroups = useGroups(groups!, totalItems!)

    
    setTimeout(() => {
        setLoading(false)
    }, 1500);
    return (
        <div className={classes.groups}>

            {getViewMoreModal()}
            {getGroupModal()}
            {loading ? <UserGroupsCardLoader/> :
                <div className={classes.inner}>
                    <h3 className={classes.title}>Groups</h3>
                    <ul className={classes.list} ref={squareRef}>
                        {getGroups(properGroups)}
                        {
                        groups.length === 0 ?
                            <div className={classes.emptyList}>
                                <p>Category list is empty!</p>
                                <SpecialButton
                                    handleClick={() => setIsGroupModalOpen(!isGroupModalOpen)}
                                    className={classes.specialItem}
                                    type='add'
                                />
                            </div>
                        :
                        groups.length >= 5 ?
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
