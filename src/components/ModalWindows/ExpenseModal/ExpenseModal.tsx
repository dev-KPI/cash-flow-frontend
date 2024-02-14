import { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction, useEffect, useMemo  } from "react";

//UI
import classes from './ExpenseModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
import Dropdown from "@components/Dropdown/Dropdown";
import LocalDate from "@components/LocalDate/LocalDate";
//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import { useCreateExpenseByGroupMutation, useUpdateExpenseByGroupMutation } from "@store/Controllers/ExpensesController/ExpensesController";
import { notify } from "src/App"; 
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { ICurrencyState } from "@store/UI_store/CurrencySlice/CurrencyInterfaces";
import { IGetGroupsCategoriesResponse } from "@store/Controllers/CategoriesController/CategoriesControllerInterfaces";
import ICategory from "@models/ICategory";
import DateService from "@services/DateService/DateService";


type IExpenseModalProps = {
    isExpenseModalOpen: boolean
    setIsExpenseModalOpen: Dispatch<SetStateAction<boolean>>;
    groupId: number,
    categoryId: number,
} & (
    | {type: 'create', amount?: never, description?: never, expenseId?: never, groupsCategories?: never, operationTime?: never}
    | {type: 'edit', amount: number, description: string, expenseId: number, groupsCategories: IGetGroupsCategoriesResponse[],
    operationTime: Date}
    | {type: 'create-expanded', amount?: never, description?: never, expenseId?: never, groupsCategories: IGetGroupsCategoriesResponse[], operationTime?: never}
)

interface Item {
    id: number;
    title: string;
    icon_url: string;
    color_code: string;
}

interface Group extends Item {
    categories_group: ICategory[];
}

