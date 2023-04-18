import React, {FC, ReactNode, useEffect, KeyboardEvent, useCallback, useRef, useMemo, useState} from "react";
import ReactDOM from 'react-dom';

//UI
import classes from './OperationModal.module.css';
import Input from "@components/Input/Input";
import CloseButton from "@components/Buttons/CloseButton/CloseButton";
import UseModal from "@hooks/layoutHooks/useModal/useModal";
import ConfirmButton from "@components/Buttons/ConfirmButton/ConfirmButton";
import { useWindowSize } from "usehooks-ts";

interface IOperationModalProps{
    type: 'expense' | 'salary'
    isOperationModalOpen: boolean
    setIsOperationModalOpen: (value: boolean) => void
}

interface IModalState {
    salary: number
    description: string
}

const OperationModal: FC<IOperationModalProps> = ({ type, isOperationModalOpen = false, setIsOperationModalOpen }) => {

    const dollarIcon: ReactNode = <i className="bi bi-currency-dollar"></i>
    const headerIcon: ReactNode = type === 'salary' ? <i className="bi bi-credit-card-2-front"></i> : <i className="bi bi-graph-down-arrow"></i>
    const titleModal = type === 'salary' ? 'Salary' : 'Expense'
    const amountTitle = type === 'salary' ?'Amount of salary' : 'Amount of expense'
    const descriptionTitle = type === 'salary' ?'Description of salary' : 'Description of expense'

    const [salaryValue = 0, setSalaryValue] = useState<number>();
    const [descriptionValue = '', setDescriptionValue] = useState<string>();
    const {width} = useWindowSize()

    //submit
    const [isSubmiting = false, setIsSubmiting] = useState<boolean>();

    const postObject: IModalState = {
        salary: salaryValue,
        description: descriptionValue
    };

    const handleSubmit = async() => {
        setIsSubmiting(true)
        await setTimeout(() => {
            setIsSubmiting(false);
            alert(JSON.stringify(postObject, null, 2));
            setIsOperationModalOpen(false);
        }, 3000);
    }
    
    return ReactDOM.createPortal(<>
        <UseModal
        containerWidth={600}
        containerHeight={416}
        setIsModalOpen={setIsOperationModalOpen}
        isModalOpen={isOperationModalOpen}
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
                        <CloseButton closeHandler={() => setIsOperationModalOpen(false)}/>
                    </div>
                </div>
                <div className={classes.line}></div>
                <div 
                style={{
                    marginTop: width > 768 ? '' : '10%',
                }}
                className={classes.OperationBody}>
                    <div className={classes.AmountInput}>
                        <label className={classes.title} htmlFor="salary">{amountTitle}</label>
                        <div className={classes.inputWrapper}>
                            <Input 
                            setFormValue={{type: 'cash', callback: setSalaryValue}}
                            isInputMustClear={!isOperationModalOpen} 
                            Icon={dollarIcon} inputType="cash" id="salary" 
                            name="salary" placeholder="00.00"/>
                        </div>
                    </div>
                    <div className={classes.DescriptionInput}>
                        <label className={classes.title} htmlFor="description">{descriptionTitle}</label>
                        <div className={classes.inputWrapper}>
                            <Input 
                            setFormValue={{type: 'text', callback: setDescriptionValue}}
                            isInputMustClear={!isOperationModalOpen} 
                            inputType="text" id="description" 
                            name="description"/>
                        </div>
                    </div>
                </div>
                <div className={classes.confirmBtnWrapper}>
                    <ConfirmButton
                    isPending={isSubmiting}
                    title="Submiting..."
                    btnWidth={170}
                    btnHeight={36}
                    type="submit"
                    callback={handleSubmit}/>
                </div>
            </form>
        </UseModal>
    </>,
    document.getElementById('portal')!
    );
};
  
export default React.memo(OperationModal);