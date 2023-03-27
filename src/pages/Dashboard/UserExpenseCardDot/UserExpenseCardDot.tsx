import React, {FC, SetStateAction, useEffect} from 'react';

//UI
import classes from './UserExpenseCardDot.module.css'
//store
import { useActionCreators, useAppDispatch, useAppSelector } from '@hooks/useAppStore';
import { IUserExpenseChartDataItem } from '@store/UserCategoryExpenseApiSlice/UserCategoryExpensetInterfaces';

interface ExpensesCardDotProps{
    expense: IUserExpenseChartDataItem
    setId: (setId: SetStateAction<number | undefined>) => void;
}

const ExpensesCardDot: FC<ExpensesCardDotProps> = ({expense, setId}) => {

     const onClick = () => {
        setId(expense ? expense.id : 0)
    }

    return (
        <li className={classes.item} onClick={onClick}>
            <span className={classes.itemDot} style={{ backgroundColor: expense.color}}></span>
            <p className={classes.itemTitle}>{expense.title}</p>
        </li>
    );
};

export default ExpensesCardDot;