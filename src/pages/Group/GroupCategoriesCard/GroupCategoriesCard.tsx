import React, { useCallback, useEffect, useState } from 'react';
import { json } from '@pages/Dashboard/UserCategoriesCard/objUserCategories';
//UI
import classes from './GroupCategoriesCard.module.css';
import CategoriesCardItem from '@components/CategoriesCardItem/CategoriesCardItem';

interface Category {
    id: number,
    title: string,
    color: string,
    icon: string
}
export interface ISortedCategoryItem {
    category: Category,
    amount: number,
}

const GroupCategoriesCard = () => {
    const [categories = [], setCategories] = useState<ISortedCategoryItem[]>();
    const [idModalOpen = -1, setIdModalOpen] = useState<number>();
    const [isModalOpen = false, setIsModalOpen] = useState<boolean>();
    
    const { categoriesByGroup } = json;
    useEffect(() => {
        setCategories(categoriesByGroup[0].categories)
   })
    const getCategories = (categories: ISortedCategoryItem[]) => {
        return categories.map((item, i) =>
            <CategoriesCardItem
                key={i}
                setIdModalOpen={setIdModalOpen}
                setIsModalOpen={setIsModalOpen}
                category={item.category}
                amount={item.amount} />
        )
    }

  
    return (
        <div className={classes.CategoriesCard}>
            <div className={classes.inner}>
                <div className={classes.top}>
                    <h3 className={classes.title}>Categories</h3>
                </div>
                <ul className={classes.list}>
                    {getCategories(categories)}
                </ul>
            </div>
        </div>
    );
};

export default GroupCategoriesCard;