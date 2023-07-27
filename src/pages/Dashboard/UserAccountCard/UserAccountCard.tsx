import React, { FC, useEffect, useState } from 'react';


//store
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { useGetCurrentUserBalanceQuery, useGetCurrentUserInfoQuery } from '@store/Controllers/UserController/UserController';
//UI
import classes from './UserAccountCard.module.css';
import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
import userIcon from '@assets/user-icon.svg';
import UserAccountCardLoader from './UserAccountLoader';


const UserAccountCard: FC = () => {

    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const {data: User, isError: isUserError, isFetching: isUserFetching} = useGetCurrentUserInfoQuery(null)
    const {data: UserBalance = {balance: 0}, isError: isUserBalanceError, isFetching: isUserBalanceFetching} = useGetCurrentUserBalanceQuery(null)

    return <>
        <div className={classes.AccountCard}>
            {isUserFetching && isUserBalanceFetching && isUserBalanceError && isUserError ? <UserAccountCardLoader /> :
                <div className={classes.inner}>
                    <h3 className={classes.title}>My account</h3>
                    <div className={classes.user}>
                        <div className={classes.avatar}>
                            <img className={classes.photo}
                                alt={'user icon'}
                                style={{borderRadius: '50%'}}
                                src={User?.picture}
                            />
                        </div>
                        <div className={classes.personal__data}>
                            <div className={classes.user__info}>
                                <h4 className={classes.name}>{`${User?.first_name} ${User?.last_name}`}</h4>
                                <p className={classes.email}>{User?.login}</p>
                            </div>
                            <div className={classes.balance}>
                                <h5>Current Balance</h5>
                                <p className={classes.value}>${numberWithCommas(UserBalance.balance)}</p>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    </>
}
export default UserAccountCard