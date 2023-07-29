import { useCallback, useEffect, useMemo, useState } from 'react';

//logic
import { useElementSize } from 'usehooks-ts'
import { handleWrap } from '@services/UsefulMethods/UIMethods';
import IExpense from '@models/IExpense';
import { useGetExpensesByGroupQuery } from '@store/Controllers/ExpensesController/ExpensesController';
import { useGetCurrentUserGroupsQuery } from '@store/Controllers/GroupsController/GroupsController';
import { useGetCategoriesByGroupQuery } from '@store/Controllers/CategoriesController/CategoriesController';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
import IGroupState from '@store/Group/GroupInterfaces';
//UI
import CategoriesCardItem from '@components/CategoriesCardItem/CategoriesCardItem';
import classes from './UserCategoriesCard.module.css'
import UserCategoriesCardLoader from '@pages/Dashboard/UserCategoriesCard/UserCategoriesCardLoader';
import ExpenseModal from '@components/ModalWindows/ExpenseModal/ExpenseModal';
import ViewMoreModal from '@components/ModalWindows/ViewMoreModal/ViewMoreModal';
import CategoryModal from '@components/ModalWindows/CategoryModal/CategoryModal';
import SpecialButton from '@components/Buttons/SpeciaButton/SpecialButton';
import { skipToken } from '@reduxjs/toolkit/dist/query';



const UserCategoriesCard = () => {

    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const GroupsStore = useAppSelector<IGroupState>(store => store.GroupSlice)
    const [totalItems, setTotalItems] = useState<number>(11);
    const [pageGroup, setGroupPage] = useState<number>(0);
    const [selectedGroup, setSelectedGroup] = useState<number>(GroupsStore.defaultGroup);
    const [idExpenseModalOpen, setIdExpenseModalOpen] = useState<number>(-1);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
    const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();

    const { data: UserGroups, isLoading: isGroupsLoading, isError: isGroupsError } = useGetCurrentUserGroupsQuery(null);
    const { data: UserCategoriesByGroup, isLoading: isCategoriesByGroupLoading, isError: isCategoriesByGroupError } = useGetCategoriesByGroupQuery(selectedGroup);
    const { data: ExpensesByGroup, isLoading: isExpensesLoading, isError: isExpensesError } = useGetExpensesByGroupQuery({
        group_id: selectedGroup, 
        period: {
            year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth)
        }
    })

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
        if(categories.length > 0){
            return categories.map((item, i) => 
                <CategoriesCardItem 
                key={i} 
                categoryId={idExpenseModalOpen}
                setIdModalOpen={setIdExpenseModalOpen}
                setIsModalOpen={setIsExpenseModalOpen}
                expense={item}/>
            )
        } else {
            return UserCategoriesByGroup?.categories_group.map((item, i) => 
                <CategoriesCardItem 
                key={i} 
                categoryId={idExpenseModalOpen}
                setIdModalOpen={setIdExpenseModalOpen}
                setIsModalOpen={setIsExpenseModalOpen}
                expense={{
                    id: i,
                    descriptions: 'none',
                    amount: 0,
                    time: 'none',
                    category_group: {
                        group: {
                            id: 0,
                            title: 'none'
                        },
                        category: {
                            id: item.category.id,
                            title: item.category.title
                        },
                        color_code: item.color_code,
                        icon_url: item.icon_url
                    }
                }}/>
            )
        }
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
        if (UserGroups && UserGroups.user_groups[pageGroup + 1]) {
            setGroupPage(pageGroup + 1);
            setSelectedGroup(UserGroups.user_groups[pageGroup + 1].group.id);
        } 
    }

    const handlePrevGroup = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (UserGroups && UserGroups.user_groups[pageGroup - 1]) {
            setGroupPage(pageGroup - 1);
            setSelectedGroup(UserGroups.user_groups[pageGroup - 1].group.id);
        } 
    }

    return (
        <div className={classes.categories}>
            {getExpenseModal()}
            {getViewMoreModal()}
            {getCategoryModal()}
            {isGroupsLoading ? <UserCategoriesCardLoader /> : <>            
                <div className={classes.inner}>
                    <div className={classes.top}>
                        <h3 className={classes.title}>Categories
                            <span className={classes.categoryName}>
                                ({UserGroups?.user_groups[pageGroup].group.title})
                            </span>
                        </h3>
                        <div className={classes.nav}>
                            <button
                                type="submit"
                                onClick={handlePrevGroup}
                                disabled={!UserGroups?.user_groups[pageGroup - 1]}
                                className={classes.btn + ' ' + classes.previous}
                                >
                                <i id='chevron' className="bi bi-chevron-left"></i>
                            </button>
                            <button
                                type="submit"
                                onClick={handleNextGroup}
                                disabled={!UserGroups?.user_groups[pageGroup + 1]}
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
