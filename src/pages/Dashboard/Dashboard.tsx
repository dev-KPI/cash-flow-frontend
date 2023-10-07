//Logic
import { useGetTotalExpensesQuery, useGetTotalReplenishmentsQuery } from '@store/Controllers/UserController/UserController';
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IMonthPickerState } from '@store/UI_store/MonthPickerSlice/MonthPickerInterfaces';
import DateService from '@services/DateService/DateService';
//UI
import classes from './Dashboard.module.css'                                     
import MonthPicker from '@components/MonthPicker/MonthPicker';
import OperationCard from '@components/OperationCard/OperationCard';
//local components
import UserGraphCard from '@pages/Dashboard/UserGraphCard/UserGraphCard';
import UserAccountCard from '@pages/Dashboard/UserAccountCard/UserAccountCard';
import UserHistoryCard from '@pages/Dashboard/UserHistoryCard/UserHistoryCard';
import UserCategoriesCard from '@pages/Dashboard/UserCategoriesCard/UserCategoriesCard';
import UserGroupsCard from '@pages/Dashboard/UserGroupsCard/UserGroupsCard';
import UserChartCard from './UserChartCard/UserChartCard';


const Dashboard = () => {
    
    const MonthPickerStore = useAppSelector<IMonthPickerState>(store => store.MonthPickerSlice)

    const { data: Replenishments, isLoading: isReplenishmentsLoading, isError: isReplenishmentsError, isSuccess: isReplenishmentsSuccess } = useGetTotalReplenishmentsQuery( 
        { start_date: MonthPickerStore.startDate, end_date: MonthPickerStore.endDate })
        
    const { data: Expenses, isLoading: isExpensesLoading, isError: isExpensesError, isSuccess: isExpensesSuccess } = useGetTotalExpensesQuery(
        { start_date: MonthPickerStore.startDate, end_date: MonthPickerStore.endDate})

    return (<>
        <main id='DashboardPage'>
            <div className='dashboard__container'>
                <div className={classes.header}>
                    <h1 className={`${classes.title} pageTitle`}>Dashboard</h1>
                    <MonthPicker />
                </div>
                <div className={classes.grid}>
                    <div className={classes.grid__topleft}>
                        <div className={classes.grid__operation}>
                            <OperationCard 
                            operation={'Income'}
                            data={Replenishments}
                            isSuccess={isReplenishmentsSuccess}
                            isLoading={isReplenishmentsLoading}
                            isError={isReplenishmentsError} />
                            <OperationCard 
                            operation={'Expenses'} 
                            data={Expenses}
                            isSuccess={isExpensesSuccess}
                            isLoading={isExpensesLoading}
                            isError={isExpensesError}/>
                        </div>
                        <UserCategoriesCard />
                    </div>
                    <div className={classes.grid__topright}>
                        <UserChartCard/>
                        <UserGroupsCard />
                    </div>
                    <UserAccountCard/>
                    <UserGraphCard />
                    <UserHistoryCard />
                </div>
            </div>
        </main>
    </>);
};

export default Dashboard;