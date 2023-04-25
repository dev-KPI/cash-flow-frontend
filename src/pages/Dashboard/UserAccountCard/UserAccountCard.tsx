import React, { FC, useEffect, useState } from 'react';

//UI
import classes from './UserAccountCard.module.css';
import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
import userIcon from '@assets/user-icon.svg';
import UserAccountCardLoader from './UserAccountLoader';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';

const UserAccountCard: FC = () => {

    const [isPageLoading = true, setIsPageLoading] = useState<boolean>()
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);
    setTimeout(() => {
        setIsPageLoading(false)
    }, 1500);

    const User = JSON.parse(JSON.stringify(
        {
            "user": {
                "id": 1,
                "login": "johndoe@gmail.com",
                "first_name": "John",
                "last_name": "Doe",
                "picture": "https://cdn.onlinewebfonts.com/svg/img_184513.png"
            },
            "current_balance": 1301.23
        }
    ))
    const { id, login, first_name, last_name, picture } = User.user;
    const { current_balance } = User;


    return <>
        <div className={classes.AccountCard}>
            {isPageLoading ? <UserAccountCardLoader /> :
                <div className={classes.inner}>
                    <h3 className={classes.title}>My account</h3>
                    <div className={classes.user}>
                        <div className={classes.avatar}>
                            <img className={classes.photo}
                                alt={'user icon'}
                                src={picture ? picture : userIcon}
                                style={{ filter: picture ? (actualTheme == 'light' ? 'invert(0)' : 'invert(1)') : '' }}
                            />
                        </div>
                        <div className={classes.personal__data}>
                            <div className={classes.user__info}>
                                <h4 className={classes.name}>{`${first_name} ${last_name}`}</h4>
                                <p className={classes.email}>{login}</p>
                            </div>
                            <div className={classes.balance}>
                                <h5>Current Balance</h5>
                                <p className={classes.value}>${numberWithCommas(current_balance)}</p>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    </>
}
export default UserAccountCard