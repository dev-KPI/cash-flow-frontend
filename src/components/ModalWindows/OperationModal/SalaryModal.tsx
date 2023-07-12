import React, {FC, ReactNode, useState} from "react";
import ReactDOM from 'react-dom';

//UI
import classes from './SalaryModal.module.css';
import Input from "@components/Input/Input";
import CloseButton from "@components/Buttons/CloseButton/CloseButton";
import UseModal from "@hooks/layoutHooks/useModal/useModal";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
//logic
import { useWindowSize } from "usehooks-ts";

interface IOperationModalProps{
    isSalaryModalOpen: boolean
    setIsSalaryModalOpen: (value: boolean) => void
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

    const [operationValue = 0, setOperationValue] = useState<number>();
    const [descriptionValue = '', setDescriptionValue] = useState<string>();
    const {width} = useWindowSize()

    //submit
    const [isSubmiting = false, setIsSubmiting] = useState<boolean>();

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

    return <UseModal
        modalName="salaryModal"
        containerWidth={600}
        containerHeight={416}
        setIsModalOpen={setIsSalaryModalOpen}
        isModalOpen={isSalaryModalOpen}
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
                        <CloseButton closeHandler={() => setIsSalaryModalOpen(false)}/>
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
        </UseModal>
};
  
export default React.memo(SalaryModal);