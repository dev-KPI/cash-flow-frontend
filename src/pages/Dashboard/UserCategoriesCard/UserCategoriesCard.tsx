import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//logic
import { useElementSize } from 'usehooks-ts'
import { handleWrap } from '@services/UsefulMethods/UIMethods';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
import IGroupState from '@store/Group/GroupInterfaces';
import { ICategoryAmount } from '@models/ICategory';
import { useGetUserExpensesByGroupQuery } from '@store/Controllers/UserController/UserController';
import { useGetCurrentUserGroupsQuery } from '@store/Controllers/GroupsController/GroupsController';
//UI
import CategoriesCardItem from '@components/CategoriesCardItem/CategoriesCardItem';
import classes from './UserCategoriesCard.module.css'
import UserCategoriesCardLoader from '@pages/Dashboard/UserCategoriesCard/UserCategoriesCardLoader';
import ExpenseModal from '@components/ModalWindows/ExpenseModal/ExpenseModal';
import ViewMoreModal from '@components/ModalWindows/ViewMoreModal/ViewMoreModal';
import CategoryModal from '@components/ModalWindows/CategoryModal/CategoryModal';
import SpecialButton from '@components/Buttons/SpeciaButton/SpecialButton';
import CustomButton from '@components/Buttons/CustomButton/CustomButton';


const UserCategoriesCard = () => {
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const GroupsStore = useAppSelector<IGroupState>(store => store.persistedGroupSlice)
    const [categories, setCategories] = useState<ICategoryAmount[]>([]);
    const [totalItems, setTotalItems] = useState<number>(11);
    const [pageGroup, setGroupPage] = useState<number>(0);
    const [selectedGroup, setSelectedGroup] = useState<number>(GroupsStore.defaultGroup);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
    const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();
    const navigate = useNavigate()
    const { data: UserGroups, isLoading: isGroupsLoading, isError: isGroupsError, isSuccess: isGroupsSuccess } = useGetCurrentUserGroupsQuery(null);
    const { data: ExpensesByGroup, isLoading: isExpensesLoading, isError: isExpensesError, isSuccess: isExpensesSuccess } = useGetUserExpensesByGroupQuery({
        group_id: selectedGroup, 
        period: MonthPickerStore.type === 'year-month' ? 
        {year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth)}  : 
        {start_date: MonthPickerStore.startDate.slice(0,10), end_date: MonthPickerStore.endDate.slice(0,10)} 
    })
    useEffect(() => {
        if (isExpensesSuccess)
            setCategories(ExpensesByGroup.categories)
    }, [ExpensesByGroup, UserGroups])

    const initializeHandleWrapper = useCallback(()=> {
        handleWrap(classes.list, classes.wrapped, classes.specialItem, 2);
    }, [height, width, ExpensesByGroup, UserGroups])

    useEffect(()=>{
        initializeHandleWrapper()
    }, [initializeHandleWrapper])

    const getCategories = (categories: ICategoryAmount[]) => {
        return categories.map((item, i) => 
            <CategoriesCardItem 
            key={i} 
            category={item}
            setIdModalOpen={setSelectedCategory}
            setIsModalOpen={setIsExpenseModalOpen}
            />
        )
    }
    const getExpenseModal = () => {
        return <ExpenseModal
            isExpenseModalOpen={isExpenseModalOpen}
            setIsExpenseModalOpen={setIsExpenseModalOpen}
            groupId={selectedGroup}
            categoryId={selectedCategory}
        />
    }
    const getViewMoreModal = () => {
        return <ViewMoreModal
            isModalOpen={isMoreModalOpen}
            setIsModalOpen={setIsMoreModalOpen}
            isAddModalOpen={isCategoryModalOpen}
            setIsAddModalOpen={setIsCategoryModalOpen}
            data={getCategories(categories)}
            type={'categories'}
        />
    }
    const getCategoryModal = () => {
        return <CategoryModal
            groupId={selectedGroup}
            categoryId={selectedCategory}
            isCategoryModalOpen={isCategoryModalOpen}
            setIsCategoryModalOpen={setIsCategoryModalOpen}
            mode='create'
        />
    }

    const properCategories: ICategoryAmount[] = useMemo(() => {
            return categories.slice(0, totalItems)
    }, [categories, totalItems])

    

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
    let categoriesContent;
    if (isExpensesSuccess && isGroupsSuccess) {
        if (categories.length === 0)
            categoriesContent = <div className={classes.emptyList}>
                <p>Category list is empty!</p>
                <SpecialButton
                    handleClick={() => setIsCategoryModalOpen(!isCategoryModalOpen)}
                    className={classes.specialItem}
                    type='add'
                />
            </div>
        else {
            categoriesContent = getCategories(properCategories)
            categories.length >= totalItems ?
                categoriesContent.push(<SpecialButton
                    handleClick={() => setIsMoreModalOpen(!isMoreModalOpen)}
                    className={classes.specialItem}
                    type='view'
                />)
                :
                categoriesContent.push(<SpecialButton
                    handleClick={() => setIsCategoryModalOpen(!isCategoryModalOpen)}
                    className={classes.specialItem}
                    type='add'
                />)  
        }
    } else if (isExpensesError) {
        categoriesContent = <div className={classes.emptyList}>
            <p>Create a group before using expenses!</p>
            <CustomButton
                type='primary'
                children={'Browse Groups'}
                icon='none'
                callback={() => navigate('/groups')}
                isPending={false}
            />
        </div>
    }
    return (
        <div className={classes.categories}>
            {getExpenseModal()}
            {getViewMoreModal()}
            {getCategoryModal()}
            {isGroupsLoading || isExpensesLoading ? <UserCategoriesCardLoader /> : <>            
                <div className={classes.inner}>
                    <div className={classes.top}>
                        <h3 className={classes.title}>Categories <span className={classes.categoryName}>
                                ({UserGroups?.user_groups[pageGroup]?.group.title || 'You haven`t groups'})
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
                       {categoriesContent}
                    </ul>    
                </div>
            </>}
        </div>
    );
};

export default UserCategoriesCard;
