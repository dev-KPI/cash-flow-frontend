import React, {FC, SetStateAction, useEffect} from 'react';
import classes from './UserExpenseCardDot.module.css'
import { useActionCreators, useAppDispatch, useAppSelector } from '@hooks/useAppStore';
import { IUserExpenseChartDataItem } from '@store/UserCategoryExpenseApiSlice/UserCategoryExpensetInterfaces';
interface ExpensesCardDotProps{
    expense: IUserExpenseChartDataItem
    setId: (setId: SetStateAction<number>) => void;
}
function cssvar(name: string) {
    if (name.includes('--'))
        return getComputedStyle(document.documentElement).getPropertyValue(name);
    else if (!name.includes("#"))
        return "#" + name
    else
        return name
}
const ExpensesCardDot: FC<ExpensesCardDotProps> = ({expense, setId}) => {

     const onClick = () => {
        setId(expense.id)
    }

    return (
        <li className={classes.item} onClick={onClick}>
            <span className={classes.itemDot} style={{ backgroundColor: expense.color}}></span>
            <p className={classes.itemTitle}>{expense.title}</p>
        </li>
    );
};

export default ExpensesCardDot;