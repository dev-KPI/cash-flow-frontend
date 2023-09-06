import { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction, useEffect  } from "react";

//UI
import classes from './ExpenseModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
//logic
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import { useCreateExpenseByGroupMutation, useUpdateExpenseByGroupMutation } from "@store/Controllers/ExpensesController/ExpensesController";
import { useUpdateReplenishmentByIdMutation } from "@store/Controllers/ReplenishmentController/ReplenishmentController";

type IExpenseModalProps = {
    isExpenseModalOpen: boolean
    setIsExpenseModalOpen: Dispatch<SetStateAction<boolean>>;
    groupId: number,
    categoryId: number,
    callback?: () => void
} & (
    | {type: 'create', amount?: never, description?: never, isReplenishment?: never, expenseId?: never}
    | {type: 'edit', amount: number, description: string, isReplenishment: boolean, expenseId: number}
)

const ExpenseModal: FC<IExpenseModalProps> = ({ 
    isExpenseModalOpen = false, 
    setIsExpenseModalOpen, groupId, categoryId,
    amount, description, type, isReplenishment = false, 
    callback = () => {}, expenseId = 0 }) => {

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

    const handleSubmit = useCallback(() => {
        if(isSubmit && type === 'create' && amountValue > 0) {
            setIsInputError(false)
            setIsSubmit(false);
            setIsExpenseModalOpen(false)
            createExpense({
                descriptions: descriptionValue,
                amount: amountValue,
                category_id: categoryId,
                group_id: groupId,
            })
        } else if(isSubmit && type === 'edit' && amountValue > 0 && !isReplenishment) {
            setIsInputError(false)
            setIsSubmit(false);
            setIsExpenseModalOpen(false)
            updateExpense({
                expense_id: expenseId,
                group_id: groupId,
                descriptions: descriptionValue,
                amount: amountValue,
            })
            callback()
        } else if(isSubmit && type === 'edit' && amountValue > 0 && isReplenishment) {
            setIsInputError(false)
            setIsSubmit(false);
            setIsExpenseModalOpen(false)
            // expenseID for expense and replenishment controls in upper components
            updateReplenishment({
                id: expenseId,
                descriptions: descriptionValue,
                amount: amountValue,
            })
            callback()
        } else if (isSubmit && amountValue < 1) {
            setIsInputError(true)
            setIsSubmit(false)
        } 
    }, [isSubmit])

    const setFalseInputError = useCallback(() => {
        if(!isExpenseModalOpen && isSubmit) {
            setIsInputError(false)
            setIsSubmit(false)
        }
    }, [isExpenseModalOpen, isSubmit])

    const showToolTip = useCallback(() => {
        if (isExpenseCreated || isExpenseUpdated) {
            return <StatusTooltip
            type="success" 
            title={`Expense successfully ${type === 'create' ? 'added' : 'updated'}`}/>
        } else if (isExpenseCreatingError || isExpenseUpdatingError) {
            return <StatusTooltip
            type="error"
            title={`Expense not ${type === 'create' ? 'added' : 'updated'}`} />
        } else if (isReplenishmentUpdated) {
            return <StatusTooltip
            type="success"
            title={`Replenishment successfully updated`} />
        } else if (isReplenishmentUpdatingError) {
            return <StatusTooltip
            type="error"
            title={`Replenishment not updated`} />
        }
    }, [createExpense, isExpenseCreating, isExpenseCreatingError, isExpenseCreated,
        updateExpense, isExpenseUpdating, isExpenseUpdatingError, isExpenseUpdated,
        updateReplenishment, isReplenishmentUpdating, isReplenishmentUpdatingError, isReplenishmentUpdated])

    useEffect(() => setFalseInputError(), [setFalseInputError])
    useEffect(() => handleSubmit(), [handleSubmit])

    return <>
    {showToolTip()}
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