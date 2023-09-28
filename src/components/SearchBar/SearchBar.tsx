import React, { FC, useMemo, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import useEscapeKey from '@hooks/layoutHooks/useEscapeKey';
import { useOnClickOutside } from 'usehooks-ts'
import { isUrl } from '@services/UsefulMethods/UIMethods';
//store
import IUser from '@models/IUser';
import IMember from '@models/IMember';
import { useGetUsersQuery } from '@store/Controllers/UserController/UserController';
import { useGetUsersByGroupQuery } from '@store/Controllers/GroupsController/GroupsController';
//UI
import classes from './SearchBar.module.css'
import userIcon from '@assets/user-icon.svg';
import CustomButton from '@components/Buttons/CustomButton/CustomButton';
import ConfirmationModal from '@components/ModalWindows/ConfirtmationModal/ConfirmationModal';



const SearchBar: FC<{ groupId: number }> = ({ groupId }) => {
    const navigate = useNavigate();
    const [isConfirmationModal, setIsConfirmationModal] = useState<boolean>(false);
    const [invitedUser, setInvitedUser] = useState<IUser>({
        id: 0,
        login: '',
        first_name: '',
        last_name: '',
        picture: ''
    });
    const { data: UsersByGroup, isLoading: isUsersByGroupLoading, isError: isUsersByGroupError, isSuccess: isUsersByGroupSuccess } = useGetUsersByGroupQuery({ group_id: Number(groupId), size: 500, page: 1 });
    const { data: Users, isLoading: isUsersLoading, isError: isUsersError, isSuccess: isUsersSuccess } = useGetUsersQuery({ page: 1, size: 500 });
    
    
    const filteredUsersInGroup = useMemo(() => {
        if (UsersByGroup && isUsersByGroupSuccess) {
            return UsersByGroup.items
        } else 
            return []
    }, [UsersByGroup, isUsersByGroupLoading, isUsersByGroupSuccess, isUsersByGroupError])
    const users = useMemo(() => {
        if (Users && isUsersSuccess)
            return Users.items
        else 
            return []
    }, [Users, isUsersLoading, isUsersSuccess, isUsersError])
    const [filter, setFilter] = useState<{query: string, membersList: IMember[], usersList: IUser[]}>({
        query: '',
        membersList: [],
        usersList: []
    })
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    const ref = useRef(null)
    const handleClickOutside = () => {
        setIsOpen(false)
    }
    useOnClickOutside(ref, handleClickOutside)
    useEscapeKey(handleClickOutside);
    const handleOpenClick = () => {
        if (isOpen) return;
        setIsOpen(!isOpen)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const membersResult = filteredUsersInGroup.filter(member => {
            if (e.target.value === "") return filteredUsersInGroup
            const name = member.user.first_name + " " + member.user.last_name;
            return name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        const usersResult = users.filter(user => {
            if (e.target.value === "") return null
            const name = user.first_name + " " + user.last_name;
            return name.toLowerCase().includes(e.target.value.toLowerCase())
        }).filter((user) => !membersResult.some((member) => member.user.id === user.id)).slice(0, 3)

        setFilter({
            query: e.target.value,
            membersList: membersResult,
            usersList: usersResult
        })
    }
    
    const getMembers = (user: IUser, mode: 'insight' | 'add') => {
        const name = user.first_name + " " + user.last_name;
        const photo = user.picture
        return (<li className={classes.item}
            key={`${user.first_name}`}>
            <div className={classes.member}>
                <div className={classes.icon}>
                    <img className={classes.photo}
                        alt={'user icon'}
                        src={isUrl(photo) ? photo : userIcon}
                    />
                </div>
                <p className={classes.name}>{name}</p>
            </div>
            {
                mode === 'insight' &&
                <CustomButton
                    icon={'none'}
                    type={'white'}
                    background={'outline'}
                    callback={() => { navigate(`./member/${user.id}`) }}
                    isPending={false}
                    disableScale={true}
                    children={
                        <div className={classes.btnChild}>
                            <i className="bi bi-bar-chart"></i>
                            <p>Insight</p>
                        </div>
                    }
                    className={classes.btn} />
            }
            {
                mode === 'add' &&
                <CustomButton
                    icon={'add'}
                    type={'primary'}
                    background={'outline'}
                    callback={() => {
                        setInvitedUser(user);
                        setIsConfirmationModal(true)
                    }}
                    isPending={false}
                    disableScale={true}
                    children={'Send'}
                    className={classes.btn} />
            }
           
        </li>)
    }
    const getFilteredMembers = () => {
        return filter.query === '' ? filteredUsersInGroup.map(({user}) => getMembers(user, 'insight'))
            : filter.membersList.map(({user})=> {
                return getMembers(user, 'insight')
            })
    }
    const getUsers = () => {
        return filter.query === '' ? '' : filter.usersList.map(user => getMembers(user, 'add'))
    }
    
    const contentClasses = classes.content + ' ' + `${isOpen ? classes.show : classes.hide}`  // eslint-disable-line no-useless-concat
    return (
        <div className={classes.searchBar}
            ref={ref}>
            <form className={classes.searchForm}
                onClick={handleOpenClick}>
                <button className={classes.searchBtn} type="button">
                    <i className="bi bi-search"></i>
                </button>
                <input className={classes.searchInput}
                    onChange={handleChange}
                    value={filter.query}
                    type="search"
                    placeholder="Search" />
            </form>
            <div className={contentClasses}>
                <h5 className={classes.optionsTitle}>Members</h5>
                <ul className={classes.options}>
                    {getFilteredMembers().length === 0 ?
                        <p className={classes.emptyList}>No members match your search!</p>
                        :
                        getFilteredMembers()
                    }
                </ul>
                {getUsers().length > 0 ? (<>
                    <h5 className={classes.optionsTitle}>Users</h5>
                    <ul className={classes.options}>
                        {getUsers()}
                    </ul>
                </>) : null}
                <div className={classes.moreBlock}>
                    <NavLink
                        to={`/group/${groupId}/members`}
                        className={classes.membersLink}
                    >
                        See all
                    </NavLink>
                </div>
            </div>
            <ConfirmationModal
                groupId={Number(groupId)}
                title={'title'}
                user={invitedUser}
                setIsConfirmationModalOpen={setIsConfirmationModal}
                isConfirmationModalOpen={isConfirmationModal}
                mode={'invite'} />
        </div>
    );
};

export default React.memo(SearchBar);