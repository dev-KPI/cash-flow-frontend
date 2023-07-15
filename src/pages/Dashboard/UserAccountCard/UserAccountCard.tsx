import React, { FC, useEffect, useState } from 'react';


//store
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IUserState } from '@store/UserSlice/UserInterfaces';
//UI
import classes from './UserAccountCard.module.css';
import { isUrl, numberWithCommas } from '@services/UsefulMethods/UIMethods';
import userIcon from '@assets/user-icon.svg';
import UserAccountCardLoader from './UserAccountLoader';


const UserAccountCard: FC = () => {

    const UserStore = useAppSelector<IUserState>(state => state.persistedUserSlice);

    const [isPageLoading, setIsPageLoading] = useState<boolean>(true)
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);
    setTimeout(() => {
        setIsPageLoading(false)
    }, 1500);

    const User = JSON.parse(JSON.stringify(
        {
            "current_balance": 1301.23
        }
    ))
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
                                style={{borderRadius: '10px'}}
                                src={isUrl(UserStore.photo) ? UserStore.photo : userIcon}
                            />
                        </div>
                        <div className={classes.personal__data}>
                            <div className={classes.user__info}>
                                <h4 className={classes.name}>{`${UserStore.name} ${UserStore.surname}`}</h4>
                                <p className={classes.email}>{UserStore.email}</p>
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