const ExpenseModal: FC<IExpenseModalProps> = ({ 
    isExpenseModalOpen = false, 
    setIsExpenseModalOpen, groupId, categoryId,
    amount, description, type, 
    expenseId = 0, groupsCategories = [], operationTime = new Date()}) => {

    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);
    const headerIcon: ReactNode = <i className="bi bi-graph-down-arrow"></i>
    const titleModal = 'Expense'
    const amountTitle = `Amount of expense`
    const descriptionTitle = `Description of expense`

    const [amountValue, setAmountValue] = useState<number>(amount ? amount : 0);
    const [descriptionValue, setDescriptionValue] = useState<string>(description ? description : '');
    const [isInputError, setIsInputError] = useState<boolean>(false);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [selectedGroup, setSelectedGroup] = useState<number>(groupId);
    const [selectedCategory, setSelectedCategory] = useState<number>(categoryId);
    const [selectedTime, setSelectedTime] = useState<Date>(operationTime);
    const [createExpense, { isLoading: isExpenseCreating, isError: isExpenseCreatingError, isSuccess: isExpenseCreated }] = useCreateExpenseByGroupMutation();
    const [updateExpense, { isLoading: isExpenseUpdating, isError: isExpenseUpdatingError, isSuccess: isExpenseUpdated }] = useUpdateExpenseByGroupMutation();
    const onUpdateExpense = async () => {
        if (selectedGroup && selectedCategory && selectedTime && !isExpenseUpdating) {
            try {
                const isExpenseUpdated = await updateExpense({
                    current_group: groupId,
                    expense_id: expenseId,
                    group_id: selectedGroup,
                    descriptions: descriptionValue,
                    category_id: selectedCategory,
                    amount: amountValue,
                    time: DateService.getShiftedISOString(selectedTime)
                }).unwrap()
                if (isExpenseUpdated) {
                    notify('success', 'Expense updated successfully')
                }
            } catch (err) {
                notify('error', 'Expense not updated')
            }
        } else {
            notify('info', 'Expense not updated');
            setSelectedGroup(groupId);
            setSelectedCategory(categoryId)
        }
    }
    const onCreateExpense = async () => {
        if (groupId && categoryId && !isExpenseCreating) {
            try {
                const isExpenseCreated = await createExpense({
                    descriptions: descriptionValue,
                    amount: amountValue,
                    category_id: categoryId,
                    group_id: groupId,
                }).unwrap()
                if (isExpenseCreated) {
                    notify('success', 'Expense created successfully')
                }
            } catch (err) {
                notify('error', 'Expense not created')
            }
        }
    }
    const onCreateExpandedExpense = async () => {
        try {
            const isExpenseCreated = await createExpense({
                descriptions: descriptionValue,
                amount: amountValue,
                category_id: selectedCategory,
                group_id: selectedGroup,
            }).unwrap()
            if (isExpenseCreated) {
                notify('success', 'Expense created successfully')
            }
        } catch (err) {
            notify('error', 'Expense not created')
        }
    }
    const handleSubmit = useCallback(() => {
        if(isSubmit && type === 'create' && amountValue > 0 && categoryId && groupId) {
            setIsInputError(false)
            setIsExpenseModalOpen(false)
            setIsSubmit(false);
            onCreateExpense()
        } else if(isSubmit && type === 'edit' && amountValue > 0) {
            setIsInputError(false)
            setIsExpenseModalOpen(false)
            setIsSubmit(false);
            if (!(amountValue === amount && descriptionValue === description 
                && categoryId === selectedCategory && groupId === selectedGroup 
                && operationTime.getTime() === selectedTime.getTime())) {
                onUpdateExpense()
            } else {
                notify('info', 'Expense not updated')
            }
        } else if(isSubmit && type === 'create-expanded' && amountValue > 0) {
            setIsInputError(false)
            setIsExpenseModalOpen(false)
            setIsSubmit(false);
            if (selectedCategory && selectedGroup) {
                onCreateExpandedExpense()
            } else {
                notify('info', 'Expense not created')
            }
        } else if (isSubmit && amountValue === 0) {
            setIsSubmit(false);
            setIsInputError(true)
        }
    }, [isSubmit])

    const callbackOnSubmit = useCallback(() => {
        if(!isExpenseModalOpen && isSubmit ) {
            setIsSubmit(false);
            setIsInputError(false)
        }
    }, [isExpenseModalOpen, isSubmit])

    useEffect(() => callbackOnSubmit(), [callbackOnSubmit])
    useEffect(() => handleSubmit(), [handleSubmit])

    const groupsWithoutCategories: Omit<Group, "categories_group">[] = [];
    const categoriesWithGroupIndex: Map<number, Item[]> = new Map();

    groupsCategories.forEach((group) => {
        const { categories_group, ...groupWithoutCategories } = group;
        groupsWithoutCategories.push(groupWithoutCategories);
    
        const categoryList: Item[] = [];

        categories_group.forEach(category => {
            const newCategory: Item = {
                id: category.category.id,
                title: category.category.title,
                color_code: category.color_code,
                icon_url: category.icon_url
            };
            categoryList.push(newCategory);
        });

        categoriesWithGroupIndex.set(group.id, categoryList);
    });
    const setGroup = (id: number) => { 
        if(groupId !== id && categoryId === selectedCategory) 
            setSelectedCategory(0); 
        setSelectedGroup(id) 
    }
    const setCategory = (id: number) => { setSelectedCategory(id); }
    const setTime = (time: Date) => { setSelectedTime(time); }
    const selectedCategories = useMemo(()=> {
        const categories = categoriesWithGroupIndex.get(selectedGroup) || []
        categories.forEach((category) => {
                const title = category.title ?? '';
                category.title = title.length > 0 ? title.charAt(0).toUpperCase() + title.slice(1) : title;
            });
        return categories || [];
    }, [groupId, selectedGroup])
    const isGroupAvailable = groupsWithoutCategories.some(group => group.id === groupId);
    return <>
    <UsePortal
            setIsModalOpen={setIsExpenseModalOpen}
            isModalOpen={isExpenseModalOpen}
            headerIcon={headerIcon}
            title={titleModal}
            callback={() => {
                setIsSubmit(false);
                setIsInputError(false);
                setCategory(categoryId);
                setGroup(groupId);
                setTime(operationTime);
            }}
        >
            <form
            onSubmit={handleSubmit}>
                <ul 
                className={classes.OperationBody}>
                    <li className={classes.ItemInput}>
                        <label className={classes.title} htmlFor="salary">{amountTitle}</label>
                        <div className={classes.inputWrapper}>
                            <Input 
                            cashValue={amount}
                            isError={isInputError}
                            setFormValue={{type: 'cash', callback: setAmountValue}}
                            isInputMustClear={false} 
                            Icon={currency} inputType="cash" id="salary" 
                            name="salary" placeholder="00.00"
                            errorMessage="Expense amount too low"/>
                        </div>
                    </li>
                    <li className={classes.ItemInput}>
                        <label className={classes.title} htmlFor="description">{descriptionTitle}</label>
                        <div className={classes.inputWrapper}>
                            <Input 
                            value={description}
                            setFormValue={{type: 'text', callback: setDescriptionValue}}
                            isInputMustClear={false} 
                            inputType="text" id="description" 
                            name="description"/>
                        </div>
                    </li>
                    {(type === 'edit' || type === 'create-expanded') && <>
                        <li className={classes.ItemInput}>
                            <label className={classes.title}>Select group</label>
                            <div className={classes.inputWrapper}>
                                <Dropdown 
                                    placeholder='Select group' 
                                    items={groupsWithoutCategories} 
                                    selectedOption={selectedGroup}
                                    setOption={setGroup} 
                                    />
                                    {!isGroupAvailable && type === 'edit' && 
                                        <span className={classes.errorMessage}>Current group is not available, change it to edit the expense</span>
                                    }
                            </div>
                        </li>
                        <li className={classes.ItemInput}>
                            <label className={classes.title}>Select category</label>
                            <div className={classes.inputWrapper}>
                                <Dropdown placeholder='Select category' 
                                items={selectedCategories}
                                selectedOption={selectedCategory}
                                setOption={setCategory} 
                                />
                            </div>
                        </li>
                    </>}
                    {type === 'edit' &&
                        <li className={classes.ItemInput}>
                        <label className={classes.title}>Choose date and time</label>
                        <div className={classes.inputWrapper}>
                            <LocalDate initialDate={operationTime} key={expenseId} setSelectedDate={setTime}/>
                        </div>
                    </li>}
                </ul>
                <div className={classes.confirmBtnWrapper}>
                    <CustomButton
                        isPending={isExpenseCreating}
                        children="Confirm"
                        btnWidth={170}
                        btnHeight={36}
                        icon="submit"
                        type={'primary'}
                        callback={()=> setIsSubmit(true)}
                        />
                </div>
            </form>
        </UsePortal>
    </>
};
  
export default ExpenseModal;