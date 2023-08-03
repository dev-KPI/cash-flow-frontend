import React, { FC, Dispatch, MouseEvent, useCallback, useEffect, useState } from 'react';

//logic
import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
//logic
import IExpense from '@models/IExpense';
import ICategory from '@models/ICategory';
//UI
import classes from './CategoriesCardItem.module.css';

interface IUserCategoriesCardProps{
    category: ICategory,
    setIdModalOpen: (value: number) => void,
    setIsModalOpen: (value: boolean) => void,
}

const UserCategoriesCardDot: FC<IUserCategoriesCardProps> = ({category, setIdModalOpen, setIsModalOpen }) => {
    const amount: number = 0;
    const color = category.color_code
    const [total, setTotal] = useState<number>(amount);
    const openModal = (e: MouseEvent) => {
        e.preventDefault()
        setIdModalOpen(category.category.id)
        setIsModalOpen(true)
    }    
    const categoryTitle = category.category.title.length > 8 ? `${category.category.title.slice(0, 7)}..` : category.category.title;
    return (
        <li 
        key={'123dsad' + amount + category.category.title}
        className={classes.item}
            onClick={openModal}
        >
            <h6 className={classes.expenseName}>{categoryTitle}</h6>
            <div className={classes.icon} style={{ background: color}}>
                <i className="bi bi-credit-card-2-front"></i>
            </div>
            <p className={classes.expenseAmount} style={{ color: color }}>{`${numberWithCommas(total)}$`}</p>
        </li>
    );
};

export default UserCategoriesCardDot;