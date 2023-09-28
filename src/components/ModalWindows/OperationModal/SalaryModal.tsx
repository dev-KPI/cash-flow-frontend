import React, { FC, ReactNode, useState, Dispatch, SetStateAction, useCallback } from "react";

//UI
import classes from './SalaryModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import { useCreateReplenishmentMutation } from "@store/Controllers/ReplenishmentController/ReplenishmentController";
import { notify } from "src/App";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { ICurrencyState } from "@store/UI_store/CurrencySlice/CurrencyInterfaces";

interface IOperationModalProps{
    isSalaryModalOpen: boolean
    setIsSalaryModalOpen: Dispatch<SetStateAction<boolean>>
}


const SalaryModal: FC<IOperationModalProps> = ({ 
    isSalaryModalOpen = false, 
    setIsSalaryModalOpen }) => {

    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);
    const headerIcon: ReactNode = <i className="bi bi-credit-card-2-front"></i>
    const titleModal = 'Salary'
    const amountTitle = 'Amount of salary'
    const descriptionTitle = 'Description of salary'

    const [operationValue, setOperationValue] = useState<number>(0);
    const [descriptionValue, setDescriptionValue] = useState<string>('');

    const [createReplenishment, {isLoading: isReplenishmentLoading}] = useCreateReplenishmentMutation()

    const onCreateReplenishment = async () => {
        if (!isReplenishmentLoading) {
            try {
                const isReplenishmentCreated = await createReplenishment({
                    amount: operationValue,
                    descriptions: descriptionValue
                }).unwrap()
                if (isReplenishmentCreated) {
                    notify('success', `Replenishment created successfully`)
                }
            } catch (err) {
                console.error('Failed to create replenishment: ', err)
                notify('error', `Replenishment not created`)
            }
        }
    }

    const handleSubmit = async () => {
        onCreateReplenishment()
        setIsSalaryModalOpen(false);
    }

    return <>
        <UsePortal
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
                                setFormValue={{ type: 'cash', callback: setOperationValue }}
                                isInputMustClear={!isSalaryModalOpen}
                                Icon={currency} inputType="cash" id="salary"
                                name="salary" placeholder="00.00" />
                        </div>
                    </li>
                    <li className={classes.DescriptionInput}>
                        <label className={classes.title} htmlFor="description">{descriptionTitle}</label>
                        <div className={classes.inputWrapper}>
                            <Input
                                setFormValue={{ type: 'text', callback: setDescriptionValue }}
                                isInputMustClear={!isSalaryModalOpen}
                                inputType="text" id="description"
                                name="description" />
                        </div>
                    </li>
                </ul>
                <div className={classes.confirmBtnWrapper}>
                    <CustomButton
                        isPending={isReplenishmentLoading}
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
    </>
};
  
export default React.memo(SalaryModal);