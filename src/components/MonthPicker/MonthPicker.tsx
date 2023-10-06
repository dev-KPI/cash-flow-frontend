import React, { useCallback, useState, useMemo } from 'react';

//UI
import classes from './MonthPicker.module.css';
import DateRangePickerCard from '@components/DateRangePicker/DateRangePicker';
//store
import { useActionCreators, useAppSelector } from '@hooks/storeHooks/useAppStore';
import DateService from '@services/DateService/DateService';
import { MonthPickerActions } from '@UI_store/MonthPickerSlice/MonthPickerSlice'
import { IMonthPickerState } from '@UI_store/MonthPickerSlice/MonthPickerInterfaces';
//logic
import { isSameDay, startOfMonth, endOfMonth } from 'date-fns';

const MonthPicker: React.FC = () => {

    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice)
    const MonthPickerDispatch = useActionCreators(MonthPickerActions);

    const [isDateRangePicker, setIsDateRangePicker] = useState<boolean>(false);

    const setMonth = useCallback((type: 'prev' | 'next') => {
        if (type === 'prev') {
            MonthPickerDispatch.prevMonth();
        }
        else if (type === 'next') MonthPickerDispatch.nextMonth();
    }, [])

    const getMonthPickerTitle = useMemo(() => {
        if (isSameDay(MonthPickerStore.startDate, new Date(2023, 5, 1))
            && isSameDay(MonthPickerStore.endDate, new Date())) {
            return 'All time'
        } else if (isSameDay(startOfMonth(MonthPickerStore.startDate),MonthPickerStore.startDate)
            && isSameDay(endOfMonth(MonthPickerStore.endDate),MonthPickerStore.endDate)) {
            return `${DateService.getMonthNameByIdx(MonthPickerStore.startDate.getMonth())} ${MonthPickerStore.startDate.getFullYear() }`
        } else if (isSameDay(MonthPickerStore.startDate, MonthPickerStore.endDate)) {
            return `${MonthPickerStore.startDate.getDate()} ${DateService.getMonthNameByIdx(MonthPickerStore.startDate.getMonth())} 
            ${MonthPickerStore.startDate.getFullYear()}`
        }
        else {
            return (`${DateService.getFormattedRangeTitle(MonthPickerStore.startDate)} - ${DateService.getFormattedRangeTitle(MonthPickerStore.endDate) }`)
        }
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])

    const monthPickerBody = useMemo(() => {
        return (<>
            <button
            className={classes.RangeDatePicker}
            onClick={() => {
                setIsDateRangePicker(true)
            }}>
                <h4 className={classes.title}>{getMonthPickerTitle}</h4>
            </button>
        </>)
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])

    return (<div className={classes.monthPickerWrapper}>
        {<DateRangePickerCard
        isDateRangePicker={isDateRangePicker}
        setIsDateRangePicker={setIsDateRangePicker}
        offRangePicker={()=>{}}/>}
        <div className={classes.monthPicker}>
            <div className={classes.wrapper}>
                <button 
                onClick={() => setMonth('prev')}
                className={classes.btn + ' ' + classes.previous}>
                    <i id='chevron' className="bi bi-chevron-left"></i>
                </button>
                {monthPickerBody}
                <button 
                onClick={() => setMonth('next')}
                className={classes.btn + ' ' + classes.next}>
                    <i id='chevron' className="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>
    </div>);
};

export default MonthPicker;