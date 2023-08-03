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
import { useGetCategoriesByGroupQuery } from '@store/Controllers/CategoriesController/CategoriesController';
import { useParams } from 'react-router-dom';
import CategoryModal from '@components/ModalWindows/CategoryModal/CategoryModal';
import ViewMoreModal from '@components/ModalWindows/ViewMoreModal/ViewMoreModal';


const GroupCategoriesCard = () => {
    const {groupId} = useParams<{groupId: string}>();

    const [totalItems, setTotalItems] = useState<number>(11);
    const [idModalOpen, setIdModalOpen] = useState<number>(-1);
    const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState<boolean>(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();
    
    const { data: categoriesByGroup, isLoading: isCategoriesByGroupLoading, isError: isCategoriesByGroupError } = useGetCategoriesByGroupQuery(Number(groupId));
    const initializeHandleWrapper = useCallback(() => {
        handleWrap(classes.list, classes.wrapped, classes.specialItem, 1);
    }, [height, width, categoriesByGroup])

    const autoHandleCloseModal = useCallback(() => {
        if (!isExpenseModalOpen) setIdModalOpen(-1)
    }, [isExpenseModalOpen])

    useEffect(() => {
        initializeHandleWrapper()
        autoHandleCloseModal()
    }, [initializeHandleWrapper,
        autoHandleCloseModal])
    
    const getCategories = (categoriesByGroup: ICategory[]) => {
        return categoriesByGroup.map((item, i) =>
            <CategoriesCardItem
                key={i}
                setIdModalOpen={setIdModalOpen}
                setIsModalOpen={setIsExpenseModalOpen}
                category={item} />
        )
    }

    const properCategories = useMemo(() => {
        return categoriesByGroup?.categories_group.slice(0, totalItems)
    }, [categoriesByGroup, totalItems])
    
    const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
    const getViewMoreModal = () => {
        return <ViewMoreModal
            isModalOpen={isMoreModalOpen}
            setIsModalOpen={setIsMoreModalOpen}
            isAddModalOpen={isCreateCategoryModalOpen}
            setIsAddModalOpen={setIsCreateCategoryModalOpen}
            data={categoriesByGroup ? getCategories(categoriesByGroup.categories_group) : []}
            type={'categories'}
        />
    }

    return (
        <div className={classes.CategoriesCard}>
            {getViewMoreModal()}
            {
                <ExpenseModal
                isExpenseModalOpen={isExpenseModalOpen}
                setIsExpenseModalOpen={setIsExpenseModalOpen}
                categoryId={idModalOpen}
                groupId={Number(groupId)}/>
            }
            {
                <CategoryModal
                isCategoryModalOpen={isCreateCategoryModalOpen}
                setIsCategoryModalOpen={setIsCreateCategoryModalOpen}
                mode='create'
                groupId={Number(groupId)}/>
            }
            <div className={classes.inner}>
                <h3 className={classes.title}>Categories</h3>
                <ul className={classes.list} ref={squareRef}>
                    {properCategories? getCategories(properCategories) : ''}
                    {
                    categoriesByGroup?.categories_group?.length === 0 ?
                        <div className={classes.emptyList}>
                            <p>Category list is empty!</p>
                            <SpecialButton
                                handleClick={() => {setIsCreateCategoryModalOpen(true)}}
                                className={classes.specialItem}
                                type='add'
                            />
                        </div>
                        :
                        categoriesByGroup?.categories_group?.length! >= totalItems ?
                         <SpecialButton 
                            handleClick={() => {setIsMoreModalOpen(true)}}
                            className={classes.specialItem}
                            type='view'
                        />
                        :
                        <SpecialButton
                            handleClick={() => {setIsCreateCategoryModalOpen(true)}}
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