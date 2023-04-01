import React, {FC} from 'react';

//UI
import classes from './Account.module.css';
import userIcon from '@assets/user-icon.svg';

const AccountCard: FC = () => {
    
    return<>
        <div className={classes.AccountCard}>
            <div className={classes.cardHeader}>
                <h3 className={classes.title}>My account</h3>
                <img className={classes.avatar} alt={'user icon'}src={userIcon}/>
            </div>
            <div className={classes.info__wrapper}>
                <div className={classes.text}>
                    <h4 className={classes.name}>Jonh Doe</h4>
                    <p className={classes.email}>johndoe@gmail.com</p>
                </div>
                <h3 className={classes.balance}>Current Balance</h3>
                <p className={classes.value}>$1303.03</p>
                <p className={classes.range}>From Jan 1, 2023 to Jan 31, 2023</p>
            </div>
        </div>
    </>
}
export default AccountCard