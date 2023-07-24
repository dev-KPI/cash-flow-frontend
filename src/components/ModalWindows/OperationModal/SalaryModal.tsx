import React, { FC, ReactNode, useState, Dispatch, SetStateAction } from "react";

//UI
import classes from './SalaryModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";

interface IOperationModalProps{
    isSalaryModalOpen: boolean
    setIsSalaryModalOpen: Dispatch<SetStateAction<boolean>>
}

interface IModalState {
    operation: number
    description: string
}

const SalaryModal: FC<IOperationModalProps> = ({ 
    isSalaryModalOpen = false, 
    setIsSalaryModalOpen }) => {

    const dollarIcon: ReactNode = <i className="bi bi-currency-dollar"></i>
    const headerIcon: ReactNode = <i className="bi bi-credit-card-2-front"></i>
    const titleModal = 'Salary'
    const amountTitle = 'Amount of salary'
    const descriptionTitle = 'Description of salary'

    const [operationValue, setOperationValue] = useState<number>(0);
    const [descriptionValue, setDescriptionValue] = useState<string>('');

    //submit
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

    const postObject: IModalState = {
        operation: operationValue,
        description: descriptionValue
    };

    const handleSubmit = async() => {
        setIsSubmiting(true)
        await setTimeout(() => {
            setIsSubmiting(false);
            alert(JSON.stringify(postObject, null, 2));
            setIsSalaryModalOpen(false);
        }, 3000);
    }

    return <UsePortal
        setIsModalOpen={setIsSalaryModalOpen}
        isModalOpen={isSalaryModalOpen}
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
                            isInputMustClear={!isSalaryModalOpen} 
                            Icon={dollarIcon} inputType="cash" id="salary" 
                            name="salary" placeholder="00.00"/>
                        </div>
                    </li>
                    <li className={classes.DescriptionInput}>
                        <label className={classes.title} htmlFor="description">{descriptionTitle}</label>
                        <div className={classes.inputWrapper}>
                            <Input 
                            setFormValue={{type: 'text', callback: setDescriptionValue}}
                            isInputMustClear={!isSalaryModalOpen} 
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
                    type='primary'
                    callback={handleSubmit}
                    className={`btn-primary`} />
                </div>
            </form>
        </UsePortal>
};
  
export default React.memo(SalaryModal);