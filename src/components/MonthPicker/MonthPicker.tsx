import React, { useEffect, useCallback, useState, useMemo } from 'react';

//UI
import classes from './MonthPicker.module.css';
import TimeRangePicker from '@components/TimeRangePicker/TimeRangePicker';
import { MonthPickerActions } from '@UI_store/MonthPickerSlice/MonthPickerSlice'
import { IMonthPickerState } from '@UI_store/MonthPickerSlice/MonthPickerInterfaces';
//store
import { useActionCreators, useAppSelector } from '@hooks/storeHooks/useAppStore';
import ToggleButton from '@components/Buttons/ToggleButton/ToggleButton';
import DateService from '@services/DateService/DateService';

const MonthPicker: React.FC = () => {

    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice)
    const MonthPickerDispatch = useActionCreators(MonthPickerActions);

    const [isRangeMode, setIsRangeMode] = useState<boolean>(false);
    const [isTimeRangePicker, setIsTimeRangePicker] = useState<boolean>(false);

    const setMonth = useCallback((e: React.MouseEvent<HTMLButtonElement>, type: string) => {
        if (type === 'prev') {
            MonthPickerDispatch.prevMonth();
        }
        else if (type === 'next') MonthPickerDispatch.nextMonth();
    }, [])
    
    const getStartDateForTitle =  useMemo(() => {
        return `${new Date(MonthPickerStore.startDate).getDate()} ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth()).slice(0,3)} ${new Date(MonthPickerStore.startDate).getFullYear()}`
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])
    const getEndDateForTitle =  useMemo(() => {
        return `${new Date(MonthPickerStore.endDate).getDate()} ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.endDate).getMonth()).slice(0,3)} ${new Date(MonthPickerStore.endDate).getFullYear()}`
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])

    const monthPickerBody = useMemo(() => {
        if(!isRangeMode){
            return (<>
                <button 
                onClick={(e)=>{setMonth(e, 'prev')}}
                className={classes.btn + ' ' + classes.previous}>
                    <i id='chevron' className="bi bi-chevron-left"></i>
                </button>
                <button
                className={classes.RangeDatePicker}
                onClick={() => setIsTimeRangePicker(true)}>
                    <h4 className={classes.title}>{MonthPickerStore.currentMonth} {MonthPickerStore.currentYear}</h4>
                </button>
                <button 
                onClick={(e)=>{setMonth(e, 'next')}}
                className={classes.btn + ' ' + classes.next}>
                    <i id='chevron' className="bi bi-chevron-right"></i>
                </button>
            </>)
        } else {
            return (<>
                <button
                className={classes.RangeDatePicker}
                onClick={() => setIsTimeRangePicker(true)}>
                    <h4 className={classes.title}>{getStartDateForTitle}</h4>
                    -
                    <h4 className={classes.title}>{getEndDateForTitle}</h4>
                </button>
            </>)
        }
    }, [getEndDateForTitle, getStartDateForTitle, isRangeMode])

    return (<div className={classes.monthPickerWrapper}>
        {<TimeRangePicker
        isTimeRangePicker={isTimeRangePicker}
        setIsTimeRangePicker={setIsTimeRangePicker}/>}
        <div className={classes.monthPicker}>
            <div className={classes.wrapper}>
                {monthPickerBody}
            </div>
        </div>
        <div className={classes.ToggleSide}>
            <p>Want to pick dates?</p>
            <ToggleButton isToggle={isRangeMode} onToggle={() => {
                setIsRangeMode(!isRangeMode)
                MonthPickerDispatch.changeTypeFetchingData() 
            }}/>
        </div>
    </div>);
};

export default MonthPicker;