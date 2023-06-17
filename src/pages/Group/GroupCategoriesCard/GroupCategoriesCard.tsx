import React, { useCallback, useEffect, useMemo, useState } from 'react';
//logic
import { useElementSize } from 'usehooks-ts'
import { json } from '@pages/Dashboard/UserCategoriesCard/objUserCategories';
import ICategory from '@models/ICategory';
import { handleWrap } from '@services/UsefulMethods/UIMethods';
//UI
import classes from './GroupCategoriesCard.module.css';
import CategoriesCardItem from '@components/CategoriesCardItem/CategoriesCardItem';
import ExpenseModal from '@components/ModalWindows/ExpenseModal/ExpenseModal';



export interface ISortedCategoryItem {
    category: ICategory,
    amount: number,
}

const GroupCategoriesCard = () => {
    const [categories = [], setCategories] = useState<ISortedCategoryItem[]>();
    const [totalItems = 11, setTotalItems] = useState<number>();
    const [loading = true, setLoading] = useState<boolean>();
    const [idModalOpen = -1, setIdModalOpen] = useState<number>();
    const [isModalOpen = false, setIsModalOpen] = useState<boolean>();
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();
    
    const { categoriesByGroup } = json;
    const initializeHandleWrapper = useCallback(() => {
        handleWrap(classes.list, classes.wrapped, classes.specialItem, 1);
        console.log(1);
    }, [height, width, categories])
    useEffect(() => {
        setCategories(categoriesByGroup[0].categories)
    })
    const autoHandleCloseModal = useCallback(() => {
        if (!isModalOpen) setIdModalOpen(-1)
    }, [isModalOpen])

    useEffect(() => {
        initializeHandleWrapper()
        autoHandleCloseModal()
    }, [initializeHandleWrapper,
        autoHandleCloseModal])
    
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

    const properCategories: ISortedCategoryItem[] = useMemo(() => {
        return categories.slice(0, totalItems)
    }, [categories, totalItems])
    
    const getModal = () => {
        return <ExpenseModal
            isExpenseModalOpen={isModalOpen}
            setIsExpenseModalOpen={setIsModalOpen}
        />
    }
    return (
        <div className={classes.CategoriesCard}>
            {getModal()}
            <div className={classes.inner}>
                <h3 className={classes.title}>Categories</h3>
                <ul className={classes.list} ref={squareRef}>
                    {getCategories(properCategories)}
                    {
                    categories?.length === 0 ?
                        <div className={classes.emptyList}>
                            <p>Category list is empty!</p>
                            <li className={`${classes.item} ${classes.specialItem}`}>
                                <div className={classes.dashed}>
                                    <i className="bi bi-plus-lg"></i>
                                </div>
                                <h6 className={classes.itemTitle}>Add More</h6>
                            </li>
                        </div>
                        :
                        categories?.length! >= totalItems ?
                        <li
                            className={`${classes.item} ${classes.specialItem}`}>
                            <div className={classes.dashed}>
                                <i className="bi bi-chevron-right"></i>
                            </div>
                            <h6 className={classes.itemTitle}>View More</h6>
                        </li>
                        :
                        <li className={`${classes.item} ${classes.specialItem}`}>
                            <div className={classes.dashed}>
                                <i className="bi bi-plus-lg"></i>
                            </div>
                            <h6 className={classes.itemTitle}>Add More</h6>
                        </li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default GroupCategoriesCard;