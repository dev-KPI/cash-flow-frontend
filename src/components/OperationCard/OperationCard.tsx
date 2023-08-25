import { useState, FC, useEffect, useMemo } from 'react';
//store
import { useGetTotalExpensesQuery, useGetTotalReplenishmentsQuery } from '@store/Controllers/UserController/UserController';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
//logic
import { isSameDay, format, lastDayOfMonth, subDays } from 'date-fns'
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import DateService from '@services/DateService/DateService';
//UI
import classes from "./OperationCard.module.css"
import SalaryModal from '@components/ModalWindows/OperationModal/SalaryModal';
import OperationCardLoader from './OperationCardLoader';
import { fomatFloatNumber } from '@services/UsefulMethods/UIMethods';

interface OperactionCardProps {
    operation: "Income" | 'Expenses';
    title?: string;
    icon?: string;
    className?: string;
}

const OperationCard: FC<OperactionCardProps> = ({ operation, title, className, icon }) => {
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const [amount, setAmount] = useState<number>(0);
    const [percents, setPercents] = useState<number>(0);
    const [sign, setSign] = useState<string>('');
    const [source, setSource] = useState<string>('');
    const [isOperationModalOpen, setIsOperationModalOpen] = useState<boolean>(false);

    const { data: Replenishments, isLoading: isReplenishmentsLoading, isError: isReplenishmentsError, isSuccess: isReplenishmentsSuccess } = useGetTotalReplenishmentsQuery(MonthPickerStore.type === 'year-month' ? 
    { period: {year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth)} } : 
    { period: {start_date: MonthPickerStore.startDate.slice(0,10), end_date: MonthPickerStore.endDate.slice(0,10)} })
    const { data: Expenses, isLoading: isExpensesLoading, isError: isExpensesError, isSuccess: isExpensesSuccess } = useGetTotalExpensesQuery(MonthPickerStore.type === 'year-month' ? 
    { period: {year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth)} } : 
    { period: {start_date: MonthPickerStore.startDate.slice(0,10), end_date: MonthPickerStore.endDate.slice(0,10)} })

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

    let totalAmount = 0
    let totalPercents = 0;
    useEffect(() => {
        if (operation === "Income" && isReplenishmentsSuccess) {
            totalAmount = Replenishments.amount;
            totalPercents = Replenishments.percentage_increase
        } else if (operation === 'Expenses' && isExpensesSuccess) {
            totalAmount = Expenses.amount;
            totalPercents = Expenses.percentage_increase
        }
        setAmount(Number(totalAmount.toFixed(2)));
        setPercents(Number(totalPercents * 100 > 1000 ? Math.floor(totalPercents * 100) : fomatFloatNumber(totalPercents * 100, 2)));
        setSign(totalPercents === 0 ? '' : totalPercents > 0 ? '+' : '-');

    }, [Replenishments, Expenses, isReplenishmentsLoading, isReplenishmentsSuccess, isExpensesLoading, isExpensesSuccess])
    
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
            {isExpensesLoading || isReplenishmentsLoading ? 
                <OperationCardLoader />
                :
                <div className={classes.inner}>
                    <div className={classes.top}>
                        <div className={classes.info}>
                            <h3 className={classes.title}>{cardTitle}</h3>
                            <p className={classes.amount}>{amount}$</p>
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