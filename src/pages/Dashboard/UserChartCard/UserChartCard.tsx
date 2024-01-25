//logic
import DateService from '@services/DateService/DateService';
//store
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { useGetUserExpensesByCategoryQuery } from '@store/Controllers/UserController/UserController';
//UI
import classes from "./UserChartCard.module.css"
import ChartCard from '@components/ChartCard/ChartCard';
import ChartCardLoader from '@components/ChartCard/ChartCardLoader';


const UserChartCard = () => {
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)
    const { data: ExpensesByCategory, isLoading: isExpensesLoading, isError: isExpensesError, isSuccess: isExpensesSuccess } = useGetUserExpensesByCategoryQuery({ start_date: MonthPickerStore.startDate, end_date: MonthPickerStore.endDate })

    return (
        <div className={classes.UserChart}>
            {isExpensesLoading ? <ChartCardLoader /> :
                <ChartCard categories={ExpensesByCategory || []} title={'Expenses'} />
            }
        </div>
    );
};

export default UserChartCard;