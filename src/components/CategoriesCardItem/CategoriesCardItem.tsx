import { numberWithCommas } from '@services/UsefulMethods/UIMethods';
import React, { FC, Dispatch, MouseEvent, useCallback, useEffect, useState } from 'react';
import { ICategoryItem } from '@pages/Dashboard/UserCategoriesCard/UserCategoriesCard';

//UI
import classes from './CategoriesCardItem.module.css';
import OperationModal from '@components/ModalWindows/OperationModal/SalaryModal';


const UserCategoriesCardDot: FC<ICategoryItem> = ({ setIdModalOpen, setIsModalOpen, category, amount = 100 }) => {
    const [total = amount, setTotal] = useState<number>();
    
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
            <div className={classes.icon} style={{background: category.color}}>
                <i className="bi bi-credit-card-2-front"></i>
            </div>
            <p className={classes.expenseAmount} style={{ color: category.color }}>{`${numberWithCommas(total)}$`}</p>
        </li>
    );
};

export default UserCategoriesCardDot;