import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
import React, { FC, Dispatch, SetStateAction, useEffect } from 'react';
import { ICategoryItem } from '../UserCategoriesCard/UserCategoriesCard';

//UI
import classes from './UserCategoriesCardDot.module.css';


const UserCategoriesCardDot: FC<ICategoryItem> = ({ category, amount}) => {

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