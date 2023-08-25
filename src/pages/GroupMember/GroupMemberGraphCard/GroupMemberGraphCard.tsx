import React, { FC, MouseEvent, ReactNode, useCallback, useMemo, useState } from "react";

//UI
import classes from './GroupMemberGraphCard.module.css';
import ToggleButton from "@components/Buttons/ToggleButton/ToggleButton";
import GraphCardLoader from "@components/GraphCard/GraphCardLoader";
import StackedGraph from "@components/GraphCard/StackedGraph";
import Graph from "@components/GraphCard/Graph";
//store
import { addDays, subDays, isSameDay} from 'date-fns'
import { IMonthPickerState } from "@store/UI_store/MonthPickerSlice/MonthPickerInterfaces";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import IUser from "@models/IUser";
import { addFieldToObject } from "@services/UsefulMethods/ObjectMethods";
import { useGetCurrentUserExpensesDailyQuery } from "@store/Controllers/ExpensesController/ExpensesController";
import DateService from "@services/DateService/DateService";


interface IGraphGroupMembers {
    date: string,
    details: {
        user: IUser
        amount: number
    }[]
}
type Colors = {
    [key: string]: string;
};

const colors: Colors = {
    blue: "#4C6FFF",
    orange: "#FF6E01",
    red: "#FF2D55",
    green: "#28CD41",
    purple: "#D96FF8"
};


const existingData = [
    {
        date: '2023-04-01',
        details: [
            {
                user: {
                    id: 0,
                    login: 'johndoe@gmail.com',
                    first_name: 'John',
                    last_name: 'Doe',
                    picture: 'ref.com',
                },
                amount: 132,
            },
            {
                user: {
                    id: 1,
                    login: 'johndoe@gmail.com',
                    first_name: 'Dima',
                    last_name: 'Rezenkov',
                    picture: 'ref.com',
                },
                amount: 24,
            },
        ],
    },
];

const startDate = new Date('2023-04-02');
const endDate = new Date('2023-04-30');

const newData = [];

for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    const dateString = date.toISOString().split('T')[0];
    const object = {
        date: dateString,
        details: [
            {
                user: {
                    id: 0,
                    login: 'johndoe@gmail.com',
                    first_name: 'John',
                    last_name: 'Doe',
                    picture: 'ref.com',
                },
                amount: Math.floor(Math.random() * (2110 - 100 + 1)) + 100,
            },
            {
                user: {
                    id: 1,
                    login: 'johndoe@gmail.com',
                    first_name: 'Dima',
                    last_name: 'Rezenkov',
                    picture: 'ref.com',
                },
                amount: Math.floor(Math.random() * (2200 - 100 + 1)) + 100,
            },
            {
                user: {
                    id: 31,
                    login: 'johndoe@gmail.com',
                    first_name: 'Dima',
                    last_name: 'Pestenkov',
                    picture: 'ref.com',
                },
                amount: Math.floor(Math.random() * (2110 - 100 + 1)) + 100,
            },
        ],
    };
    newData.push(object);
}

const combinedData = [...existingData, ...newData];


const addColorToUser = (data: IGraphGroupMembers[]) => {
    return data.map((object) => {
        return {
            ...object,
            details: object.details.map((detail, index) => {
                return addFieldToObject(detail, 'user', {
                    ...detail.user,
                    color: colors[Object.keys(colors)[index % Object.keys(colors).length]]
                });
            }),
        };
    });
}

const updatedData = addColorToUser(combinedData)

const GroupMemberGraphCard: FC = () => {

    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);
    const MonthPickerRange = useMemo(() => {
        if(MonthPickerStore.type === 'date-range'){
            return {
                period: {
                    start_date: addDays(new Date(MonthPickerStore.startDate), 1).toISOString().slice(0,10),
                    end_date: addDays(new Date(MonthPickerStore.endDate), 2).toISOString().slice(0,10)
                }
            }
        } else {
            return {
                period: {
                    year_month: `${MonthPickerStore.currentYear}-${DateService.getFormatedMonth(DateService.getMonthIdxByName(MonthPickerStore.currentMonth))}`} 
            }
        }
    }, [MonthPickerStore.type, MonthPickerStore.startDate, MonthPickerStore.endDate, MonthPickerStore.currentMonth, MonthPickerStore.currentYear])
    const {data: userDailyExpenses, isFetching: isUserDailyExpensesFetching, isLoading: isUserDailyExpensesLoading, isError: isUserDailyExpensesError, isSuccess: isUserDailyExpensesSuccess} = useGetCurrentUserExpensesDailyQuery(MonthPickerRange);

    const [isToggled, setIsToggled] = useState<boolean>(false);
    
    const RangeTitle = useMemo(() => {
        if(userDailyExpenses){
            if (MonthPickerStore.rangeType === 'month' || MonthPickerStore.type === 'year-month') {
                return `${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} 
                ${new Date(MonthPickerStore.startDate).getFullYear()}`
            } 
            else if(MonthPickerStore.rangeType === 'today' || MonthPickerStore.rangeType === 'yesterday' || 
                isSameDay(new Date(MonthPickerStore.startDate), subDays(new Date(MonthPickerStore.endDate), 1))){
                return `${new Date(MonthPickerStore.startDate).getDate()} 
                ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} 
                ${new Date(MonthPickerStore.startDate).getFullYear()}`
            } else if (MonthPickerStore.rangeType === 'alltime'){
                return 'All time'
            } else {
                return `From ${
                    new Date(new Date(MonthPickerStore.startDate)).getDate() + ' ' + DateService.getMonthNameByIdx(new Date(new Date(MonthPickerStore.startDate)).getMonth()).slice(0, 3)
                } - ${new Date(subDays(new Date(MonthPickerStore.endDate), 1)).getDate() + ' ' + DateService.getMonthNameByIdx(new Date(subDays(new Date(MonthPickerStore.startDate), 1)).getMonth()).slice(0, 3)}`
            }
        }
    }, [userDailyExpenses, MonthPickerStore.rangeType, MonthPickerStore.type])

    return (
        <div className={classes.GroupMemberGraph}>
            {isUserDailyExpensesLoading ? <GraphCardLoader /> :
                <div className={classes.inner}>
                    <div className={classes.uppernav}>
                        <div className={classes.titleRange}>
                            <h2 className={classes.title}>Statistic</h2>
                            <h3 className={classes.range}> 
                                {RangeTitle}
                            </h3>
                            </div>
                        <div className={classes.button}>
                            <span className={classes.buttonText}>Categories</span>
                            <ToggleButton isToggle={isToggled} onToggle={() => setIsToggled(!isToggled)} />
                        </div>
                    </div>
                    <div className={classes.graph}>
                        {!isToggled ?
                            userDailyExpenses && isUserDailyExpensesSuccess ? <Graph data={userDailyExpenses}/> : ''
                            :
                            <StackedGraph data={updatedData} />
                        }
                    </div>
                </div>}
       </div>
    )
}

export default GroupMemberGraphCard