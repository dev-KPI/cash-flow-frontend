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
import { format, lastDayOfMonth, subDays, isSameDay } from 'date-fns';

const MonthPicker: React.FC = () => {

    const MonthPickerStore = useAppSelector<IMonthPickerState>(state => state.MonthPickerSlice)
    const MonthPickerDispatch = useActionCreators(MonthPickerActions);

    const [isRangeMode, setIsRangeMode] = useState<boolean>(false);
    const [isDateRangePicker, setIsDateRangePicker] = useState<boolean>(false);

    const setMonth = useCallback((type: 'prev' | 'next') => {
        if (type === 'prev') {
            MonthPickerDispatch.prevMonth();
        }
        else if (type === 'next') MonthPickerDispatch.nextMonth();
    }, [])

    const offTimeRangePicker = useCallback(() => {
        MonthPickerDispatch.setTypeFetchingData('year-month')
        MonthPickerDispatch.setRangeType('default')
        MonthPickerDispatch.setIsChangedRange(false)
        MonthPickerDispatch.setIsChangedRangeFromMount(false)
        setIsRangeMode(false)
        setIsDateRangePicker(false)
    }, [])

    const getStartDateForTitle = useMemo(() => {
        return `${new Date(MonthPickerStore.startDate).getDate()} ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth()).slice(0,3)} ${new Date(MonthPickerStore.startDate).getFullYear()}`
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate, MonthPickerStore.rangesFromFastNav, MonthPickerStore.isPickedWeekMonth])
    const getEndDateForTitle = useMemo(() => {
        return `${subDays(new Date(MonthPickerStore.endDate), 1).getDate()} ${DateService.getMonthNameByIdx(subDays(new Date(MonthPickerStore.endDate), 1).getMonth()).slice(0,3)} ${subDays(new Date(MonthPickerStore.endDate), 1).getFullYear()}`
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate, MonthPickerStore.rangesFromFastNav, MonthPickerStore.isPickedWeekMonth])

    const getMonthPickerTitle = useMemo(() => {
        if(MonthPickerStore.type === 'year-month'){
            return(`${MonthPickerStore.currentMonth} ${MonthPickerStore.currentYear}`)
        } else {
            const firstDateOfMonth = format(new Date(MonthPickerStore.startDate), 'yyyy-MM-01')
            const lastDateOfMonth = format(lastDayOfMonth(new Date(MonthPickerStore.endDate)), 'yyyy-MM-dd')
            let rangeType = MonthPickerStore.rangeType;

            if(!MonthPickerStore.isChangedRangeFromMount){
                return `${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} 
                ${new Date(MonthPickerStore.startDate).getFullYear()}`
            }
            else if(rangeType === 'today' || rangeType === 'yesterday' || 
            isSameDay(new Date(MonthPickerStore.startDate), subDays(new Date(MonthPickerStore.endDate), 1))){
                return `${new Date(MonthPickerStore.startDate).getDate()} 
                ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} 
                ${new Date(MonthPickerStore.startDate).getFullYear()}`
            } else if (rangeType === 'month') {
                return `${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} 
                ${new Date(MonthPickerStore.startDate).getFullYear()}`
            } else if (rangeType === 'alltime'){
                return 'All time'
            }
            return(`${getStartDateForTitle} - ${getEndDateForTitle}`)
        }
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate, isRangeMode, 
        MonthPickerStore.currentMonth, MonthPickerStore.rangeType])

    const monthPickerBody = useMemo(() => {
        return (<>
            <button
            className={classes.RangeDatePicker}
            onClick={() => {
                setIsRangeMode(true)
                setIsDateRangePicker(true)
                if(!isRangeMode){
                    MonthPickerDispatch.setCurrentDateTime()
                }
            }}>
                <h4 className={classes.title}>{getMonthPickerTitle}</h4>
            </button>
        </>)
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate, MonthPickerStore.currentMonth, MonthPickerStore.currentYear, isRangeMode])

    return (<div className={classes.monthPickerWrapper}>
        {<DateRangePickerCard
        isDateRangePicker={isDateRangePicker}
        setIsDateRangePicker={setIsDateRangePicker}
        offRangePicker={offTimeRangePicker}/>}
        <div className={classes.monthPicker}>
            <div className={classes.wrapper}>
                <button 
                onClick={()=>{
                    if(isRangeMode){
                        if(new Date(MonthPickerStore.startDate).getMonth() !== DateService.getMonthIdxByName(MonthPickerStore.currentMonth) &&
                        new Date(MonthPickerStore.endDate).getMonth() !== DateService.getMonthIdxByName(MonthPickerStore.currentMonth)){
                            MonthPickerDispatch.setCurrentDateTime()
                        } else {
                            setMonth('prev')
                        }
                        offTimeRangePicker()
                    } else {
                        setMonth('prev')
                    }
                }}
                className={classes.btn + ' ' + classes.previous}>
                    <i id='chevron' className="bi bi-chevron-left"></i>
                </button>
                {monthPickerBody}
                <button 
                onClick={() => { 
                    if(isRangeMode){
                        if(new Date(MonthPickerStore.startDate).getMonth() !== DateService.getMonthIdxByName(MonthPickerStore.currentMonth) &&
                        new Date(MonthPickerStore.endDate).getMonth() !== DateService.getMonthIdxByName(MonthPickerStore.currentMonth)){
                            MonthPickerDispatch.setCurrentDateTime()
                        } else {
                            setMonth('next')
                        }
                        offTimeRangePicker()
                    } else {
                        setMonth('next')
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