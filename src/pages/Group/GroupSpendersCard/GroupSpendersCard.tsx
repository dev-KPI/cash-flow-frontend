import React from 'react';
import { NavLink } from 'react-router-dom';
import userIcon from '@assets/user-icon.svg';

//UI
import classes from './GroupSpendersCard.module.css';
import { isUrl, numberWithCommas } from '@services/UsefulMethods/UIMethods';

interface IUser {
    id: number,
    login: string,
    first_name: string,
    last_name: string,
    picture: string
}

interface ISpenders {
    user: IUser,
    amount: number
}

const GroupSpendersCard = () => {
    const SpendersObj = JSON.parse(JSON.stringify([
        {
            "user": {
                "id": 1,
                "login": "johndoe@gmail.com",
                "first_name": "Dmitriy",
                "last_name": "Rezenkov",
                "picture": "ref.com"
            },
            "amount": 1000
        },
        {
            "user": {
                "id": 1,
                "login": "johndoe@gmail.com",
                "first_name": "Dima",
                "last_name": "Rezenkov",
                "picture": "ref.com"
            },
            "amount": 999
        },
        {
            "user": {
                "id": 1,
                "login": "johndoe@gmail.com",
                "first_name": "Dima",
                "last_name": "Pestenkov",
                "picture": "ref.com"
            },
            "amount": 777
        }


    ] 
    ))
    const getSpenders = () => {
        let spenders: ISpenders[] = SpendersObj;
        return spenders.map((item, i) => {
            const photo = item.user.picture
            const name = item.user.first_name + " " + item.user.last_name
            return (<li className={classes.spender}>
                <p className={classes.order}>{i + 1}.</p>
                <div className={classes.details}>
                    <div className={classes.info}>
                        <div className={classes.avatar}>
                            <img className={classes.photo}
                                alt={'user icon'}
                                src={isUrl(photo) ? photo : userIcon}
                            />
                        </div>
                        <p className={classes.name}>{name}</p>
                    </div>
                    <p className={classes.amount}>{numberWithCommas(item.amount)}$</p>
                </div>

            </li>)
        }
        )
    }
    return (
        <div className={classes.SpendersCard}>
            <div className={classes.inner}>
                <div className={classes.top}>
                    <h2 className={classes.title}>The spender of the month</h2>
                    <NavLink
                        to="/"
                        className={classes.spendersLink}
                    >
                        See all
                    </NavLink>
                </div>
                <ul className={classes.spenders}>
                    {getSpenders()}
                </ul>                
            </div>
        </div>
    );
};

export default GroupSpendersCard;