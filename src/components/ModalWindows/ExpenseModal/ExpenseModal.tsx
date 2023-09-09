import { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction, useEffect, useMemo  } from "react";

//UI
import classes from './ExpenseModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
//logic
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import { useCreateExpenseByGroupMutation, useUpdateExpenseByGroupMutation } from "@store/Controllers/ExpensesController/ExpensesController";
import { useUpdateReplenishmentByIdMutation } from "@store/Controllers/ReplenishmentController/ReplenishmentController";
import { toast } from "react-toastify";
import { notify } from "src/App"; 

type IExpenseModalProps = {
    isExpenseModalOpen: boolean
    setIsExpenseModalOpen: Dispatch<SetStateAction<boolean>>;
    groupId: number,
    categoryId: number,
    setActionCredentials?: () => void
} & (
    | {type: 'create', amount?: never, description?: never, isReplenishment?: never, expenseId?: never}
    | {type: 'edit', amount: number, description: string, isReplenishment: boolean, expenseId: number}
)

const ExpenseModal: FC<IExpenseModalProps> = ({ 
    isExpenseModalOpen = false, 
    setIsExpenseModalOpen, groupId, categoryId,
    amount, description, type, isReplenishment = false, 
    setActionCredentials = () => {}, expenseId = 0 }) => {

    const dollarIcon: ReactNode = <i className="bi bi-currency-dollar"></i>
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

    const canSaveExpense = [amountValue, descriptionValue, groupId, expenseId, categoryId].every(Boolean) && !isExpenseUpdating
    const onUpdateExpense = async () => {
        if (canSaveExpense) {
            try {
                const isUpdated = await updateExpense({
                    expense_id: expenseId,
                    group_id: groupId,
                    descriptions: descriptionValue,
                    category_id: categoryId,
                    amount: amountValue,
                }).unwrap()
                if (isUpdated) {
                    notify('success', 'Expense updated')
                }
                setAmountValue(0)
                setDescriptionValue('')
            } catch (err) {
                console.error('Failed to update expense: ', err)
                notify('error', 'Expense not updated')
            }
        }
    }
    const canSaveReplenishment = [amountValue, descriptionValue, expenseId].every(Boolean) && !isReplenishmentUpdating
    const onUpdateReplenishment = async () => {
        if (canSaveReplenishment) {
            try {
                const isUpdated = await updateReplenishment({
                    id: expenseId,
                    descriptions: descriptionValue,
                    amount: amountValue,
                }).unwrap()
                if (isUpdated) {
                    notify('success', 'Replenishment updated')
                }
                setAmountValue(0)
                setDescriptionValue('')
            } catch (err) {
                console.error('Failed to update replenishment: ', err)
                notify('error', 'Replenishment not updated')
            }
        }
    }

    const canCreateExpense = [amountValue, descriptionValue, groupId, categoryId].every(Boolean) && !isReplenishmentUpdating
    const onCreateExpense = async () => {
        if (canCreateExpense) {
            try {
                const isUpdated = await createExpense({
                    descriptions: descriptionValue,
                    amount: amountValue,
                    category_id: categoryId,
                    group_id: groupId,
                }).unwrap()
                if (isUpdated) {
                    notify('success', 'Expense added')
                }
                setAmountValue(0)
                setDescriptionValue('')
            } catch (err) {
                console.error('Failed to update replenishment: ', err)
                notify('error', 'Expense not added')
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
                            isInputMustClear={!isExpenseModalOpen} 
                            Icon={dollarIcon} inputType="cash" id="salary" 
                            name="salary" placeholder="00.00"/>
                        </div>
                    </li>
                    <li className={classes.DescriptionInput}>
                        <label className={classes.title} htmlFor="description">{descriptionTitle}</label>
                        <div className={classes.inputWrapper}>
                            <Input 
                            value={description}
                            setFormValue={{type: 'text', callback: setDescriptionValue}}
                            isInputMustClear={!isExpenseModalOpen} 
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