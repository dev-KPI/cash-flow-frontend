import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
import React, { FC, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ICategoryItem } from '@pages/Dashboard/UserCategoriesCard/UserCategoriesCard';

//UI
import classes from './UserCategoriesCardItem.module.css';


const UserCategoriesCardDot: FC<ICategoryItem> = ({ category, amount }) => {
    const [total = 0, setTotal] = useState<number>();
    const [source = '', setSource] = useState<string>();
    
    const updateAmount = (e: React.MouseEvent): void => {
        e.preventDefault();
        let newAmount = total
        if (newAmount !== undefined)
            newAmount += Number(prompt("Set new amount:"))
        setTotal(newAmount);
        setSource(prompt("Set source:") || '');
    }

    useEffect(() => {
        setTotal(amount)
    }, [])

    return (
        <li className={classes.item}
            onClick={updateAmount}
        >
            <h6 className={classes.expenseName}>{category.title}</h6>
            <div className={classes.icon} style={{background: category.color}}>
                <i className="bi bi-credit-card-2-front"></i>
            </div>
            <p className={classes.expenseAmount} style={{ color: category.color }}>{`${numberWithCommas(total)}$`}</p>
        </li>
    );
};

export default UserCategoriesCardDot;