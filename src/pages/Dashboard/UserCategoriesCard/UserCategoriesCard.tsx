import { useCallback, useEffect, useMemo, useState } from 'react';

//logic
import { useElementSize } from 'usehooks-ts'
import { handleWrap } from '@services/UsefulMethods/UIMethods';
import IExpense from '@models/IExpense';
import { useGetExpensesByGroupQuery } from '@store/Controllers/ExpensesController/ExpensesController';
import { useGetCurrentUserGroupsQuery } from '@store/Controllers/GroupsController/GroupsController';
//UI
import CategoriesCardItem from '@components/CategoriesCardItem/CategoriesCardItem';
import classes from './UserCategoriesCard.module.css'
import UserCategoriesCardLoader from '@pages/Dashboard/UserCategoriesCard/UserCategoriesCardLoader';
import ExpenseModal from '@components/ModalWindows/ExpenseModal/ExpenseModal';
import ViewMoreModal from '@components/ModalWindows/ViewMoreModal/ViewMoreModal';
import CategoryModal from '@components/ModalWindows/CategoryModal/CategoryModal';
import SpecialButton from '@components/Buttons/SpeciaButton/SpecialButton';



const UserCategoriesCard = () => {
    // const [categories, setCategories] = useState<ISortedCategoryItem[]>([]);
    const [totalItems, setTotalItems] = useState<number>(11);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedGroup, setSelectedGroup] = useState<number>(0);
    const [idExpenseModalOpen, setIdExpenseModalOpen] = useState<number>(-1);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
    const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();

    const { data: UserGroups, isLoading: isGroupsLoading, isError: isGroupsError } = useGetCurrentUserGroupsQuery(null);
    const { data: ExpensesByGroup, isLoading: isExpensesLoading, isError: isExpensesError } = useGetExpensesByGroupQuery({group_id: selectedGroup, year_month: '2023-07'})
    // const { categoriesByGroup } = json;
    // let groups = categoriesByGroup.map(a => a.title);
    
    // const initializeCategories = useCallback(() => {
    //     const newCategories = categoriesByGroup.find(item => item.title === groups[groupIndex])?.categories
    //     if (newCategories)
    //         setCategories(newCategories);
    // }, [groupIndex])

    const initializeHandleWrapper = useCallback(()=> {
        handleWrap(classes.list, classes.wrapped, classes.specialItem, 2);
    }, [height, width, ExpensesByGroup])

    const autoHandleCloseModal = useCallback(() => {
        if(!isExpenseModalOpen) setIdExpenseModalOpen(-1) 
    }, [isExpenseModalOpen])

    useEffect(()=>{
        initializeHandleWrapper()
        autoHandleCloseModal()
    }, [ initializeHandleWrapper, 
        autoHandleCloseModal])

    const getCategories = (categories: IExpense[]) => {
        return categories.map((item, i) => 
            <CategoriesCardItem 
            key={i} 
            setIdModalOpen={setIdExpenseModalOpen}
            setIsModalOpen={setIsExpenseModalOpen}
            expense={item}/>
        )
    }
    const getExpenseModal = () => {
        return <ExpenseModal
        isExpenseModalOpen={isExpenseModalOpen}
        setIsExpenseModalOpen={setIsExpenseModalOpen}
        />
    }
    const getViewMoreModal = () => {
        return <ViewMoreModal
            isModalOpen={isMoreModalOpen}
            setIsModalOpen={setIsMoreModalOpen}
            isAddModalOpen={isCategoryModalOpen}
            setIsAddModalOpen={setIsCategoryModalOpen}
            data={ExpensesByGroup ? getCategories(ExpensesByGroup) : []}
            type={'categories'}
        />
    }
    const getCategoryModal = () => {
        return <CategoryModal
            groupId={0}
            categoryId={0}
            isCategoryModalOpen={isCategoryModalOpen}
            setIsCategoryModalOpen={setIsCategoryModalOpen}
            mode='create'
        />
    }

    const properCategories: IExpense[] = useMemo(() => {
        if (ExpensesByGroup)
            return ExpensesByGroup?.slice(0, totalItems)
        else
            return []
    }, [ExpensesByGroup, totalItems])

    const handleNextGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (UserGroups && !UserGroups.user_groups[selectedGroup + 1].group) return;
        setSelectedGroup(selectedGroup + 1); 
    }

    const handlePrevGroup =(e: React.MouseEvent<HTMLButtonElement>) => {
        if (UserGroups && !UserGroups.user_groups[selectedGroup - 1].group) return;
        setSelectedGroup(selectedGroup - 1); 
    }
    
    setTimeout(() => {
        setLoading(false)
    }, 1500);

    return (
        <div className={classes.categories}>
            {getExpenseModal()}
            {getViewMoreModal()}
            {getCategoryModal()}
            {loading ? <UserCategoriesCardLoader /> : <>            
                <div className={classes.inner}>
                    <div className={classes.top}>
                        <h3 className={classes.title}>Categories
                            <span className={classes.categoryName}>
                                ({UserGroups?.user_groups[selectedGroup].group.title})
                            </span>
                        </h3>
                        <div className={classes.nav}>
                            <button
                                type="submit"
                                onClick={handlePrevGroup}
                                disabled={!UserGroups?.user_groups[selectedGroup - 1]}
                                className={classes.btn + ' ' + classes.previous}
                                >
                                <i id='chevron' className="bi bi-chevron-left"></i>
                            </button>
                            <button
                                type="submit"
                                onClick={handleNextGroup}
                                disabled={!UserGroups?.user_groups[selectedGroup + 1]}
                                className={classes.btn + ' ' + classes.next}
                                >
                                <i id='chevron' className="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                    <ul className={classes.list} ref={squareRef}>
                        {getCategories(properCategories)}
                        {
                        ExpensesByGroup?.length === 0 ?
                            <div className={classes.emptyList}>
                                <p>Category list is empty!</p>
                                    <SpecialButton
                                        handleClick={() => setIsCategoryModalOpen(!isCategoryModalOpen)}
                                        className={classes.specialItem}
                                        type='add'
                                    />
                            </div> 
                            :
                        ExpensesByGroup?.length! >= totalItems ?
                            <SpecialButton 
                                handleClick={() => setIsMoreModalOpen(!isMoreModalOpen)}
                                className={classes.specialItem}
                                type='view'
                            />
                            :
                            <SpecialButton
                                handleClick={() => setIsCategoryModalOpen(!isCategoryModalOpen)}
                                className={classes.specialItem}
                                type='add'
                            />
                        }
                    </ul>    
                </div>
            </>}
        </div>
    );
};

export default UserCategoriesCard;
