import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import UserCategoriesCardItem from '@pages/Dashboard/UserCategoriesCardItem/UserCategoriesCardItem';
import classes from './UserCategoriesCard.module.css'
import { useElementSize } from 'usehooks-ts'
import { handleWrap } from '@services/UsefulMethods/UIMethods';
import UserCategoriesCardLoader from '@pages/Dashboard/UserCategoriesCard/UserCategoriesCardLoader';
import { json } from './objUserCategories';
import OperationModal from '@components/ModalWindows/OperationModal/OperationModal';
import ExpenseModal from '@components/ModalWindows/ExpenseModal/ExpenseModal';

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
export interface ICategoryItem extends ISortedCategoryItem{
    setIdModalOpen: (value: number) => void,
    setIsModalOpen: (value: boolean) => void
}

const UserCategoriesCard = () => {
    const [categories = [], setCategories] = useState<ISortedCategoryItem[]>();
    const [totalItems = 11, setTotalItems] = useState<number>();
    const [loading = true, setLoading] = useState<boolean>();
    const [groupIndex = 0, setGroupIndex] = useState<number>();
    const [idModalOpen = -1, setIdModalOpen] = useState<number>();
    const [isModalOpen = false, setIsModalOpen] = useState<boolean>();
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();

    const { categoriesByGroup } = json;
    let groups = categoriesByGroup.map(a => a.title);
    
    const initializeCategories = useCallback(() => {
        const newCategories = categoriesByGroup.find(item => item.title === groups[groupIndex])?.categories
        if (newCategories)
            setCategories(newCategories);
    }, [groupIndex])

    const initializeHandleWrapper = useCallback(()=> {
        handleWrap(classes.list, classes.wrapped, classes.specialItem, 2);
    }, [height, width, categories])

    const autoHandleCloseModal = useCallback(() => {
        if(!isModalOpen) setIdModalOpen(-1) 
    }, [isModalOpen])

    useEffect(()=>{
        initializeCategories()
        initializeHandleWrapper()
        autoHandleCloseModal()
    }, [initializeCategories, 
        initializeHandleWrapper, 
        autoHandleCloseModal])

    console.log('Outside  ' + idModalOpen)

    const getCategories = (categories: ISortedCategoryItem[]) => {
        return categories.map((item, i) => 
            <UserCategoriesCardItem 
            key={i} 
            setIdModalOpen={setIdModalOpen}
            setIsModalOpen={setIsModalOpen}
            category={item.category} 
            amount={item.amount}/>
        )
    }
    const getModal = () => {
        return <ExpenseModal
        type="expense"
        isOperationModalOpen={isModalOpen && idModalOpen !== -1}
        setIsOperationModalOpen={setIsModalOpen}
        />
    }

    const properCategories: ISortedCategoryItem[] = useMemo(() => {
        return categories.slice(0, totalItems)
    }, [categories, totalItems])

    const handleNextGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!groups[groupIndex + 1]) return;
        setGroupIndex(groupIndex + 1); 
    }

    const handlePrevGroup =(e: React.MouseEvent<HTMLButtonElement>) => {
        if (!groups[groupIndex - 1]) return;
        setGroupIndex(groupIndex - 1); 
    }
    
    setTimeout(() => {
        setLoading(false)
    }, 1500);

    return (
        <div className={classes.categories}>
            {loading ? <UserCategoriesCardLoader /> : <>            
                <div className={classes.inner}>
                    <div className={classes.top}>
                        <h3 className={classes.title}>Categories <span className={classes.categoryName}>({groups[groupIndex]})</span></h3>
                        <div className={classes.nav}>
                            <button
                                type="submit"
                                onClick={handlePrevGroup}
                                disabled={!groups[groupIndex - 1]}
                                className={classes.btn + ' ' + classes.previous}
                                >
                                <i id='chevron' className="bi bi-chevron-left"></i>
                            </button>
                            <button
                                type="submit"
                                onClick={handleNextGroup}
                                disabled={!groups[groupIndex + 1]}
                                className={classes.btn + ' ' + classes.next}
                                >
                                <i id='chevron' className="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <ul className={classes.list} ref={squareRef}>
                        {getCategories(properCategories)}
                        {getModal()}
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
                        !!(categories?.length! >= 11) ?
                            <li className={`${classes.item} ${classes.specialItem}`}>
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
            </>}
        </div>
    );
};

export default UserCategoriesCard;
