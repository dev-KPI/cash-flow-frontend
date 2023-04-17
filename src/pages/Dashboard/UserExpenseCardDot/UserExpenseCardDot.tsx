import React, {FC, Dispatch, SetStateAction, useEffect} from 'react';

//UI
import classes from './UserExpenseCardDot.module.css'
import Light from '@components/Light/Light';
//store
import { useActionCreators, useAppDispatch, useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IUserExpenseChartDataItem } from '@store/UserCategoryExpenseApiSlice/UserCategoryExpensetInterfaces';

interface ExpensesCardDotProps{
    expense: IUserExpenseChartDataItem
    setId: Dispatch<SetStateAction<number | undefined>>
}

const ExpensesCardDot: FC<ExpensesCardDotProps> = ({expense, setId}) => {

     const onClick = () => {
        setId(expense ? expense.id : 0)
    }

    return (
        <li className={classes.item} onClick={onClick}>
            <Light type={'solid'} color={expense.color}></Light>
            <p className={classes.itemTitle}>{expense.title}</p>
        </li>
    );
};

export default ExpensesCardDot;