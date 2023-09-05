import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
//logic
import { useElementSize } from 'usehooks-ts'
import { ICategoryAmount } from '@models/ICategory';
import { handleWrap } from '@services/UsefulMethods/UIMethods';
import { useGetUserExpensesByGroupQuery } from '@store/Controllers/UserController/UserController';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
//UI
import classes from './GroupCategoriesCard.module.css';
import CategoriesCardItem from '@components/CategoriesCardItem/CategoriesCardItem';
import ExpenseModal from '@components/ModalWindows/ExpenseModal/ExpenseModal';
import SpecialButton from '@components/Buttons/SpeciaButton/SpecialButton';
import CategoryModal from '@components/ModalWindows/CategoryModal/CategoryModal';
import ViewMoreModal from '@components/ModalWindows/ViewMoreModal/ViewMoreModal';


const GroupCategoriesCard = () => {
    const {groupId} = useParams<{groupId: string}>();

    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const [maxItems, setMaxItems] = useState<number>(11);
    const [totalItems, setTotalItems] = useState<number>(maxItems);
    const [idModalOpen, setIdModalOpen] = useState<number>(-1);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
    const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();
    const ref = useRef<HTMLUListElement>(null);
    
    const { data: CategoriesByGroup, isLoading: isCategoriesLoading, isError: isCategoriesError, isSuccess: isCategoriesSuccess } = useGetUserExpensesByGroupQuery({
        group_id: Number(groupId), 
        period: MonthPickerStore.type === 'year-month' ? 
        {year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth)}  : 
        {start_date: MonthPickerStore.startDate.slice(0,10), end_date: MonthPickerStore.endDate.slice(0,10)} 
    })
    // requestAnimationFrame(_ => {
    //     const totalCategories = handleWrap(ref.current, classes.wrapped, classes.specialItem, 1);
    //     setTotalItems(totalCategories || maxItems);
    // })
    useEffect(()=>{
        const totalCategories = handleWrap(ref.current, classes.wrapped, classes.specialItem, 1);
        setTotalItems(totalCategories || maxItems);
    }, [CategoriesByGroup, width, height])

    const autoHandleCloseModal = useCallback(() => {
        if (!isExpenseModalOpen) setIdModalOpen(-1)
    }, [isExpenseModalOpen])

    
    useEffect(() => {
        autoHandleCloseModal()
    }, [autoHandleCloseModal])
    
    const getCategories = (categories: ICategoryAmount[]) => {
        return categories.map((item, i) =>
            <CategoriesCardItem
                key={i}
                setIdModalOpen={setIdModalOpen}
                setIsModalOpen={setIsExpenseModalOpen}
                category={item} />
        )
    }
    
    const properCategories = useMemo(() => {
        if(isCategoriesSuccess)
            return CategoriesByGroup.categories.slice(0, maxItems);
        else return []
    }, [CategoriesByGroup, maxItems])
    
    const categoriesLength: number = CategoriesByGroup?.categories.length || 0;

    const getViewMoreModal = () => {
        return <ViewMoreModal
            isModalOpen={isMoreModalOpen}
            setIsModalOpen={setIsMoreModalOpen}
            isAddModalOpen={isCategoryModalOpen}
            setIsAddModalOpen={setIsCategoryModalOpen}
            data={CategoriesByGroup ? getCategories(CategoriesByGroup.categories) : []}
            type={'categories'}
        />
    }
    const getExpenseModal = () => {
        return <ExpenseModal
            type='create'
            isExpenseModalOpen={isExpenseModalOpen}
            setIsExpenseModalOpen={setIsExpenseModalOpen}
            categoryId={idModalOpen}
            groupId={Number(groupId)} />
    }
    const getCategoryModal = () => {
        return <CategoryModal
            isCategoryModalOpen={isCategoryModalOpen}
            setIsCategoryModalOpen={setIsCategoryModalOpen}
            mode='create'
            groupId={Number(groupId)} />
    }
    const moreButton = (<SpecialButton
        handleClick={() => setIsMoreModalOpen(!isMoreModalOpen)}
        className={classes.specialItem}
        type='view'
    />);
    const addButton = (<SpecialButton
        handleClick={() => setIsCategoryModalOpen(!isCategoryModalOpen)}
        className={classes.specialItem}
        type='add'
    />);
    const specialButton = useMemo(() => {
        return totalItems <= categoriesLength ? moreButton : addButton
    }, [totalItems])
    
    let categoriesContent;
    if (isCategoriesSuccess && CategoriesByGroup.categories.length !== 0) {
        categoriesContent = getCategories(properCategories)
        categoriesContent.push(specialButton);        
    } else {
        categoriesContent = <div className={classes.emptyList}>
            <p>Category list is empty!</p>
            {addButton}
        </div>
    }
    return (
        <div className={classes.CategoriesCard}>
            {getViewMoreModal()}
            {getExpenseModal()}
            {getCategoryModal()}
            <div className={classes.inner}>
                <h3 className={classes.title}>Categories</h3>
                <ul className={classes.list} ref={mergeRefs([ref, squareRef])}>
                    {categoriesContent}
                </ul>
            </div>
        </div>
    );
};

export default GroupCategoriesCard;