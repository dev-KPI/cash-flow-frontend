import { useState, FC, useEffect, useMemo, useCallback } from 'react';
//store
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
//logic
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { fomatFloatNumber, numberWithCommas } from '@services/UsefulMethods/UIMethods';
import { IGetTotalExpensesResponse } from '@store/Controllers/UserController/UserControllerInterfaces';
//UI
import classes from "./OperationCard.module.css"
import SalaryModal from '@components/ModalWindows/OperationModal/SalaryModal';
import OperationCardLoader from './OperationCardLoader';


interface OperactionCardProps {
    operation: "Income" | 'Expenses';
    title?: string;
    icon?: string;
    data: IGetTotalExpensesResponse | undefined;
    offPreloader?: boolean
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean
    className?: string;
}

const OperationCard: FC<OperactionCardProps> = ({ operation, title, className, icon, data, isLoading, isSuccess, isError, offPreloader = false }) => {
    const currency = useAppSelector(state => state.persistedCurrencySlice.currency)
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const [amount, setAmount] = useState<number | string>(0);
    const [percents, setPercents] = useState<number>(0);
    const [sign, setSign] = useState<string>('');
    const [isOperationModalOpen, setIsOperationModalOpen] = useState<boolean>(false);

    const styles = {
        operationColor: operation === "Income" ? "var(--main-green)" : "var(--main-red)",
        percentColor: operation === "Income" ? "var(--main-green)" : "var(--main-red)",
        percentBackground: sign === "-" ? "rgba(255, 45, 85, 0.20)" : operation === 'Expenses' ? "rgba(255, 45, 85, 0.20)" : "rgba(128, 214, 103, 0.20)",
        cursor: operation === "Income" ? "pointer" : "auto"
    }

    const getMonthPickerTitle = useMemo(() => {
        if (MonthPickerStore.rangeType === 'default' || MonthPickerStore.rangeType === 'month' ) {
            return 'since last month'
        } else if (MonthPickerStore.rangeType === 'week' || MonthPickerStore.rangeType === 'lastweek'){
            return 'since last week'
        } else if (MonthPickerStore.rangeType === 'today' || MonthPickerStore.rangeType === 'yesterday') {
            return 'since last days'
        } else if (MonthPickerStore.rangeType === 'alltime') {
            return ``
        }
        return(`since last period`)
    }, [MonthPickerStore.rangeType])

    const initializeTotalVars = useCallback(() => {
        if(data){
            setAmount(numberWithCommas(Number(data.amount)));
            setPercents(Number(data.percentage_increase * 100 > 1000 ? Math.floor(data.percentage_increase * 100) : fomatFloatNumber(data.percentage_increase * 100, 2)));
            setSign(data.percentage_increase === 0 ? '' : data.percentage_increase > 0 ? '+' : '-');
        } else {
            setAmount(0);
            setPercents(0);
            setSign('+');
        }
    }, [data])
    
    useEffect(() => initializeTotalVars(), [initializeTotalVars])
    const cardTitle = title ? title : operation;

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
                            <h3 className={classes.title}>{cardTitle}</h3>
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
                        <p className={classes.time}>{getMonthPickerTitle}</p>
                    </div>
                </div>
            }
        </div>
    </>);
};

export default OperationCard;