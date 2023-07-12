import React, { FC, MouseEvent, ReactNode, useCallback, useState } from "react";

//UI
import classes from './GroupMemberGraphCard.module.css';
import ToggleButton from "@components/Buttons/ToggleButton/ToggleButton";
import GraphCardLoader from "@components/GraphCard/GraphCardLoader";
import StackedGraph from "@components/GraphCard/StackedGraph";
import Graph from "@components/GraphCard/Graph";
//store
import { useGetExpensesPerLastMonthQuery } from "@store/ExpenseApiSlice/ExpenseApiSlice";
import { IMonthPickerState } from "@store/UI_store/MonthPickerSlice/MonthPickerInterfaces";
import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import IUser from "@models/IUser";
import { addFieldToObject } from "@services/UsefulMethods/ObjectMethods";


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
    const [loading = true, setLoading] = useState<boolean>();
    const [isToggled = false, setIsToggled] = useState<boolean>();
    const { data: expenses = [], isError: isExpensesError, isLoading: isExpensesLoading, error: Expenses_GET_error } = useGetExpensesPerLastMonthQuery(null);
    const { currentMonth } = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice);
    setTimeout(() => {
        setLoading(false)
    }, 1500);
    
    const RangeTitle = (startDate: string, endDate: string) => {
        return (<h3 className={classes.range}>From {
            new Date(startDate).getDate() + ' ' + currentMonth.slice(0, 3)
        } - {new Date(endDate).getDate() + ' ' + currentMonth.slice(0, 3)}
        </h3>);
    }

    return (
        <div className={classes.GroupMemberGraph}>
            {loading ? <GraphCardLoader /> :
                <div className={classes.inner}>
                    <div className={classes.uppernav}>
                        <div className={classes.titleRange}>
                            <h2 className={classes.title}>Statistic</h2>
                            {RangeTitle(expenses[0].time, expenses[expenses.length - 1].time)}
                        </div>
                        <div className={classes.button}>
                            <span className={classes.buttonText}>Members</span>
                            <ToggleButton isToggle={isToggled} onToggle={() => setIsToggled(!isToggled)} />
                        </div>
                    </div>
                    <div className={classes.graph}>
                        {isToggled ?
                            <StackedGraph data={updatedData} />
                            :
                            <Graph data={expenses}
                            />
                        }
                    </div>
                </div>}
       </div>
    )
}

export default GroupMemberGraphCard