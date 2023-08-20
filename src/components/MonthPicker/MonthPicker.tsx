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
import { format, addDays, isSameMonth, lastDayOfMonth, subDays, isLastDayOfMonth, isFirstDayOfMonth, subMonths } from 'date-fns';

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

    const getStartDateForTitle = useMemo(() => {
        return `${new Date(subDays(new Date(MonthPickerStore.startDate), 1)).getDate()} ${DateService.getMonthNameByIdx(new Date(subDays(new Date(MonthPickerStore.startDate), 1)).getMonth()).slice(0,3)} ${new Date(subDays(new Date(MonthPickerStore.startDate), 1)).getFullYear()}`
        }, [MonthPickerStore.startDate, MonthPickerStore.endDate, MonthPickerStore.rangesFromFastNav, MonthPickerStore.isPickedWeekMonth])
    const getEndDateForTitle = useMemo(() => {
        if(MonthPickerStore.rangeType === 'week' || MonthPickerStore.rangeType === 'lastweek'){
            return `${new Date(subDays(new Date(MonthPickerStore.endDate), 1)).getDate()} ${DateService.getMonthNameByIdx(new Date(subDays(new Date(MonthPickerStore.endDate), 1)).getMonth()).slice(0,3)} ${new Date(subDays(new Date(MonthPickerStore.endDate), 1)).getFullYear()}`
        }
        return `${subDays(new Date(MonthPickerStore.endDate), 2).getDate()} ${DateService.getMonthNameByIdx(subDays(new Date(MonthPickerStore.endDate), 2).getMonth()).slice(0,3)} ${subDays(new Date(MonthPickerStore.endDate), 2).getFullYear()}`
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate, MonthPickerStore.rangesFromFastNav, MonthPickerStore.isPickedWeekMonth])

    const getMonthPickerTitle = useMemo(() => {
        if(MonthPickerStore.type === 'year-month'){
            return(`${MonthPickerStore.currentMonth} ${MonthPickerStore.currentYear}`)
        } else {
            const firstDateOfMonth = format(new Date(MonthPickerStore.startDate), 'yyyy-MM-01')
            const lastDateOfMonth = format(lastDayOfMonth(new Date(MonthPickerStore.endDate)), 'yyyy-MM-dd')
            if (MonthPickerStore.rangeType === 'today' || MonthPickerStore.rangeType === 'yesterday') {
                return(`${new Date(MonthPickerStore.startDate).getDate()} ${DateService.getMonthNameByIdx(new Date(MonthPickerStore.startDate).getMonth())} ${new Date(MonthPickerStore.startDate).getFullYear()}`)
            }
            else if (MonthPickerStore.rangeType === 'month'){
                return(`${DateService.getMonthNameByIdx(new Date(lastDateOfMonth).getMonth() - 1)} ${new Date(lastDateOfMonth).getFullYear()}`)
            }
            else if (MonthPickerStore.rangeType === 'alltime'){
                return(`All time`)
            }
            else if((new Date(MonthPickerStore.startDate).getMonth() === new Date(subMonths(new Date(MonthPickerStore.endDate), 1)).getMonth()) &&
            isLastDayOfMonth(new Date(subDays(new Date(MonthPickerStore.endDate), 2))) &&
            isFirstDayOfMonth(new Date(subDays(new Date(MonthPickerStore.startDate), 1))) &&
            (new Date(MonthPickerStore.endDate).getFullYear() === new Date(MonthPickerStore.startDate).getFullYear())){
                return(`${DateService.getMonthNameByIdx(new Date(lastDateOfMonth).getMonth() - 1)} ${new Date(lastDateOfMonth).getFullYear()}`)
            }
            else if((new Date(MonthPickerStore.endDate).getMonth() === new Date(MonthPickerStore.startDate).getMonth()) &&
            new Date(subDays(new Date(MonthPickerStore.endDate), 1)).getDate() === new Date(MonthPickerStore.startDate).getDate() &&
            (new Date(MonthPickerStore.endDate).getFullYear() === new Date(MonthPickerStore.startDate).getFullYear())){
                return(`${subDays(new Date(MonthPickerStore.startDate), 1).getDate()} ${DateService.getMonthNameByIdx(subDays(new Date(MonthPickerStore.startDate), 1).getMonth())} ${subDays(new Date(MonthPickerStore.startDate), 1).getFullYear()}`)
            }
            return(`${getStartDateForTitle} - ${getEndDateForTitle}`)
        }
    }, [MonthPickerStore.startDate, MonthPickerStore.endDate, 
        MonthPickerStore.currentMonth, MonthPickerStore.currentYear, 
        isRangeMode, MonthPickerStore.isPickedWeekMonth, MonthPickerStore.rangesFromFastNav])


    const monthPickerBody = useMemo(() => {
        return (<>
            <button
            className={classes.RangeDatePicker}
            onClick={() => {
                setIsRangeMode(true)
                setIsTimeRangePicker(true)
                if(!isRangeMode){
                    MonthPickerDispatch.setTypeFetchingData('date-range') 
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
                        MonthPickerDispatch.setCurrentDateTime()
                        setIsRangeMode(false)
                        setIsTimeRangePicker(false)
                        MonthPickerDispatch.setIsChangedRangeFromMount(false)
                        MonthPickerDispatch.setRangesFromFastNavStatus(false)
                        MonthPickerDispatch.setRangeType('today')
                        MonthPickerDispatch.setTypeFetchingData('year-month')
                        if(isSameMonth(new Date(MonthPickerStore.startDate), new Date())){
                            setMonth('prev')
                        }
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
                        MonthPickerDispatch.setCurrentDateTime()
                        setIsRangeMode(false)
                        setIsTimeRangePicker(false)
                        MonthPickerDispatch.setCurrentDateTime()
                        MonthPickerDispatch.setIsChangedRangeFromMount(false)
                        MonthPickerDispatch.setRangesFromFastNavStatus(false)
                        MonthPickerDispatch.setRangeType('today')
                        MonthPickerDispatch.setTypeFetchingData('year-month')
                        if(isSameMonth(new Date(MonthPickerStore.startDate), new Date())){
                            setMonth('next')
                        }
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