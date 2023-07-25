import React, { FC, Dispatch, SetStateAction } from "react";

//UI
import classes from './CategoriesCard.module.css'
import { NavLink } from "react-router-dom";

interface ICategoriesCard {
    id: number,
    title: string,
    color: string,
    icon: string,
    isEditCategoryModal: boolean,
    setIsEditCategoryModal: Dispatch<SetStateAction<boolean>>
}

const CategoriesCard: FC<ICategoriesCard> = ({ id = 1, title = 'Text', color = '#333333', icon = 'bi bi-joystick', setIsEditCategoryModal, isEditCategoryModal }) => {
    
    
    return (<li className={classes.item}
        onClick={() => setIsEditCategoryModal(!isEditCategoryModal)}>
        <NavLink to={'/categories'} className={classes.CategoriesCard}>
            <div 
            style={{backgroundColor: color}}
            className={classes.tooltip}></div>
            <div className={classes.CategoriesCardBody}>
                <div 
                style={{backgroundColor: color}}
                className={classes.IconMix}>
                    <i className={icon}></i>
                </div>
                <p className={classes.title}>{title}</p>
            </div>
        </NavLink>
    </li>)
}
export default React.memo(CategoriesCard)