import React, { useEffect, useCallback, useState, ReactNode } from 'react';
import { useGetCategoryExpensesQuery, useGetCategoryExpenseByIdQuery, useGetCategoryExpensesTotalQuery, useAddCategoryExpenseMutation, useUpdateCategoryExpenseMutation, useDeleteCategoryExpenseMutation } from '@store/UserCategoryExpenseApiSlice/UserCategoryExpenseApiSlice';
import classes from './UserExpenseCard.module.css'
import UserExpenseChart from '../UserExpenseChart/UserExpenseChart';
import UserExpenseCardDot from '../UserExpenseCardDot/UserExpenseCardDot';


const UserExpenseCard = () => {
    const [id, setId] = useState<number>();
    const { data: expenses = [], error: Expenses_GET_error, isError: isExpensesError, isLoading: isExpensesLoading } = useGetCategoryExpensesQuery(null);
    const { data: total, error: Total_GET_error, isError: isTotalError, isLoading: isTotalLoading } = useGetCategoryExpensesTotalQuery(null);

    useEffect(()=>{
        id ? setId(id) : setId(0) 
    },[])

    if (isExpensesLoading || isTotalLoading) {
        return <div>Loading</div>
    }
    if (isExpensesError || isTotalError) {
        return <div>Error</div>
    }

    const getExpenses = () => {
        return expenses.map(item => <UserExpenseCardDot key={item.id} expense={item} setId={setId} />).slice(0,4)
    }


    return (
        <section className={classes.expenseChart}>
            <div className={classes.inner}>
                <h3 className={classes.title}>Expenses</h3>
                <div className={classes.wrapper}>
                    <div className={classes.chart}>
                        <UserExpenseChart expenses={expenses} setId={setId}/>
                        <p className={classes.chartAmount}>{total?.total}$</p>
                    </div>
                    <div className={classes.info}>
                        <div className={classes.expenseInfo}>
                            <h5 className={classes.expenseTitle}>{expenses.find(el => el.id === id)?.title}</h5>
                            <p className={classes.expensePercent}>1%</p>
                            <span className={classes.expenseAmount}>{expenses.find(el => el.id === id)?.amount}$</span>
                        </div>
                        <ul className={classes.chartList}>
                            {getExpenses()}
                            <li className={classes.item}>
                                <p className={classes.viewMore}>View more</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserExpenseCard;