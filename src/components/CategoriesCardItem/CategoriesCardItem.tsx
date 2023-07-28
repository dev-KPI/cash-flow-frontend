import React, { FC, Dispatch, MouseEvent, useCallback, useEffect, useState } from 'react';

//logic
import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
import IExpense from '@models/IExpense';
//UI
import classes from './CategoriesCardItem.module.css';


// import { ICategoryItem } from '@pages/Dashboard/UserCategoriesCard/UserCategoriesCard';

interface IUserCategoriesCardProps{
    expense: IExpense,
    setIdModalOpen: (value: number) => void,
    setIsModalOpen: (value: boolean) => void
}

const UserCategoriesCardDot: FC<IUserCategoriesCardProps> = ({ expense, setIdModalOpen, setIsModalOpen }) => {
    const amount: number = expense.amount;
    const category = expense.category_group.category;
    const color = expense.category_group.color_code
    const [total, setTotal] = useState<number>(amount);
    
    const openModal = (e: MouseEvent) => {
        e.preventDefault()
        setIdModalOpen(category.id)
        setIsModalOpen(true)
    }    
    const categoryTitle = category.title.length > 8 ? `${category.title.slice(0, 7)}..` : category.title;
    return (
        <li 
        key={'123dsad' + amount + category.title}
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