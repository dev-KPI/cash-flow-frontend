import { FC, ReactNode, useState, useCallback, Dispatch, SetStateAction  } from "react";

//UI
import classes from './ExpenseModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
//logic
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";

interface IExpenseModalProps{
    isExpenseModalOpen: boolean
    setIsExpenseModalOpen: Dispatch<SetStateAction<boolean>>;
}

interface IModalState {
    operation: number
    description: string
}

const ExpenseModal: FC<IExpenseModalProps> = ({ 
    isExpenseModalOpen = false, 
    setIsExpenseModalOpen }) => {

    const dollarIcon: ReactNode = <i className="bi bi-currency-dollar"></i>
    const headerIcon: ReactNode = <i className="bi bi-graph-down-arrow"></i>
    const titleModal = 'Expense'
    const amountTitle = 'Amount of expense'
    const descriptionTitle = 'Description of expense'

    const [operationValue, setOperationValue] = useState<number>(0);
    const [descriptionValue, setDescriptionValue] = useState<string>('');

    //submit
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [shouldShowTooltip, setShouldShowTooltip] = useState<boolean>(false);

    const postObject: IModalState = {
        operation: operationValue,
        description: descriptionValue
    };

    const handleSubmit = async() => {
        setIsSubmiting(true)
        await setTimeout(() => {
            setShouldShowTooltip(true)
            setIsSubmiting(false);
            alert(JSON.stringify(postObject, null, 2));
            setIsExpenseModalOpen(false);
        }, 3000);
    }
    const showToolTip = useCallback(() => {
        if (shouldShowTooltip) {
            return <StatusTooltip
            type="success" 
            title="Expense successfully added"/>
        }
    }, [shouldShowTooltip])

    return <>
    {showToolTip()}
    <UsePortal
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
                            setFormValue={{type: 'cash', callback: setOperationValue}}
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
                        isPending={isSubmiting}
                        children="Confirm"
                        btnWidth={170}
                        btnHeight={36}
                        icon="submit"
                        type={'primary'}
                        callback={handleSubmit}
                        />
                </div>
            </form>
        </UsePortal>
    </>
};
  
export default ExpenseModal;