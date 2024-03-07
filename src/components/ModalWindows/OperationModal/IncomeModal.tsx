import React, { FC, ReactNode, useState, Dispatch, SetStateAction, useCallback, useEffect } from "react";

//UI
import classes from './IncomeModal.module.css';
import Input from "@components/Input/Input";
import CustomButton from "@components/Buttons/CustomButton/CustomButton";
//logic
import UsePortal from "@hooks/layoutHooks/usePortal/usePortal";
import { useCreateReplenishmentMutation, useUpdateReplenishmentByIdMutation } from "@store/Controllers/ReplenishmentController/ReplenishmentController";
import { notify } from "src/App";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import { ICurrencyState } from "@store/UI_store/CurrencySlice/CurrencyInterfaces";
import DateService from "@services/DateService/DateService";
import LocalDate from "@components/LocalDate/LocalDate";

type IOperationModalProps = {
    isIncomeModalOpen: boolean
    setIsIncomeModalOpen: Dispatch<SetStateAction<boolean>>
} & (
    | { type: 'edit', amount: number, description: string, operationId: number, operationTime: Date }
    | { type: 'create', amount?: never, description?: never, operationId?: never, operationTime?: never}
)


const IncomeModal: FC<IOperationModalProps> = ({ 
    isIncomeModalOpen = false, 
    setIsIncomeModalOpen, type, amount, 
    description, operationId = 0, operationTime = new Date()}) => {

    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);

    const headerIcon: ReactNode = <i className="bi bi-credit-card-2-front"></i>
    const titleModal = 'Income'
    const amountTitle = 'Amount of income'
    const descriptionTitle = 'Description of income'
    const [operationValue, setOperationValue] = useState<number>(amount ? amount : 0);
    const [descriptionValue, setDescriptionValue] = useState<string>(description ? description : '');
    const [isInputError, setIsInputError] = useState<boolean>(false);
    const [selectedTime, setSelectedTime] = useState<Date>(operationTime);

    const [createReplenishment, {isLoading: isReplenishmentLoading}] = useCreateReplenishmentMutation();
    const [updateReplenishment, { isLoading: isReplenishmentUpdating, isError: isReplenishmentUpdatingError, isSuccess: isReplenishmentUpdated }] = useUpdateReplenishmentByIdMutation();
    
    useEffect(()=> {
        setSelectedTime(operationTime);
    }, [operationTime])

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
                notify('error', `Replenishment not created`)
            }
        }
    }
    const onUpdateReplenishment = async () => {
        if (selectedTime && !isReplenishmentUpdating) {
            try {
                const isUpdatedReplenishment = await updateReplenishment({
                    id: operationId,
                    descriptions: descriptionValue,
                    amount: operationValue,
                    time: DateService.getShiftedISOString(selectedTime)
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

    const handleSubmit = async () => {
        if (type === 'create' && operationValue !== 0) {
            onCreateReplenishment();
            setIsInputError(false);
            setIsIncomeModalOpen(false);
        } else if(
            type === 'edit' && operationValue > 0) {
            setIsInputError(false)
            setIsIncomeModalOpen(false)
            if (!(operationValue === amount && descriptionValue === description && operationTime.getTime() === selectedTime.getTime())) {
                onUpdateReplenishment()
            } else {
                notify('info', 'Replenishment not updated')
            }
        }
        else {
            setIsInputError(true)
        }
    }

    const setTime = (time: Date) => { setSelectedTime(time); }

    return <>
        <UsePortal
            setIsModalOpen={setIsIncomeModalOpen}
            isModalOpen={isIncomeModalOpen}
            headerIcon={headerIcon}
            title={titleModal}
            callback={() => {
                setIsInputError(false)
            }}
        >
            <form
                onSubmit={handleSubmit}>
                <ul
                    className={classes.OperationBody}>
                    <li className={classes.ItemInput}>
                        <label className={classes.title} htmlFor="salary">{amountTitle}</label>
                        <div className={classes.inputWrapper}>
                            <Input
                                cashValue={amount}
                                setFormValue={{ type: 'cash', callback: setOperationValue }}
                                isError={isInputError}
                                isInputMustClear={false}
                                Icon={currency} inputType="cash" id="salary"
                                name="salary" placeholder="00.00"
                                errorMessage="Replenishment amount too low"/>
                        </div>
                    </li>
                    <li className={classes.ItemInput}>
                        <label className={classes.title} htmlFor="description">{descriptionTitle}</label>
                        <div className={classes.inputWrapper}>
                            <Input
                            value={description}
                                setFormValue={{ type: 'text', callback: setDescriptionValue }}
                                isInputMustClear={false}
                                inputType="text" id="description"
                                name="description" />
                        </div>
                    </li>
                    {type === 'edit' &&
                        <li className={classes.ItemInput}>
                        <label className={classes.title}>Choose date and time</label>
                        <div className={classes.inputWrapper}>
                            <LocalDate initialDate={operationTime} key={operationId} setSelectedDate={setTime}/>
                        </div>
                    </li>}
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
  
export default React.memo(IncomeModal);