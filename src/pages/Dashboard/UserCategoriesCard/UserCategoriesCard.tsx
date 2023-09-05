import { useEffect, useMemo, useRef, useState } from 'react';
import { mergeRefs } from "react-merge-refs";
import { useNavigate } from 'react-router-dom';
//logic
import { useElementSize } from 'usehooks-ts'
import { handleWrap } from '@services/UsefulMethods/UIMethods';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
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
import PreLoader from '@components/PreLoader/PreLoader';


const UserCategoriesCard = () => {
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)

    const [maxItems, setMaxItems] = useState<number>(11);
    const [totalItems, setTotalItems] = useState<number>(maxItems);
    const [pageGroup, setGroupPage] = useState<number>(0);
    const [selectedGroup, setSelectedGroup] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
    const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();
    const ref = useRef<HTMLUListElement>(null);
    const navigate = useNavigate()

    const { data: UserGroups, isLoading: isGroupsLoading, isFetching: isGroupsFetching, isError: isGroupsError, isSuccess: isGroupsSuccess } = useGetCurrentUserGroupsQuery(null);
    
    useEffect(() => {
        if (isGroupsSuccess && UserGroups.user_groups[0]) {
            setSelectedGroup(UserGroups.user_groups[0].group.id)
        } 
    }, [UserGroups, isGroupsFetching])

    const { data: ExpensesByGroup, isLoading: isExpensesLoading, isError: isExpensesError, isSuccess: isExpensesSuccess, isFetching: isExpensesFetching } = useGetUserExpensesByGroupQuery({
        group_id: selectedGroup,
        period: MonthPickerStore.type === 'year-month' ?
            { year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth) } :
            { start_date: MonthPickerStore.startDate.slice(0, 10), end_date: MonthPickerStore.endDate.slice(0, 10) }
    }, { skip: !isGroupsSuccess || selectedGroup === 0 })


    requestAnimationFrame(_ => {
        const totalCategories = handleWrap(ref.current, classes.wrapped, classes.specialItem, 2);
        setTotalItems(totalCategories || maxItems);
    })
    useEffect(()=>{
        const totalCategories = handleWrap(ref.current, classes.wrapped, classes.specialItem, 2);
        setTotalItems(totalCategories || maxItems);
    }, [ExpensesByGroup, UserGroups, width, height])

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
            data={getCategories(ExpensesByGroup ? ExpensesByGroup.categories : [])}
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
            return ExpensesByGroup ? ExpensesByGroup.categories.slice(0, maxItems) : []
    }, [ExpensesByGroup, maxItems])

    const categoriesLength: number = ExpensesByGroup?.categories.length || 0;

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

    const addButton = (<SpecialButton
        handleClick={() => setIsCategoryModalOpen(!isCategoryModalOpen)}
        className={classes.specialItem}
        type='add'
    />);
    const moreButton = (<SpecialButton
        handleClick={() => setIsMoreModalOpen(!isMoreModalOpen)}
        className={classes.specialItem}
        type='view'
    />);
    const specialButton = useMemo(() => {
        return totalItems <= categoriesLength ? moreButton : addButton
    }, [totalItems])

    let categoriesContent;
    if (isExpensesLoading || isExpensesFetching) {
        categoriesContent = (<div className={classes.loaderWrapper}>
            <PreLoader preLoaderSize={50} type='auto' />
        </div>)
    }
    else if (isExpensesSuccess && isGroupsSuccess) {
        if (ExpensesByGroup.categories.length === 0)
            categoriesContent = <div className={classes.emptyList}>
                <p>Category list is empty!</p>
                {addButton}
            </div>
        else {
            categoriesContent = getCategories(properCategories)
            categoriesContent.push(specialButton);      
        }
    } else if (!UserGroups?.user_groups[pageGroup]) {
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
    } else {
        categoriesContent = <div className={classes.emptyList}>
            <p>Category list is empty!</p>
            {addButton}
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
                                ({UserGroups?.user_groups[pageGroup] ? UserGroups.user_groups[pageGroup].group.title : 'You haven`t groups'})
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
                    <ul className={classes.list} ref={mergeRefs([ref, squareRef])}>
                       {categoriesContent}
                    </ul>    
                </div>
            </>}
        </div>
    );
};

export default UserCategoriesCard;
