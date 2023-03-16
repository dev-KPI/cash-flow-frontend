import React, { useEffect } from 'react';

//UI
import classes from './MonthPicker.module.css';
//store
import { useActionCreators, useAppSelector } from '../../hooks/useAppStore';
import { MonthPickerActions } from '../../store/UI_store/MonthPickerSlice/MonthPickerSlice'
import { IMonthPickerState } from '../../store/UI_store/MonthPickerSlice/MonthPickerInterfaces';

const MonthPicker = () => {

    const MonthPicker = useAppSelector<IMonthPickerState>(state => state.persistedDatePickerSlice)
    const MonthPickerDispatch = useActionCreators(MonthPickerActions);

    const setMonth = (e: React.MouseEvent<HTMLButtonElement>, type: string): void => {
        type === 'prev' ? MonthPickerDispatch.prevMonth() : MonthPickerDispatch.nextMonth();
    }

    useEffect(()=>{
        MonthPickerDispatch.setCurrentDateTime()
    },[]);

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