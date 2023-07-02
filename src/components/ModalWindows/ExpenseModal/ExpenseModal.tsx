import React, {FC, ReactNode, useState, useCallback} from "react";
import ReactDOM from 'react-dom';

//UI
import classes from './ExpenseModal.module.css';
import Input from "@components/Input/Input";
import CloseButton from "@components/Buttons/CloseButton/CloseButton";
import UseModal from "@hooks/layoutHooks/useModal/useModal";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
//logic
import { useWindowSize } from "usehooks-ts";
import StatusTooltip from "@components/StatusTooltip/StatusTooltip";

interface IExpenseModalProps{
    isExpenseModalOpen: boolean
    setIsExpenseModalOpen: (value: boolean) => void
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

    const [operationValue = 0, setOperationValue] = useState<number>();
    const [descriptionValue = '', setDescriptionValue] = useState<string>();
    const {width} = useWindowSize()

    //submit
    const [isSubmiting = false, setIsSubmiting] = useState<boolean>();
    const [shouldShowTooltip = false, setShouldShowTooltip] = useState<boolean>();

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
    <UseModal
        modalName="expenseModal"
        containerWidth={600}
        containerHeight={416}
        setIsModalOpen={setIsExpenseModalOpen}
        isModalOpen={isExpenseModalOpen}
        >
            <form
            onSubmit={handleSubmit}>
                <div 
                style={{
                    paddingTop: width > 768 ? '' : '32px',
                }}
                className={classes.Header}>
                    <div className={classes.Icon}>
                        {headerIcon}
                    </div>
                    <h3>{titleModal}</h3>
                    <div className={classes.closeBtn}>
                        <CloseButton closeHandler={() => setIsExpenseModalOpen(false)}/>
                    </div>
                </div>
                <div className={classes.line}></div>
                <ul 
                style={{
                    marginTop: width > 768 ? '' : '10%',
                }}
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
        </UseModal>
    </>
};
  
export default ExpenseModal;