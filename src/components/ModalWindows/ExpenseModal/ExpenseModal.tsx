import { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction, useEffect, useMemo  } from "react";

//UI
import classes from './ExpenseModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import { useCreateExpenseByGroupMutation, useUpdateExpenseByGroupMutation } from "@store/Controllers/ExpensesController/ExpensesController";
import { useUpdateReplenishmentByIdMutation } from "@store/Controllers/ReplenishmentController/ReplenishmentController";
import { notify } from "src/App"; 
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { ICurrencyState } from "@store/UI_store/CurrencySlice/CurrencyInterfaces";

type IExpenseModalProps = {
    isExpenseModalOpen: boolean
    setIsExpenseModalOpen: Dispatch<SetStateAction<boolean>>;
    groupId: number,
    categoryId: number,
} & (
    | {type: 'create', amount?: never, description?: never, isReplenishment?: never, expenseId?: never}
    | {type: 'edit', amount: number, description: string, isReplenishment: boolean, expenseId: number}
)

const ExpenseModal: FC<IExpenseModalProps> = ({ 
    isExpenseModalOpen = false, 
    setIsExpenseModalOpen, groupId, categoryId,
    amount, description, type, isReplenishment = false, expenseId = 0 }) => {

    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);
    const headerIcon: ReactNode = isReplenishment ? <i className="bi bi-graph-up-arrow"></i> : <i className="bi bi-graph-down-arrow"></i>
    const titleModal = isReplenishment ? 'Replenishment' : 'Expense'
    const amountTitle = `Amount of ${isReplenishment ? 'replenishment' : 'expense'}`
    const descriptionTitle = `Description of ${isReplenishment ? 'replenishment' : 'expense'}`
    
    const [amountValue, setAmountValue] = useState<number>(amount ? amount : 0);
    const [descriptionValue, setDescriptionValue] = useState<string>(description ? description : '');
    const [isInputError, setIsInputError] = useState<boolean>(false);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const [createExpense, { isLoading: isExpenseCreating, isError: isExpenseCreatingError, isSuccess: isExpenseCreated }] = useCreateExpenseByGroupMutation();
    const [updateExpense, { isLoading: isExpenseUpdating, isError: isExpenseUpdatingError, isSuccess: isExpenseUpdated }] = useUpdateExpenseByGroupMutation();
    const [updateReplenishment, { isLoading: isReplenishmentUpdating, isError: isReplenishmentUpdatingError, isSuccess: isReplenishmentUpdated }] = useUpdateReplenishmentByIdMutation();
    const onUpdateExpense = async () => {
        if (groupId && expenseId && categoryId && !isExpenseUpdating) {
            try {
                const isExpenseUpdated = await updateExpense({
                    expense_id: expenseId,
                    group_id: groupId,
                    descriptions: descriptionValue,
                    category_id: categoryId,
                    amount: amountValue,
                }).unwrap()
                if (isExpenseUpdated) {
                    notify('success', 'Expense updated successfully')
                }
            } catch (err) {
                console.error('Failed to update expense: ', err)
                notify('error', 'Expense not updated')
            }
        }
    }
    const onUpdateReplenishment = async () => {
        if (expenseId && !isReplenishmentUpdating) {
            try {
                const isUpdatedReplenishment = await updateReplenishment({
                    id: expenseId,
                    descriptions: descriptionValue,
                    amount: amountValue,
                }).unwrap()
                if (isUpdatedReplenishment) {
                    notify('success', 'Replenishment updated successfully')
                }
            } catch (err) {
                console.error('Failed to update replenishment: ', err)
                notify('error', 'Replenishment not updated')
            }
        }
    }
    const onCreateExpense = async () => {
        if (groupId && categoryId && !isReplenishmentUpdating) {
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
                console.error('Failed to update replenishment: ', err)
                notify('error', 'Expense not created')
            }
        }
    }

    const handleSubmit = useCallback(() => {
        if(isSubmit && type === 'create' && amountValue > 0) {
            setIsInputError(false)
            setIsExpenseModalOpen(false)
            setIsSubmit(false);
            onCreateExpense()
        } else if(isSubmit && type === 'edit' && amountValue > 0 && !isReplenishment) {
            setIsInputError(false)
            setIsExpenseModalOpen(false)
            setIsSubmit(false);
            if (!(amountValue === amount && descriptionValue === description)) {
                onUpdateExpense()
            } else {
                notify('info', 'Expense not updated')
            }
        } else if(isSubmit && type === 'edit' && amountValue > 0 && isReplenishment) {
            setIsInputError(false)
            setIsExpenseModalOpen(false)
            setIsSubmit(false);
            if (!(amountValue === amount && descriptionValue === description)) {
                onUpdateReplenishment()
            } else {
                notify('info', 'Replenishment not updated')
            }
        } else if (isSubmit && amountValue < 1) {
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

    return <>
    <UsePortal
        callback={() => {}}
        setIsModalOpen={setIsExpenseModalOpen}
        isModalOpen={isExpenseModalOpen}
        headerIcon={headerIcon}
        title={titleModal}
        >
            <form
            onSubmit={handleSubmit}>
                <ul 
                className={classes.OperationBody}>
                    <li className={classes.AmountInput}>
                        <label className={classes.title} htmlFor="salary">{amountTitle}</label>
                        <div className={classes.inputWrapper}>
                            <Input 
                            cashValue={amount}
                            isError={isInputError}
                            setFormValue={{type: 'cash', callback: setAmountValue}}
                            isInputMustClear={false} 
                            Icon={currency} inputType="cash" id="salary" 
                            name="salary" placeholder="00.00"/>
                        </div>
                    </li>
                    <li className={classes.DescriptionInput}>
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
                </ul>
                <div className={classes.confirmBtnWrapper}>
                    <CustomButton
                        isPending={isExpenseCreating}
                        children="Confirm"
                        btnWidth={170}
                        btnHeight={36}
                        icon="submit"
                        type={'primary'}
                        callback={() => {setIsSubmit(true)}}
                        />
                </div>
            </form>
        </UsePortal>
    </>
};
  
export default ExpenseModal;