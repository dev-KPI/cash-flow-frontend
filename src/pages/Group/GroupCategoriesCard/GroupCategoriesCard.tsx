import { useCallback, useEffect, useMemo, useState } from 'react';
//logic
import { useElementSize } from 'usehooks-ts'
import { json } from '@pages/Dashboard/UserCategoriesCard/objUserCategories';
import ICategory from '@models/ICategory';
import { handleWrap } from '@services/UsefulMethods/UIMethods';
//UI
import classes from './GroupCategoriesCard.module.css';
import CategoriesCardItem from '@components/CategoriesCardItem/CategoriesCardItem';
import ExpenseModal from '@components/ModalWindows/ExpenseModal/ExpenseModal';
import SpecialButton from '@components/Buttons/SpeciaButton/SpecialButton';



export interface ISortedCategoryItem {
    category: ICategory,
    amount: number,
}

const GroupCategoriesCard = () => {
    const [categories, setCategories] = useState<ISortedCategoryItem[]>([]);
    const [totalItems, setTotalItems] = useState<number>(11);
    const [loading, setLoading] = useState<boolean>(true);
    const [idModalOpen, setIdModalOpen] = useState<number>(-1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();
    
    const { categoriesByGroup } = json;
    const initializeHandleWrapper = useCallback(() => {
        handleWrap(classes.list, classes.wrapped, classes.specialItem, 1);
    }, [height, width, categories])
    useEffect(() => {
        setCategories(categoriesByGroup[0].categories)
    },[])
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
                            <SpecialButton
                                handleClick={() => {}}
                                className={classes.specialItem}
                                type='add'
                            />
                        </div>
                        :
                        categories?.length! >= totalItems ?
                         <SpecialButton 
                            handleClick={() => {}}
                            className={classes.specialItem}
                            type='view'
                        />
                        :
                        <SpecialButton
                            handleClick={() => { }}
                            className={classes.specialItem}
                            type='add'
                        />
                    }
                </ul>
            </div>
        </div>
    );
};

export default GroupCategoriesCard;