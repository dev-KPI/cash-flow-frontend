import { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction, useEffect  } from "react";

//UI
import classes from './ExpenseModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
//logic
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import { useCreateExpenseByGroupMutation } from "@store/Controllers/ExpensesController/ExpensesController";

interface IExpenseModalProps{
    isExpenseModalOpen: boolean
    setIsExpenseModalOpen: Dispatch<SetStateAction<boolean>>;
    groupId: number,
    categoryId: number,
}

const ExpenseModal: FC<IExpenseModalProps> = ({ 
    isExpenseModalOpen = false, 
    setIsExpenseModalOpen, groupId, categoryId }) => {

    const dollarIcon: ReactNode = <i className="bi bi-currency-dollar"></i>
    const headerIcon: ReactNode = <i className="bi bi-graph-down-arrow"></i>
    const titleModal = 'Expense'
    const amountTitle = 'Amount of expense'
    const descriptionTitle = 'Description of expense'

    const [amountValue, setAmountValue] = useState<number>(0);
    const [descriptionValue, setDescriptionValue] = useState<string>('');
    const [isInputError, setIsInputError] = useState<boolean>(false);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const [createExpense, { isLoading: isExpenseCreating, isError: isExpenseError, isSuccess: isExpenseCreated }] = useCreateExpenseByGroupMutation();

    const handleSubmit = useCallback(() => {
        if(isSubmit && amountValue > 0) {
            setIsInputError(false)
            setIsSubmit(false);
            setIsExpenseModalOpen(false)
            createExpense({
                descriptions: descriptionValue,
                amount: amountValue,
                category_id: categoryId,
                group_id: groupId,
            })
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
        if (isExpenseCreated) {
            return <StatusTooltip
            type="success" 
            title="Expense successfully added"/>
        } else if (isExpenseError) {
            return <StatusTooltip
                type="error"
                title={`Expense not added`} />
        }
    }, [createExpense, isExpenseCreating, isExpenseError, isExpenseCreated])

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