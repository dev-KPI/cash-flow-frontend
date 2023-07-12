import React, { useRef, useState } from 'react';

import { useOnClickOutside } from 'usehooks-ts'
import { NavLink } from 'react-router-dom';

//store
import IMember from '@models/IMember';

//UI
import classes from './SearchBar.module.css'
import userIcon from '@assets/user-icon.svg';
import CustomButton from '@components/Buttons/CustomButton/CustomButton';
import { MembersObj } from '@pages/MembersObj';
import { isUrl } from '@services/UsefulMethods/UIMethods';


const SearchBar = () => {
    const [filter = {
        query: '',
        list: []
    }, setFilter] = useState<{query: string, list: IMember[]}>()
    const [isOpen = false, setIsOpen] = useState<boolean>()
    const ref = useRef(null)
    

    const handleClickOutside = () => {
        setIsOpen(false)
    }
    useOnClickOutside(ref, handleClickOutside)
    const handleButton = () => {
        // console.log();
    }

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const results = members.filter(member => {
            if (e.target.value === "") return members
            const name = member.user.first_name + " " + member.user.last_name;
            return name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setFilter({
            query: e.target.value,
            list: results
        })
    }
    const members: IMember[] = MembersObj.members
    const getMembers = (member: IMember) => {
        const name = member.user.first_name + " " + member.user.last_name;
        const photo = member.user.picture
        return (<li className={classes.item}
            key={`${member.user.first_name} + ${member.date_join}`}>
            <div className={classes.member}>
                <div className={classes.icon}>
                    <img className={classes.photo}
                        alt={'user icon'}
                        src={isUrl(photo) ? photo : userIcon}
                    />
                </div>
                <p className={classes.name}>{name}</p>
            </div>
            <CustomButton
                icon={'none'}
                type={'white'}
                background={'outline'}
                callback={handleButton}
                isPending={false}
                disableScale={true}
                children={
                    <div className={classes.btnChild}>
                        <i className="bi bi-bar-chart"></i>
                        <p>Insight</p>
                    </div>
                }
                className={classes.btn} />
        </li>)
    }
    const getFilteredMembers = () => {
        return filter.query === '' ? members.map(member => getMembers(member))
            : filter.list.map(member => {
                return getMembers(member)
            })
    }
    
    
    const contentClasses = classes.content + ' ' + `${isOpen ? classes.show : classes.hide}`  // eslint-disable-line no-useless-concat
    return (
        <div className={classes.searchBar}
            ref={ref}>
            <form className={classes.searchForm}
                onClick={() => setIsOpen(!isOpen)}>
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
                <ul className={classes.options} >
                    {getFilteredMembers()}
                </ul>
                <div className={classes.moreBlock}>
                    <NavLink
                        to="/group/members"
                        className={classes.membersLink}
                    >
                        See all
                    </NavLink>
                </div>
            </div>
            
        </div>
    );
};

export default SearchBar;