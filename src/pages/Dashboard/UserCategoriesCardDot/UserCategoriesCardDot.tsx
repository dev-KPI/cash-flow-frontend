import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
import React, { FC, Dispatch, SetStateAction, useEffect } from 'react';

//UI
import classes from './UserCategoriesCardDot.module.css';


interface Category {
    id: number,
    title: string,
    color: string,
    icon: string
}

interface UserCategoriesCardDotProps {
    category: Category,
    amount: number
}

const UserCategoriesCardDot: FC<UserCategoriesCardDotProps> = ({ category, amount}) => {

    return (
        <li className={classes.item}>
            <h6 className={classes.expenseName}>{category.title}</h6>
            <div className={classes.icon} style={{background: category.color}}>
                <i className="bi bi-credit-card-2-front"></i>
            </div>
            <p className={classes.expenseAmount} style={{color: category.color}}>{`${numberWithCommas(amount)}$`}</p>
        </li>
    );
};

export default UserCategoriesCardDot;