import React, { useEffect, useCallback } from 'react';

//UI
import classes from './MonthPicker.module.css';
//store
import { useActionCreators, useAppSelector } from '@hooks/useAppStore';
import { MonthPickerActions } from '@UI_store/MonthPickerSlice/MonthPickerSlice'
import { IMonthPickerState } from '@UI_store/MonthPickerSlice/MonthPickerInterfaces';

const MonthPicker = () => {

    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice)
    const MonthPickerDispatch = useActionCreators(MonthPickerActions);

    const setMonth = useCallback((e: React.MouseEvent<HTMLButtonElement>, type: string) => {
        if (type === 'prev') {
            MonthPickerDispatch.prevMonth();
        }
        else if (type === 'next') MonthPickerDispatch.nextMonth();
    }, [])

    return (
        <div className={classes.monthPicker}>
            <div className={classes.wrapper}>
                <button 
                type="submit"  
                onClick={(e)=>{setMonth(e, 'prev')}}
                className={classes.btn + ' ' + classes.previous}>
                    <i id='chevron' className="bi bi-chevron-left"></i>
                </button>
                <h4 className={classes.title}>{MonthPickerStore.currentMonth} {MonthPickerStore.currentYear}</h4>
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