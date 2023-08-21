import { useState, FC, useEffect } from 'react';
//store
import { useGetTotalExpensesQuery, useGetTotalReplenishmentsQuery } from '@store/Controllers/UserController/UserController';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
//logic
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import DateService from '@services/DateService/DateService';
//UI
import classes from "./OperationCard.module.css"
import SalaryModal from '@components/ModalWindows/OperationModal/SalaryModal';
import OperationCardLoader from './OperationCardLoader';

interface OperactionCardProps {
    operation: "Income" | 'Expenses';
    title?: string;
    className?: string;
}

const OperationCard: FC<OperactionCardProps> = ({ operation, title, className }) => {
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const [amount, setAmount] = useState<number>(0);
    const [percents, setPercents] = useState<number>(0);
    const [sign, setSign] = useState<string>('');
    const [source, setSource] = useState<string>('');
    const [isOperationModalOpen, setIsOperationModalOpen] = useState<boolean>(false);

    const { data: Replenishments, isLoading: isReplenishmentsLoading, isError: isReplenishmentsError, isSuccess: isReplenishmentsSuccess } = useGetTotalReplenishmentsQuery({
        period: { year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth) }
    })
    const { data: Expenses, isLoading: isExpensesLoading, isError: isExpensesError, isSuccess: isExpensesSuccess } = useGetTotalExpensesQuery({
        period: { year_month: DateService.getYearMonth(MonthPickerStore.currentYear, MonthPickerStore.currentMonth) }
    })

    const styles = {
        operationColor: operation === "Income" ? "var(--main-green)" : "var(--main-red)",
        percentColor: operation === "Income" ? "var(--main-green)" : "var(--main-red)",
        percentBackground: sign === "-" ? "rgba(255, 45, 85, 0.20)" : "rgba(128, 214, 103, 0.20)",
        cursor: operation === "Income" ? "pointer" : "auto"
    }

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
        setPercents(totalPercents);
        setSign(totalPercents === 0 ? '' : totalPercents > 0 ? '+' : '-');

    }, [Replenishments, Expenses])
    
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
            {/* <OperationCardLoader /> */}
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
                                <i className="bi bi-credit-card-2-front"></i> : <i className="bi bi-graph-down"></i>}
                        </div>
                    </div>
                    <div className={classes.bottom}>
                        <div
                            className={classes.percent}
                            style={{ background: styles.percentBackground }}
                        >
                        <span style={{ color: styles.percentColor }}>{percents}%</span>
                        </div>
                        <p className={classes.time}>since last month</p>
                    </div>
                </div>
        </div>
    </>);
};

export default OperationCard;