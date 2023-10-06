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

    const getStartDateForTitle = useMemo(() => {
        return `${new Date(MonthPickerStore.startDate).getDate()} ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth()).slice(0,3)} ${new Date(MonthPickerStore.startDate).getFullYear()}`
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])
    const getEndDateForTitle = useMemo(() => {
        return `${new Date(MonthPickerStore.endDate).getDate()} ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.endDate).getMonth()).slice(0,3)} ${new Date(MonthPickerStore.endDate).getFullYear()}`
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate])

    const getMonthPickerTitle = useMemo(() => {
        if (isSameDay(new Date(MonthPickerStore.startDate), new Date(DateService.getLocalISOString(new Date(2023, 5, 1))))
            && isSameDay(new Date(MonthPickerStore.endDate), new Date(DateService.getLocalISOString(new Date())))) {
            return 'All time'
        } else if (DateService.isSameDay(startOfMonth(new Date(MonthPickerStore.startDate)), new Date(MonthPickerStore.startDate))
            && DateService.isSameDay(endOfMonth(new Date(MonthPickerStore.startDate)), new Date(MonthPickerStore.endDate))) {
            return `${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} ${new Date(MonthPickerStore.startDate).getFullYear()}`
        } else if (isSameDay(new Date(MonthPickerStore.startDate), new Date(MonthPickerStore.endDate))) {
            return `${new Date(MonthPickerStore.startDate).getDate()} ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} 
            ${new Date(MonthPickerStore.startDate).getFullYear()}`
        }
        else {
            return (`${getStartDateForTitle} - ${getEndDateForTitle}`)
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
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate, MonthPickerStore.currentMonth, MonthPickerStore.currentYear])

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