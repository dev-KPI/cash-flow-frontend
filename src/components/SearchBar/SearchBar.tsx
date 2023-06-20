import React, { useRef, useState } from 'react';

import { useOnClickOutside } from 'usehooks-ts'
import { NavLink } from 'react-router-dom';

//UI
import classes from './SearchBar.module.css'
import userIcon from '@assets/user-icon.svg';
import CustomButton from '@components/Buttons/CustomButton/CustomButton';


const SearchBar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const ref = useRef(null)

    const handleClickOutside = () => {
        setIsOpen(false)
    }

    const handleButton = () => {
        // console.log();
    }
    useOnClickOutside(ref, handleClickOutside)
    const contentClasses = classes.content + ' ' + `${isOpen ? classes.show : classes.hide}`
    return (
        <div className={classes.searchBar}>
            <form className={classes.searchForm}
                ref={ref}
                onClick={() => setIsOpen(!isOpen)}>
                <button className={classes.searchBtn} type="button">
                    <i className="bi bi-search"></i>
                </button>
                <input className={classes.searchInput} type="text" placeholder="Search" />
            </form>
            <div className={contentClasses}>
                <h5 className={classes.optionsTitle}>Members</h5>
                <ul className={classes.options} >
                    <li className={classes.item}>
                        <div className={classes.member}>
                            <div className={classes.icon}>
                                <img className={classes.photo}
                                    alt={'user icon'}
                                    src={userIcon} />
                            </div>
                            <p className={classes.name}>Dmitriy Pestenkov</p>
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
                            className={classes.btn}/>
                    </li>
                    <li className={classes.item}>
                        <div className={classes.member}>
                            <div className={classes.icon}>
                                <img className={classes.photo}
                                    alt={'user icon'}
                                    src={userIcon} />
                            </div>
                            <p className={classes.name}>Dmitriy Pestenkov</p>
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
                    </li>
                    <li className={classes.item}>
                        <div className={classes.member}>
                            <div className={classes.icon}>
                                <img className={classes.photo}
                                    alt={'user icon'}
                                    src={userIcon} />
                            </div>
                            <p className={classes.name}>Dmitriy Pestenkov</p>
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
                    </li>
                    <li className={classes.item}>
                        <div className={classes.member}>
                            <div className={classes.icon}>
                                <img className={classes.photo}
                                    alt={'user icon'}
                                    src={userIcon} />
                            </div>
                            <p className={classes.name}>Dmitriy Pestenkov</p>
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
                    </li>
                    <li className={classes.item}>
                        <div className={classes.member}>
                            <div className={classes.icon}>
                                <img className={classes.photo}
                                    alt={'user icon'}
                                    src={userIcon} />
                            </div>
                            <p className={classes.name}>Dmitriy Pestenkov</p>
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
                    </li>
                    <li className={classes.item}>
                        <div className={classes.member}>
                            <div className={classes.icon}>
                                <img className={classes.photo}
                                    alt={'user icon'}
                                    src={userIcon} />
                            </div>
                            <p className={classes.name}>John Doe</p>
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
                    </li>
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