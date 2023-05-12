import React from 'react';

//UI
import classes from './GroupItem.module.css'
import userIcon from '@assets/user-icon.svg';

const GroupItem = () => {
    return (
        <div className={classes.group}>
            <h4 className={classes.title}>Family</h4>
            <div className={classes.content}>
                <div className={classes.details}>
                    <div className={classes.icon}>
                        <i className="bi bi-credit-card-2-front"></i>
                    </div>
                    <div className={classes.info}>
                        <h6 className={classes.ownerName}>John Doe</h6>
                        <p className={classes.ownerEmail}>testtest@gmail.com</p>
                    </div>
                </div>
                <div className={classes.description}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam itaque ducimus quibusdam, neque ex deserunt est!
                </div>
                <div className={classes.contentBottom}>
                    <div className={classes.members}>
                        <div className={classes.avatar}>
                            <img className={classes.photo}
                                alt={'user icon'}
                                src={userIcon}
                            />
                        </div>
                        <div className={classes.avatar}>
                            <img className={classes.photo}
                                alt={'user icon'}
                                src={userIcon}
                            />
                        </div>
                        <div className={classes.avatar}>
                            <img className={classes.photo}
                                alt={'user icon'}
                                src={userIcon}
                            />
                        </div>
                        <div className={classes.avatar}>
                            <div className={classes.leftMembers}>+1</div>
                        </div>
                    </div>
                    <button className={classes.moreBtn}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupItem;