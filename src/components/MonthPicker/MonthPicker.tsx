import React, { useEffect, useCallback, useState, useMemo } from 'react';

//UI
import classes from './MonthPicker.module.css';
import DateRangePicker from '@components/DateRangePicker/DateRangePicker';
import ToggleButton from '@components/Buttons/ToggleButton/ToggleButton';
//store
import { useActionCreators, useAppSelector } from '@hooks/storeHooks/useAppStore';
import DateService from '@services/DateService/DateService';
import { MonthPickerActions } from '@UI_store/MonthPickerSlice/MonthPickerSlice'
import { IMonthPickerState } from '@UI_store/MonthPickerSlice/MonthPickerInterfaces';
//logic
import { format, isWeekend, isSameDay, lastDayOfMonth } from 'date-fns';

const MonthPicker: React.FC = () => {

    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice)
    const MonthPickerDispatch = useActionCreators(MonthPickerActions);

    const [isRangeMode, setIsRangeMode] = useState<boolean>(false);
    const [isTimeRangePicker, setIsTimeRangePicker] = useState<boolean>(false);

    const setMonth = useCallback((type: 'prev' | 'next') => {
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

    const getMonthPickerTitle = useMemo(() => {
        if(MonthPickerStore.type === 'year-month'){
            return(`${MonthPickerStore.currentMonth} ${MonthPickerStore.currentYear}`)
        } else {
            const firstDateOfMonth = format(new Date(MonthPickerStore.startDate), 'yyyy-MM-01')
            const lastDateOfMonth = format(lastDayOfMonth(new Date(MonthPickerStore.endDate)), 'yyyy-MM-dd')
            if(((new Date(firstDateOfMonth).getMonth() === new Date(MonthPickerStore.startDate).getMonth()) &&
            (new Date(firstDateOfMonth).getDate() === new Date(MonthPickerStore.startDate).getDate())) && 
            ((new Date(lastDateOfMonth).getMonth() === new Date(MonthPickerStore.endDate).getMonth()) &&
            (new Date(lastDateOfMonth).getDate() === new Date(MonthPickerStore.endDate).getDate()))){
                return(`${DateService.getMonthNameByIdx(new Date(lastDateOfMonth).getMonth())} ${new Date(lastDateOfMonth).getFullYear()}`)
            }
            return(`${getStartDateForTitle} - ${getEndDateForTitle}`)
        }
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate, 
        MonthPickerStore.currentMonth, MonthPickerStore.currentYear, 
        isRangeMode])


    const monthPickerBody = useMemo(() => {
        return (<>
            <button
            className={classes.RangeDatePicker}
            onClick={() => {
                setIsRangeMode(true)
                setIsTimeRangePicker(true)
                if(!isRangeMode){
                    MonthPickerDispatch.changeTypeFetchingData() 
                }
            }}>
                <h4 className={classes.title}>{getMonthPickerTitle}</h4>
            </button>
        </>)
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate, MonthPickerStore.currentMonth, MonthPickerStore.currentYear, isRangeMode])

    return (<div className={classes.monthPickerWrapper}>
        {<DateRangePicker
        isTimeRangePicker={isTimeRangePicker}
        setIsTimeRangePicker={setIsTimeRangePicker}/>}
        <div className={classes.monthPicker}>
            <div className={classes.wrapper}>
                <button 
                onClick={()=>{
                    setMonth('prev')
                    if(isRangeMode){
                        MonthPickerDispatch.setNullDate()
                        MonthPickerDispatch.changeTypeFetchingData() 
                        setIsRangeMode(false)
                        setIsTimeRangePicker(false)
                    }
                }}
                className={classes.btn + ' ' + classes.previous}>
                    <i id='chevron' className="bi bi-chevron-left"></i>
                </button>
                {monthPickerBody}
                <button 
                onClick={() => { 
                    setMonth('next')
                    if(isRangeMode){
                        MonthPickerDispatch.setNullDate()
                        MonthPickerDispatch.changeTypeFetchingData() 
                        setIsRangeMode(false)
                        setIsTimeRangePicker(false)
                    }
                }}
                className={classes.btn + ' ' + classes.next}>
                    <i id='chevron' className="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>
    </div>);
};

export default MonthPicker;