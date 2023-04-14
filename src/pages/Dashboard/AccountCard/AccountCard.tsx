import React, {FC} from 'react';

//UI
import classes from './AccountCard.module.css';
import userIcon from '@assets/user-icon.svg';
import { numberWithCommas } from '@services/UsefulMethods/UIMethods';

const AccountCard: FC = () => {

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
    const {id, login, first_name, last_name, picture} = User.user;
    const { current_balance } = User;
    
    return<>
        <div className={classes.AccountCard}>
            <div className={classes.cardHeader}>
                <h3 className={classes.title}>My account</h3>
                <img className={classes.avatar} alt={'user icon'} src={picture}/>
            </div>
            <div className={classes.info__wrapper}>
                <div className={classes.text}>
                    <h4 className={classes.name}>{`${first_name} ${last_name}`}</h4>
                    <p className={classes.email}>{login}</p>
                </div>
                <div className={classes.balance}>
                    <h3>Current Balance</h3>
                    <p className={classes.value}>${numberWithCommas(current_balance)}</p>
                </div>
            </div>
        </div>
    </>
}
export default AccountCard