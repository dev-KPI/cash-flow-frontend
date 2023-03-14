import React, { useEffect } from 'react';
import classes from './MonthPicker.module.css';
import arrow from '../../assets/arrow.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppStore';
import { prevMonth, nextMonth, setCurrentDateTime } from '../../store/MonthPickerSlice/MonthPickerSlice'
import { IMonthPickerState } from '../../store/MonthPickerSlice/MonthPickerInterfaces';

const MonthPicker = () => {

    const MonthPicker = useAppSelector<IMonthPickerState>(state => state.persistedDatePickerSlice)
    const dispatch = useAppDispatch();

    const setMonth = (e: React.MouseEvent<HTMLButtonElement>, type: string): void => {
        type === 'prev' ? dispatch(prevMonth()) : dispatch(nextMonth());
    }

    useEffect(()=>{
        dispatch(setCurrentDateTime())
    },[dispatch]);

    return (
        <div className={classes.monthPicker}>
            <div className={classes.wrapper}>
                <button 
                type="submit"  
                onClick={(e)=>{setMonth(e, 'prev')}}
                className={classes.btn + ' ' + classes.previous}>
                    <i id='chevron' className="bi bi-chevron-left"></i>
                </button>
                <h4 className={classes.title}>{MonthPicker.currentMonth} {MonthPicker.currentYear}</h4>
                <button 
                type="submit" 
                onClick={(e)=>{setMonth(e, 'next')}}
                className={classes.btn + ' ' + classes.next}>
                    <i id='chevron' className="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

export default MonthPicker;