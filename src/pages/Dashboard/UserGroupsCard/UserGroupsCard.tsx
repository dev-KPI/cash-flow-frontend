import { useCallback, useEffect, useMemo, useState } from 'react';
import classes from './UserGroupsCard.module.css'
import { useElementSize } from 'usehooks-ts'
import UserGroupsCardItem from '@pages/Dashboard/UserGroupsCardItem/UserGroupsCardItem';
import { handleWrap } from '@services/UsefulMethods/UIMethods';
import UserGroupsCardLoader from '@pages/Dashboard/UserGroupsCard/UserGroupsCardLoader';
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
    const [totalItems, setTotalItems] = useState<number>(11);
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
    const useGroups = (groups: Group[] , total: number) => {
        const properGroups = useMemo(() => {
            return groups.slice(0, total)
        }, [groups, total])
        return properGroups;
    }

    const properGroups = useGroups(groups, totalItems)

    
    const setLoadingTime = setTimeout(() => {
        setLoading(false)
    }, 1500);
    return (
        <div className={classes.groups}>
            {loading ? <UserGroupsCardLoader/> :
                <div className={classes.inner}>
                    <h3 className={classes.title}>Groups</h3>
                    <ul className={classes.list} ref={squareRef}>
                        {getGroups(properGroups)}
                        {
                            groups.length === 0 ?
                                <div className={classes.emptyList}>
                                    <p>Category list is empty!</p>
                                    <li className={`${classes.item} ${classes.specialItem}`}>
                                        <div className={classes.dashed}>
                                            <i className="bi bi-plus-lg"></i>
                                        </div>
                                        <h6 className={classes.itemTitle}>Add More</h6>
                                    </li>
                                </div>
                                :
                                groups.length >= 5 ?
                                    <li className={`${classes.item} ${classes.specialItem}`}>
                                        <h6 className={classes.itemTitle}>View More</h6>
                                        <div className={classes.dashed}>
                                            <i className="bi bi-chevron-right"></i>
                                        </div>
                                    </li>
                                    :
                                    <li className={`${classes.item} ${classes.specialItem}`}>
                                        <h6 className={classes.itemTitle}>Add More</h6>
                                        <div className={classes.dashed}>
                                            <i className="bi bi-plus-lg"></i>
                                        </div>
                                    </li>
                        }
                    </ul>
                </div>
                }
        </div>
    );
};

export default UserGroupsCard;
