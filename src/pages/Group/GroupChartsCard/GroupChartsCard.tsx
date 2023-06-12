import React from 'react';
import { NavLink } from 'react-router-dom';
import userIcon from '@assets/user-icon.svg';

//logic
import { useGetCategoryExpensesQuery } from '@store/UserCategoryExpenseApiSlice/UserCategoryExpenseApiSlice';

//UI
import classes from './GroupChartsCard.module.css';
import ChartCard, { IMembersExpensesChart } from '@components/ChartCard/ChartCard';


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

function getRandomColor() {
    const colorKeys = Object.keys(colors);
    const randomIndex = Math.floor(Math.random() * colorKeys.length);
    const randomColorKey = colorKeys[randomIndex];
    return colors[randomColorKey];
}

const GroupChartsCard = () => {
    const MembersObj: IMembersExpensesChart[] = JSON.parse(JSON.stringify([
        {
            "member": {
                "id":0,
                "login": "johndoe@gmail.com",
                "first_name": "Dmitriy",
                "last_name": "Rezenkov",
                "picture": "ref.com"
            },
            "amount": 1000
        },
        {
            "member": {
                "id": 1,
                "login": "johndoe@gmail.com",
                "first_name": "Dima",
                "last_name": "Rezenkov",
                "picture": "ref.com"
            },
            "amount": 999
        },
        {
            "member": {
                "id": 2,
                "login": "johndoe@gmail.com",
                "first_name": "Dima",
                "last_name": "Pestenkov",
                "picture": "ref.com"
            },
            "amount": 777
        },
        {
            "member": {
                "id": 3,
                "login": "johndoe@gmail.com",
                "first_name": "Dasdima",
                "last_name": "Pesasdtenkov",
                "picture": "ref.com"
            },
            "amount": 7534
        },
        {
            "member": {
                "id": 4,
                "login": "johndoe@gmail.com",
                "first_name": "Daqwema",
                "last_name": "Pesasasddtenkov",
                "picture": "ref.com"
            },
            "amount": 34
        }


    ]
    ))
    const { data: expenses = [], error: expensesGetError, isError: isExpensesError, isLoading: isExpensesLoading } = useGetCategoryExpensesQuery(null);


    const members = MembersObj.map((item, index) => {
        const member = item.member;
        const color = getRandomColor()
        return {
            member: { ...member, color },
            amount: item.amount,
        };
    });
    return (
        <div className={classes.ChartsCard}>
                <ChartCard data={expenses} title={'Expenses by categories'} />
                <ChartCard data={members} title={'Expenses by members'} />
        </div>
    );
};

export default GroupChartsCard;