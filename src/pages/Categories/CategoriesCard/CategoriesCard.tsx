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
    isCategoriesLoading: boolean,
    setSelectedCategory: Dispatch<SetStateAction<number>>,
    setIsEditCategoryModal: Dispatch<SetStateAction<boolean>>
}

const CategoriesCard: FC<ICategoriesCard> = ({ id, title, 
color, icon, setSelectedCategory,
setIsEditCategoryModal, isEditCategoryModal }) => {
    
    return (
        <li className={classes.item}>
        <button 
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setSelectedCategory(id)
            setIsEditCategoryModal(!isEditCategoryModal)
        }}
        className={classes.CategoriesCard}>
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
        </button>
    </li>)
}
export default CategoriesCard