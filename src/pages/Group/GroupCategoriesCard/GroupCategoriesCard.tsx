import { useCallback, useEffect, useMemo, useState } from 'react';
//logic
import { useElementSize } from 'usehooks-ts'
import { json } from '@pages/Dashboard/UserCategoriesCard/objUserCategories';
import ICategory, { ICategoryAmount } from '@models/ICategory';
import { handleWrap } from '@services/UsefulMethods/UIMethods';
import { useGetUserExpensesByGroupQuery } from '@store/Controllers/UserController/UserController';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import IGroupState from '@store/Group/GroupInterfaces';
//UI
import classes from './GroupCategoriesCard.module.css';
import CategoriesCardItem from '@components/CategoriesCardItem/CategoriesCardItem';
import ExpenseModal from '@components/ModalWindows/ExpenseModal/ExpenseModal';
import SpecialButton from '@components/Buttons/SpeciaButton/SpecialButton';
import CategoryModal from '@components/ModalWindows/CategoryModal/CategoryModal';
import ViewMoreModal from '@components/ModalWindows/ViewMoreModal/ViewMoreModal';
import DateService from '@services/DateService/DateService';



const GroupCategoriesCard = () => {
    const {groupId} = useParams<{groupId: string}>();

    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const [totalItems, setTotalItems] = useState<number>(11);
    const [idModalOpen, setIdModalOpen] = useState<number>(-1);
    const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState<boolean>(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);
    const [squareRef, { width, height }] = useElementSize<HTMLUListElement>();
    
    const { data: CategoriesByGroup, isLoading: isCategoriesByGroupLoading, isError: isCategoriesByGroupError, isSuccess: isCategoriesByGroupSuccess } = useGetUserExpensesByGroupQuery({
        group_id: Number(groupId), 
        period: MonthPickerStore.type === 'year-month' ? 
        {year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth)}  : 
        {start_date: MonthPickerStore.startDate.slice(0,10), end_date: MonthPickerStore.endDate.slice(0,10)} 
    })
    const initializeHandleWrapper = useCallback(() => {
        handleWrap(classes.list, classes.wrapped, classes.specialItem, 1);
    }, [height, width, CategoriesByGroup])

    const autoHandleCloseModal = useCallback(() => {
        if (!isExpenseModalOpen) setIdModalOpen(-1)
    }, [isExpenseModalOpen])

    
    useEffect(() => {
        initializeHandleWrapper()
        autoHandleCloseModal()
    }, [initializeHandleWrapper,
        autoHandleCloseModal])
    
    const getCategories = (CategoriesByGroup: ICategoryAmount[]) => {
        return CategoriesByGroup.map((item, i) =>
            <CategoriesCardItem
                key={i}
                setIdModalOpen={setIdModalOpen}
                setIsModalOpen={setIsExpenseModalOpen}
                category={item} />
        )
    }

    const properCategories = useMemo(() => {
        return CategoriesByGroup?.categories.slice(0, totalItems)
    }, [CategoriesByGroup, totalItems])
    
    const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
    const getViewMoreModal = () => {
        return <ViewMoreModal
            isModalOpen={isMoreModalOpen}
            setIsModalOpen={setIsMoreModalOpen}
            isAddModalOpen={isCreateCategoryModalOpen}
            setIsAddModalOpen={setIsCreateCategoryModalOpen}
            data={CategoriesByGroup ? getCategories(CategoriesByGroup.categories) : []}
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
                    CategoriesByGroup?.categories?.length === 0 ?
                        <div className={classes.emptyList}>
                            <p>Category list is empty!</p>
                            <SpecialButton
                                handleClick={() => {setIsCreateCategoryModalOpen(true)}}
                                className={classes.specialItem}
                                type='add'
                            />
                        </div>
                        :
                        CategoriesByGroup?.categories?.length! >= totalItems ?
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