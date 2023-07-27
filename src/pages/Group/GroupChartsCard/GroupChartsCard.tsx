//logic
import { categoryExpenses } from '../../Expenses';
//UI
import classes from './GroupChartsCard.module.css';
import ChartCard, { IMembersExpensesChart } from '@components/ChartCard/ChartCard';
import { shaffledColors } from '@services/UsefulMethods/UIMethods';



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

    const members = MembersObj.map((item, index) => {
        const member = item.member;
        return {
            member: { ...member, color: shaffledColors[MembersObj.length%(index+1)] },
            amount: item.amount,
        };
    });
    return (
        <div className={classes.ChartsCard}>
            <ChartCard data={categoryExpenses} title={'Expenses by categories'} />
            <ChartCard data={members} title={'Expenses by members'} />
        </div>
    );
};

export default GroupChartsCard;