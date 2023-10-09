import { useState, FC, useEffect, useMemo, useCallback, ReactNode, isValidElement } from 'react';
//store
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import { ICurrencyState } from '@store/UI_store/CurrencySlice/CurrencyInterfaces';

//logic
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { formatFloatNumber, numberWithCommas } from '@services/UsefulMethods/UIMethods';
import { IGetTotalExpensesResponse } from '@store/Controllers/UserController/UserControllerInterfaces';
import { isSameDay } from "date-fns"
import DateService from '@services/DateService/DateService';
//UI
import classes from "./OperationCard.module.css"
import SalaryModal from '@components/ModalWindows/OperationModal/SalaryModal';
import OperationCardLoader from './OperationCardLoader';


interface OperactionCardProps {
    operation: "Income" | 'Expenses';
    title?: ReactNode | string;
    icon?: string;
    data: IGetTotalExpensesResponse | undefined;
    offPreloader?: boolean
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean
    className?: string;
}

const OperationCard: FC<OperactionCardProps> = ({ operation, title, className, icon, data, isLoading, isSuccess, isError, offPreloader = false }) => {
    const { currency } = useAppSelector<ICurrencyState>(state => state.persistedCurrencySlice);
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const [amount, setAmount] = useState<number | string>(0);
    const [percents, setPercents] = useState<number>(0);
    const [sign, setSign] = useState<string>('');
    const [isOperationModalOpen, setIsOperationModalOpen] = useState<boolean>(false);
    const styles = {
        operationColor: operation === "Income" ? "var(--main-green)" : "var(--main-red)",
        percentColor:
            (operation === "Income" && sign !== '+') ||
            (operation === 'Expenses' && sign === '+') ?
            "var(--main-red)" : "var(--main-green)",
        percentBackground:
            (operation === "Income" && sign !== '+') ||
            (operation === 'Expenses' && sign === '+') ?
            "rgba(255, 45, 85, 0.20)" : "rgba(128, 214, 103, 0.20)",
        cursor: operation === "Income" ? "pointer" : "auto"
    }

    const RangeTitle = useMemo(() => {
        if (DateService.isAllTime(MonthPickerStore.startDate, MonthPickerStore.endDate)) {
            return ''
        } else if (DateService.isMonth(MonthPickerStore.startDate, MonthPickerStore.endDate)) {
            return `since previous month`
        } else if (isSameDay(MonthPickerStore.startDate, MonthPickerStore.endDate)) {
            return `since previous day`
        }
        else {
            return `since previous same period`
        }
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])

    const initializeTotalVars = useCallback(() => {
        if(data){
            setAmount(numberWithCommas(Number(data.amount)));
            setPercents(Number(data.percentage_increase * 100 > 1000 ? Math.floor(data.percentage_increase * 100) : formatFloatNumber(data.percentage_increase * 100, 2)));
            setSign(data.percentage_increase === 0 ? '' : data.percentage_increase > 0 ? '+' : '-');
        } else {
            setAmount(0);
            setPercents(0);
            setSign('');
        }
    }, [data])
    
    useEffect(() => initializeTotalVars(), [initializeTotalVars])
    const cardTitle = title ? isValidElement(title) ? title : <h3 className={classes.title}>{title}</h3> : <h3 className={classes.title}>{operation}</h3>;
    return (<>
        {operation === 'Income' ?
            <SalaryModal
                setIsSalaryModalOpen={setIsOperationModalOpen}
                isSalaryModalOpen={isOperationModalOpen}
            /> : null
        }
        <div className={`${classes.operationCard} ${className ? className : ''}`}
            onClick={() => operation === "Income" ? setIsOperationModalOpen(!isOperationModalOpen) : null}
            style={{ cursor: styles.cursor }}>
            {isLoading ?
                (!offPreloader ? <OperationCardLoader /> : null)
                :
                <div className={classes.inner}>
                    <div className={classes.top}>
                        <div className={classes.info}>
                            {cardTitle}
                            <p className={classes.amount}>{amount}{currency}</p>
                        </div>
                        <div
                            className={classes.icon}
                            style={{ background: styles.operationColor }}
                        >
                            {operation === "Income" ?
                                <i className="bi bi-credit-card-2-front"></i> : 
                                icon ? <i className={icon}></i> : <i className="bi bi-graph-down"></i>}
                        </div>
                    </div>
                    <div className={classes.bottom}>
                        <div
                            className={classes.percent}
                            style={{ background: styles.percentBackground }}
                        >
                        <span style={{ color: styles.percentColor }}>{percents}%</span>
                        </div>
                        <p className={classes.time}>{RangeTitle}</p>
                    </div>
                </div>
            }
        </div>
    </>);
};

export default OperationCard;