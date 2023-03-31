import React, {FC, SetStateAction, useEffect} from 'react';
import classes from './UserExpenseCardDot.module.css'
import { useActionCreators, useAppDispatch, useAppSelector } from '@hooks/useAppStore';
import { IUserExpenseChartDataItem } from '@store/UserCategoryExpenseApiSlice/UserCategoryExpensetInterfaces';
import Light from '@components/Light/Light';
interface ExpensesCardDotProps{
    expense: IUserExpenseChartDataItem
    setId: (setId: SetStateAction<number>) => void;
}
const ExpensesCardDot: FC<ExpensesCardDotProps> = ({expense, setId}) => {

     const onClick = () => {
        setId(expense.id)
    }

    return (
        <li className={classes.item} onClick={onClick}>
            <Light type={'solid'} color={expense.color}></Light>
            <p className={classes.itemTitle}>{expense.title}</p>
        </li>
    );
};

export default ExpensesCardDot;